(() => {
  const cfg = window.MESAFLOW_CONFIG;
  if (!cfg) return;

  const STORAGE_KEY = 'mesaflow:disabled-products';
  const app = document.querySelector('#app');
  const nav = document.querySelector('.role-nav');
  const manageTab = nav?.querySelector('[data-role="gerenciamento"]');
  if (!app || !nav || !manageTab) return;

  const loadDisabled = () => {
    try { return new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')); }
    catch { return new Set(); }
  };
  const saveDisabled = set => localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]));
  const money = value => new Intl.NumberFormat('pt-BR', {style:'currency', currency:'BRL'}).format(value);
  const categoryLabel = id => cfg.categories.find(c => c.id === id)?.label || 'Outros';

  function applyVisibility(root = document) {
    const disabled = loadDisabled();
    root.querySelectorAll('[data-product]').forEach(btn => {
      const card = btn.closest('.product-card');
      if (card) card.style.display = disabled.has(btn.dataset.product) ? 'none' : '';
    });
    root.querySelectorAll('[data-mf-product]').forEach(btn => {
      btn.style.display = disabled.has(btn.dataset.mfProduct) ? 'none' : '';
    });
    root.querySelectorAll('.mf-featured').forEach(section => {
      const visible = [...section.querySelectorAll('[data-mf-product]')].some(el => el.style.display !== 'none');
      section.style.display = visible ? '' : 'none';
    });
  }

  function productRow(product, disabled) {
    const isActive = !disabled.has(product.id);
    return `
      <article class="mg-product ${isActive ? '' : 'is-off'}" data-mg-row="${product.id}">
        <div class="mg-thumb"><img src="${product.image || ''}" alt="${product.name}" loading="lazy"></div>
        <div class="mg-info">
          <strong>${product.name}</strong>
          <span>${categoryLabel(product.category)} · ${product.description || ''}</span>
          <small>${money(product.price)} · estoque ${product.stock ?? 0}</small>
        </div>
        <label class="mg-switch" aria-label="${isActive ? 'Desativar' : 'Ativar'} ${product.name}">
          <input type="checkbox" data-mg-toggle="${product.id}" ${isActive ? 'checked' : ''}>
          <span></span>
        </label>
        <b class="mg-status">${isActive ? 'Ativo' : 'Desativado'}</b>
      </article>`;
  }

  function renderManagement(filter = 'todos', search = '') {
    const disabled = loadDisabled();
    const normalized = search.trim().toLowerCase();
    const products = cfg.products.filter(p =>
      (filter === 'todos' || p.category === filter) &&
      (!normalized || `${p.name} ${p.description}`.toLowerCase().includes(normalized))
    );
    const activeCount = cfg.products.length - disabled.size;

    app.innerHTML = `
      <section class="mg-page">
        <div class="mg-hero">
          <div>
            <span class="eyebrow">Cardápio</span>
            <h2>Gerenciamento de produtos</h2>
            <p>Ative ou desative itens conforme disponibilidade. Produtos desativados somem do cardápio do cliente e do garçom.</p>
          </div>
          <div class="mg-summary">
            <div><strong>${activeCount}</strong><span>Ativos</span></div>
            <div><strong>${disabled.size}</strong><span>Desativados</span></div>
          </div>
        </div>

        <div class="mg-toolbar">
          <div class="mg-categories">
            <button class="category-chip ${filter === 'todos' ? 'is-active' : ''}" data-mg-category="todos">Todos</button>
            ${cfg.categories.map(c => `<button class="category-chip ${filter === c.id ? 'is-active' : ''}" data-mg-category="${c.id}">${c.emoji || ''} ${c.label}</button>`).join('')}
          </div>
          <div class="mg-actions">
            <input class="search-input" id="mg-search" placeholder="Buscar produto" value="${search.replaceAll('"','&quot;')}">
            <button class="secondary-btn" id="mg-enable-filter">Ativar exibidos</button>
            <button class="danger-btn" id="mg-disable-filter">Desativar exibidos</button>
          </div>
        </div>

        <div class="mg-list">
          ${products.length ? products.map(p => productRow(p, disabled)).join('') : '<div class="empty">Nenhum produto encontrado.</div>'}
        </div>
      </section>`;

    app.querySelectorAll('[data-mg-toggle]').forEach(input => {
      input.addEventListener('change', () => {
        const set = loadDisabled();
        input.checked ? set.delete(input.dataset.mgToggle) : set.add(input.dataset.mgToggle);
        saveDisabled(set);
        renderManagement(filter, search);
        applyVisibility();
      });
    });

    app.querySelectorAll('[data-mg-category]').forEach(btn => {
      btn.addEventListener('click', () => renderManagement(btn.dataset.mgCategory, search));
    });

    const searchInput = document.querySelector('#mg-search');
    if (searchInput) searchInput.addEventListener('input', e => renderManagement(filter, e.target.value));

    const visibleIds = products.map(p => p.id);
    document.querySelector('#mg-enable-filter')?.addEventListener('click', () => {
      const set = loadDisabled(); visibleIds.forEach(id => set.delete(id)); saveDisabled(set); renderManagement(filter, search); applyVisibility();
    });
    document.querySelector('#mg-disable-filter')?.addEventListener('click', () => {
      const set = loadDisabled(); visibleIds.forEach(id => set.add(id)); saveDisabled(set); renderManagement(filter, search); applyVisibility();
    });
  }

  manageTab.onclick = () => {
    document.querySelectorAll('.role-tab').forEach(tab => tab.classList.remove('is-active'));
    manageTab.classList.add('is-active');
    renderManagement();
  };

  const observer = new MutationObserver(() => requestAnimationFrame(() => applyVisibility()));
  observer.observe(document.body, {subtree:true, childList:true});
  applyVisibility();
})();
