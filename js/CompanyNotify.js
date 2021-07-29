function notify(e) {
  e.preventDefault();
  console.log("inside event listener");
  let title = document.getElementById("title").value;
  let description = document.getElementById("description").value;

  const queryString = window.location.search;

  const urlParams = new URLSearchParams(queryString);

  const jobId = urlParams.get("jobId");

  console.log(jobId);

  let token = "Bearer " + JSON.parse(localStorage.getItem("userstatus")).token;

  fetch("https://track-easy.herokuapp.com/company/notifyStudents", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      Authorization: token,
    },
    body: JSON.stringify({
      jobId: jobId,
      title: title,
      description: description,
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
