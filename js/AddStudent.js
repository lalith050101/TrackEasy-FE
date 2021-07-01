function addstudentfn(e) {
  e.preventDefault();
  console.log("inside event listener");
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let mobno = document.getElementById("mobno").value;
  let regno = document.getElementById("regno").value;
  let firstName = document.getElementById("fname").value;
  let lastName = document.getElementById("lname").value;
  let dept = document.getElementById("dept").value;
  let batch = document.getElementById("batch").value;
  let token = "Bearer " + JSON.parse(localStorage.getItem("userstatus")).token;

  fetch("https://track-easy.herokuapp.com//admin/addStudent", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      Authorization: token,
    },
    body: JSON.stringify({
      username: name,
      email: email,
      mobileNumber: mobno,
      regNo: regno,
      firstName: firstName,
      lastName: lastName,
      department: dept,
      batch: batch,
    }),
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
      window.location = "AdminHomePage.html";
    })
    .catch((error) => console.log("ERROR" + error));
}
