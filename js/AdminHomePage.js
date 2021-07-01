var adminpage = document.getElementById("adminpage");
console.log("inside adminhomepage");

document.addEventListener("DOMContentLoaded", (e) => {
  console.log("inside event listener");
  let token = "Bearer " + JSON.parse(localStorage.getItem("userstatus")).token;

  fetch("https://track-easy.herokuapp.com/admin/getAllJobs", {
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

        data.forEach((job) => {
          temp += "<tr>";
          // temp += "<td>" + job.jobId + "</td>";
          temp += "<td>" + job.companyName + "</td>";
          temp += "<td>" + job.jobType + "</td>";
          temp += "<td>" + job.jobTitle + "</td>";
          temp += "<td>" + job.eligibleBatch + "</td>";
          temp += "<td>" + job.eligibleDepartments + "</td>";
          temp += "<td>" + job.salary + "</td></tr>";
        });
        document.getElementById("jobs").innerHTML = temp;
      }
    })
    .catch((error) => console.log("ERROR" + error));
});
