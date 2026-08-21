const stores = [
  {name:'Amazon',emoji:'📦'}, {name:'Walmart',emoji:'🛒'}, {name:'Target',emoji:'🎯'},
  {name:'Best Buy',emoji:'🔌'}, {name:'Apple',emoji:'🍎'}, {name:'Costco',emoji:'🏪'},
  {name:'Nike',emoji:'👟'}, {name:'Zara',emoji:'👗'}, {name:'Sephora',emoji:'💄'},
  {name:'Home Depot',emoji:'🔨'}
];

const state = { step: 1, store: '', category: '', deliveryDate: '', condition: '' };
const storeGrid = document.querySelector('#storeGrid');
const supportedGrid = document.querySelector('#supportedGrid');
const nextBtn = document.querySelector('#nextBtn');
const backBtn = document.querySelector('#backBtn');
const form = document.querySelector('#refundForm');

for (const store of stores) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'store-option';
  button.dataset.store = store.name;
  button.innerHTML = `<span class="emoji" aria-hidden="true">${store.emoji}</span><span>${store.name}</span>`;
  button.addEventListener('click', () => {
    state.store = store.name;
    document.querySelectorAll('.store-option').forEach(el => el.classList.toggle('selected', el === button));
    document.querySelector('#storeError').hidden = true;
  });
  storeGrid.appendChild(button);

  const card = document.createElement('div');
  card.className = 'supported-card';
  card.innerHTML = `<span class="emoji" aria-hidden="true">${store.emoji}</span>${store.name}`;
  supportedGrid.appendChild(card);
}

function readStepValues() {
  state.category = document.querySelector('#category').value;
  state.deliveryDate = document.querySelector('#deliveryDate').value;
  state.condition = document.querySelector('input[name="condition"]:checked')?.value || '';
}

function validCurrentStep() {
  readStepValues();
  if (state.step === 1 && !state.store) {
    document.querySelector('#storeError').hidden = false;
    return false;
  }
  if (state.step === 2 && !state.category) return focusInvalid('#category');
  if (state.step === 3 && !state.deliveryDate) return focusInvalid('#deliveryDate');
  if (state.step === 4 && !state.condition) {
    const first = document.querySelector('input[name="condition"]');
    first.focus();
    return false;
  }
  return true;
}

function focusInvalid(selector) {
  const el = document.querySelector(selector);
  el.focus();
  return false;
}

function render() {
  document.querySelectorAll('.form-step').forEach(el => el.classList.toggle('active', Number(el.dataset.step) === state.step));
  document.querySelectorAll('.step-dot').forEach((el, idx) => {
    const n = idx + 1;
    el.classList.toggle('current', n === state.step);
    el.classList.toggle('done', n < state.step);
  });
  backBtn.hidden = state.step === 1;
  nextBtn.hidden = state.step === 5;
  nextBtn.textContent = state.step === 4 ? 'Show result' : 'Continue';
  if (state.step === 5) renderSummary();
}

function renderSummary() {
  readStepValues();
  const summary = document.querySelector('#summary');
  const items = [
    ['Store', state.store], ['Category', state.category],
    ['Delivery date', state.deliveryDate], ['Condition', state.condition.replace('-', ' ')]
  ];
  summary.innerHTML = items.map(([k,v]) => `<div><dt>${escapeHtml(k)}</dt><dd>${escapeHtml(v || '—')}</dd></div>`).join('');
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#039;','"':'&quot;'}[ch]));
}

nextBtn.addEventListener('click', () => {
  if (!validCurrentStep()) return;
  if (state.step < 5) state.step += 1;
  render();
});
backBtn.addEventListener('click', () => { if (state.step > 1) state.step -= 1; render(); });

document.querySelectorAll('[data-step-target]').forEach(button => {
  button.addEventListener('click', () => {
    const target = Number(button.dataset.stepTarget);
    if (target <= state.step) { state.step = target; render(); }
  });
});

form.addEventListener('submit', e => e.preventDefault());
render();
