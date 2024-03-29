var staticCacheName = 'restaurants-v1';

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll([
        '/',
        'js/main.js',
        'js/dbhelper.js',
        'js/personalScript.js',
        'js/restaurant_info.js',
        'css/styles.css',
        'data/restaurants.json',
        '/index.html',
        '/restaurant.html',
        'img/1.jpg',        
        'img/2.jpg',        
        'img/3.jpg',        
        'img/4.jpg',        
        'img/5.jpg',        
        'img/6.jpg',        
        'img/7.jpg',        
        'img/8.jpg',        
        'img/9.jpg',        
        'img/10.jpg',        
      ]);
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('restaurants-') &&
                 cacheName != staticCacheName;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});