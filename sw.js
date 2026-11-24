const CACHE='socle-v13';
const FILES=['./','./index.html','./manifest.webmanifest','./icon.png','./fonts/roboto-slab-latin-500-normal.woff2','./fonts/roboto-slab-latin-600-normal.woff2','./fonts/roboto-slab-latin-700-normal.woff2','./fonts/ibm-plex-sans-latin-400-normal.woff2','./fonts/ibm-plex-sans-latin-500-normal.woff2','./fonts/ibm-plex-sans-latin-600-normal.woff2'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(fetch(e.request).then(r=>{if(new URL(e.request.url).origin===location.origin){const c=r.clone();caches.open(CACHE).then(x=>x.put(e.request,c));}return r;}).catch(()=>caches.match(e.request).then(r=>r||caches.match('./index.html'))));});
