

addcompany.addEventListener('click', e => {

	e.preventDefault() 
	console.log("inside event listener");
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let mobno = document.getElementById('mobno').value;
    let token = 'Bearer '+JSON.parse(localStorage.getItem('userstatus')).token;
    
	fetch('http://localhost:8080/admin/addCompany',  { 
		
		method: 'POST',
		headers: {
			'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': token
		},
		body: JSON.stringify({
			username: name,
            email: email,
            password: password,
            mobileNumber: mobno
		})
	}).then( res => {
		if(res.ok) {
			console.log("success");
			return res.json();
		}
		else {
			console.log("not successful");
		}
		
	})
	.then(data => {

		window.location = "AdminHomePage.html";
		
	})
	.catch(error => console.log("ERROR"+error))
}

)