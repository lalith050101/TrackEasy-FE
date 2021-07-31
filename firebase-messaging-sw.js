importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js"
);

importScripts("https://www.gstatic.com/firebasejs/8.8.0/firebase-app.js");

importScripts("https://www.gstatic.com/firebasejs/8.8.0/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyDWdA0CLOO17kPItEDjL0-WXDzxCuRULLE",
  projectId: "trackeasy-app",
  messagingSenderId: "1092414320287",
  appId: "1:1092414320287:web:fa69df1caa12c86e507caa",
});

// messaging.usePublicVapidKey(
//   "BKvKKRsnGZx8fHjNMYl87YjlybkC7rTK8eyVo9KGpCHKLqmrQFzgdu-_cfqfqnfV2MK9eEmS-IAq57wp7F74uxs"
// );
console.log("inside sw");

class CustomPushEvent extends Event {
  constructor(data) {
    super("push");

    Object.assign(this, data);
    this.custom = true;
  }
}

/*
 * Overrides push notification data, to avoid having 'notification' key and firebase blocking
 * the message handler from being called
 */
self.addEventListener("push", (e) => {
  // Skip if event is our own custom event
  if (e.custom) return;

  // Kep old event data to override
  let oldData = e.data;

  // Create a new event to dispatch, pull values from notification key and put it in data key,
  // and then remove notification key
  let newEvent = new CustomPushEvent({
    data: {
      json() {
        let newData = oldData.json();
        newData.data = {
          ...newData.data,
          ...newData.notification,
        };
        delete newData.notification;
        return newData;
      },
    },
    waitUntil: e.waitUntil.bind(e),
  });

  // Stop event propagation
  e.stopImmediatePropagation();

  // Dispatch the new wrapped event
  dispatchEvent(newEvent);
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  var notificationTitle = payload.data.title;
  var notificationOptions = {
    body: payload.data.body,
    icon: "https://trackeasy.yvlalithkumar.codes/img/avatar2.png",
    vibrate: [100, 50, 100],
    //data: { url: payload.notification.click_action }, //the url which we gonna use later
    actions: [
      { action: "StudentNotifications.html", title: "View" },
      { action: "close", title: "Close notification" },
    ],
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});

self.addEventListener("notificationclick", (event) => {
  console.log("[Service Worker] Notification click Received.", event);
  //event.notification.close();

  var notification = event.notification;
  var action = event.action;

  if (action === "close") {
    notification.close();
  } else {
    const launchUrl = event.action || event.notification.data.launchUrl;
    clients.openWindow(launchUrl);
    notification.close();
  }

  // const launchUrl = event.action || event.notification.data.launchUrl;

  // if (launchUrl) {
  //   event.waitUntil(clients.openWindow(launchUrl));
  // }
});

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
