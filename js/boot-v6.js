(async()=>{
  const RAW='https://raw.githubusercontent.com/Nomade-22/MesaFlow/main/';

  async function readBase64(localPath){
    const sources=[
      new URL(localPath,location.href).href,
      RAW+localPath
    ];
    let lastError;
    for(const url of sources){
      try{
        const r=await fetch(url+(url.includes('?')?'&':'?')+'v=10',{cache:'no-store'});
        if(!r.ok) throw new Error('HTTP '+r.status);
        const text=(await r.text()).replace(/[^A-Za-z0-9+/=]/g,'');
        if(!text.startsWith('H4sI') || text.length<100) throw new Error('arquivo inválido');
        return text;
      }catch(err){ lastError=err; }
    }
    throw lastError||new Error('Não foi possível carregar '+localPath);
  }

  async function unpack(localPath){
    if(!('DecompressionStream' in window)){
      throw new Error('Seu navegador precisa ser atualizado para abrir esta versão do MesaFlow.');
    }
    const b64=await readBase64(localPath);
    const bin=atob(b64);
    const bytes=new Uint8Array(bin.length);
    for(let i=0;i<bin.length;i++) bytes[i]=bin.charCodeAt(i);
    const ds=new DecompressionStream('gzip');
    return await new Response(new Blob([bytes]).stream().pipeThrough(ds)).text();
  }

  try{
    const [css,js]=await Promise.all([
      unpack('v6.css.gz.b64'),
      unpack('js/app-v6.js.gz.b64')
    ]);
    const style=document.createElement('style');
    style.textContent=css;
    document.head.appendChild(style);
    (0,eval)(js+'\n//# sourceURL=mesaflow-v10.js');
  }catch(err){
    console.error(err);
    document.getElementById('mf-root').innerHTML='<div style="font-family:system-ui;padding:30px;max-width:760px;margin:auto"><h2>MesaFlow</h2><p>Não foi possível carregar esta versão.</p><pre style="white-space:pre-wrap">'+String(err.message||err)+'</pre><button onclick="location.reload()" style="padding:10px 16px;border:0;border-radius:10px;background:#074A43;color:white;font-weight:700">Tentar novamente</button></div>';
  }
})();
