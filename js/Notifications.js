async function init() {
  // const registration = await navigator.serviceWorker.register("/sw.js");
  // await navigator.serviceWorker.ready;
  firebase.initializeApp({
    apiKey: "AIzaSyDWdA0CLOO17kPItEDjL0-WXDzxCuRULLE",
    projectId: "trackeasy-app",
    messagingSenderId: "1092414320287",
    appId: "1:1092414320287:web:fa69df1caa12c86e507caa",
  });

  const messaging = firebase.messaging();
  // messaging.usePublicVapidKey(
  //   "BKvKKRsnGZx8fHjNMYl87YjlybkC7rTK8eyVo9KGpCHKLqmrQFzgdu-_cfqfqnfV2MK9eEmS-IAq57wp7F74uxs"
  // );
  // messaging.useServiceWorker(registration);

  try {
    await messaging.requestPermission();
  } catch (e) {
    console.log("Unable to get permission", e);
    return;
  }

  const currentToken = await messaging.getToken();
  fetch("https://track-easy.herokuapp.com/register", {
    method: "POST",
    body: currentToken,
  }).then((res) => {
    if (res.ok) {
      console.log("success register: ");
    } else {
      console.log("register not successful");
    }
  });
  //   showData();

  messaging.onTokenRefresh(async () => {
    console.log("token refreshed");
    const newToken = await messaging.getToken();
    fetch("https://track-easy.herokuapp.com/register", {
      method: "POST",
      body: newToken,
    }).then((res) => {
      if (res.ok) {
        console.log("success refresh register");
      } else {
        console.log("refresh register not successful");
      }
    });
  });

  let enableForegroundNotification = true;
  messaging.onMessage(function (payload) {
    console.log("Message received. ");

    if (enableForegroundNotification) {
      // let notification = payload.data;
      // navigator.serviceWorker.getRegistrations().then((registration) => {
      //   registration[0].showNotification(notification.title);
      // });

      navigator.serviceWorker.getRegistrations().then((registration) => {
        console.log(" Received foreground message ");
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

        return registration[0].showNotification(
          notificationTitle,
          notificationOptions
        );
      });
    }
  });

  self.addEventListener("notificationclick", (event) => {
    console.log("foreground Notification click Received.", event);
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
}

init();
