
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('shuprama-cache').then(cache => {
      return cache.addAll([
        '/Shuprama/',
        '/Shuprama/index.html',
        '/Shuprama/thankyou.html',
        '/Shuprama/order-history.html',
        '/Shuprama/logo.png'
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
