var adminpage = document.getElementById("adminViewStudents");
console.log("inside adminViewStudents");

document.addEventListener("DOMContentLoaded", (e) => {
  console.log("inside event listener");
  let token = "Bearer " + JSON.parse(localStorage.getItem("userstatus")).token;

  fetch("https://track-easy.herokuapp.com//admin/getAllCompanies", {
    method: "GET",
    headers: {
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
      localStorage.setItem("jobsList", JSON.stringify(data));

      if (data.length > 0) {
        var temp = "";

        data.forEach((company) => {
          temp += "<tr>";
          temp += "<td>" + company.username + "</td>";
          temp += "<td>" + company.email + "</td>";
          temp += "<td>" + company.mobileNumber + "</td></tr>";
        });
        document.getElementById("students").innerHTML = temp;
      }
    })
    .catch((error) => console.log("ERROR" + error));
});
