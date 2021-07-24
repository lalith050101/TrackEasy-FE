const inputs = document.querySelectorAll(".input");

function addcl() {
  let parent = this.parentNode.parentNode;
  parent.classList.add("focus");
}

function remcl() {
  let parent = this.parentNode.parentNode;
  if (this.value == "") {
    parent.classList.remove("focus");
  }
}

inputs.forEach((input) => {
  input.addEventListener("focus", addcl);
  input.addEventListener("blur", remcl);
});

const email = document.getElementById("email");
const password = document.getElementById("password");
const login = document.getElementById("login");

function loginfn(e) {
  e.preventDefault();
  console.log("inside event listener");
  var emailVal = email.value;
  var passwordVal = password.value;

  fetch("https://track-easy.herokuapp.com/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({
      email: emailVal,
      password: passwordVal,
    }),
  })
    .then((res) => {
      if (res.ok) {
        console.log("success");
        return res.json();
      } else if (res.status === 401) {
        console.log("wrong creds");
        document.getElementById("wrongCredentials").style.visibility =
          "visible";

        return Promise.reject(res);
      }
      return Promise.reject(res);
    })
    .then((data) => {
      localStorage.setItem("userstatus", JSON.stringify(data));

      var x = JSON.parse(localStorage.getItem("userstatus"));
      console.log(x.role);
      if (x.role === "admin") window.location = "AdminHomePage.html";
      else if (x.role === "student") window.location = "StudentHomePage.html";
      else if (x.role === "company") window.location = "CompanyHomePage.html";
    })
    .catch((error) => console.log("can't able to login"));
}
