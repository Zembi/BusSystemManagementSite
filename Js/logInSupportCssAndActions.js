
//VARIABLES INITIALIZE
var signInC = document.getElementById("signInC");
var usernameAndEmailC = document.getElementById("usernameAndEmailC");
var usernameC = document.getElementById("usernameC");
var usernameInput = document.getElementById("usernameInput");
var changeToEmailBtn = document.getElementById("useEmailToSignInBtn");
var emailC = document.getElementById("emailC");
var emailInput = document.getElementById("emailInput");
var changeToUserNBtn = document.getElementById("useUsernameToSignInBtn");
var passwordInput = document.getElementById("passwordInput");

var partNowOpened = 1;
var passwdClick = 0;

StartLogInProccess();

//HEART OF ALL FUNCTIONS IN THIS FILE
function StartLogInProccess() {
	//FIXING SOME CONTAINERS SIZES
	usernameAndEmailC.style.width = (signInC.offsetWidth * 2) + "px";
	usernameC.style.width = signInC.offsetWidth + "px";
	emailC.style.width =  signInC.offsetWidth + "px";
	
	//MAIN EVENTS
	BtnsEvents();
	NowOpenedPartStyling();
}



//*(1)GIVE BUTTONS 
function BtnsEvents() {
	changeToEmailBtn.addEventListener("click", ChangeSignInInfo);
	changeToUserNBtn.addEventListener("click", ChangeSignInInfo);

	document.getElementById("showMePasswdImageBtn").addEventListener("click", PasswordClick);
	document.getElementById("signInBtn").addEventListener("click", SignInClick);
	
	NoWhiteSpaceInInput("usernameInput");
	NoWhiteSpaceInInput("emailInput");
}

//(1)->EVENT THAT CHANGES THE LOG IN CHOICE AND THEN TRIGGERS THE FUNCTION THAT WILL CHANGE THE VIEW ON THE SCREEN
function ChangeSignInInfo() {
	if(partNowOpened == 1) {
		partNowOpened = 2;
	}
	else if(partNowOpened == 2) {
		partNowOpened = 1;
	}

	NowOpenedPartStyling();
}

//(1)->EVENT THAT TRIGGERS THROUGH AN IMAGE BUTTOn WHEN USER WANTS TO REVEAL THE PASSWORD THAT THEY TYPED IN INPUT FIELD
function PasswordClick() {
	if(passwdClick) {
		passwdClick = 0;
	}
	else if(!passwdClick) {
		passwdClick = 1;
	}

	CheckPasswordClickForPic();
}

//(1)->CHECKS THE SITUATION OF PASSWORD FIELD(IF IT IS HIDDEN OR REVEALED) AND ADJUST THE VIEW OF THE INPUT FIELD
function CheckPasswordClickForPic() {
	var imgBtn = document.getElementById("showMePasswdImageBtn");
	var img = document.getElementById("showMePasswdImg");

	if(passwdClick) {
		imgBtn.title = "Click&Hide";
		passwordInput.type = "text";
		img.style.content = "url('../Assets/passwdEyeOpenHover.png')";
		imgBtn.onmousemove = function () {
			img.style.content = "url('../Assets/passwdEyeOpenHover.png')";
		}
		imgBtn.onmouseout = function () {
			img.style.content = "url('../Assets/passwdEyeOpen.png')";
		}
	}
	else if(!passwdClick) {
		imgBtn.title = "Click&See";
		passwordInput.type = "password";
		img.style.content = "url('../Assets/passwdEyeClosedHover.png')";
		imgBtn.onmousemove = function () {
			img.style.content = "url('../Assets/passwdEyeClosedHover.png')";
		}
		imgBtn.onmouseout = function () {
			img.style.content = "url('../Assets/passwdEyeClosed.png')";
		}
	}
}

//(1)->SIGN IN ACTION AFTER BUTTON IS PRESSED TO SIGN IN(FIRST CHECKS IF EVERY FIELD IS OK AND IF DATA MATCH SERVER'S DATABASE INFO CONTINUES INTO THE SYSTEM)
function SignInClick() {
	var error = 0;

	if(partNowOpened == 1) {
		if(usernameInput.value == "") {
			error = 1;
			InputChangeOnClick(usernameInput);
		}
		else {
			usernameInput.placeholder = "";
		}
	}
	else {
		if(emailInput.value == "") {
			error = 1;
			InputChangeOnClick(emailInput);
		}
		else {
			emailInput.placeholder = "";
		}
	}

	if(passwordInput.value == "") {
		error = 1;
		InputChangeOnClick(passwordInput);
	}
	else {
		passwordInput.placeholder = "";
	}

	if(!error) {
		//OBJECT THAT IS ABOUT TO SEND
		var userToSignIn = {
	    	'username': usernameInput.value,
	    	'email': emailInput.value,
	    	'password': passwordInput.value,
	    	'partNow': partNowOpened
		};

		userToSignIn = JSON.stringify(userToSignIn);

		$.ajax({
			type: 'POST',
			url: "../Php/signInPhp.php",
			data: {userTryToSignIn: userToSignIn},
			success: function(data) {
				//alert(data);
				if(data == "1") {
					window.location.href = "../Admin";
				}
				else {
					alert("Λάθος στοιχεία! Ξαναπροσπαθήστε")
				}
			}
		});
	}
}

//(1)->INITIALIZE A FIELD'S STYLE(BORDER) AND VALUE(PLACEHOLDER)
function InputChangeOnClick(inputElement) {
	inputElement.style.border = "2px solid rgb(140, 0, 0)";
	inputElement.placeholder = "Πληκτρολογήστε κάτι..";
}

//(1)->NO WHITE SPACE IN INPUT WITH ID = id
function NoWhiteSpaceInInput(id) {
	$("#" + id).on({
		keydown: function(e) {
			if (e.which === 32)
				return false;
		},
		change: function() {
			this.value = this.value.replace(/\s/g, "");
		}
	});
}



//*(2)VIEW OF LOG-IN SCREEN, THAT DEPENDS ON THE LOG-IN CHOICE OF THE USER (USERNAME OR EMAIL LOG-IN)
function NowOpenedPartStyling() {
	//USERNAME CHOSEN
	if(partNowOpened == 1) {
		usernameInput.tabIndex = 1;
		changeToEmailBtn.tabIndex = 1;
		changeToUserNBtn.blur();
		emailInput.tabIndex = -1;
		changeToUserNBtn.tabIndex = -1;
		
		var t = usernameC.offsetWidth + "px";
		usernameAndEmailC.style.transform = "translate(0, 0)";
		setTimeout(function () {
			usernameInput.focus();
			emailInput.value = "";
		}, 300);

		usernameInput.style.border = "1px solid rgb(111, 142, 171)";
		usernameInput.addEventListener("focus", function () {
  			this.style.border = "2px solid rgb(111, 142, 171)";  
		});
		usernameInput.addEventListener("focusout", function () {
  			this.style.border = "1px solid rgb(111, 142, 171)"; 
		});

		changeToEmailBtn.style.color = "rgb(131, 131, 175)";

		emailInput.style.border = "1px solid rgb(111, 142, 171)";
		emailInput.addEventListener("focus", function () {
  			this.style.border = "2px solid rgb(111, 142, 171)";  
		});
		emailInput.addEventListener("focusout", function () {
  			this.style.border = "1px solid rgb(111, 142, 171)"; 
		});

		changeToUserNBtn.style.color = "rgb(131, 131, 175)";

		passwordInput.style.border = "1px solid rgb(111, 142, 171)";
		passwordInput.addEventListener("focus", function () {
  			this.style.border = "2px solid rgb(111, 142, 171)";  
		});
		passwordInput.addEventListener("focusout", function () {
  			this.style.border = "1px solid rgb(111, 142, 171)"; 
		});
	}
	//EMAIL CHOSEN
	else if(partNowOpened == 2) {
		usernameInput.tabIndex = -1;
		changeToEmailBtn.tabIndex = -1;
		changeToEmailBtn.blur();
		emailInput.tabIndex = 1;
		changeToUserNBtn.tabIndex = 1;
		var t = usernameC.offsetWidth + "px";
		usernameAndEmailC.style.transform = "translate(-" + t + ", 0)";
		setTimeout(function () {
			emailInput.focus();
			usernameInput.value = "";
		}, 300);

		usernameInput.style.border = "1px solid rgb(111, 142, 171)";
		usernameInput.addEventListener("focus", function () {
  			this.style.border = "2px solid rgb(111, 142, 171)";  
		});
		usernameInput.addEventListener("focusout", function () {
  			this.style.border = "1px solid rgb(111, 142, 171)"; 
		});

		changeToEmailBtn.style.color = "rgb(131, 131, 175)";

		emailInput.style.border = "1px solid rgb(111, 142, 171)";
		emailInput.addEventListener("focus", function () {
  			this.style.border = "2px solid rgb(111, 142, 171)";  
		});
		emailInput.addEventListener("focusout", function () {
  			this.style.border = "1px solid rgb(111, 142, 171)"; 
		});

		changeToUserNBtn.style.color = "rgb(131, 131, 175)";

		passwordInput.style.border = "1px solid rgb(111, 142, 171)";
		passwordInput.addEventListener("focus", function () {
  			this.style.border = "2px solid rgb(111, 142, 171)";  
		});
		passwordInput.addEventListener("focusout", function () {
  			this.style.border = "1px solid rgb(111, 142, 171)"; 
		});
	}
}