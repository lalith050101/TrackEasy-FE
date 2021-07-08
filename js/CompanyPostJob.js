function postJobfn(e) {
  e.preventDefault();
  console.log("inside event listener");
  let companyName = document.getElementById("companyName").value;
  let jobType = document.getElementById("jobType").value;
  let jobTitle = document.getElementById("jobTitle").value;
  let jobDescription = document.getElementById("jobDescription").value;
  let jobLocation = document.getElementById("jobLocation").value;
  let eligibility = document.getElementById("eligibility").value;
  let eligibleBatch = document.getElementById("eligibleBatch").value;

  let departments = "";
  let markedCheckbox = document.getElementsByName("dept");
  for (var checkbox of markedCheckbox) {
    if (checkbox.checked) departments += checkbox.value + ",";
  }
  departments = departments.slice(0, -1);
  console.log("depts " + departments);

  let eligibleDepartments = departments;

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
  let salary = document.getElementById("salary").value;
  let registrationLastDate = document.getElementById(
    "registrationLastDate"
  ).value;
  let campusDate = document.getElementById("campusDate").value;

  let token = "Bearer " + JSON.parse(localStorage.getItem("userstatus")).token;

  fetch("https://track-easy.herokuapp.com/company/postJob", {
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
      salary: salary,
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
}
