		
		var partNowOpened = 1;
		var passwdClick = 0;

		var signInC = document.getElementById("signInC");
		var usernameAndEmailC = document.getElementById("usernameAndEmailC");
		var usernameC = document.getElementById("usernameC");
		var usernameInput = document.getElementById("usernameInput");
		var changeToEmailBtn = document.getElementById("useEmailToSignInBtn");
		var emailC = document.getElementById("emailC");
		var emailInput = document.getElementById("emailInput");
		var changeToUserNBtn = document.getElementById("useUsernameToSignInBtn");
		var passwordInput = document.getElementById("passwordInput");

		usernameAndEmailC.style.width = (signInC.offsetWidth * 2) + "px";
		usernameC.style.width = signInC.offsetWidth + "px";
		emailC.style.width =  signInC.offsetWidth + "px";
		NowOpenedPartStyling();
		BtnsEvents();

		function BtnsEvents() {
			changeToEmailBtn.addEventListener("click", ChangeSignInInfo);
			changeToUserNBtn.addEventListener("click", ChangeSignInInfo);
			document.getElementById("showMePasswdImageBtn").addEventListener("click", PasswordClick);
			document.getElementById("signInBtn").addEventListener("click", SignInClick);
		}

		function ChangeSignInInfo() {

			if(partNowOpened == 1) {

				partNowOpened = 2;
			}
			else if(partNowOpened == 2) {

				partNowOpened = 1;
			}

			NowOpenedPartStyling();
		}

		function PasswordClick() {

			if(passwdClick) {

				passwdClick = 0;
			}
			else if(!passwdClick) {

				passwdClick = 1;
			}

			CheckPasswordClickForPic();
		}

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

		function SignInClick() {
			ConfigFirebaseUserLogIn();
		}

		function NowOpenedPartStyling() {

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

		//sessionStorage.clear();