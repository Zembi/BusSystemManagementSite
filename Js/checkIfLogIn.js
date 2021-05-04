//GLOBAL JS FILE THAT CHECKS IF A USER IS ALREADY LOGGED IN, IN CURRENT SESSION 
//AND PERFORM THE ANALOG ACTION
Check();

function Check() {
	if(window.location.pathname.includes("Admin")) {
		if(sessionStorage.getItem("userStatus") == null) {
			window.location.href = "../Index";
		}
		else if(sessionStorage.getItem("userStatus") == "employee") {
			window.location.href = "../Employee";
		}
	}
	else if(window.location.pathname.includes("Employee")) {
		if(sessionStorage.getItem("userStatus") == null) {
			window.location.href = "../Index";
		}
		else if(sessionStorage.getItem("userStatus") == "admin") {
			window.location.href = "../Admin";
		}
	}
	else {
		if(sessionStorage.getItem("userStatus") == "admin") {
			window.location.href = "../Admin";
		}
		else if(sessionStorage.getItem("userStatus") == "employee") {
			window.location.href = "../Employee";
		}
	}
}