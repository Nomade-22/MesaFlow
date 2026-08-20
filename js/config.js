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
    { id: "refrigerantes", label: "Refrigerantes", emoji: "🥤" },
    { id: "aguas", label: "Águas", emoji: "💧" },
    { id: "cervejas", label: "Cervejas", emoji: "🍺" },
    { id: "drinks", label: "Drinks", emoji: "🍸" },
    { id: "sucos", label: "Sucos", emoji: "🍊" },
    { id: "porcoes", label: "Porções", emoji: "🍟" }
  ],
  products: [
    { id:"coca-350", category:"refrigerantes", name:"Coca-Cola", description:"Lata 350 ml · bem gelada", price:7, stock:36, minStock:8, featured:true, image:"https://abccabral.com.br/cdn/shop/files/cocacolalata_614x790.png?v=1734444528", imageFit:"contain", modifiers:[{id:"gelo",label:"Vai gelo?",required:true,options:["Sim","Não"]},{id:"limao",label:"Vai limão?",required:true,options:["Sim","Não"]}] },
    { id:"coca-zero-350", category:"refrigerantes", name:"Coca-Cola Zero", description:"Lata 350 ml · sem açúcar", price:7, stock:24, minStock:8, featured:true, image:"https://dcdn-us.mitiendanube.com/stores/005/069/840/products/1-refrigerante-coca-cola-zero-lata-350ml-4eab6ffa89313924b217304349209219-1024-1024.png", imageFit:"contain", modifiers:[{id:"gelo",label:"Vai gelo?",required:true,options:["Sim","Não"]},{id:"limao",label:"Vai limão?",required:true,options:["Sim","Não"]}] },
    { id:"fruki-guarana", category:"refrigerantes", name:"Fruki Guaraná", description:"Lata 350 ml", price:6.5, stock:30, minStock:8, featured:true, image:"https://tdc099.vtexassets.com/arquivos/ids/236498/FOTOSVTEX.jpg?v=638907909315600000", imageFit:"contain", modifiers:[{id:"gelo",label:"Vai gelo?",required:true,options:["Sim","Não"]},{id:"limao",label:"Vai limão?",required:true,options:["Sim","Não"]}] },
    { id:"fruki-uva", category:"refrigerantes", name:"Fruki Uva", description:"Garrafa 600 ml", price:9, stock:18, minStock:6, image:"https://img.superhoje.com/img.produtos/7896436101090/img_500_1.png", imageFit:"contain", modifiers:[{id:"gelo",label:"Vai gelo?",required:true,options:["Sim","Não"]},{id:"limao",label:"Vai limão?",required:true,options:["Sim","Não"]}] },
    { id:"fruki-laranja", category:"refrigerantes", name:"Fruki Laranja", description:"Lata 350 ml", price:6.5, stock:20, minStock:8, image:"https://phygital-files.mercafacil.com/catalogo/uploads/produto/refrigerante_laranja_fruki_lata_350ml_282ec38a-aecf-479e-8656-50854457e417.png", imageFit:"contain", modifiers:[{id:"gelo",label:"Vai gelo?",required:true,options:["Sim","Não"]},{id:"limao",label:"Vai limão?",required:true,options:["Sim","Não"]}] },
    { id:"agua-sem-gas", category:"aguas", name:"Água da Pedra", description:"Sem gás · 500 ml", price:5, stock:30, minStock:8, image:"https://fortatacadista.vteximg.com.br/arquivos/ids/161041-1000-1000/AGUA-MIN.DA-PEDRA-500ML-S-GAS-PET---1587285.jpg?v=637437439447630000", imageFit:"contain", modifiers:[{id:"gelo",label:"Vai gelo?",required:true,options:["Sim","Não"]}] },
    { id:"agua-com-gas", category:"aguas", name:"Água da Pedra com gás", description:"Garrafa 500 ml", price:5.5, stock:22, minStock:8, image:"https://cdn.dooca.store/141579/products/kswteeokwza1wjgez7tfxmokwthbsvazsm8j_620x620%2Bfill_ffffff.jpg?v=1712588653&webp=0", imageFit:"contain", modifiers:[{id:"limao",label:"Vai limão?",required:true,options:["Sim","Não"]}] },
    { id:"heineken", category:"cervejas", name:"Heineken", description:"Long neck 330 ml", price:12, stock:18, minStock:10, featured:true, image:"https://images.yampi.me/assets/stores/premiumbebidascom/uploads/images/cerveja-heineken-long-neck-330ml-62e3d143dc01d-large.jpg", imageFit:"contain", modifiers:[{id:"copo",label:"Deseja copo?",required:true,options:["Sim","Não"]}] },
    { id:"caipirinha", category:"drinks", name:"Caipirinha", description:"Limão, gelo e cachaça", price:18, stock:20, minStock:5, image:"https://img-21.ccm2.net/7IlwbYZ6a0zKUgh7a-vQuZfUjko%3D/8883516057b847ee8ada8a90049c6eaf/ccm-faq/1073318.jpg", imageFit:"cover", modifiers:[{id:"acucar",label:"Açúcar",required:true,options:["Normal","Pouco","Sem açúcar"]},{id:"gelo",label:"Gelo",required:true,options:["Normal","Pouco gelo"]}] },
    { id:"gin-tonica", category:"drinks", name:"Gin Tônica", description:"Gin, tônica, gelo e cítrico", price:24, stock:14, minStock:5, image:"https://acdn-us.mitiendanube.com/stores/003/734/887/products/taca-gin-tonica-655ml-cx6-nadir-002-d7d6052f2425e13f9b16964180382776-1024-1024.webp", imageFit:"cover", modifiers:[{id:"limao",label:"Vai limão?",required:true,options:["Sim","Não"]},{id:"gelo",label:"Gelo",required:true,options:["Normal","Pouco gelo"]}] },
    { id:"suco-laranja", category:"sucos", name:"Suco de Laranja", description:"Natural · 400 ml", price:12, stock:18, minStock:5, image:"https://cdn.habernnc.com/galeri/149/maku-lavanta-tepesi-otel-salda-hizmete-acildi-dseWr.jpg", imageFit:"cover", modifiers:[{id:"acucar",label:"Açúcar",required:true,options:["Normal","Pouco","Sem açúcar"]},{id:"gelo",label:"Vai gelo?",required:true,options:["Sim","Não"]}] },
    { id:"batata", category:"porcoes", name:"Batata Frita", description:"Porção crocante para compartilhar", price:28, stock:25, minStock:5, image:"https://thumb-cdn.soluall.net/prod/shp_products/sp1280fw/5db0a140-3ae8-40b3-925f-6b22ac1e07be/5db0a140-7608-47b6-82fa-6b22ac1e07be.jpg", imageFit:"cover", modifiers:[{id:"molho",label:"Molho",required:true,options:["Sem molho","Maionese","Ketchup"]}] }
  ]
};
