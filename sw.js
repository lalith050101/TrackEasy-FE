importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js"
);

importScripts("https://www.gstatic.com/firebasejs/7.10.0/firebase-app.js");

importScripts(
  "https://www.gstatic.com/firebasejs/7.10.0/firebase-messaging.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyDWdA0CLOO17kPItEDjL0-WXDzxCuRULLE",
  projectId: "trackeasy-app",
  messagingSenderId: "1092414320287",
  appId: "1:1092414320287:web:fa69df1caa12c86e507caa",
});

const messaging = firebase.messaging();
messaging.usePublicVapidKey(
  "BKvKKRsnGZx8fHjNMYl87YjlybkC7rTK8eyVo9KGpCHKLqmrQFzgdu-_cfqfqnfV2MK9eEmS-IAq57wp7F74uxs"
);

if (workbox) {
  console.log("Yay! Workbox is loaded !");
  workbox.precaching.precacheAndRoute([]);
  /*  cache images in the e.g others folder; edit to other folders you got
   and config in the sw-config.js file
    */
  workbox.routing.registerRoute(
    /(.*)others(.*)\.(?:png|gif|jpg)/,
    new workbox.strategies.CacheFirst({
      cacheName: "images",
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 50,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
        }),
      ],
    })
  );
  /* Make your JS and CSS âš¡ fast by returning the assets from the cache,
  while making sure they are updated in the background for the next use.
  */
  workbox.routing.registerRoute(
    // cache js, css, scc files
    /.*\.(?:css|js|scss|)/,
    // use cache but update in the background ASAP
    new workbox.strategies.StaleWhileRevalidate({
      // use a custom cache name
      cacheName: "assets",
    })
  );
  // cache google fonts
  workbox.routing.registerRoute(
    new RegExp("https://fonts.(?:googleapis|gstatic).com/(.*)"),
    new workbox.strategies.CacheFirst({
      cacheName: "google-fonts",
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200],
        }),
      ],
    })
  );
  // add offline analytics
  workbox.googleAnalytics.initialize();
  /* Install a new service worker and have it update
and control a web page as soon as possible
*/
  workbox.core.skipWaiting();
  workbox.core.clientsClaim();
  console.log("workbox precaching and routing done!");
} else {
  console.log("Oops! Workbox didn't load ðŸ‘º");
}
