/* Escola Teológica União — funcionamento do aplicativo instalado.
   Sempre busca a versão mais nova na internet; usa a cópia guardada só quando estiver sem conexão. */
const CACHE='etu-v1';
const BASE=['./','./index.html','./app.js','./qr.js','./config.js','./manifest.json','./icone-192.png','./icone-512.png'];
self.addEventListener('install',e=>{ self.skipWaiting(); e.waitUntil(caches.open(CACHE).then(c=>c.addAll(BASE)).catch(()=>{})) });
self.addEventListener('activate',e=>{ e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim())) });
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(e.request.method!=='GET' || u.origin!==location.origin) return;   /* banco, login e arquivos: sempre direto */
  e.respondWith(fetch(e.request).then(r=>{ const c=r.clone(); caches.open(CACHE).then(x=>x.put(e.request,c)); return r }).catch(()=>caches.match(e.request).then(r=>r||caches.match('./index.html'))));
});
