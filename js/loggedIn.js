document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("userstatus") == null) {
    window.location = "index.html";
  }
});
