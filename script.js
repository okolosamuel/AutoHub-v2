const formatMoney = (n) => `$${Number(n).toLocaleString()}`;

document.addEventListener('DOMContentLoaded', () => {
  const brandSelect = document.getElementById('brandSelect');
  const modelInput = document.getElementById('modelInput');
  const priceRange = document.getElementById('priceRange');
  const priceValue = document.getElementById('priceValue');
  const brandList = document.getElementById('brandList');
  const searchForm = document.getElementById('searchForm');
  const grid = document.getElementById('vehicleGrid');

  // Keep UI in sync
  priceValue.textContent = formatMoney(priceRange.value);
  priceRange.addEventListener('input', () => {
    priceValue.textContent = formatMoney(priceRange.value);
    applyFilters();
  });

  modelInput.addEventListener('input', applyFilters);
  brandSelect.addEventListener('change', (e) => {
    // Reflect brand dropdown to chips
    const brand = e.target.value;
    [...brandList.querySelectorAll('.brand-chip')].forEach((c) => {
      c.classList.toggle('active', c.dataset.brand === brand);
    });
    applyFilters();
  });

  // Brand chip interactions
  brandList.addEventListener('click', (e) => {
    const chip = e.target.closest('.brand-chip');
    if (!chip) return;
    [...brandList.querySelectorAll('.brand-chip')].forEach((c) => c.classList.remove('active'));
    chip.classList.add('active');
    brandSelect.value = chip.dataset.brand;
    applyFilters();
  });

  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    applyFilters();
  });

  function applyFilters() {
    const brand = brandSelect.value;
    const model = modelInput.value.trim().toLowerCase();
    const maxPrice = Number(priceRange.value);

    const cards = grid.querySelectorAll('.card');
    let visibleCount = 0;
    cards.forEach((card) => {
      const cBrand = card.dataset.brand;
      const title = card.dataset.title.toLowerCase();
      const price = Number(card.dataset.price);

      const brandOk = brand === 'all' || brand === cBrand;
      const modelOk = !model || title.includes(model);
      const priceOk = price <= maxPrice;

      const show = brandOk && modelOk && priceOk;
      card.style.display = show ? '' : 'none';
      if (show) visibleCount++;
    });

    // If nothing matched, show a friendly message
    if (!document.getElementById('emptyState')) {
      const msg = document.createElement('div');
      msg.id = 'emptyState';
      msg.style.textAlign = 'center';
      msg.style.color = '#64748b';
      msg.style.padding = '12px 0';
      msg.textContent = 'No vehicles match your filters.';
      grid.parentElement.appendChild(msg);
    }
    document.getElementById('emptyState').style.display = visibleCount ? 'none' : '';
  }

  // Initial run
  applyFilters();
});