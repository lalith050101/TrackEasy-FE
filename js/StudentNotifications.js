document.addEventListener("DOMContentLoaded", (e) => {
  console.log("inside event listener");
  let token = "Bearer " + JSON.parse(localStorage.getItem("userstatus")).token;

  fetch("https://track-easy.herokuapp.com/student/getNotifications", {
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
      if (data.length === 0) {
        document.getElementById("message").innerHTML = "<br>No Notifications";
      }
      if (data.length > 0) {
        var temp = "";

        data.forEach((notification) => {
          temp += "<tr>";
          temp += "<td>" + notification.senderName + "</td>";
          temp += "<td>" + notification.title + "</td>";
          temp += "<td>" + notification.description + "</td>";

          temp += `<td><button class="view"  onclick='viewJobDetails(${notification.jobId})'><div class="i"><i class="fas fa-sign-in-alt"></i></div></button></td></tr>`;
        });
        document.getElementById("notifications").innerHTML = temp;
      }
    })
    .catch((error) => console.log("ERROR" + error));
});

function viewJobDetails(jobId) {
  console.log("jobid new");
  window.location = "JobDetails.html?jobId=" + jobId;
}
