(() => {
  const CFG = window.MESAFLOW_CONFIG;
  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];
  const store = {
    get(k,d){ try{return JSON.parse(localStorage.getItem('mesaflow:'+k)) ?? d}catch{return d} },
    set(k,v){ localStorage.setItem('mesaflow:'+k,JSON.stringify(v)) }
  };
  const state = {
    role:'cliente', restaurant:{...CFG.restaurant,...store.get('restaurant',{})},
    products:store.get('products',CFG.products), orders:store.get('orders',[]), calls:store.get('calls',[]),
    cart:[], category:'todos', search:'', product:null, qty:1,
    table:Number(new URLSearchParams(location.search).get('mesa'))||null, dark:store.get('dark',false)
  };
  const app=$('#app'), toast=$('#toast'), productDialog=$('#product-dialog'), cartDialog=$('#cart-dialog');
  const money=v=>new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(v);
  const uid=()=>Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,7);
  const now=()=>new Date().toISOString();
  function rgb(hex){const n=parseInt(hex.replace('#',''),16);return `${n>>16&255}, ${n>>8&255}, ${n&255}`}
  function persist(){store.set('products',state.products);store.set('orders',state.orders);store.set('calls',state.calls)}
  function notify(t){toast.textContent=t;toast.classList.add('show');clearTimeout(notify.t);notify.t=setTimeout(()=>toast.classList.remove('show'),2200)}
  function brand(){
    document.documentElement.style.setProperty('--accent',state.restaurant.accent);
    document.documentElement.style.setProperty('--accent-rgb',rgb(state.restaurant.accent));
    document.documentElement.style.setProperty('--brand-bg',state.restaurant.brandBg);
    document.documentElement.style.setProperty('--brand-cream',state.restaurant.brandCream);
    $('#brand-name').textContent=state.restaurant.name; $('#brand-subtitle').textContent=state.restaurant.subtitle;
    $('#brand-logo').src=state.restaurant.logo||''; $('#brand-logo').alt=state.restaurant.name;
    document.body.classList.toggle('dark',state.dark); $('#theme-toggle').textContent=state.dark?'☀':'☾';
    $('#table-pill').hidden=!state.table; $('#current-table-label').textContent=state.table||'—';
    document.title=state.restaurant.name+' — Cardápio';
  }
  function visual(p){
    if(p.image) return `<img src="${p.image}" alt="${p.name}">`;
    const v=p.visual||{}; return `<div class="packshot-stage" style="--pack-bg:${v.bg||'#ddd'};--pack-fg:${v.fg||'#111'};--pack-stripe:${v.stripe||'transparent'}"><div class="packshot ${v.shape||'can'}"><span class="pack-stripe"></span><strong>${v.brand||p.name}</strong><small>${v.sub||''}</small></div></div>`;
  }
  function card(p){return `<article class="product-card"><div class="product-image">${visual(p)}${p.stock<=p.minStock?`<span class="stock-badge">${p.stock?'Últimas unidades':'Indisponível'}</span>`:''}</div><div class="product-body"><h3>${p.name}</h3><p>${p.description}</p><div class="product-foot"><span class="product-price">${money(p.price)}</span><button class="add-btn" data-product="${p.id}" ${p.stock<=0?'disabled':''}>+</button></div></div></article>`}
  function floating(){const n=state.cart.reduce((a,b)=>a+b.qty,0),v=state.cart.reduce((a,b)=>a+b.price*b.qty,0);return `<button class="floating-cart" data-action="cart"><span><strong>Ver pedido</strong><small>${money(v)}</small></span><span class="cart-count">${n}</span></button>`}
  function menu(waiter=false){
    const cats=[{id:'todos',label:'Todos'},...CFG.categories];
    const list=state.products.filter(p=>(state.category==='todos'||p.category===state.category)&&(`${p.name} ${p.description}`).toLowerCase().includes(state.search.toLowerCase()));
    return `<section><div class="section-head"><div><h2>${waiter?`Lançar pedido${state.table?' · Mesa '+state.table:''}`:'Cardápio'}</h2><p>${waiter?'Toque em um produto para adicionar à comanda.':'Escolha pela imagem e personalize em poucos toques.'}</p></div><div class="search-wrap"><input id="menu-search" class="search-input" placeholder="Buscar no cardápio" value="${state.search}"></div></div><div class="category-row">${cats.map(c=>`<button class="category-chip ${state.category===c.id?'is-active':''}" data-category="${c.id}">${c.label}</button>`).join('')}</div><div class="products-grid">${list.map(card).join('')||'<div class="empty">Nenhum item encontrado.</div>'}</div></section>${state.cart.length?floating():''}`;
  }
  function hero(){return `<section class="hero"><div class="hero-card"><span class="eyebrow">${state.table?'Mesa '+state.table:'Grão de Mostarda'}</span><h1>Peça do seu jeito.</h1><p>Escolha pela foto, personalize e envie direto para o atendimento.</p></div><div class="quick-card"><button class="secondary-btn" data-action="call">🙋 Chamar garçom</button><button class="secondary-btn" data-action="bill">💳 Pedir a conta</button></div></section>`}
  function renderCliente(){app.innerHTML=hero()+menu();wireMenu();wireCalls()}
  function renderGarcom(){
    const calls=new Set(state.calls.filter(c=>c.status==='open').map(c=>c.table)); const ready=new Set(state.orders.filter(o=>o.status==='ready').map(o=>o.table));
    app.innerHTML=`<section><div class="section-head"><div><h2>Mesas</h2><p>Selecione uma mesa e lance o pedido.</p></div></div><div class="table-grid">${Array.from({length:state.restaurant.tables},(_,i)=>i+1).map(n=>`<button class="table-card ${state.table===n?'active':''} ${calls.has(n)?'calling':''} ${ready.has(n)?'ready':''}" data-table="${n}"><strong>${n}</strong><small>${calls.has(n)?'Chamando garçom':ready.has(n)?'Pedido pronto':state.table===n?'Selecionada':'Disponível'}</small></button>`).join('')}</div></section>${state.table?menu(true):'<div class="empty">Selecione uma mesa para começar.</div>'}`;
    $$('[data-table]').forEach(b=>b.onclick=()=>{state.table=Number(b.dataset.table);render()}); if(state.table)wireMenu();
  }
  function elapsed(t){const s=Math.max(0,Math.floor((Date.now()-new Date(t))/1000));return String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0')}
  function orderCard(o){const m=(Date.now()-new Date(o.createdAt))/60000,next=o.status==='new'?['preparing','Iniciar preparo']:o.status==='preparing'?['ready','Marcar pronto']:['delivered','Entregue'];return `<article class="order-card"><div class="order-head"><div><strong>Mesa ${o.table||'Balcão'}</strong><small>${o.source==='waiter'?'Garçom':'QR da mesa'}</small></div><span class="timer ${m>=5?'late':m>=3?'warn':''}" data-timer="${o.createdAt}">${elapsed(o.createdAt)}</span></div><div class="order-items">${o.items.map(i=>`<div class="order-item-line"><strong>${i.qty}× ${i.name}</strong>${i.modifierText?`<small>${i.modifierText}</small>`:''}${i.note?`<small>Obs.: ${i.note}</small>`:''}</div>`).join('')}</div><button class="primary-btn full" data-order="${o.id}" data-status="${next[0]}">${next[1]}</button></article>`}
  function renderCopa(){const cols=[['new','Novos'],['preparing','Preparando'],['ready','Prontos']];app.innerHTML=`<section><div class="section-head"><div><h2>Tela da Copa</h2><p>Pedidos em ordem de chegada.</p></div></div><div class="kds-grid">${cols.map(([s,l])=>{const a=state.orders.filter(o=>o.status===s);return `<div class="kds-column"><div class="kds-head"><h3>${l}</h3><span class="kds-count">${a.length}</span></div>${a.map(orderCard).join('')||'<div class="empty">Nada por aqui.</div>'}</div>`}).join('')}</div></section>`;$$('[data-order]').forEach(b=>b.onclick=()=>{const o=state.orders.find(x=>x.id===b.dataset.order);if(o){o.status=b.dataset.status;o.updatedAt=now();persist();render();notify(o.status==='ready'?'Pedido pronto':'Status atualizado')}})}
  function renderAdmin(){
    const today=new Date().toDateString(),day=state.orders.filter(o=>new Date(o.createdAt).toDateString()===today),rev=day.reduce((a,b)=>a+b.total,0),low=state.products.filter(p=>p.stock<=p.minStock),open=state.calls.filter(c=>c.status==='open');
    app.innerHTML=`<section><div class="section-head"><div><h2>Administração</h2><p>Gestão essencial e simples.</p></div></div><div class="metric-grid"><div class="metric"><span>Pedidos hoje</span><strong>${day.length}</strong></div><div class="metric"><span>Vendas</span><strong>${money(rev)}</strong></div><div class="metric"><span>Estoque baixo</span><strong>${low.length}</strong></div><div class="metric"><span>Chamadas</span><strong>${open.length}</strong></div></div><div class="admin-grid"><div class="panel"><h3>Estoque rápido</h3><div class="stock-list">${state.products.map(p=>`<div class="stock-row"><span>${p.name}</span><strong class="${p.stock<=p.minStock?'stock-low':''}">${p.stock}</strong><button class="secondary-btn" data-stock="${p.id}">+10</button></div>`).join('')}</div></div><div class="panel"><h3>Identidade</h3><div class="settings-form"><label>Nome<input id="set-name" class="text-input" value="${state.restaurant.name}"></label><label>Subtítulo<input id="set-sub" class="text-input" value="${state.restaurant.subtitle}"></label><label>Cor principal<input id="set-color" class="color-input" type="color" value="${state.restaurant.accent}"></label><button id="save-brand" class="primary-btn">Salvar aparência</button></div></div></div><div class="panel" style="margin-top:14px"><h3>Chamadas das mesas</h3>${open.length?open.map(c=>`<div class="stock-row"><span>Mesa ${c.table} · ${c.type==='bill'?'Pediu a conta':'Chamou garçom'}</span><small>${elapsed(c.createdAt)}</small><button class="secondary-btn" data-call-done="${c.id}">Atendido</button></div>`).join(''):'<div class="empty">Nenhuma chamada aberta.</div>'}</div></section>`;
    $$('[data-stock]').forEach(b=>b.onclick=()=>{const p=state.products.find(x=>x.id===b.dataset.stock);p.stock+=10;persist();render()});
    $$('[data-call-done]').forEach(b=>b.onclick=()=>{const c=state.calls.find(x=>x.id===b.dataset.callDone);c.status='done';persist();render()});
    $('#save-brand').onclick=()=>{state.restaurant.name=$('#set-name').value.trim()||CFG.restaurant.name;state.restaurant.subtitle=$('#set-sub').value.trim()||CFG.restaurant.subtitle;state.restaurant.accent=$('#set-color').value;store.set('restaurant',state.restaurant);render();notify('Aparência salva')};
  }
  function wireMenu(){
    $$('[data-category]').forEach(b=>b.onclick=()=>{state.category=b.dataset.category;render()});
    const s=$('#menu-search'); if(s)s.oninput=e=>{state.search=e.target.value;render();const n=$('#menu-search');if(n){n.focus();n.setSelectionRange(state.search.length,state.search.length)}};
    $$('[data-product]').forEach(b=>b.onclick=()=>openProduct(b.dataset.product)); const c=$('[data-action="cart"]');if(c)c.onclick=openCart;
  }
  function wireCalls(){const c=$('[data-action="call"]'),b=$('[data-action="bill"]');if(c)c.onclick=()=>createCall('waiter');if(b)b.onclick=()=>createCall('bill')}
  function createCall(type){if(!state.table){notify('Abra o cardápio pelo QR da mesa');return}if(!state.calls.some(c=>c.table===state.table&&c.type===type&&c.status==='open'))state.calls.push({id:uid(),table:state.table,type,status:'open',createdAt:now()});persist();notify(type==='bill'?'Conta solicitada':'Garçom chamado')}
  function openProduct(id){const p=state.products.find(x=>x.id===id);if(!p||p.stock<=0)return;state.product=p;state.qty=1;$('#dialog-category').textContent=CFG.categories.find(c=>c.id===p.category)?.label||'Cardápio';$('#dialog-title').textContent=p.name;$('#dialog-description').textContent=p.description;$('#dialog-price').textContent=money(p.price);$('#dialog-product-image').innerHTML=visual(p);$('#qty-value').textContent='1';$('#item-note').value='';$('#modifier-groups').innerHTML=(p.modifiers||[]).map((g,gi)=>`<div class="modifier-group"><strong>${g.label}</strong><div class="option-row">${g.options.map((o,oi)=>`<label class="option-label"><input type="radio" name="mod-${gi}" value="${o}" data-modifier="${g.id}" ${oi===0?'checked':''}><span>${o}</span></label>`).join('')}</div></div>`).join('');productDialog.showModal()}
  $('#qty-minus').onclick=()=>{state.qty=Math.max(1,state.qty-1);$('#qty-value').textContent=state.qty};
  $('#qty-plus').onclick=()=>{if(state.product){state.qty=Math.min(state.product.stock,state.qty+1);$('#qty-value').textContent=state.qty}};
  $('#add-to-cart').onclick=()=>{const p=state.product;if(!p)return;const mods=[...$('#modifier-groups').querySelectorAll('input:checked')].map(i=>({id:i.dataset.modifier,value:i.value}));state.cart.push({id:uid(),productId:p.id,name:p.name,price:p.price,qty:state.qty,modifiers:mods,modifierText:mods.map(x=>x.value).join(' · '),note:$('#item-note').value.trim()});productDialog.close();render();notify(p.name+' adicionado')};
  function openCart(){renderCart();cartDialog.showModal()}
  function renderCart(){$('#cart-items').innerHTML=state.cart.length?state.cart.map(i=>`<div class="cart-item"><div><strong>${i.qty}× ${i.name}</strong>${i.modifierText?`<small>${i.modifierText}</small>`:''}${i.note?`<small>Obs.: ${i.note}</small>`:''}</div><button class="cart-remove" data-remove="${i.id}">Remover</button></div>`).join(''):'<div class="empty">Seu pedido está vazio.</div>';$('#cart-total').textContent=money(state.cart.reduce((a,b)=>a+b.price*b.qty,0));$$('[data-remove]').forEach(b=>b.onclick=()=>{state.cart=state.cart.filter(i=>i.id!==b.dataset.remove);renderCart();render()})}
  $('#cart-close').onclick=()=>cartDialog.close();
  $('#send-order').onclick=()=>{if(!state.cart.length)return;if(!state.table){notify(state.role==='garcom'?'Selecione uma mesa':'Escaneie o QR da mesa');return}const total=state.cart.reduce((a,b)=>a+b.price*b.qty,0);state.orders.push({id:uid(),table:state.table,source:state.role==='garcom'?'waiter':'qr',status:'new',createdAt:now(),updatedAt:now(),total,items:state.cart.map(i=>({...i}))});state.cart.forEach(i=>{const p=state.products.find(x=>x.id===i.productId);if(p)p.stock=Math.max(0,p.stock-i.qty)});state.cart=[];persist();cartDialog.close();render();notify('Pedido enviado para a copa')};
  function render(){brand();$$('.role-tab').forEach(b=>b.classList.toggle('is-active',b.dataset.role===state.role));if(state.role==='cliente')renderCliente();else if(state.role==='garcom')renderGarcom();else if(state.role==='copa')renderCopa();else renderAdmin()}
  $$('.role-tab').forEach(b=>b.onclick=()=>{state.role=b.dataset.role;if(state.role==='cliente'&&!new URLSearchParams(location.search).get('mesa'))state.table=null;state.category='todos';state.search='';render()});
  $('#theme-toggle').onclick=()=>{state.dark=!state.dark;store.set('dark',state.dark);brand()};
  setInterval(()=>{if(state.role==='copa')$$('[data-timer]').forEach(e=>e.textContent=elapsed(e.dataset.timer))},1000);
  if('serviceWorker'in navigator&&location.protocol.startsWith('http'))navigator.serviceWorker.register('sw.js').catch(()=>{});
  render();
})();