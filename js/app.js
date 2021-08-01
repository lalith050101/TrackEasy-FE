if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("../firebase-messaging-sw.js", { scope: "/" })
      .then(() => {
        console.log("😊 Service Worker Registered");
      })
      .catch((err) => {
        console.log("😢 Registration Failed!", err);
      });
  });
}
