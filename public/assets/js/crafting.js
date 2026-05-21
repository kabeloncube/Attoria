// Crafting Calculator - Albion Forge
// Extracted from crafting.html to fix CSP inline handler violations

const ITEM_DATA = {
  armor:    { mats: ['Planks','Cloth','Metal Bars','Leather'], qty: [8,8,0,0] },
  weapon:   { mats: ['Metal Bars','Planks','Cloth','Crystal'], qty: [12,4,0,0] },
  off_hand: { mats: ['Planks','Leather','Metal Bars'],         qty: [8,4,4] },
  gather:   { mats: ['Metal Bars','Cloth','Leather'],          qty: [12,8,4] },
  bag:      { mats: ['Cloth','Leather','Planks'],              qty: [16,8,4] },
  cape:     { mats: ['Cloth','Metal Bars'],                    qty: [10,5] },
  mount:    { mats: ['Metal Bars','Leather','Planks'],         qty: [20,16,8] },
};

const TIER_MULT    = { '4':1, '5':1.8, '6':3.2, '7':5.8, '8':10.5 };
const ENCHANT_MULT = { '0':1, '1':1.4, '2':2.1, '3':3.5 };

function getReturnRate(spec, useFocus) {
  const base = useFocus ? 0.237 : 0.15;
  return base + (spec / 100) * 0.24;
}

function fmt(n) {
  if (isNaN(n) || n === null) return '—';
  const abs = Math.abs(n);
  if (abs >= 1e6) return (n / 1e6).toFixed(2) + 'M';
  if (abs >= 1e3) return (n / 1e3).toFixed(1) + 'K';
  return Math.round(n).toLocaleString();
}

function updateItem() {
  const cat     = document.getElementById('category').value;
  const tier    = document.getElementById('tier').value;
  const enchant = document.getElementById('enchant').value;
  const data    = ITEM_DATA[cat];
  const tmul    = TIER_MULT[tier];
  const emul    = ENCHANT_MULT[enchant];

  const container = document.getElementById('materials-list');
  container.innerHTML = '';

  data.mats.forEach((mat, i) => {
    const baseQty = data.qty[i];
    if (!baseQty) return;

    const suggestedUnitPrice = Math.round(tmul * emul * 850);
    const suggestedQty       = Math.round(baseQty * tmul);
    const suggestedTotal     = suggestedUnitPrice * suggestedQty;

    const row = document.createElement('div');
    row.className = 'material-row';
    row.innerHTML = `
      <div class="material-label">
        <span class="tier-badge">T${tier}${enchant > 0 ? '.' + enchant : ''}</span>
        ${mat}
      </div>
      <div class="material-inputs">
        <div>
          <label class="mat-label">Buy Price (per unit)</label>
          <input type="number" data-mat-index="${i}" value="${suggestedUnitPrice}" min="0">
        </div>
        <div>
          <label class="mat-label" style="text-align:center;display:block">Qty</label>
          <input type="number" data-mat-qty="${i}" value="${suggestedQty}" min="1" style="text-align:center">
        </div>
      </div>
      <div class="material-subtotal">
        <span>Total cost</span>
        <span class="sub-val" data-subtotal="${i}"> ${fmt(suggestedTotal)}</span>
      </div>
    `;
    container.appendChild(row);
  });

  // Extra material row
  const extraRow = document.createElement('div');
  extraRow.className = 'material-row';
  extraRow.innerHTML = `
    <div class="material-label">
      <span class="tier-badge" style="border-color:var(--silver);color:var(--silver)">EXTRA</span>
      Additional Material
    </div>
    <div class="material-inputs">
      <div>
        <label class="mat-label">Buy Price (per unit)</label>
        <input type="number" id="extra_mat_price" value="0" min="0">
      </div>
      <div>
        <label class="mat-label" style="text-align:center;display:block">Qty</label>
        <input type="number" id="extra_qty" value="0" min="0" style="text-align:center">
      </div>
    </div>
    <div class="material-subtotal">
      <span>Total cost</span>
      <span class="sub-val" id="sub_extra">—</span>
    </div>
  `;
  container.appendChild(extraRow);

  attachMaterialListeners();
  calculate();
}

function attachMaterialListeners() {
  document.querySelectorAll('[data-mat-index]').forEach(input => {
    input.addEventListener('input', function() {
      updateSubtotal(parseInt(this.dataset.matIndex));
    });
  });
  document.querySelectorAll('[data-mat-qty]').forEach(input => {
    input.addEventListener('input', function() {
      updateSubtotal(parseInt(this.dataset.matQty));
    });
  });
  const extraPrice = document.getElementById('extra_mat_price');
  const extraQty = document.getElementById('extra_qty');
  if (extraPrice) extraPrice.addEventListener('input', updateExtraSubtotal);
  if (extraQty) extraQty.addEventListener('input', updateExtraSubtotal);
}

function updateExtraSubtotal() {
  const price = parseFloat(document.getElementById('extra_mat_price').value) || 0;
  const qty   = parseFloat(document.getElementById('extra_qty').value) || 0;
  const el    = document.getElementById('sub_extra');
  if (el) el.textContent = (price > 0 && qty > 0) ? fmt(price * qty) : '—';
  calculate();
}

function updateSubtotal(i) {
  const priceInput = document.querySelector(`[data-mat-index="${i}"]`);
  const qtyInput   = document.querySelector(`[data-mat-qty="${i}"]`);
  const subtotalEl = document.querySelector(`[data-subtotal="${i}"]`);
  
  if (!priceInput || !qtyInput || !subtotalEl) return;
  
  const price = parseFloat(priceInput.value) || 0;
  const qty   = parseFloat(qtyInput.value) || 0;
  subtotalEl.textContent = fmt(price * qty);
  calculate();
}

function calculate() {
  const sellPrice    = parseFloat(document.getElementById('sell_price').value) || 0;
  const tax          = parseFloat(document.getElementById('tax').value) / 100;
  const spec         = parseFloat(document.getElementById('spec').value);
  const useFocus     = parseInt(document.getElementById('use_focus').value);
  const batch        = parseInt(document.getElementById('batch').value) || 1;
  const transport    = parseFloat(document.getElementById('transport').value) || 0;
  const misc         = parseFloat(document.getElementById('misc').value) || 0;
  const craftFee     = parseFloat(document.getElementById('craft_fee').value) || 0;
  const stationBonus = parseFloat(document.getElementById('station').value);

  const returnRate     = getReturnRate(spec, useFocus);
  const effectiveReturn = returnRate * stationBonus;

  const cat  = document.getElementById('category').value;
  const data = ITEM_DATA[cat];
  let totalMatCostPerItem = 0;

  data.mats.forEach((mat, i) => {
    const priceInput = document.querySelector(`[data-mat-index="${i}"]`);
    const qtyInput   = document.querySelector(`[data-mat-qty="${i}"]`);
    if (!priceInput || !qtyInput) return;
    const price   = parseFloat(priceInput.value) || 0;
    const qty     = parseFloat(qtyInput.value)   || 0;
    const rawCost = price * qty;
    totalMatCostPerItem += rawCost * (1 - effectiveReturn);
  });

  // Extra material
  const extraPrice = parseFloat(document.getElementById('extra_mat_price')?.value) || 0;
  const extraQty   = parseFloat(document.getElementById('extra_qty')?.value) || 0;
  totalMatCostPerItem += (extraPrice * extraQty) * (1 - effectiveReturn);

  const revenuePerItem = sellPrice * (1 - tax);
  const totalRevenue   = revenuePerItem * batch;
  const totalMatCost   = totalMatCostPerItem * batch;
  const otherCosts     = transport + (misc * batch) + (craftFee * batch);
  const netProfit      = totalRevenue - totalMatCost - otherCosts;
  const perItem        = netProfit / batch;
  const margin         = totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0;

  document.getElementById('res-revenue').textContent   = fmt(totalRevenue);
  document.getElementById('res-matcost').textContent   = fmt(totalMatCost);
  document.getElementById('res-othercost').textContent = fmt(otherCosts);

  const profEl = document.getElementById('res-profit');
  profEl.textContent = fmt(netProfit);
  profEl.className   = 'stat-value ' + (netProfit >= 0 ? 'positive' : 'negative');

  const perEl = document.getElementById('res-peritem');
  perEl.textContent = fmt(perItem);
  perEl.className   = 'stat-value ' + (perItem >= 0 ? 'positive' : 'negative');

  const marEl = document.getElementById('res-margin');
  marEl.textContent = margin.toFixed(1) + '%';
  marEl.className   = 'stat-value ' + (margin >= 0 ? 'positive' : 'negative');

  const bar = document.getElementById('profit-bar');
  const pct = Math.min(100, Math.max(0, margin));
  bar.style.width = pct + '%';
  bar.className   = 'profit-bar-fill' + (netProfit < 0 ? ' loss' : '');

  document.getElementById('bar-label').textContent =
    netProfit >= 0
      ? `+${margin.toFixed(1)}% margin`
      : `${margin.toFixed(1)}% margin (LOSS)`;
}

// Init
document.addEventListener('DOMContentLoaded', function() {
  // Nav dropdown
  const toggle = document.getElementById('tools-toggle');
  const menu   = document.getElementById('tools-dropdown');
  if (toggle && menu) {
    menu.style.display = 'none';
    toggle.addEventListener('click', function (e) {
      e.preventDefault();
      const visible = menu.style.display === 'block';
      menu.style.display = visible ? 'none' : 'block';
      toggle.setAttribute('aria-expanded', String(!visible));
    });
    document.addEventListener('click', function (e) {
      if (!toggle.contains(e.target) && !menu.contains(e.target)) {
        menu.style.display = 'none';
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        menu.style.display = 'none';
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Form listeners (static inputs)
  const staticInputs = [
    'sell_price', 'tax', 'spec', 'use_focus', 'batch', 
    'transport', 'misc', 'craft_fee', 'station'
  ];
  staticInputs.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', calculate);
      if (el.tagName === 'SELECT') el.addEventListener('change', calculate);
    }
  });

  // Category/tier/enchant → update materials
  ['category', 'tier', 'enchant'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('change', updateItem);
  });

  // Sliders display live values
  const taxSlider = document.getElementById('tax');
  const specSlider = document.getElementById('spec');
  if (taxSlider) taxSlider.addEventListener('input', function() {
    document.getElementById('tax_val').textContent = this.value + '%';
    calculate();
  });
  if (specSlider) specSlider.addEventListener('input', function() {
    document.getElementById('spec_val').textContent = this.value;
    calculate();
  });

  // Button
  const calcBtn = document.querySelector('.btn-calculate');
  if (calcBtn) calcBtn.addEventListener('click', calculate);

  // Initialize
  updateItem();
});

