// example of a service worker script

self.addEventListener('install', function(event) {
    event.waitUntil(self.skipWaiting());
});
self.addEventListener('fetch', function(event) {
    const originalRequest = event.request;
    const newRequest = new Request(originalRequest, {
        headers: {
          ...originalRequest.headers,
          'SW-REFERRER': originalRequest.referrer,
          'X-CSRF-TOKEN': '{{ csrf_value() }}'
        }
    })
    event.respondWith(
      fetch(newRequest)
    );
});