window.MESAFLOW_CONFIG = {
  restaurant: {
    id: "grao-de-mostarda",
    name: "Grão de Mostarda",
    subtitle: "Restaurante",
    accent: "#E85F2E",
    brandBg: "#074A43",
    brandCream: "#F3E4D7",
    logo: "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%20200%20200%22%3E%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%22100%22%20fill%3D%22%23074A43%22/%3E%3Cg%20fill%3D%22none%22%20stroke%3D%22%23F3E4D7%22%20stroke-width%3D%226%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22M45%20110c10%2015%2028%2023%2055%2023%2012%200%2024-2%2035-5%22/%3E%3Cpath%20d%3D%22M36%2092c7%2017%2017%2029%2031%2036%22/%3E%3Cpath%20d%3D%22M56%2085c22%205%2054%207%2082%204%22/%3E%3Cpath%20d%3D%22M133%2088c10%201%2020%206%2030%2012%22/%3E%3Cpath%20d%3D%22M161%20100c-3%209-11%2014-23%2016%22/%3E%3C/g%3E%3Cpath%20d%3D%22M98%2044c10%2016%205%2031-4%2044%2015-2%2027-14%2029-31%2013%2017%2018%2036%208%2053-9%2015-28%2024-46%2017-23-9-28-38-12-58%205-7%2011-12%2014-25%202%205%207%2010%2011%2016z%22%20fill%3D%22%23E85F2E%22/%3E%3C/svg%3E",
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
    { id:"coca-350", category:"refrigerantes", name:"Coca-Cola", description:"Lata 350 ml", price:7, stock:36, minStock:8, visual:{ shape:"can", brand:"Coca-Cola", sub:"Original", bg:"#D71920", fg:"#FFFFFF" }, modifiers:[{ id:"gelo", label:"Vai gelo?", required:true, options:["Sim","Não"] },{ id:"limao", label:"Vai limão?", required:true, options:["Sim","Não"] }] },
    { id:"coca-zero-350", category:"refrigerantes", name:"Coca-Cola Zero", description:"Lata 350 ml · zero açúcar", price:7, stock:24, minStock:8, visual:{ shape:"can", brand:"Coca-Cola", sub:"Zero Açúcar", bg:"#171717", fg:"#FFFFFF", stripe:"#D71920" }, modifiers:[{ id:"gelo", label:"Vai gelo?", required:true, options:["Sim","Não"] },{ id:"limao", label:"Vai limão?", required:true, options:["Sim","Não"] }] },
    { id:"fruki-guarana", category:"refrigerantes", name:"Fruki Guaraná", description:"Lata 350 ml", price:6.5, stock:30, minStock:8, visual:{ shape:"can", brand:"FRUKI", sub:"Guaraná", bg:"#127A46", fg:"#FFFFFF", stripe:"#E61E2A" }, modifiers:[{ id:"gelo", label:"Vai gelo?", required:true, options:["Sim","Não"] },{ id:"limao", label:"Vai limão?", required:true, options:["Sim","Não"] }] },
    { id:"fruki-uva", category:"refrigerantes", name:"Fruki Uva", description:"Lata 350 ml", price:6.5, stock:24, minStock:8, visual:{ shape:"can", brand:"FRUKI", sub:"Uva", bg:"#6A2C91", fg:"#FFFFFF", stripe:"#F4C531" }, modifiers:[{ id:"gelo", label:"Vai gelo?", required:true, options:["Sim","Não"] },{ id:"limao", label:"Vai limão?", required:true, options:["Sim","Não"] }] },
    { id:"fruki-laranja", category:"refrigerantes", name:"Fruki Laranja", description:"Lata 350 ml", price:6.5, stock:20, minStock:8, visual:{ shape:"can", brand:"FRUKI", sub:"Laranja", bg:"#F07B25", fg:"#FFFFFF", stripe:"#F4C531" }, modifiers:[{ id:"gelo", label:"Vai gelo?", required:true, options:["Sim","Não"] },{ id:"limao", label:"Vai limão?", required:true, options:["Sim","Não"] }] },
    { id:"agua-sem-gas", category:"aguas", name:"Água sem gás", description:"Garrafa 500 ml", price:5, stock:30, minStock:8, visual:{ shape:"bottle", brand:"ÁGUA", sub:"Sem gás", bg:"#BDE7F4", fg:"#174D68" }, modifiers:[{ id:"gelo", label:"Vai gelo?", required:true, options:["Sim","Não"] }] },
    { id:"agua-com-gas", category:"aguas", name:"Água com gás", description:"Garrafa 500 ml", price:5.5, stock:22, minStock:8, visual:{ shape:"bottle", brand:"ÁGUA", sub:"Com gás", bg:"#8ED0DE", fg:"#0F4B5C" }, modifiers:[{ id:"limao", label:"Vai limão?", required:true, options:["Sim","Não"] }] },
    { id:"heineken", category:"cervejas", name:"Heineken", description:"Long neck 330 ml", price:12, stock:18, minStock:10, visual:{ shape:"bottle", brand:"Heineken", sub:"330 ml", bg:"#0B6B3A", fg:"#FFFFFF", stripe:"#D71920" }, modifiers:[{ id:"copo", label:"Deseja copo?", required:true, options:["Sim","Não"] }] },
    { id:"caipirinha", category:"drinks", name:"Caipirinha", description:"Limão, gelo e cachaça", price:18, stock:20, minStock:5, visual:{ shape:"glass", brand:"Caipirinha", sub:"Limão", bg:"#B7C83B", fg:"#203A1D" }, modifiers:[{ id:"acucar", label:"Açúcar", required:true, options:["Normal","Pouco","Sem açúcar"] },{ id:"gelo", label:"Gelo", required:true, options:["Normal","Pouco gelo"] }] },
    { id:"gin-tonica", category:"drinks", name:"Gin Tônica", description:"Gin, tônica, gelo e cítrico", price:24, stock:14, minStock:5, visual:{ shape:"glass", brand:"Gin", sub:"Tônica", bg:"#DFE8DD", fg:"#213A31" }, modifiers:[{ id:"limao", label:"Vai limão?", required:true, options:["Sim","Não"] },{ id:"gelo", label:"Gelo", required:true, options:["Normal","Pouco gelo"] }] },
    { id:"suco-laranja", category:"sucos", name:"Suco de Laranja", description:"Natural · 400 ml", price:12, stock:18, minStock:5, visual:{ shape:"glass", brand:"Suco", sub:"Laranja", bg:"#F3A11A", fg:"#FFFFFF" }, modifiers:[{ id:"acucar", label:"Açúcar", required:true, options:["Normal","Pouco","Sem açúcar"] },{ id:"gelo", label:"Vai gelo?", required:true, options:["Sim","Não"] }] },
    { id:"batata", category:"porcoes", name:"Batata Frita", description:"Porção crocante", price:28, stock:25, minStock:5, visual:{ shape:"food", brand:"🍟", sub:"Batata Frita", bg:"#E8A72D", fg:"#FFFFFF" }, modifiers:[{ id:"molho", label:"Molho", required:true, options:["Sem molho","Maionese","Ketchup"] }] }
  ]
};