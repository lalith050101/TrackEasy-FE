document.addEventListener("DOMContentLoaded", (e) => {
  console.log("inside event listener");
  let token = "Bearer " + JSON.parse(localStorage.getItem("userstatus")).token;

  fetch("http://localhost:8080/company/getAllJobs", {
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
          temp += "<td>" + job.companyName + "</td>";
          temp += "<td>" + job.jobType + "</td>";
          temp += "<td>" + job.jobTitle + "</td>";
          temp += "<td>" + job.eligibleBatch + "</td>";
          temp += "<td>" + job.eligibleDepartments + "</td>";
          temp += "<td>Rs. " + job.salary + "</td>";

          temp += `<td><button class="view" onclick='viewJobDetails(${job.jobId})'><div class="i"><i class="fas fa-sign-in-alt"></i></div></button></td></tr>`;
        });
        document.getElementById("jobs").innerHTML = temp;
      }
    })
    .catch((error) => console.log("ERROR" + error));
});

function viewJobDetails(jobId) {
  console.log("jobid new");
  //window.location = "JobDetails.html?jobId=" + jobId;
}
