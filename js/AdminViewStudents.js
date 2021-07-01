var adminpage = document.getElementById("adminViewStudents");
console.log("inside adminViewStudents");

document.addEventListener("DOMContentLoaded", (e) => {
  console.log("inside event listener");
  let token = "Bearer " + JSON.parse(localStorage.getItem("userstatus")).token;

  fetch("http://localhost:8080/admin/getAllStudents", {
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

        data.forEach((student) => {
          temp += "<tr>";
          temp += "<td>" + student.email + "</td>";
          temp += "<td>" + student.regNo + "</td>";
          temp += "<td>" + student.firstName + "</td>";
          temp += "<td>" + student.lastName + "</td>";
          temp += "<td>" + student.department + "</td>";
          temp += "<td>" + student.batch + "</td>";
          temp += "<td>" + student.tenthPercentage.toFixed(2) + "</td>";
          temp += "<td>" + student.twelfthPercentage.toFixed(2) + "</td>";
          temp += "<td>" + student.degreePercentage.toFixed(2) + "</td>";
          temp += "<td>" + student.standingArrears + "</td>";
          temp += "<td>" + student.historyOfArrears + "</td></tr>";
        });
        document.getElementById("students").innerHTML = temp;
      }
    })
    .catch((error) => console.log("ERROR" + error));
});
