const CACHE = 'daily-structure-v1';
const ASSETS = ['/', '/index.html'];

self.addEventListener('install', function(e) {
  e.waitUntil(caches.open(CACHE).then(function(c) { return c.addAll(ASSETS); }));
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(r) {
      return r || fetch(e.request);
    })
  );
});

self.addEventListener('push', function(e) {
  var data = e.data ? e.data.json() : {};
  e.waitUntil(
    self.registration.showNotification(data.title || 'Daily Structure', {
      body: data.body || '',
      icon: '/icon-192.png',
      badge: '/icon-192.png'
    })
  );
});
