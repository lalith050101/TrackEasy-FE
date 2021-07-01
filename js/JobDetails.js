document.addEventListener("DOMContentLoaded", (e) => {
  console.log("inside event listener");
  let token = "Bearer " + JSON.parse(localStorage.getItem("userstatus")).token;

  const queryString = window.location.search;

  const urlParams = new URLSearchParams(queryString);

  const jobId = urlParams.get("jobId");

  console.log(jobId);

  fetch("http://localhost:8080/student/getJobDetails/" + jobId, {
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
      localStorage.setItem("jobDetails", JSON.stringify(data));

      document.getElementById("companyName").innerHTML = data.companyName;
      document.getElementById("jobTitle").innerHTML = data.jobTitle;
      document.getElementById("jobType").innerHTML = data.jobType;
      document.getElementById("jobDescription").innerHTML = data.jobDescription;
      document.getElementById("jobLocation").innerHTML = data.jobLocation;
      document.getElementById("eligibility").innerHTML = data.eligibility;
      document.getElementById("eligibleBatch").innerHTML = data.eligibleBatch;
      document.getElementById("eligibleDepartments").innerHTML =
        data.eligibleDepartments;
      document.getElementById("minTenthPercentage").innerHTML =
        data.minTenthPercentage;
      document.getElementById("minTwelfthPercentage").innerHTML =
        data.minTwelfthPercentage;
      document.getElementById("minDegreePercentage").innerHTML =
        data.minDegreePercentage;
      document.getElementById("maxStandingArrears").innerHTML =
        data.maxStandingArrears;
      document.getElementById("maxHistoryOfArrears").innerHTML =
        data.maxHistoryOfArrears;
      document.getElementById("registrationLastDate").innerHTML =
        data.registrationLastDate;
      document.getElementById("campusDate").innerHTML = data.campusDate;
      // document.getElementById("jobRoles").innerHTML = "";
      // document.getElementById("skills").innerHTML = "";
      document.getElementById("salary").innerHTML = data.salary;
      document.getElementById(
        "applyButton"
      ).innerHTML = `<button onclick='applyJob(${data.jobId})'>Apply</button>`;
    })
    .catch((error) => console.log("ERROR" + error));
});

function applyJob(jobId) {
  let token = "Bearer " + JSON.parse(localStorage.getItem("userstatus")).token;

  fetch("http://localhost:8080/student/applyJob/" + jobId, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      Authorization: token,
    },
    body: JSON.stringify({}),
  })
    .then((res) => {
      if (res.ok) {
        console.log("apply success");
        document.getElementById("applicationStatus").innerHTML =
          "Successfully Applied";
      } else {
        console.log("not successful");
      }
    })
    .catch((error) => console.log("ERROR" + error));
}
