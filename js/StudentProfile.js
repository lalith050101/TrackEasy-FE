document.addEventListener("DOMContentLoaded", (e) => {
  console.log("inside event listener");
  let token = "Bearer " + JSON.parse(localStorage.getItem("userstatus")).token;
  console.log("inside student profile");
  fetch("https://track-easy.herokuapp.com//student/getStudent", {
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
    .then((job) => {
      console.log(job.email);

      document.getElementById("email").value = job.email;
      document.getElementById("regNo").value = job.regNo;
      document.getElementById("firstName").value = job.firstName;
      document.getElementById("lastName").value = job.lastName;
      document.getElementById("department").value = job.department;
      document.getElementById("batch").value = job.batch;
      document.getElementById("tenthPercentage").value =
        job.tenthPercentage.toFixed(2);
      document.getElementById("tenthBoardOfStudy").value =
        job.tenthBoardOfStudy;
      document.getElementById("tenthInstitution").value = job.tenthInstitution;
      document.getElementById("tenthYearOfPass").value = job.tenthYearOfPass;
      document.getElementById("twelfthPercentage").value =
        job.twelfthPercentage.toFixed(2);
      document.getElementById("twelfthBoardOfStudy").value =
        job.twelfthBoardOfStudy;
      document.getElementById("twelfthInstitution").value =
        job.twelfthInstitution;
      document.getElementById("twelfthYearOfPass").value =
        job.twelfthYearOfPass;
      document.getElementById("degreePercentage").value =
        job.degreePercentage.toFixed(2);
      document.getElementById("degreeUniversity").value = job.degreeUniversity;
      document.getElementById("degreeInstitution").value =
        job.degreeInstitution;
      document.getElementById("degreeYearOfPass").value = job.degreeYearOfPass;
      document.getElementById("standingArrears").value = job.standingArrears;
      document.getElementById("historyOfArrears").value = job.historyOfArrears;
      document.getElementById("project1Description").value =
        job.project1Description;
      document.getElementById("project2Description").value =
        job.project2Description;
      //   document.getElementById("jobRolesInterested").value =
      //     job.jobRolesInterested;
      //   document.getElementById("skills").value = job.skills;
    })
    .catch((error) => console.log("ERROR" + error));
});

editProfile.addEventListener("click", (e) => {
  e.preventDefault();
  var inputs = document.getElementsByTagName("input");
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].disabled = false;
  }
  document.getElementById("email").disabled = true;
  document.getElementById("regNo").disabled = true;
  var textareas = document.getElementsByTagName("textarea");
  for (var i = 0; i < textareas.length; i++) {
    textareas[i].disabled = false;
  }
});

function updateProfilefn(e) {
  e.preventDefault();
  var inputs = document.getElementsByTagName("input");
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].disabled = true;
  }
  var textareas = document.getElementsByTagName("textarea");
  for (var i = 0; i < textareas.length; i++) {
    textareas[i].disabled = true;
  }

  let regNo = document.getElementById("regNo").value;
  let email = document.getElementById("email").value;
  let firstName = document.getElementById("firstName").value;
  let lastName = document.getElementById("lastName").value;
  let department = document.getElementById("department").value;
  let batch = document.getElementById("batch").value;
  let tenthPercentage = document.getElementById("tenthPercentage").value;
  let tenthBoardOfStudy = document.getElementById("tenthBoardOfStudy").value;
  let tenthInstitution = document.getElementById("tenthInstitution").value;
  let tenthYearOfPass = document.getElementById("tenthYearOfPass").value;
  let twelfthPercentage = document.getElementById("twelfthPercentage").value;
  let twelfthBoardOfStudy = document.getElementById(
    "twelfthBoardOfStudy"
  ).value;
  let twelfthInstitution = document.getElementById("twelfthInstitution").value;
  let twelfthYearOfPass = document.getElementById("twelfthYearOfPass").value;
  let degreePercentage = document.getElementById("degreePercentage").value;
  let degreeUniversity = document.getElementById("degreeUniversity").value;
  let degreeInstitution = document.getElementById("degreeInstitution").value;
  let degreeYearOfPass = document.getElementById("degreeYearOfPass").value;
  let standingArrears = document.getElementById("standingArrears").value;
  let historyOfArrears = document.getElementById("historyOfArrears").value;
  let project1Description = document.getElementById(
    "project1Description"
  ).value;
  let project2Description = document.getElementById(
    "project2Description"
  ).value;

  let token = "Bearer " + JSON.parse(localStorage.getItem("userstatus")).token;

  fetch("https://track-easy.herokuapp.com//student/updateStudent", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      Authorization: token,
    },
    body: JSON.stringify({
      regNo: regNo,
      email: email,
      firstName: firstName,
      lastName: lastName,
      firstName: firstName,
      lastName: lastName,
      department: department,
      batch: batch,
      tenthPercentage: tenthPercentage,
      tenthBoardOfStudy: tenthBoardOfStudy,
      tenthInstitution: tenthInstitution,
      tenthYearOfPass: tenthYearOfPass,
      twelfthPercentage: twelfthPercentage,
      twelfthBoardOfStudy: twelfthBoardOfStudy,
      twelfthInstitution: twelfthInstitution,
      twelfthYearOfPass: twelfthYearOfPass,
      degreePercentage: degreePercentage,
      degreeUniversity: degreeUniversity,
      degreeInstitution: degreeInstitution,
      degreeYearOfPass: degreeYearOfPass,
      standingArrears: standingArrears,
      historyOfArrears: historyOfArrears,
      project1Description: project1Description,
      project2Description: project2Description,
    }),
  })
    .then((res) => {
      if (res.ok) {
        console.log("successfully updated");
        return res.json();
      } else {
        console.log("not successful");
      }
    })
    .then((data) => {
      window.location = "StudentHomePage.html";
    })
    .catch((error) => console.log("ERROR" + error));
}
