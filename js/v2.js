(() => {
  const cfg = window.MESAFLOW_CONFIG;
  if (!cfg) return;
  const byId = new Map(cfg.products.map(p => [p.id, p]));
  const byName = new Map(cfg.products.map(p => [p.name, p]));

  function fitImages(root=document) {
    root.querySelectorAll('.product-card').forEach(card => {
      const btn = card.querySelector('[data-product]');
      const img = card.querySelector('.product-image img');
      const p = btn && byId.get(btn.dataset.product);
      if (img && p) {
        img.loading = 'lazy';
        img.classList.toggle('mf-cover', p.imageFit === 'cover');
      }
    });
    const dialogTitle = document.querySelector('#dialog-title');
    const dialogImg = document.querySelector('#dialog-product-image img');
    if (dialogTitle && dialogImg) {
      const p = byName.get(dialogTitle.textContent.trim());
      if (p) dialogImg.classList.toggle('mf-cover', p.imageFit === 'cover');
    }
  }

  function addFeatured() {
    const app = document.querySelector('#app');
    if (!app || app.querySelector('.mf-featured')) return;
    const activeRole = document.querySelector('.role-tab.is-active')?.dataset.role;
    if (activeRole !== 'cliente') return;
    const hero = app.querySelector('.hero');
    const grid = app.querySelector('.products-grid');
    if (!hero || !grid) return;
    const items = cfg.products.filter(p => p.featured).slice(0,5);
    if (!items.length) return;
    const section = document.createElement('section');
    section.className = 'mf-featured';
    section.innerHTML = `<div class="mf-featured-head"><div><div class="mf-featured-kicker">Favoritos da casa</div><h2>Mais pedidos</h2></div><small>Deslize para ver mais</small></div><div class="mf-featured-row">${items.map(p => `<button type="button" class="mf-featured-card" data-mf-product="${p.id}"><div class="mf-featured-img"><img src="${p.image}" alt="${p.name}" class="${p.imageFit === 'cover' ? 'mf-cover' : ''}"></div><div class="mf-featured-copy"><strong>${p.name}</strong><span>${p.description}</span><b>${new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(p.price)}</b></div><span class="mf-featured-plus">+</span></button>`).join('')}</div>`;
    hero.insertAdjacentElement('afterend', section);
    section.querySelectorAll('[data-mf-product]').forEach(btn => btn.addEventListener('click', () => {
      const target = app.querySelector(`[data-product="${btn.dataset.mfProduct}"]`);
      if (target) target.click();
    }));
  }

  function enhance() { fitImages(); addFeatured(); }
  const observer = new MutationObserver(() => requestAnimationFrame(enhance));
  observer.observe(document.body, {subtree:true, childList:true});
  enhance();
})();
