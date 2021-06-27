postJob.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("inside event listener");
  let companyName = document.getElementById("companyName").value;
  let jobType = document.getElementById("jobType").value;
  let jobTitle = document.getElementById("jobTitle").value;
  let jobDescription = document.getElementById("jobDescription").value;
  let jobLocation = document.getElementById("jobLocation").value;
  let eligibility = document.getElementById("eligibility").value;
  let eligibleBatch = document.getElementById("eligibleBatch").value;
  let eligibleDepartments = document.getElementById(
    "eligibleDepartments"
  ).value;
  let minTenthPercentage = document.getElementById("minTenthPercentage").value;
  let minTwelfthPercentage = document.getElementById(
    "minTwelfthPercentage"
  ).value;
  let minDegreePercentage = document.getElementById(
    "minDegreePercentage"
  ).value;
  let maxStandingArrears = document.getElementById("maxStandingArrears").value;
  let maxHistoryOfArrears = document.getElementById(
    "maxHistoryOfArrears"
  ).value;
  let Salary = document.getElementById("Salary").value;
  let registrationLastDate = document.getElementById(
    "registrationLastDate"
  ).value;
  let campusDate = document.getElementById("campusDate").value;

  let token = "Bearer " + JSON.parse(localStorage.getItem("userstatus")).token;

  fetch("http://localhost:8080/company/postJob", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      Authorization: token,
    },
    body: JSON.stringify({
      companyName: companyName,
      jobType: jobType,
      jobTitle: jobTitle,
      jobDescription: jobDescription,
      jobLocation: jobLocation,
      eligibility: eligibility,
      eligibleBatch: eligibleBatch,
      eligibleDepartments: eligibleDepartments,
      minTenthPercentage: minTenthPercentage,
      minTwelfthPercentage: minTwelfthPercentage,
      minDegreePercentage: minDegreePercentage,
      maxStandingArrears: maxStandingArrears,
      maxHistoryOfArrears: maxHistoryOfArrears,
      Salary: Salary,
      registrationLastDate: registrationLastDate,
      campusDate: campusDate,
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
      window.location = "CompanyHomePage.html";
    })
    .catch((error) => console.log("ERROR" + error));
});
