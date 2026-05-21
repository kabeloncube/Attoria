// Test script for refining calculator logic
// Replicating the calculation function from refining.html

const CITY_BONUSES = {
  'Lymhurst': 'fiber',
  'Thetford': 'ore',
  'Martlock': 'hide',
  'Fort Sterling': 'wood',
  'Bridgewatch': 'stone'
};

function calculateRRR(city, focus, resource) {
  const isBonusCity = CITY_BONUSES[city] === resource;

  let baseRRR;
  if (isBonusCity) {
    baseRRR = 0.367; // 36.7%
  } else {
    baseRRR = 0.152; // 15.2%
  }

  if (focus) {
    if (isBonusCity) {
      return 0.539; // 53.9%
    } else {
      return 0.435; // 43.5%
    }
  }

  return baseRRR;
}

function calculateProfit(quantity, rawPrice, prevTierPrice, refinedPrice, stationCost, city, premium, focus, resource) {
  // Step 1: Determine RRR
  const rrr = calculateRRR(city, focus, resource);

  // Step 2: Material requirements
  const rawRequired = 2 * quantity;
  const prevTierRequired = 1 * quantity;

  // Step 3: Apply resource return
  const returnedRaw = rawRequired * rrr;
  const returnedPrevTier = prevTierRequired * rrr;
  const effectiveRawUsed = rawRequired - returnedRaw;
  const effectivePrevTierUsed = prevTierRequired - returnedPrevTier;

  // Step 4: Material cost
  const materialCost = (effectiveRawUsed * rawPrice) + (effectivePrevTierUsed * prevTierPrice);

  // Step 5: Add station cost
  const totalProductionCostBeforeFees = materialCost + stationCost;

  // Step 6: Apply setup fee (2.5%)
  const setupFee = totalProductionCostBeforeFees * 0.025;
  const totalProductionCost = totalProductionCostBeforeFees + setupFee;

  // Step 7: Calculate sale revenue
  const grossSaleValue = quantity * refinedPrice;
  const marketTaxRate = premium ? 0.04 : 0.08;
  const marketTax = grossSaleValue * marketTaxRate;
  const netSaleValue = grossSaleValue - marketTax;

  // Step 8: Final profit
  const netProfit = netSaleValue - totalProductionCost;
  const profitPerUnit = netProfit / quantity;
  const profitMargin = (netProfit / totalProductionCost) * 100;
  const roi = profitMargin;

  // Step 9: Break-even price
  const breakEvenPrice = totalProductionCost / quantity / (1 - marketTaxRate);

  return {
    quantity,
    rrr,
    rawRequired,
    prevTierRequired,
    returnedRaw,
    returnedPrevTier,
    effectiveRawUsed,
    effectivePrevTierUsed,
    materialCost,
    stationCost,
    totalProductionCostBeforeFees,
    setupFee,
    totalProductionCost,
    grossSaleValue,
    marketTax,
    netSaleValue,
    netProfit,
    profitPerUnit,
    profitMargin,
    roi,
    breakEvenPrice
  };
}

// Test cases
console.log('=== Refining Calculator Test ===\n');

// Test Case 1: Bonus city with focus and premium
console.log('Test Case 1: T4 Ore in Thetford (bonus city), Focus ON, Premium ON');
const result1 = calculateProfit(1, 1000, 500, 2000, 100, 'Thetford', true, true, 'ore');
console.log(`RRR: ${(result1.rrr * 100).toFixed(1)}%`);
console.log(`Net Profit: ${result1.netProfit.toFixed(2)} silver`);
console.log(`Break-even Price: ${result1.breakEvenPrice.toFixed(2)} silver\n`);

// Test Case 2: Non-bonus city without focus or premium
console.log('Test Case 2: T4 Ore in Caerleon (non-bonus city), Focus OFF, Premium OFF');
const result2 = calculateProfit(1, 1000, 500, 2000, 100, 'Caerleon', false, false, 'ore');
console.log(`RRR: ${(result2.rrr * 100).toFixed(1)}%`);
console.log(`Net Profit: ${result2.netProfit.toFixed(2)} silver`);
console.log(`Break-even Price: ${result2.breakEvenPrice.toFixed(2)} silver\n`);

// Test Case 3: Batch scaling
console.log('Test Case 3: Batch scaling (1000 units)');
const result3 = calculateProfit(1000, 1000, 500, 2000, 100, 'Thetford', true, true, 'ore');
console.log(`Net Profit per 1000: ${result3.netProfit.toFixed(2)} silver`);
console.log(`Profit per unit: ${result3.profitPerUnit.toFixed(2)} silver\n`);

console.log('=== All tests completed ===');
