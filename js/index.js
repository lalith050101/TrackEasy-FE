const inputs = document.querySelectorAll(".input");


function addcl(){
	let parent = this.parentNode.parentNode;
	parent.classList.add("focus");
}

function remcl(){
	let parent = this.parentNode.parentNode;
	if(this.value == ""){
		parent.classList.remove("focus");
	}
}


inputs.forEach(input => {
	input.addEventListener("focus", addcl);
	input.addEventListener("blur", remcl);
});

const email = document.getElementById('email');
const password = document.getElementById('password');
const login = document.getElementById('login');

login.addEventListener('click', e => {

	e.preventDefault() 
	console.log("inside event listener");
	var emailVal = email.value;
	var passwordVal = password.value;

	fetch('http://localhost:8080/login',  { 
		
		method: 'POST',
		headers: {
			'Content-Type': 'application/json; charset=UTF-8'
		},
		body: JSON.stringify({
			email: emailVal,
			password: passwordVal
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
		console.log(data);
		localStorage.setItem('userstatus', JSON.stringify(data));
		window.location = "adminMainPage.html";
	})
	.catch(error => console.log("ERROR"+error))
}

)