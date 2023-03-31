var CACHE_NAME = 'first-app';

self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open('first-app')
        .then(function(cache) {
          cache.addAll([
            "/",
            "/index.html",
            "portofolio-example01.html",
            "/manifest.json",
            "/styles.css",
            "/about.html",
            "/blog.html",
            "contact.html",  
            "/images/*",
            "/app.js"
          ])
        })
    );
    return self.clients.claim();
  });


  self.addEventListener("fetch", event => {
    event.respondWith(
      caches.match(event.request).then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request).then(response => {
          if (!response || response.status !== 200 || response.type !== "basic") {
            return response;
          }
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
          return response;
        });
      })
    );
  });



  

