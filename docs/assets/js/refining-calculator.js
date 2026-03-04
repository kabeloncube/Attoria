/* ========================================
   ALBION ONLINE REFINING CALCULATOR
   Complete implementation per specification
   ======================================== */

// ========================================
// API & AUTHENTICATION HELPERS
// ========================================

/**
 * Get JWT token from localStorage
 */
function getAuthToken() {
  const token = localStorage.getItem('jwt_token');
  return token ? `Bearer ${token}` : null;
}

/**
 * Check if user is authenticated
 */
function isAuthenticated() {
  return !!localStorage.getItem('jwt_token');
}

/**
 * Make authenticated API request
 */
async function apiRequest(endpoint, method = 'GET', body = null) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json'
    }
  };
  
  const token = getAuthToken();
  if (token) {
    options.headers['Authorization'] = token;
  }
  
  if (body) {
    options.body = JSON.stringify(body);
  }
  
  try {
    const response = await fetch(endpoint, options);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `API Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`API Request Error (${endpoint}):`, error);
    throw error;
  }
}

// ========================================
// CONSTANTS & CONFIGURATION
// ========================================

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

// Fixed game values
const MARKET_TAX_NO_PREMIUM = 0.08;  // 8%
const MARKET_TAX_PREMIUM = 0.04;     // 4%
const SETUP_FEE_RATE = 0.025;        // 2.5%

// Resource Return Rates
const RRR_BONUS_CITY = 0.367;           // 36.7%
const RRR_NON_BONUS_CITY = 0.152;       // 15.2%
const RRR_PERSONAL_ISLAND = 0.0;        // 0%
const RRR_BONUS_CITY_FOCUS = 0.539;     // 53.9%
const RRR_NON_BONUS_CITY_FOCUS = 0.435; // 43.5%
const RRR_PERSONAL_ISLAND_FOCUS = 0.435; // 43.5%

// ========================================
// API & AUTHENTICATION HELPERS
// ========================================

/**
 * Get JWT token from localStorage
 */
function getAuthToken() {
  const token = localStorage.getItem('jwt_token');
  return token ? `Bearer ${token}` : null;
}

/**
 * Check if user is authenticated
 */
function isAuthenticated() {
  return !!localStorage.getItem('jwt_token');
}

/**
 * Make authenticated API request
 */
async function apiRequest(endpoint, method = 'GET', body = null) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json'
    }
  };
  
  const token = getAuthToken();
  if (token) {
    options.headers['Authorization'] = token;
  }
  
  if (body) {
    options.body = JSON.stringify(body);
  }
  
  try {
    const response = await fetch(endpoint, options);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `API Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`API Request Error (${endpoint}):`, error);
    throw error;
  }
}

// ========================================
// CORE CALCULATION LOGIC
// ========================================

/**
 * Step 1: Determine Resource Return Rate (RRR)
 */
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

/**
 * Main calculation function - uses backend API if authenticated, falls back to local calculation
 */
async function calculateProfit() {
  // Get inputs
  const quantity = parseInt(document.getElementById('quantity').value) || 0;
  const rawPrice = parseFloat(document.getElementById('raw-price').value) || 0;
  const prevTierPrice = parseFloat(document.getElementById('prev-tier-price').value) || 0;
  const refinedPrice = parseFloat(document.getElementById('refined-price').value) || 0;
  const stationCost = parseFloat(document.getElementById('station-cost').value) || 0;
  const city = document.getElementById('city').value;
  const resourceType = document.getElementById('resource-type').value;
  const tier = document.getElementById('tier').value;
  const premium = document.getElementById('premium').checked;
  const focus = document.getElementById('focus').checked;

  // Validation
  if (quantity <= 0) {
    alert('Please enter a valid quantity');
    return null;
  }

  // If authenticated, use backend API
  if (isAuthenticated()) {
    try {
      const result = await apiRequest('/api/refine/calculate', 'POST', {
        quantity, rawPrice, prevTierPrice, refinedPrice, stationCost,
        city, resourceType, tier, premium, focus
      });
      return result;
    } catch (error) {
      console.warn('Backend calculation failed, falling back to local:', error);
      // Fall through to local calculation
    }
  }

  // Local calculation fallback
  // Step 1: Determine Resource Return Rate (RRR)
  const rrr = calculateRRR(city, resourceType, focus);

  // Step 2: Determine Material Requirements
  // Rule: 2 Raw Materials + 1 Previous Tier Refined Material
  const rawRequired = 2 * quantity;
  const prevTierRequired = 1 * quantity;

  // Step 3: Apply Resource Return
  const returnedRaw = rawRequired * rrr;
  const returnedPrevTier = prevTierRequired * rrr;
  const effectiveRawUsed = rawRequired - returnedRaw;
  const effectivePrevTierUsed = prevTierRequired - returnedPrevTier;

  // Step 4: Calculate Material Cost
  const materialCost = (effectiveRawUsed * rawPrice) + (effectivePrevTierUsed * prevTierPrice);

  // Step 5: Add Station Cost
  const totalProductionCostBeforeFees = materialCost + stationCost;

  // Step 6: Apply Setup Fee (2.5%)
  const setupFee = totalProductionCostBeforeFees * SETUP_FEE_RATE;
  const totalProductionCost = totalProductionCostBeforeFees + setupFee;

  // Step 7: Calculate Sale Revenue
  const grossSaleValue = quantity * refinedPrice;
  const marketTaxRate = premium ? MARKET_TAX_PREMIUM : MARKET_TAX_NO_PREMIUM;
  const marketTax = grossSaleValue * marketTaxRate;
  const netSaleValue = grossSaleValue - marketTax;

  // Step 8: Final Profit
  const netProfit = netSaleValue - totalProductionCost;
  const profitPerUnit = netProfit / quantity;
  const profitMargin = totalProductionCost > 0 ? (netProfit / totalProductionCost) * 100 : 0;
  const roi = profitMargin; // ROI % same as profit margin

  // Step 9: Break-Even Price Formula
  const breakEvenSellPricePerUnit = totalProductionCost / quantity / (1 - marketTaxRate);

  return {
    // Inputs
    quantity,
    rawPrice,
    prevTierPrice,
    refinedPrice,
    stationCost,
    city,
    resourceType,
    tier,
    premium,
    focus,
    
    // Calculations
    rrr,
    rawRequired,
    prevTierRequired,
    returnedRaw,
    returnedPrevTier,
    effectiveRawUsed,
    effectivePrevTierUsed,
    materialCost,
    totalProductionCostBeforeFees,
    setupFee,
    totalProductionCost,
    grossSaleValue,
    marketTaxRate,
    marketTax,
    netSaleValue,
    netProfit,
    profitPerUnit,
    profitMargin,
    roi,
    breakEvenSellPricePerUnit
  };
}

/**
 * Step 10: Reinvestment Simulation
 */
function simulateReinvestment(initialQuantity, rrr, rawPrice, prevTierPrice, stationCostPerBatch, premium) {
  let totalRefined = 0;
  let totalCost = 0;
  let remainingRaw = initialQuantity * 2; // Initial raw materials
  let remainingPrevTier = initialQuantity * 1; // Initial previous tier materials
  let iterations = 0;
  const maxIterations = 10; // Safety limit

  const marketTaxRate = premium ? MARKET_TAX_PREMIUM : MARKET_TAX_NO_PREMIUM;

  while (iterations < maxIterations) {
    // Calculate how many we can refine with current materials
    const canRefineFromRaw = Math.floor(remainingRaw / 2);
    const canRefineFromPrevTier = Math.floor(remainingPrevTier / 1);
    const canRefine = Math.min(canRefineFromRaw, canRefineFromPrevTier);

    if (canRefine <= 0) break;

    // Materials used for this batch
    const rawUsed = canRefine * 2;
    const prevTierUsed = canRefine * 1;

    // Materials returned
    const rawReturned = rawUsed * rrr;
    const prevTierReturned = prevTierUsed * rrr;

    // Effective materials consumed
    const effectiveRawConsumed = rawUsed - rawReturned;
    const effectivePrevTierConsumed = prevTierUsed - prevTierReturned;

    // Cost for this batch
    const batchMaterialCost = (effectiveRawConsumed * rawPrice) + (effectivePrevTierConsumed * prevTierPrice);
    const batchCostBeforeFees = batchMaterialCost + stationCostPerBatch;
    const batchSetupFee = batchCostBeforeFees * SETUP_FEE_RATE;
    const batchTotalCost = batchCostBeforeFees + batchSetupFee;

    // Update totals
    totalRefined += canRefine;
    totalCost += batchTotalCost;

    // Update remaining materials
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

// ========================================
// UI UPDATES
// ========================================

/**
 * Format number with commas
 */
function formatNumber(num) {
  return Math.floor(num).toLocaleString('en-US');
}

/**
 * Format currency
 */
function formatCurrency(num) {
  const sign = num >= 0 ? '+' : '';
  return sign + formatNumber(num) + ' silver';
}

/**
 * Display calculation results
 */
function displayResults(results) {
  // Show results container
  const container = document.getElementById('results-container');
  container.classList.add('show');

  // Profit highlight
  const profitHighlight = document.getElementById('profit-highlight');
  const profitValue = document.getElementById('profit-value');
  
  if (results.netProfit >= 0) {
    profitHighlight.classList.remove('negative');
    profitHighlight.classList.add('positive');
  } else {
    profitHighlight.classList.remove('positive');
    profitHighlight.classList.add('negative');
  }
  
  profitValue.textContent = formatCurrency(results.netProfit);

  // Batch scaling
  document.getElementById('profit-per-1').textContent = formatCurrency(results.profitPerUnit);
  document.getElementById('profit-per-1000').textContent = formatCurrency(results.profitPerUnit * 1000);
  document.getElementById('profit-per-10000').textContent = formatCurrency(results.profitPerUnit * 10000);

  // Materials breakdown
  const resourceName = RESOURCE_NAMES[results.resourceType];
  const materialsBreakdown = document.getElementById('materials-breakdown');
  materialsBreakdown.innerHTML = `
    <tr>
      <td>Raw Materials Required (${resourceName.raw}):</td>
      <td>${formatNumber(results.rawRequired)}</td>
    </tr>
    <tr>
      <td>Previous Tier Required (T${parseInt(results.tier) - 1} ${resourceName.refined}):</td>
      <td>${formatNumber(results.prevTierRequired)}</td>
    </tr>
    <tr>
      <td>Resource Return Rate:</td>
      <td>${(results.rrr * 100).toFixed(1)}%</td>
    </tr>
    <tr>
      <td>Raw Materials Returned:</td>
      <td>${formatNumber(results.returnedRaw)}</td>
    </tr>
    <tr>
      <td>Previous Tier Returned:</td>
      <td>${formatNumber(results.returnedPrevTier)}</td>
    </tr>
    <tr class="highlight">
      <td>Effective Raw Used:</td>
      <td>${formatNumber(results.effectiveRawUsed)}</td>
    </tr>
    <tr class="highlight">
      <td>Effective Previous Tier Used:</td>
      <td>${formatNumber(results.effectivePrevTierUsed)}</td>
    </tr>
  `;

  // Costs breakdown
  const costsBreakdown = document.getElementById('costs-breakdown');
  costsBreakdown.innerHTML = `
    <tr>
      <td>Material Cost:</td>
      <td>${formatNumber(results.materialCost)} silver</td>
    </tr>
    <tr>
      <td>Station Silver Cost:</td>
      <td>${formatNumber(results.stationCost)} silver</td>
    </tr>
    <tr>
      <td>Setup Fee (2.5%):</td>
      <td>${formatNumber(results.setupFee)} silver</td>
    </tr>
    <tr class="highlight">
      <td><strong>Total Production Cost:</strong></td>
      <td><strong>${formatNumber(results.totalProductionCost)} silver</strong></td>
    </tr>
  `;

  // Revenue breakdown
  const revenueBreakdown = document.getElementById('revenue-breakdown');
  revenueBreakdown.innerHTML = `
    <tr>
      <td>Gross Sale Value:</td>
      <td>${formatNumber(results.grossSaleValue)} silver</td>
    </tr>
    <tr>
      <td>Market Tax (${(results.marketTaxRate * 100).toFixed(0)}%):</td>
      <td class="value-negative">-${formatNumber(results.marketTax)} silver</td>
    </tr>
    <tr>
      <td>Net Sale Value:</td>
      <td>${formatNumber(results.netSaleValue)} silver</td>
    </tr>
    <tr class="highlight">
      <td><strong>Net Profit:</strong></td>
      <td class="${results.netProfit >= 0 ? 'value-positive' : 'value-negative'}">
        <strong>${formatCurrency(results.netProfit)}</strong>
      </td>
    </tr>
    <tr>
      <td>Profit Per Unit:</td>
      <td class="${results.profitPerUnit >= 0 ? 'value-positive' : 'value-negative'}">
        ${formatCurrency(results.profitPerUnit)}
      </td>
    </tr>
    <tr>
      <td>Profit Margin:</td>
      <td class="${results.profitMargin >= 0 ? 'value-positive' : 'value-negative'}">
        ${results.profitMargin.toFixed(2)}%
      </td>
    </tr>
    <tr>
      <td>ROI:</td>
      <td class="${results.roi >= 0 ? 'value-positive' : 'value-negative'}">
        ${results.roi.toFixed(2)}%
      </td>
    </tr>
  `;

  // Break-even breakdown
  const breakevenBreakdown = document.getElementById('breakeven-breakdown');
  const isProfitable = results.refinedPrice >= results.breakEvenSellPricePerUnit;
  breakevenBreakdown.innerHTML = `
    <tr>
      <td>Break-Even Sell Price (per unit):</td>
      <td>${formatNumber(results.breakEvenSellPricePerUnit)} silver</td>
    </tr>
    <tr>
      <td>Current Sell Price (per unit):</td>
      <td>${formatNumber(results.refinedPrice)} silver</td>
    </tr>
    <tr class="highlight">
      <td><strong>Status:</strong></td>
      <td class="${isProfitable ? 'value-positive' : 'value-negative'}">
        <strong>${isProfitable ? '✓ Profitable' : '✗ Loss-Making'}</strong>
      </td>
    </tr>
  `;

  // Scroll to results
  container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ========================================
// PRESETS MANAGEMENT
// ========================================

async function savePreset() {
  const name = document.getElementById('preset-name').value.trim();
  if (!name) {
    alert('Please enter a preset name');
    return;
  }

  const preset = {
    name,
    resourceType: document.getElementById('resource-type').value,
    tier: document.getElementById('tier').value,
    city: document.getElementById('city').value,
    quantity: document.getElementById('quantity').value,
    rawPrice: document.getElementById('raw-price').value,
    prevTierPrice: document.getElementById('prev-tier-price').value,
    refinedPrice: document.getElementById('refined-price').value,
    stationCost: document.getElementById('station-cost').value,
    premium: document.getElementById('premium').checked,
    focus: document.getElementById('focus').checked
  };

  if (isAuthenticated()) {
    try {
      await apiRequest('/api/refine/presets', 'POST', preset);
      document.getElementById('preset-name').value = '';
      loadPresets();
      return;
    } catch (error) {
      console.warn('Failed to save preset to backend:', error);
    }
  }

  // Fallback to localStorage
  let presets = JSON.parse(localStorage.getItem('refining-presets') || '[]');
  presets.push(preset);
  localStorage.setItem('refining-presets', JSON.stringify(presets));
  document.getElementById('preset-name').value = '';
  loadPresets();
}

async function loadPresets() {
  let presets = [];
  const grid = document.getElementById('preset-grid');

  if (isAuthenticated()) {
    try {
      const data = await apiRequest('/api/refine/presets', 'GET');
      presets = data.presets || [];
    } catch (error) {
      console.warn('Failed to load presets from backend:', error);
      presets = JSON.parse(localStorage.getItem('refining-presets') || '[]');
    }
  } else {
    presets = JSON.parse(localStorage.getItem('refining-presets') || '[]');
  }

  if (presets.length === 0) {
    grid.innerHTML = '<p style="color: var(--color-text-secondary); grid-column: 1 / -1;">No saved presets yet. Save your current setup above.</p>';
    return;
  }

  grid.innerHTML = presets.map((preset, index) => {
    const resourceName = RESOURCE_NAMES[preset.resourceType];
    return `
      <div class="preset-card" onclick="applyPreset(${index})">
        <button class="preset-delete" onclick="event.stopPropagation(); deletePreset(${index})">×</button>
        <div class="preset-name">${preset.name}</div>
        <div class="preset-details">
          T${preset.tier} ${resourceName.refined}<br>
          ${preset.city}
        </div>
      </div>
    `;
  }).join('');
}

async function applyPreset(index) {
  let preset;
  if (isAuthenticated()) {
    try {
      const data = await apiRequest('/api/refine/presets', 'GET');
      const presets = data.presets || [];
      preset = presets[index];
    } catch (error) {
      const localPresets = JSON.parse(localStorage.getItem('refining-presets') || '[]');
      preset = localPresets[index];
    }
  } else {
    const localPresets = JSON.parse(localStorage.getItem('refining-presets') || '[]');
    preset = localPresets[index];
  }

  if (!preset) return;

  document.getElementById('resource-type').value = preset.resourceType;
  document.getElementById('tier').value = preset.tier;
  document.getElementById('city').value = preset.city;
  document.getElementById('quantity').value = preset.quantity;
  document.getElementById('raw-price').value = preset.rawPrice;
  document.getElementById('prev-tier-price').value = preset.prevTierPrice;
  document.getElementById('refined-price').value = preset.refinedPrice;
  document.getElementById('station-cost').value = preset.stationCost;
  document.getElementById('premium').checked = preset.premium;
  document.getElementById('focus').checked = preset.focus;

  alert(`Preset "${preset.name}" applied!`);
}

async function deletePreset(index) {
  if (!confirm('Delete this preset?')) return;

  if (isAuthenticated()) {
    try {
      const data = await apiRequest('/api/refine/presets', 'GET');
      const presets = data.presets || [];
      const preset = presets[index];
      if (preset && preset.id) {
        await apiRequest(`/api/refine/presets/${preset.id}`, 'DELETE');
      }
      loadPresets();
      return;
    } catch (error) {
      console.warn('Failed to delete preset from backend:', error);
    }
  }

  // Fallback to localStorage
  let presets = JSON.parse(localStorage.getItem('refining-presets') || '[]');
  presets.splice(index, 1);
  localStorage.setItem('refining-presets', JSON.stringify(presets));
  loadPresets();
}

// ========================================
// HISTORY MANAGEMENT
// ========================================

async function saveToHistory(results) {
  // Only save if authenticated (backend handles storage)
  if (isAuthenticated()) {
    try {
      await apiRequest('/api/refine/calculate', 'POST', {
        quantity: results.quantity,
        rawPrice: results.rawPrice,
        prevTierPrice: results.prevTierPrice,
        refinedPrice: results.refinedPrice,
        stationCost: results.stationCost,
        city: results.city,
        resourceType: results.resourceType,
        tier: results.tier,
        premium: results.premium,
        focus: results.focus
      });
      loadHistory();
      return;
    } catch (error) {
      console.warn('Failed to save history to backend:', error);
    }
  }

  // Fallback to localStorage for non-authenticated users
  const resourceName = RESOURCE_NAMES[results.resourceType];
  const historyItem = {
    timestamp: new Date().toISOString(),
    name: `T${results.tier} ${resourceName.refined} - ${results.city}`,
    ...results
  };

  let history = JSON.parse(localStorage.getItem('refining-history') || '[]');
  history.unshift(historyItem);
  history = history.slice(0, 50);
  localStorage.setItem('refining-history', JSON.stringify(history));
  loadHistory();
}

async function loadHistory() {
  let history = [];
  const list = document.getElementById('history-list');

  if (isAuthenticated()) {
    try {
      const data = await apiRequest('/api/refine/history', 'GET');
      history = data.history || [];
    } catch (error) {
      console.warn('Failed to load history from backend:', error);
      history = JSON.parse(localStorage.getItem('refining-history') || '[]');
    }
  } else {
    history = JSON.parse(localStorage.getItem('refining-history') || '[]');
  }

  if (history.length === 0) {
    list.innerHTML = '<p style="color: var(--color-text-secondary);">No calculation history yet.</p>';
    return;
  }

  list.innerHTML = history.map(item => {
    const date = new Date(item.timestamp);
    const resourceName = RESOURCE_NAMES[item.resourceType];
    return `
      <div class="history-item">
        <div class="history-header">
          <div>
            <div style="font-weight: 600; color: var(--color-text-primary); margin-bottom: var(--spacing-1);">
              ${item.name}
            </div>
            <div class="history-timestamp">${date.toLocaleString()}</div>
          </div>
          <div class="history-profit ${item.netProfit >= 0 ? 'value-positive' : 'value-negative'}">
            ${formatCurrency(item.netProfit)}
          </div>
        </div>
        <div class="history-details">
          Quantity: ${formatNumber(item.quantity)} | 
          RRR: ${(item.rrr * 100).toFixed(1)}% | 
          Margin: ${item.profitMargin.toFixed(2)}% |
          ${item.premium ? '✓ Premium' : '✗ No Premium'} |
          ${item.focus ? '✓ Focus' : '✗ No Focus'}
        </div>
      </div>
    `;
  }).join('');
}

async function clearHistory() {
  if (!confirm('Clear all calculation history?')) return;

  if (isAuthenticated()) {
    try {
      await apiRequest('/api/refine/history', 'DELETE');
      loadHistory();
      return;
    } catch (error) {
      console.warn('Failed to clear history from backend:', error);
    }
  }

  // Fallback to localStorage
  localStorage.removeItem('refining-history');
  loadHistory();
}

// ========================================
// CITY COMPARISON
// ========================================

async function compareCities() {
  const city1 = document.getElementById('comp-city1').value;
  const city2 = document.getElementById('comp-city2').value;
  
  // Save original city
  const originalCity = document.getElementById('city').value;
  
  // Calculate for city 1
  document.getElementById('city').value = city1;
  const results1 = await calculateProfit();
  
  // Calculate for city 2
  document.getElementById('city').value = city2;
  const results2 = await calculateProfit();
  
  // Restore original city
  document.getElementById('city').value = originalCity;
  
  if (!results1 || !results2) {
    alert('Please fill in all required fields before comparing');
    return;
  }
  
  // Display comparison
  const resultsContainer = document.getElementById('comparison-results');
  resultsContainer.innerHTML = `
    <div class="comparison-card">
      <div class="comparison-card-title">${city1}</div>
      <div class="comparison-stat">
        <span class="comparison-stat-label">Resource Return Rate:</span>
        <span class="comparison-stat-value">${(results1.rrr * 100).toFixed(1)}%</span>
      </div>
      <div class="comparison-stat">
        <span class="comparison-stat-label">Total Production Cost:</span>
        <span class="comparison-stat-value">${formatNumber(results1.totalProductionCost)}</span>
      </div>
      <div class="comparison-stat">
        <span class="comparison-stat-label">Net Sale Value:</span>
        <span class="comparison-stat-value">${formatNumber(results1.netSaleValue)}</span>
      </div>
      <div class="comparison-stat">
        <span class="comparison-stat-label">Net Profit:</span>
        <span class="comparison-stat-value ${results1.netProfit >= 0 ? 'value-positive' : 'value-negative'}">
          ${formatCurrency(results1.netProfit)}
        </span>
      </div>
      <div class="comparison-stat">
        <span class="comparison-stat-label">Profit Margin:</span>
        <span class="comparison-stat-value ${results1.profitMargin >= 0 ? 'value-positive' : 'value-negative'}">
          ${results1.profitMargin.toFixed(2)}%
        </span>
      </div>
      <div class="comparison-stat">
        <span class="comparison-stat-label">ROI:</span>
        <span class="comparison-stat-value ${results1.roi >= 0 ? 'value-positive' : 'value-negative'}">
          ${results1.roi.toFixed(2)}%
        </span>
      </div>
    </div>
    
    <div class="comparison-card">
      <div class="comparison-card-title">${city2}</div>
      <div class="comparison-stat">
        <span class="comparison-stat-label">Resource Return Rate:</span>
        <span class="comparison-stat-value">${(results2.rrr * 100).toFixed(1)}%</span>
      </div>
      <div class="comparison-stat">
        <span class="comparison-stat-label">Total Production Cost:</span>
        <span class="comparison-stat-value">${formatNumber(results2.totalProductionCost)}</span>
      </div>
      <div class="comparison-stat">
        <span class="comparison-stat-label">Net Sale Value:</span>
        <span class="comparison-stat-value">${formatNumber(results2.netSaleValue)}</span>
      </div>
      <div class="comparison-stat">
        <span class="comparison-stat-label">Net Profit:</span>
        <span class="comparison-stat-value ${results2.netProfit >= 0 ? 'value-positive' : 'value-negative'}">
          ${formatCurrency(results2.netProfit)}
        </span>
      </div>
      <div class="comparison-stat">
        <span class="comparison-stat-label">Profit Margin:</span>
        <span class="comparison-stat-value ${results2.profitMargin >= 0 ? 'value-positive' : 'value-negative'}">
          ${results2.profitMargin.toFixed(2)}%
        </span>
      </div>
      <div class="comparison-stat">
        <span class="comparison-stat-label">ROI:</span>
        <span class="comparison-stat-value ${results2.roi >= 0 ? 'value-positive' : 'value-negative'}">
          ${results2.roi.toFixed(2)}%
        </span>
      </div>
    </div>
  `;
}

// ========================================
// REINVESTMENT SIMULATION
// ========================================

async function runReinvestmentSimulation() {
  const results = await calculateProfit();
  if (!results) {
    alert('Please fill in all required fields and calculate profit first');
    return;
  }

  let simulation;
  if (isAuthenticated()) {
    try {
      simulation = await apiRequest('/api/refine/simulate', 'POST', {
        quantity: results.quantity,
        rawPrice: results.rawPrice,
        prevTierPrice: results.prevTierPrice,
        stationCost: results.stationCost,
        city: results.city,
        resourceType: results.resourceType,
        premium: results.premium,
        focus: results.focus
      });
    } catch (error) {
      console.warn('Backend simulation failed, using local calculation:', error);
      simulation = simulateReinvestment(
        results.quantity,
        results.rrr,
        results.rawPrice,
        results.prevTierPrice,
        results.stationCost,
        results.premium
      );
    }
  } else {
    simulation = simulateReinvestment(
      results.quantity,
      results.rrr,
      results.rawPrice,
      results.prevTierPrice,
      results.stationCost,
      results.premium
    );
  }

  const resultsContainer = document.getElementById('reinvestment-results');
  const savings = results.totalProductionCost - simulation.totalCost;
  const savingsPerUnit = results.totalProductionCost / results.quantity - simulation.finalEffectiveCostPerUnit;
  
  resultsContainer.innerHTML = `
    <div class="reinvestment-result">
      <h3 style="margin-bottom: var(--spacing-4); color: var(--color-text-primary);">
        Reinvestment Simulation Results
      </h3>
      <div class="reinvestment-stat">
        <span style="color: var(--color-text-secondary);">Starting Materials:</span>
        <span style="color: var(--color-text-primary); font-weight: 600;">
          ${formatNumber(results.quantity)} units
        </span>
      </div>
      <div class="reinvestment-stat">
        <span style="color: var(--color-text-secondary);">Resource Return Rate:</span>
        <span style="color: var(--color-text-primary); font-weight: 600;">
          ${(results.rrr * 100).toFixed(1)}%
        </span>
      </div>
      <div class="reinvestment-stat">
        <span style="color: var(--color-text-secondary);">Simulation Iterations:</span>
        <span style="color: var(--color-text-primary); font-weight: 600;">
          ${simulation.iterations}
        </span>
      </div>
      <div class="reinvestment-stat">
        <span style="color: var(--color-text-secondary);">Total Refined Produced:</span>
        <span style="color: var(--color-success); font-weight: 600;">
          ${formatNumber(simulation.totalRefined)} units
        </span>
      </div>
      <div class="reinvestment-stat">
        <span style="color: var(--color-text-secondary);">Total Cost (All Batches):</span>
        <span style="color: var(--color-text-primary); font-weight: 600;">
          ${formatNumber(simulation.totalCost)} silver
        </span>
      </div>
      <div class="reinvestment-stat">
        <span style="color: var(--color-text-secondary);">Original Cost Per Unit:</span>
        <span style="color: var(--color-text-primary); font-weight: 600;">
          ${formatNumber(results.totalProductionCost / results.quantity)} silver
        </span>
      </div>
      <div class="reinvestment-stat" style="background: var(--color-success-bg); padding: var(--spacing-3); border-radius: var(--radius-md); border: 1px solid var(--color-success);">
        <span style="color: var(--color-text-secondary); font-weight: 600;">Final Effective Cost Per Unit:</span>
        <span style="color: var(--color-success); font-weight: 700; font-size: var(--font-size-lg);">
          ${formatNumber(simulation.finalEffectiveCostPerUnit)} silver
        </span>
      </div>
      <div class="reinvestment-stat" style="background: var(--color-success-bg); padding: var(--spacing-3); border-radius: var(--radius-md); border: 1px solid var(--color-success);">
        <span style="color: var(--color-text-secondary); font-weight: 600;">Total Savings:</span>
        <span style="color: var(--color-success); font-weight: 700; font-size: var(--font-size-lg);">
          ${formatNumber(savings)} silver (${formatNumber(savingsPerUnit)} per unit)
        </span>
      </div>
      <div class="reinvestment-stat">
        <span style="color: var(--color-text-secondary);">Remaining Raw Materials:</span>
        <span style="color: var(--color-text-primary); font-weight: 600;">
          ${simulation.remainingRaw}
        </span>
      </div>
      <div class="reinvestment-stat">
        <span style="color: var(--color-text-secondary);">Remaining Previous Tier:</span>
        <span style="color: var(--color-text-primary); font-weight: 600;">
          ${simulation.remainingPrevTier}
        </span>
      </div>
    </div>
  `;
}

// ========================================
// EVENT LISTENERS
// ========================================

document.addEventListener('DOMContentLoaded', function() {
  // City bonus collapsible
  const cityBonusToggle = document.getElementById('city-bonus-toggle');
  const cityBonusContent = document.getElementById('city-bonus-content');
  
  cityBonusToggle.addEventListener('click', function() {
    cityBonusToggle.classList.toggle('active');
    cityBonusContent.classList.toggle('show');
  });

  // Calculate button
  document.getElementById('calculate-btn').addEventListener('click', async function() {
    const results = await calculateProfit();
    if (results) {
      displayResults(results);
      await saveToHistory(results);
    }
  });

  // Feature tabs
  const featureTabs = document.querySelectorAll('.feature-tab');
  const featureContents = document.querySelectorAll('.feature-content');
  
  featureTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const targetTab = this.getAttribute('data-tab');
      
      featureTabs.forEach(t => t.classList.remove('active'));
      featureContents.forEach(c => c.classList.remove('active'));
      
      this.classList.add('active');
      document.getElementById(`${targetTab}-content`).classList.add('active');
    });
  });

  // Presets
  document.getElementById('save-preset-btn').addEventListener('click', savePreset);
  
  // History
  document.getElementById('clear-history-btn').addEventListener('click', clearHistory);
  
  // Comparison
  document.getElementById('compare-cities-btn').addEventListener('click', compareCities);
  
  // Reinvestment
  document.getElementById('simulate-reinvestment-btn').addEventListener('click', runReinvestmentSimulation);

  // Load saved data on page load
  loadPresets();
  loadHistory();
});

// Make functions globally available
window.applyPreset = applyPreset;
window.deletePreset = deletePreset;
