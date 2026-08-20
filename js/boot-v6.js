(async()=>{
  async function unpackB64(url){
    const r=await fetch(url,{cache:'no-store'});
    if(!r.ok) throw new Error('Falha ao carregar '+url);
    if(!('DecompressionStream' in window)) throw new Error('Navegador antigo. Atualize o navegador para usar o MesaFlow.');
    const b64=(await r.text()).trim();
    const bin=atob(b64); const bytes=new Uint8Array(bin.length);
    for(let i=0;i<bin.length;i++) bytes[i]=bin.charCodeAt(i);
    const ds=new DecompressionStream('gzip');
    return await new Response(new Blob([bytes]).stream().pipeThrough(ds)).text();
  }
  try{
    const [css,js]=await Promise.all([unpackB64('v6.css.gz.b64?v=7'),unpackB64('js/app-v6.js.gz.b64?v=7')]);
    const style=document.createElement('style');style.textContent=css;document.head.appendChild(style);
    (0,eval)(js+'\n//# sourceURL=app-v6.js');
  }catch(err){
    document.getElementById('mf-root').innerHTML='<div style="font-family:system-ui;padding:30px"><h2>MesaFlow</h2><p>Não foi possível carregar esta versão.</p><pre>'+String(err.message||err)+'</pre></div>';
  }
})();
