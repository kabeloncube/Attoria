const express = require('express');
const fs = require('fs');
const path = require('path');

module.exports = function depsFactory(deps) {
  const { db, authenticateToken } = deps;
  const router = express.Router();

  // -----------------------------
  // RATIOS SUPPORT (compatibility)
  // -----------------------------
  const ratiosPath = path.join(__dirname, '..', 'public', 'assets', 'config', 'refine-ratios.json');
  let RATIOS = {};
  try {
    const raw = fs.readFileSync(ratiosPath, 'utf8');
    RATIOS = JSON.parse(raw);
  } catch (err) {
    console.warn('Could not load refine ratios:', err && err.message);
    RATIOS = {};
  }

  router.get('/ratios', (req, res) => res.json(RATIOS));

  router.get('/ratio', (req, res) => {
    const item = (req.query.item || '').toUpperCase();
    if (!item) return res.status(400).json({ error: 'item query parameter required' });
    const entry = RATIOS[item] || null;
    if (!entry) return res.status(404).json({ error: 'ratio not found' });
    res.json(entry);
  });

  router.post('/batch', express.json(), (req, res) => {
    const items = Array.isArray(req.body.items) ? req.body.items : [];
    const results = items.map(i => {
      const item = (i.item || '').toUpperCase();
      const amount = Number(i.amount) || 0;
      const meta = RATIOS[item] || { refined: 'UNKNOWN', yieldPer: 0.5, sellPrice: 0 };
      const refinedAmount = Math.floor(amount * (meta.yieldPer || 0));
      const gross = refinedAmount * (meta.sellPrice || 0);
      return {
        item,
        rawAmount: amount,
        refinedItem: meta.refined,
        refinedAmount,
        estimatedGross: gross,
        meta
      };
    });
    const totalGross = results.reduce((s, r) => s + (r.estimatedGross || 0), 0);
    res.json({ items: results, totalEstimatedGross: totalGross });
  });

  // --------------------------------------------------
  // REFINING CALCULATION LOGIC (matches PDF spec)
  // --------------------------------------------------
  const CITY_BONUSES = {
    'Lymhurst': 'fiber',
    'Thetford': 'ore',
    'Martlock': 'hide',
    'Fort Sterling': 'wood',
    'Bridgewatch': 'rock'
  };

  const RESOURCE_NAMES = {
    'ore': { raw: 'Ore', refined: 'Metal Bars' },
    'fiber': { raw: 'Fiber', refined: 'Cloth' },
    'hide': { raw: 'Hide', refined: 'Leather' },
    'wood': { raw: 'Wood', refined: 'Planks' },
    'rock': { raw: 'Rock', refined: 'Stone Blocks' }
  };

  const MARKET_TAX_NO_PREMIUM = 0.08;
  const MARKET_TAX_PREMIUM = 0.04;
  const SETUP_FEE_RATE = 0.025;

  const RRR_BONUS_CITY = 0.367;
  const RRR_NON_BONUS_CITY = 0.152;
  const RRR_PERSONAL_ISLAND = 0.0;
  const RRR_BONUS_CITY_FOCUS = 0.539;
  const RRR_NON_BONUS_CITY_FOCUS = 0.435;
  const RRR_PERSONAL_ISLAND_FOCUS = 0.435;

  function calculateRRR(city, resourceType, useFocus) {
    const isBonusCity = CITY_BONUSES[city] === resourceType;
    const isPersonalIsland = city === 'Personal Island';
    if (useFocus) {
      if (isPersonalIsland) return RRR_PERSONAL_ISLAND_FOCUS;
      if (isBonusCity) return RRR_BONUS_CITY_FOCUS;
      return RRR_NON_BONUS_CITY_FOCUS;
    } else {
      if (isPersonalIsland) return RRR_PERSONAL_ISLAND;
      if (isBonusCity) return RRR_BONUS_CITY;
      return RRR_NON_BONUS_CITY;
    }
  }

  function calculateProfit(params) {
    const {
      quantity, rawPrice, prevTierPrice, refinedPrice,
      stationCost, city, resourceType, tier, premium, focus
    } = params;

    const rrr = calculateRRR(city, resourceType, focus);
    const rawRequired = 2 * quantity;
    const prevTierRequired = 1 * quantity;
    const returnedRaw = rawRequired * rrr;
    const returnedPrevTier = prevTierRequired * rrr;
    const effectiveRawUsed = rawRequired - returnedRaw;
    const effectivePrevTierUsed = prevTierRequired - returnedPrevTier;
    const materialCost = (effectiveRawUsed * rawPrice) + (effectivePrevTierUsed * prevTierPrice);
    const totalProductionCostBeforeFees = materialCost + stationCost;
    const setupFee = totalProductionCostBeforeFees * SETUP_FEE_RATE;
    const totalProductionCost = totalProductionCostBeforeFees + setupFee;
    const grossSaleValue = quantity * refinedPrice;
    const marketTaxRate = premium ? MARKET_TAX_PREMIUM : MARKET_TAX_NO_PREMIUM;
    const marketTax = grossSaleValue * marketTaxRate;
    const netSaleValue = grossSaleValue - marketTax;
    const netProfit = netSaleValue - totalProductionCost;
    const profitPerUnit = netProfit / quantity;
    const profitMargin = totalProductionCost > 0 ? (netProfit / totalProductionCost) * 100 : 0;
    const roi = profitMargin;
    const breakEvenSellPricePerUnit = totalProductionCost / quantity / (1 - marketTaxRate);

    return {
      quantity, rawPrice, prevTierPrice, refinedPrice, stationCost,
      city, resourceType, tier, premium, focus,
      rrr, rawRequired, prevTierRequired, returnedRaw, returnedPrevTier,
      effectiveRawUsed, effectivePrevTierUsed, materialCost,
      totalProductionCostBeforeFees, setupFee, totalProductionCost,
      grossSaleValue, marketTaxRate, marketTax, netSaleValue,
      netProfit, profitPerUnit, profitMargin, roi, breakEvenSellPricePerUnit
    };
  }

  function simulateReinvestment(initialQuantity, rrr, rawPrice, prevTierPrice, stationCostPerBatch, premium) {
    let totalRefined = 0;
    let totalCost = 0;
    let remainingRaw = initialQuantity * 2;
    let remainingPrevTier = initialQuantity * 1;
    let iterations = 0;
    const maxIterations = 10;
    const marketTaxRate = premium ? MARKET_TAX_PREMIUM : MARKET_TAX_NO_PREMIUM;

    while (iterations < maxIterations) {
      const canRefineFromRaw = Math.floor(remainingRaw / 2);
      const canRefineFromPrevTier = Math.floor(remainingPrevTier / 1);
      const canRefine = Math.min(canRefineFromRaw, canRefineFromPrevTier);
      if (canRefine <= 0) break;
      const rawUsed = canRefine * 2;
      const prevTierUsed = canRefine * 1;
      const rawReturned = rawUsed * rrr;
      const prevTierReturned = prevTierUsed * rrr;
      const effectiveRawConsumed = rawUsed - rawReturned;
      const effectivePrevTierConsumed = prevTierUsed - prevTierReturned;
      const batchMaterialCost = (effectiveRawConsumed * rawPrice) + (effectivePrevTierConsumed * prevTierPrice);
      const batchCostBeforeFees = batchMaterialCost + stationCostPerBatch;
      const batchSetupFee = batchCostBeforeFees * SETUP_FEE_RATE;
      const batchTotalCost = batchCostBeforeFees + batchSetupFee;
      totalRefined += canRefine;
      totalCost += batchTotalCost;
      remainingRaw = remainingRaw - rawUsed + rawReturned;
      remainingPrevTier = remainingPrevTier - prevTierUsed + prevTierReturned;
      iterations++;
    }

    const finalEffectiveCostPerUnit = totalRefined > 0 ? totalCost / totalRefined : 0;
    return {
      totalRefined,
      totalCost,
      finalEffectiveCostPerUnit,
      iterations,
      remainingRaw: Math.floor(remainingRaw),
      remainingPrevTier: Math.floor(remainingPrevTier)
    };
  }

  // -----------------------------------------
  // API ENDPOINTS FOR CALCULATION & SIMULATION
  // -----------------------------------------
  router.post('/calculate', express.json(), (req, res) => {
    try {
      const params = req.body;
      const required = ['quantity','rawPrice','prevTierPrice','refinedPrice','stationCost','city','resourceType'];
      for (const key of required) {
        if (params[key] === undefined || params[key] === null || params[key] === '') {
          return res.status(400).json({ error: `Missing parameter: ${key}` });
        }
      }
      const results = calculateProfit({
        quantity: Number(params.quantity),
        rawPrice: Number(params.rawPrice),
        prevTierPrice: Number(params.prevTierPrice),
        refinedPrice: Number(params.refinedPrice),
        stationCost: Number(params.stationCost),
        city: params.city,
        resourceType: params.resourceType,
        tier: params.tier || 0,
        premium: Boolean(params.premium),
        focus: Boolean(params.focus)
      });

      if (req.user && req.user.id) {
        const name = `T${results.tier} ${RESOURCE_NAMES[results.resourceType]?.refined || ''} - ${results.city}`;
        const stmt = db.prepare(`INSERT INTO refine_history
          (user_id, name, quantity, raw_price, prev_tier_price, refined_price, station_cost, premium, focus,
           rrr, raw_required, prev_tier_required, returned_raw, returned_prev_tier, effective_raw_used,
           effective_prev_tier_used, material_cost, total_production_cost, gross_sale_value, market_tax_rate,
           market_tax, net_sale_value, net_profit, profit_per_unit, profit_margin, roi, break_even_sell_price_per_unit)
           VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`);
        stmt.run(
          req.user.id, name, results.quantity, results.rawPrice, results.prevTierPrice, results.refinedPrice, results.stationCost,
          results.premium ? 1 : 0, results.focus ? 1 : 0,
          results.rrr, results.rawRequired, results.prevTierRequired, results.returnedRaw, results.returnedPrevTier,
          results.effectiveRawUsed, results.effectivePrevTierUsed, results.materialCost, results.totalProductionCost,
          results.grossSaleValue, results.marketTaxRate, results.marketTax, results.netSaleValue, results.netProfit,
          results.profitPerUnit, results.profitMargin, results.roi, results.breakEvenSellPricePerUnit,
          (err) => { if (err) console.warn('Failed to save history:', err.message); }
        );
      }
      res.json(results);
    } catch (err) {
      console.error('Calculate endpoint error:', err);
      res.status(500).json({ error: 'Server error' });
    }
  });

  router.post('/simulate', express.json(), (req, res) => {
    try {
      const params = req.body;
      const required = ['quantity','rawPrice','prevTierPrice','stationCost','city','resourceType'];
      for (const key of required) {
        if (params[key] === undefined || params[key] === null || params[key] === '') {
          return res.status(400).json({ error: `Missing parameter: ${key}` });
        }
      }
      const rrr = calculateRRR(params.city, params.resourceType, Boolean(params.focus));
      const sim = simulateReinvestment(
        Number(params.quantity),
        rrr,
        Number(params.rawPrice),
        Number(params.prevTierPrice),
        Number(params.stationCost),
        Boolean(params.premium)
      );
      res.json(sim);
    } catch (err) {
      console.error('Simulate endpoint error:', err);
      res.status(500).json({ error: 'Server error' });
    }
  });

  // -------------------------------------------------
  // PRESets & HISTORY endpoints (authenticated only)
  // -------------------------------------------------
  router.use(authenticateToken);

  // presets
  router.get('/presets', (req, res) => {
    db.all('SELECT * FROM refine_presets WHERE user_id = ? ORDER BY created_at DESC', [req.user.id], (err, rows) => {
      if (err) return res.status(500).json({ error: 'Failed to fetch presets' });
      res.json({ presets: rows });
    });
  });

  router.post('/presets', express.json(), (req, res) => {
    const p = req.body;
    if (!p.name) return res.status(400).json({ error: 'Preset name required' });
    db.run(`INSERT INTO refine_presets
      (user_id, name, resource_type, tier, city, quantity, raw_price, prev_tier_price, refined_price, station_cost, premium, focus)
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
      [req.user.id, p.name, p.resourceType, p.tier, p.city, p.quantity, p.rawPrice, p.prevTierPrice, p.refinedPrice, p.stationCost, p.premium?1:0, p.focus?1:0],
      function(err) {
        if (err) return res.status(500).json({ error: 'Failed to save preset' });
        res.json({ id: this.lastID });
      }
    );
  });

  router.delete('/presets/:id', (req, res) => {
    const id = req.params.id;
    db.run('DELETE FROM refine_presets WHERE id = ? AND user_id = ?', [id, req.user.id], function(err) {
      if (err) return res.status(500).json({ error: 'Failed to delete preset' });
      if (this.changes === 0) return res.status(404).json({ error: 'Preset not found' });
      res.json({ message: 'Preset deleted' });
    });
  });

  // history
  router.get('/history', (req, res) => {
    db.all('SELECT * FROM refine_history WHERE user_id = ? ORDER BY timestamp DESC LIMIT 100', [req.user.id], (err, rows) => {
      if (err) return res.status(500).json({ error: 'Failed to fetch history' });
      res.json({ history: rows });
    });
  });

  router.delete('/history', (req, res) => {
    db.run('DELETE FROM refine_history WHERE user_id = ?', [req.user.id], function(err) {
      if (err) return res.status(500).json({ error: 'Failed to clear history' });
      res.json({ message: 'History cleared' });
    });
  });

  return router;
};