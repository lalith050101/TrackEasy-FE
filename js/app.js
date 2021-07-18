if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("../sw.js")
      .then(() => {
        console.log("😊 Service Worker Registered");
      })
      .catch((err) => {
        console.log("😢 Registration Failed!", err);
      });
  });
}

// let deferredPrompt;
// window.addEventListener("beforeinstallprompt", (e) => {
//   console.log("inside beforeinstallprompt");
//   //prevent chrome 67 or earlier from automatically showing prompt
//   e.preventDefault();
//   //stash the event so it can be triggered later
//   deferredPrompt = e;
//   //updated UI notify the user they can add to home screen
//   btnAdd.style.display = "block";
// });

// btnAdd.addEventListener("click", (e) => {
//   deferredPrompt.prompt();
//   deferredPrompt.userChoice.then((choiceResult) => {
//     if (choiceResult.outcome === "accepted") {
//       console.log("User accepted add to HS prompt");
//     }
//     deferredPrompt = null;
//   });
// });

// window.addEventListener("appinstalled", (evt) => {
//   app.logEvent("a2hs", "installed");
// });
