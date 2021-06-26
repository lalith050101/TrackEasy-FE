document.addEventListener("DOMContentLoaded", (e) => {
  console.log("inside event listener");
  let token = "Bearer " + JSON.parse(localStorage.getItem("userstatus")).token;
  console.log("inside student profile");
  fetch("http://localhost:8080/student/getStudent", {
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
      document.getElementById("tenthPercentage").value = job.tenthPercentage;
      document.getElementById("tenthBoardOfStudy").value =
        job.tenthBoardOfStudy;
      document.getElementById("tenthInstitution").value = job.tenthInstitution;
      document.getElementById("tenthYearOfPass").value = job.tenthYearOfPass;
      document.getElementById("twelfthPercentage").value =
        job.twelfthPercentage;
      document.getElementById("twelfthBoardOfStudy").value =
        job.twelfthBoardOfStudy;
      document.getElementById("twelfthInstitution").value =
        job.twelfthInstitution;
      document.getElementById("twelfthYearOfPass").value =
        job.twelfthYearOfPass;
      document.getElementById("degreePercentage").value = job.degreePercentage;
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
  console.log("inside editprofile event listener");

  document.getElementById("email").disabled = false;
  document.getElementById("regNo").disabled = false;
  document.getElementById("firstName").disabled = false;
  document.getElementById("lastName").disabled = false;
  document.getElementById("department").disabled = false;
  document.getElementById("batch").disabled = false;
  document.getElementById("tenthPercentage").disabled = false;
  document.getElementById("tenthBoardOfStudy").disabled = false;
  document.getElementById("tenthInstitution").disabled = false;
  document.getElementById("tenthYearOfPass").disabled = false;
  document.getElementById("twelfthPercentage").disabled = false;
  document.getElementById("twelfthBoardOfStudy").disabled = false;
  document.getElementById("twelfthInstitution").disabled = false;
  document.getElementById("twelfthYearOfPass").disabled = false;
  document.getElementById("degreePercentage").disabled = false;
  document.getElementById("degreeUniversity").disabled = false;
  document.getElementById("degreeInstitution").disabled = false;
  document.getElementById("degreeYearOfPass").disabled = false;
  document.getElementById("standingArrears").disabled = false;
  document.getElementById("historyOfArrears").disabled = false;
  document.getElementById("project1Description").disabled = false;
  document.getElementById("project2Description").disabled = false;
  //   document.getElementById("jobRolesInterested").value =
  //     job.jobRolesInterested;
  //   document.getElementById("skills").value = job.skills;
  console.log("inside event listener");
});

editProfile.addEventListener("click", (e) => {
  e.preventDefault();
  var inputs = document.getElementsByTagName("input");
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].disabled = false;
  }
  var textareas = document.getElementsByTagName("textarea");
  for (var i = 0; i < textareas.length; i++) {
    textareas[i].disabled = false;
  }
});

updateProfile.addEventListener("click", (e) => {
  e.preventDefault();
  var inputs = document.getElementsByTagName("input");
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].disabled = true;
  }
  var textareas = document.getElementsByTagName("textarea");
  for (var i = 0; i < textareas.length; i++) {
    textareas[i].disabled = true;
  }
});
