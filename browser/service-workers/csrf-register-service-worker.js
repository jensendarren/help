/*  Example of in page (client) script that can load a service worker file (sw.js)
    NOTE:  the scope option is needed if the service worker is loaded from a directory other than the root
    NOTE:  also that it would require a response header from ther server "'Service-Worker-Allowed': '/'" which can be added to your server as per the requirements of that server (IIS, Apache, Nginx, Node etc)
*/

navigator.serviceWorker.register('/sw.js', {scope: '/'}).then(function(registration) {
    console.log('Service worker registered with scope: ', registration.scope);
}, function(err) {
    console.log('ServiceWorker registration failed: ', err);
});