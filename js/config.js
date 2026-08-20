const mfSvg = (svg) => `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;

const canImage = (brand, flavor, body, accent = "#fff", text = "#fff") => mfSvg(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#faf7f2"/><stop offset="1" stop-color="#e9e2da"/></linearGradient>
    <linearGradient id="can" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#ffffff" stop-opacity=".38"/><stop offset=".18" stop-color="${body}"/><stop offset=".78" stop-color="${body}"/><stop offset="1" stop-color="#000000" stop-opacity=".25"/></linearGradient>
    <filter id="sh"><feDropShadow dx="0" dy="18" stdDeviation="18" flood-opacity=".22"/></filter>
  </defs>
  <rect width="500" height="500" rx="48" fill="url(#bg)"/>
  <ellipse cx="250" cy="430" rx="105" ry="25" fill="#000" opacity=".12"/>
  <g filter="url(#sh)">
    <rect x="155" y="72" width="190" height="340" rx="54" fill="url(#can)"/>
    <ellipse cx="250" cy="78" rx="89" ry="18" fill="#d7d7d7"/>
    <ellipse cx="250" cy="80" rx="62" ry="10" fill="#9d9d9d" opacity=".55"/>
    <ellipse cx="250" cy="407" rx="84" ry="13" fill="#b6b6b6" opacity=".65"/>
    <path d="M155 150h190v58H155z" fill="${accent}" opacity=".95"/>
    <circle cx="250" cy="275" r="72" fill="#fff" opacity=".10"/>
    <text x="250" y="185" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="37" font-weight="800" fill="${body === '#171717' ? '#fff' : text}">${brand}</text>
    <text x="250" y="290" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="31" font-weight="800" fill="${text}">${flavor}</text>
    <text x="250" y="330" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="19" fill="${text}" opacity=".92">350 ml</text>
  </g>
</svg>`);

const bottleImage = (brand, flavor, body, accent = "#fff", text = "#fff") => mfSvg(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
  <defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#faf7f2"/><stop offset="1" stop-color="#e9e2da"/></linearGradient><linearGradient id="b" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#fff" stop-opacity=".32"/><stop offset=".2" stop-color="${body}"/><stop offset=".85" stop-color="${body}"/><stop offset="1" stop-color="#000" stop-opacity=".28"/></linearGradient><filter id="sh"><feDropShadow dx="0" dy="18" stdDeviation="18" flood-opacity=".22"/></filter></defs>
  <rect width="500" height="500" rx="48" fill="url(#bg)"/><ellipse cx="250" cy="438" rx="90" ry="22" fill="#000" opacity=".12"/>
  <g filter="url(#sh)"><rect x="220" y="64" width="60" height="78" rx="16" fill="url(#b)"/><rect x="205" y="58" width="90" height="22" rx="8" fill="${accent}"/><path d="M205 126c-30 24-52 48-55 90v176c0 26 21 46 46 46h108c25 0 46-20 46-46V216c-3-42-25-66-55-90z" fill="url(#b)"/><rect x="170" y="236" width="160" height="120" rx="20" fill="#fff" opacity=".92"/><text x="250" y="286" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="29" font-weight="900" fill="${body}">${brand}</text><text x="250" y="324" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="21" font-weight="700" fill="#25312c">${flavor}</text></g>
</svg>`);

const glassImage = (title, flavor, drink, garnish = "#8dbb3c") => mfSvg(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
  <defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#faf7f2"/><stop offset="1" stop-color="#e9e2da"/></linearGradient><linearGradient id="d" x1="0" y1="0" x2="0" y2="1"><stop stop-color="${drink}" stop-opacity=".75"/><stop offset="1" stop-color="${drink}"/></linearGradient><filter id="sh"><feDropShadow dx="0" dy="18" stdDeviation="18" flood-opacity=".18"/></filter></defs>
  <rect width="500" height="500" rx="48" fill="url(#bg)"/><ellipse cx="250" cy="420" rx="105" ry="24" fill="#000" opacity=".10"/>
  <g filter="url(#sh)"><path d="M155 120h190l-26 264c-2 23-21 40-44 40h-50c-23 0-42-17-44-40z" fill="#fff" opacity=".55" stroke="#fff" stroke-width="8"/><path d="M176 195h148l-19 177c-2 17-16 30-33 30h-44c-17 0-31-13-33-30z" fill="url(#d)"/><g fill="#fff" opacity=".55"><rect x="195" y="226" width="38" height="38" rx="8" transform="rotate(12 214 245)"/><rect x="247" y="218" width="42" height="42" rx="8" transform="rotate(-10 268 239)"/><rect x="220" y="282" width="44" height="44" rx="8" transform="rotate(8 242 304)"/></g><circle cx="315" cy="168" r="38" fill="${garnish}"/><circle cx="315" cy="168" r="25" fill="#f4f1d2"/><path d="M315 168l31-23" stroke="${garnish}" stroke-width="8"/><text x="250" y="90" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="31" font-weight="900" fill="#183e38">${title}</text><text x="250" y="452" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="21" font-weight="700" fill="#6b625c">${flavor}</text></g>
</svg>`);

const foodImage = (emoji, title) => mfSvg(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500"><rect width="500" height="500" rx="48" fill="#f4eee6"/><ellipse cx="250" cy="385" rx="145" ry="48" fill="#ded2c6"/><rect x="130" y="260" width="240" height="120" rx="35" fill="#E85F2E"/><text x="250" y="270" text-anchor="middle" font-size="155">${emoji}</text><text x="250" y="440" text-anchor="middle" font-family="Arial" font-size="30" font-weight="800" fill="#183e38">${title}</text></svg>`);

window.MESAFLOW_CONFIG = {
  restaurant: {
    id: "grao-de-mostarda",
    name: "Grão de Mostarda",
    subtitle: "Restaurante",
    accent: "#E85F2E",
    brandBg: "#074A43",
    brandCream: "#F3E4D7",
    logo: "assets/grao-icon.png",
    currency: "BRL",
    locale: "pt-BR",
    tables: 18,
    orderMode: "hybrid"
  },
  categories: [
    { id: "refrigerantes", label: "Refrigerantes" },
    { id: "aguas", label: "Águas" },
    { id: "cervejas", label: "Cervejas" },
    { id: "drinks", label: "Drinks" },
    { id: "sucos", label: "Sucos" },
    { id: "porcoes", label: "Porções" }
  ],
  products: [
    { id:"coca-350", category:"refrigerantes", name:"Coca-Cola", description:"Lata 350 ml", price:7, stock:36, minStock:8, image:canImage("Coca-Cola","Original","#D71920","#D71920","#fff"), modifiers:[{id:"gelo",label:"Vai gelo?",required:true,options:["Sim","Não"]},{id:"limao",label:"Vai limão?",required:true,options:["Sim","Não"]}] },
    { id:"coca-zero-350", category:"refrigerantes", name:"Coca-Cola Zero", description:"Lata 350 ml · zero açúcar", price:7, stock:24, minStock:8, image:canImage("Coca-Cola","Zero Açúcar","#171717","#D71920","#fff"), modifiers:[{id:"gelo",label:"Vai gelo?",required:true,options:["Sim","Não"]},{id:"limao",label:"Vai limão?",required:true,options:["Sim","Não"]}] },
    { id:"fruki-guarana", category:"refrigerantes", name:"Fruki Guaraná", description:"Lata 350 ml", price:6.5, stock:30, minStock:8, image:canImage("FRUKI","Guaraná","#137A47","#E3252B","#fff"), modifiers:[{id:"gelo",label:"Vai gelo?",required:true,options:["Sim","Não"]},{id:"limao",label:"Vai limão?",required:true,options:["Sim","Não"]}] },
    { id:"fruki-uva", category:"refrigerantes", name:"Fruki Uva", description:"Lata 350 ml", price:6.5, stock:24, minStock:8, image:canImage("FRUKI","Uva","#6B2D90","#F6C531","#fff"), modifiers:[{id:"gelo",label:"Vai gelo?",required:true,options:["Sim","Não"]},{id:"limao",label:"Vai limão?",required:true,options:["Sim","Não"]}] },
    { id:"fruki-laranja", category:"refrigerantes", name:"Fruki Laranja", description:"Lata 350 ml", price:6.5, stock:20, minStock:8, image:canImage("FRUKI","Laranja","#F07826","#F6C531","#fff"), modifiers:[{id:"gelo",label:"Vai gelo?",required:true,options:["Sim","Não"]},{id:"limao",label:"Vai limão?",required:true,options:["Sim","Não"]}] },
    { id:"agua-sem-gas", category:"aguas", name:"Água sem gás", description:"Garrafa 500 ml", price:5, stock:30, minStock:8, image:bottleImage("ÁGUA","Sem gás","#77BFD4","#dff5ff","#fff"), modifiers:[{id:"gelo",label:"Vai gelo?",required:true,options:["Sim","Não"]}] },
    { id:"agua-com-gas", category:"aguas", name:"Água com gás", description:"Garrafa 500 ml", price:5.5, stock:22, minStock:8, image:bottleImage("ÁGUA","Com gás","#2E92A8","#dff5ff","#fff"), modifiers:[{id:"limao",label:"Vai limão?",required:true,options:["Sim","Não"]}] },
    { id:"heineken", category:"cervejas", name:"Heineken", description:"Long neck 330 ml", price:12, stock:18, minStock:10, image:bottleImage("Heineken","330 ml","#08723C","#D71920","#fff"), modifiers:[{id:"copo",label:"Deseja copo?",required:true,options:["Sim","Não"]}] },
    { id:"caipirinha", category:"drinks", name:"Caipirinha", description:"Limão, gelo e cachaça", price:18, stock:20, minStock:5, image:glassImage("Caipirinha","Limão","#C6D75A","#74A92F"), modifiers:[{id:"acucar",label:"Açúcar",required:true,options:["Normal","Pouco","Sem açúcar"]},{id:"gelo",label:"Gelo",required:true,options:["Normal","Pouco gelo"]}] },
    { id:"gin-tonica", category:"drinks", name:"Gin Tônica", description:"Gin, tônica, gelo e cítrico", price:24, stock:14, minStock:5, image:glassImage("Gin Tônica","Cítrico","#DDE8DD","#A6B74A"), modifiers:[{id:"limao",label:"Vai limão?",required:true,options:["Sim","Não"]},{id:"gelo",label:"Gelo",required:true,options:["Normal","Pouco gelo"]}] },
    { id:"suco-laranja", category:"sucos", name:"Suco de Laranja", description:"Natural · 400 ml", price:12, stock:18, minStock:5, image:glassImage("Suco","Laranja","#F3A11A","#F28B24"), modifiers:[{id:"acucar",label:"Açúcar",required:true,options:["Normal","Pouco","Sem açúcar"]},{id:"gelo",label:"Vai gelo?",required:true,options:["Sim","Não"]}] },
    { id:"batata", category:"porcoes", name:"Batata Frita", description:"Porção crocante", price:28, stock:25, minStock:5, image:foodImage("🍟","Batata Frita"), modifiers:[{id:"molho",label:"Molho",required:true,options:["Sem molho","Maionese","Ketchup"]}] }
  ]
};
