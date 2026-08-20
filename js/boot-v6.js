(async()=>{
  async function unpack(url){
    const r=await fetch(url,{cache:'no-store'});
    if(!r.ok) throw new Error('Falha ao carregar '+url);
    if('DecompressionStream' in window){
      const ds=new DecompressionStream('gzip');
      return await new Response(r.body.pipeThrough(ds)).text();
    }
    throw new Error('Navegador antigo. Atualize o navegador para usar o MesaFlow.');
  }
  try{
    const [css,js]=await Promise.all([unpack('v6.css.gz?v=6'),unpack('js/app-v6.js.gz?v=6')]);
    const style=document.createElement('style');style.textContent=css;document.head.appendChild(style);
    (0,eval)(js+'\n//# sourceURL=app-v6.js');
  }catch(err){
    document.getElementById('mf-root').innerHTML='<div style="font-family:system-ui;padding:30px"><h2>MesaFlow</h2><p>Não foi possível carregar esta versão.</p><pre>'+String(err.message||err)+'</pre></div>';
  }
})();
