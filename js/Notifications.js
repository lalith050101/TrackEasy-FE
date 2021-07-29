async function init() {
  const registration = await navigator.serviceWorker.register("/sw.js");
  await navigator.serviceWorker.ready;
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
  messaging.useServiceWorker(registration);

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
      console.log("success register");
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
}

init();
