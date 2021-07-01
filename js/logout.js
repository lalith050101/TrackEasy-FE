logout.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("inside adminhomepage logout event listener");

  let token = "Bearer " + JSON.parse(localStorage.getItem("userstatus")).token;

  fetch("https://track-easy.herokuapp.com//logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      Authorization: token,
    },
  })
    .then((res) => {
      if (res.ok) {
        console.log("success");
        return res.json();
      } else {
        console.log("not successful");
      }
    })
    .then((data) => {
      localStorage.clear();

      window.location = "index.html";
    })
    .catch((error) => console.log("ERROR" + error));
});
