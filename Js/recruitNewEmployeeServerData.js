
//VARIABLES INITIALIZE
var coverPageHelperC = document.getElementById("coverPageHelperC");
var alertInfoForCreatNewItemC = document.getElementById("alertInfoForCreatNewItemC");
var alertInfoForCreatNewItemTextC = document.getElementById("alertInfoForCreatNewItemTextC");
var alertInfoForCreatNewItemBtn = document.getElementById("alertInfoForCreatNewItemBtn");
var alertAddNewInfoC = document.getElementById("alertAddNewInfoC");
var addNewInfoTitleTextC = document.getElementById("addNewInfoTitleTextC");
var addNewInfoTextC = document.getElementById("addNewInfoTextC");
var yesAddNewInfoBtn = document.getElementById("yesAddNewInfoBtn");
var noAddNewInfoBtn = document.getElementById("noAddNewInfoBtn");
var searchEmployeeInpt = document.getElementById("searchEmployeeInpt");
var searchEmployeeBtn = document.getElementById("searchEmployeeBtn");
var titleOfContentC = document.getElementById("titleOfContentC");
var usernameInput = document.getElementById("usernameInput");
var usernameProblemC = document.getElementById("usernameProblemC");
var emailInput = document.getElementById("emailInput");
var emailProblemC = document.getElementById("emailProblemC");
var nameInput = document.getElementById("nameInput");
var nameProblemC = document.getElementById("nameProblemC");
var iconSlct = document.getElementById("iconSlct");
var iconProblemC = document.getElementById("iconProblemC");
var iconMenuC = document.getElementById("iconMenuC");
var iconMenuContentC = document.getElementById("iconMenuContentC");
var branchIdSlct = document.getElementById("branchIdSlct");
var branchIdProblemC = document.getElementById("branchIdProblemC");
var statusSlct = document.getElementById("statusSlct");
var statusProblemC = document.getElementById("statusProblemC");
var sexSlct = document.getElementById("sexSlct");
var sexProblemC = document.getElementById("sexProblemC");
var wageInput = document.getElementById("wageInput");
var wageProblemC = document.getElementById("wageProblemC");
var recruitmentDayInput = document.getElementById("recruitmentDayInput");
var recruitmentDayProblemC = document.getElementById("recruitmentDayProblemC");
var passwordInput = document.getElementById("passwordInput");
var passwordImgBtn = document.getElementById("passwordImgBtn");
var passwordImg = document.getElementById("passwordImg");
var passwordProblemC = document.getElementById("passwordProblemC");
var passwordRepeatInput = document.getElementById("passwordRepeatInput");
var retypePasswordImgBtn = document.getElementById("retypePasswordImgBtn");
var retypePasswordImg = document.getElementById("retypePasswordImg");
var passwordRepeatProblemC = document.getElementById("passwordRepeatProblemC");
var afmInput = document.getElementById("afmInput");
var afmProblemC = document.getElementById("afmProblemC");
var amkaInput = document.getElementById("amkaInput");
var amkaProblemC = document.getElementById("amkaProblemC");
var confirmRecruitEmployeeBtn = document.getElementById("confirmRecruitEmployeeBtn");

var passwdClickArray = [0, 0];
var errorArr = [1, 1, 1, 1, 1, 1, 1, 1];
var insertedEmployee = 0;

recruitNewEmployeeStart();

//HEART OF ALL FUNCTIONS IN THIS FILE
function recruitNewEmployeeStart() {
	FindTitleAndEmployeesAndCreateView();
	PasswordHideShowBtnsListeners();
	AddEventsAndCreateTheOptionsOfTheSelectElements();
	InputsCheckIfInfoEmptyWithEvents();
	InputsCheckWithServerIfInfoExist();
	RecruitNewEmployeeSearchBarStart();

	confirmRecruitEmployeeBtn.addEventListener("click", function() {
		CheckForConfirmRecruitEmployee();
	});

	wageInput.value = RoundDecimal(wageInput.value, 2);
}



//*(1)INIALITZE TITLE OF RECRUIT NEW EMPLOYEES CONTENT
function FindTitleAndEmployeesAndCreateView() {
	titleOfContentC.innerHTML = "ΠΡΟΒΟΛΗ ΚΑΙ ΕΠΕΞΕΡΓΑΣΙΑ ΣΤΟΙΧΕΙΩΝ ΥΠΑΛΛΗΛΩΝ";
}



//*(2)INITIALIZE OF BUTTONS OF PASSWORD INPUTS
function PasswordHideShowBtnsListeners() {
	passwordImgBtn.addEventListener("click", function() {
		PasswordClick(passwordInput, passwordImgBtn, passwordImg, 0);
	});
	retypePasswordImgBtn.addEventListener("click", function() {
		PasswordClick(passwordRepeatInput, retypePasswordImgBtn, retypePasswordImg, 1);
	});
}

//(2)->FOR CHANGING PASSWORD INPUT TO TEXT INPUT AND BACK. COUNTING AND SEND TO OTHER FUNCTION FOR IMAGE CHANGE
function PasswordClick(passwrdInpt, imgBtn, img, c) {
	if(passwdClickArray[c]) {

		passwdClickArray[c] = 0;
	}
	else if(!passwdClickArray[c]) {

		passwdClickArray[c] = 1;
	}

	CheckPasswordClickForPic(passwrdInpt, imgBtn, img, passwdClickArray[c]);
}

//(2)->CHANGE IMAGE WITH CLICK AND TYPE OF INPUT
function CheckPasswordClickForPic(passwrdInpt, imgBtn, img, passwdClick) {

	if(passwdClick) {
		imgBtn.title = "Click&Hide";
		passwrdInpt.type = "text";
		img.style.content = "url('../Assets/passwdEyeOpenHover.png')";
		imgBtn.onmousemove = function () {
			img.style.content = "url('../Assets/passwdEyeOpenHover.png')";
		 }
		imgBtn.onmouseout = function () {
			img.style.content = "url('../Assets/passwdEyeOpen3.png')";
		}
	}
	else if(!passwdClick) {
		imgBtn.title = "Click&See";
		passwrdInpt.type = "password";
		img.style.content = "url('../Assets/passwdEyeClosedHover.png')";
		imgBtn.onmousemove = function () {
			img.style.content = "url('../Assets/passwdEyeClosedHover.png')";
		}
		imgBtn.onmouseout = function () {
			img.style.content = "url('../Assets/passwdEyeClosed3.png')";
		}
	}
}



//*(3)CREATE ON THE SELECT ELEMENTS, THE OPTIONS NEEDED AND ADD EVENTS TO INPUTS NEEDED
function AddEventsAndCreateTheOptionsOfTheSelectElements() {
	//USERNAME NOT ALLOW SPACES
	usernameInput.addEventListener("keypress", function() {
		UsernameInputPreventSymbols();
	});

	//ICON SELECT MENU AND EVENTS FROM SEX INPUT VALUE
	CreateOptionsForIcons();
	sexSlct.addEventListener("change", function() {
		CreateOptionsForIcons();
	});
	iconSlct.addEventListener("focusin", function() {
		iconMenuC.style.display = "table";
		iconMenuContentC.style.backgroundImage = "url(../Assets/PersonType/" + getUserImageSrc(iconSlct.value) + ")";
	});
	iconSlct.addEventListener("focusout", function() {
		iconMenuC.style.display = "none";
	});
	iconSlct.addEventListener("change", function() {
		iconMenuContentC.style.backgroundImage = "url(../Assets/PersonType/" + getUserImageSrc(iconSlct.value) + ")";
	});

	//BRANCH ID SELECT MENU AND EVENTS
	BranchIdOptions();
	statusSlct.addEventListener("change", function() {
		BranchIdOptions();
	});

	branchIdSlct.addEventListener("change", function() {
		var optionTitle = this.options[this.selectedIndex].name;
		this.title = optionTitle;
	});

	//WAGE INPUT ONLY NUMBER AND DOT EVENTS
	wageInput.addEventListener("keypress", function() {
		OnlyNumberKey(event, "dot");
	});
	wageInput.oninput = function () {
		if (this.value.length > 15) {
			this.value = this.value.slice(0, 15); 
		}
	}

	afmInput.addEventListener("keypress", function() {
		OnlyNumberKey(event, "");
	});
	afmInput.oninput = function () {
		if (this.value.length > 9) {
			this.value = this.value.slice(0, 9); 
		}
	};

	amkaInput.addEventListener("keypress", function() {
		OnlyNumberKey(event, "");
	});
	amkaInput.oninput = function () {
		if (this.value.length > 11) {
			this.value = this.value.slice(0, 11); 
		}
	}

	//AUTO DATE RECRUITMENT DAY
	recruitmentDayInput.disabled = true;
	var date = new Date();
	let year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
	let month = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
	let day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
	var newDate = `${day} | ${month} | ${year}`;
	recruitmentDayInput.value = newDate;
}

//(3)->CREATE OPTIONS FOR ICON SELECT
function CreateOptionsForIcons() {
	iconSlct.innerHTML = "";
	//ICONS SELECT
	for(var i = 0; i < 5; i++) {
		var option = document.createElement("option");
		option.className = "inputRecruitOptions";
		if(sexSlct.value == "Άνδρας") {
			option.id = "male" + (i + 1);
		}
		else {
			option.id = "female" + (i + 1);
		}
		option.innerHTML = option.id;
		iconSlct.appendChild(option);
	}
}

//(3)->ICONS RETURN ANALOG IMAGE SRC
function getUserImageSrc(optionId) {
	var imgSrc = "";

	if(optionId == "male1") {
		imgSrc = "icons8_male_no1_40px.png";
	}
	else if(optionId == "male2") {
		imgSrc = "icons8_male_no2_40px.png";
	}
	else if(optionId == "male3") {
		imgSrc = "icons8_male_no3_40px.png";
	}
	else if(optionId == "male4") {
		imgSrc = "icons8_male_no4_40px.png";
	}
	else if(optionId == "male5") {
		imgSrc = "icons8_male_no5_40px.png";
	}
	else if(optionId == "female1") {
		imgSrc = "icons8_female_no1_40px.png";
	}
	else if(optionId == "female2") {
		imgSrc = "icons8_female_no2_40px.png";
	}
	else if(optionId == "female3") {
		imgSrc = "icons8_female_no3_40px.png";
	}
	else if(optionId == "female4") {
		imgSrc = "icons8_female_no4_40px.png";
	}
	else if(optionId == "female5") {
		imgSrc = "icons8_female_no5_40px.png";
	}
	else {
		imgSrc = "none";
	}

	return imgSrc; 
}

//(3)->BRANCH ID CREATE OPTIONS FOR SELECT
function BranchIdOptions() {
	var branchArray = [];
	var statusNow = TranslateStatusTo("english", statusSlct.value);

	branchIdSlct.innerHTML = "";

	if(statusNow == "Admin") {
		var option = document.createElement("option");
		option.id = 0;
		option.innerHTML = "#0";
		option.name = "Διαχειριστική γραμμή";
		option.title = option.name;
		branchIdSlct.appendChild(option);
		
		var optionTitle = branchIdSlct.options[branchIdSlct.selectedIndex].name;
		branchIdSlct.title = optionTitle;

		branchIdSlct.disabled = true;
	}
	else {
		$.ajax({
			type: 'POST',
			url: "../Php/getBranchesAvailableForEmployeePhp.php",
			data: {key: "", statusSearch: statusNow},
			success: function(data) {
				branchArray = JSON.parse(data);
				for(var i = 0; i < branchArray.length; i++) {
					var option = document.createElement("option");
					option.id = branchArray[i];
					option.innerHTML = "#" + branchArray[i].id + " - " + branchArray[i].location + " - " + branchArray[i].street;
					option.name = branchArray[i].type;
					option.title = option.name;
					branchIdSlct.appendChild(option);
				}
				var optionTitle = branchIdSlct.options[branchIdSlct.selectedIndex].name;
				branchIdSlct.title = optionTitle;
			}
		});
		branchIdSlct.disabled = false;
	}
}



//*(4)CHECK IF EVERY INPUT IS NOT EMPTY AND IF IT IS SHOW MESSAGE
function InputsCheckIfInfoEmptyWithEvents() {
	usernameInput.addEventListener("focusout", function() {
		var messageUsername = "Δεν έχετε ορίσει όνομα χρήστη !";
		IfElementEmptyOrNotAppearanceChanges(usernameInput, usernameProblemC, messageUsername);
	});


	emailInput.addEventListener("focusout", function() {
		var messageEmail = "Δεν έχετε ορίσει email !";
		IfElementEmptyOrNotAppearanceChanges(emailInput, emailProblemC, messageEmail);
	});


	nameInput.addEventListener("focusout", function() {
		var messageName = "Δεν έχετε ορίσει ονοματεπώνυμο !";
		IfElementEmptyOrNotAppearanceChanges(nameInput, nameProblemC, messageName);
	});


	wageInput.addEventListener("focusout", function() {
		var messageWage = "Δεν έχετε ορίσει τον μηνιαίο μισθό !";
		IfElementEmptyOrNotAppearanceChanges(wageInput, wageProblemC, messageWage);
	
		//WAGE ALLOW ONLY 2 DECIMALS
		if(this.value != "") {
			this.value = RoundDecimal(this.value, 2);
		}

		//LOWEST WAGE IS 450
		if(wageInput.value != "" && wageInput.value < 450) {
			messageWage = "Ο ελάχιστος μισθός είναι 450€ !";
			IfElementOtherErrorAppearanceChanges(wageInput, wageProblemC, messageWage);
		}
	});


	passwordInput.addEventListener("focusout", function() {
		var messagePassword = "Δεν έχετε ορίσει κωδικό !";
		var messagePasswordRepeat = "";
		IfElementEmptyOrNotAppearanceChanges(passwordInput, passwordProblemC, messagePassword);
		if(passwordInput.value != "") {
			if(passwordInput.value.length < 6 || passwordInput.value.length > 25) {
				messagePassword = "Ο κωδικός πρέπει να έχει από 6 μέχρι 25 ψηφία !";
				IfElementOtherErrorAppearanceChanges(passwordInput, passwordProblemC, messagePassword);
			}
			else if(passwordInput.value != passwordRepeatInput.value) {
				messagePasswordRepeat = "Ο κωδικός επιβεβαίωσης δεν ταιριάζει με τον αρχικό κωδικό !";
			}
			else {
				messagePasswordRepeat = "";
			}
			IfElementOtherErrorAppearanceChanges(passwordRepeatInput, passwordRepeatProblemC, messagePasswordRepeat);
		}
	});

	passwordRepeatInput.addEventListener("input", function() {
		if(passwordInput.value == "") {
			messagePasswordRepeat = "Συμπληρώστε το πεδίο του κωδικού, πρώτα !";
		}
		else if(passwordRepeatInput.value != "") {
			if(passwordInput.value != passwordRepeatInput.value) {
				messagePasswordRepeat = "Ο κωδικός επιβεβαίωσης δεν ταιριάζει με τον αρχικό κωδικό !";
			}
			else {
				messagePasswordRepeat = "";
			}
		}
		IfElementOtherErrorAppearanceChanges(passwordRepeatInput, passwordRepeatProblemC, messagePasswordRepeat);
	})
	passwordRepeatInput.addEventListener("focusout", function() {
		var messagePasswordRepeat = "Το πεδίο επιβεβαίωση κωδικού είναι κενό !";
		IfElementEmptyOrNotAppearanceChanges(passwordRepeatInput, passwordRepeatProblemC, messagePasswordRepeat);
		if(passwordInput.value == "") {
			messagePasswordRepeat = "Συμπληρώστε το πεδίο του κωδικού, πρώτα !";
		}
		else if(passwordRepeatInput.value != "") {
			if(passwordInput.value != passwordRepeatInput.value) {
				messagePasswordRepeat = "Ο κωδικός επιβεβαίωσης δεν ταιριάζει με τον αρχικό κωδικό !";
			}
			else {
				messagePasswordRepeat = "";
			}
		}
		IfElementOtherErrorAppearanceChanges(passwordRepeatInput, passwordRepeatProblemC, messagePasswordRepeat);
	});


	afmInput.addEventListener("focusout", function() {
		var messageAFM = "";
		if(this.value.length != 9) {
			messageAFM = "Το ΑΦΜ πρέπει να αποτελείται από 9 αριθμητικά ψηφία !";
		}
		IfElementOtherErrorAppearanceChanges(this, afmProblemC, messageAFM);
	});


	amkaInput.addEventListener("focusout", function() {
		var messageAMKA = "";
		if(this.value.length != 11) {
			messageAMKA = "Το ΑΜΚΑ πρέπει να αποτελείται από 11 αριθμητικά ψηφία !";
		}
		IfElementOtherErrorAppearanceChanges(this, amkaProblemC, messageAMKA);
	});
}

//(4)->ELEMENTS CHECK FOR EMPTY
function IfElementEmptyOrNotAppearanceChanges(element, elementAlert, message) {
	var index = ReturnIndexForErrorArr(element);

	if(element.value == "") {
		element.style.borderColor = "red";
		element.style.borderWidth = "2px";
		elementAlert.style.color = "red";
		elementAlert.innerHTML = message;
		errorArr[index] = 1;
	}
	else {
		element.style.borderColor = "white";
		element.style.borderWidth = "1px";
		elementAlert.innerHTML = "";
		errorArr[index] = 0;
	}
}

//(4)->ELEMENTS CHECK FOR ERROR INPUTS
function IfElementOtherErrorAppearanceChanges(element, elementAlert, message) {
	var index = ReturnIndexForErrorArr(element);

	if(message != "") {
		element.style.borderColor = "red";
		element.style.borderWidth = "2px";
		elementAlert.style.color = "red";
		elementAlert.innerHTML = message;
		errorArr[index] = 1;
	}
	else {
		element.style.borderColor = "white";
		element.style.borderWidth = "1px";
		elementAlert.innerHTML = "";
		errorArr[index] = 0;
	}
}



//*(5)CHECK IF EVERY INPUT IS OK, FROM THE SERVER SIDE, INCASE THERE ARE SAME INFO ALREADY AND PRINT ALERT MESSAGE
function InputsCheckWithServerIfInfoExist() {
	usernameInput.addEventListener("focusout", function() {
		$.ajax({
			type: 'POST',
			url: "../Php/searchUsernamePhp.php",
			data: {key: usernameInput.value},
			success: function(data) {
				var messageError = "";
				var messageRight = "";
				if(data == 1) {
					messageError = "Αυτό το Username υπάρχει ήδη !";
					IfElementErrorOfExistOrRightAppearanceChanges(usernameInput, usernameProblemC, messageError, messageRight);
				}
				else {
					//MAKE SURE USERNAME IS AT LEAST 8 CHARACTERS
					if(usernameInput.value != "" && usernameInput.value.length < 8) {
						messageError = "Το Username περιέχει τουλάχιστον 8 χαρακήρες !";
						IfElementErrorOfExistOrRightAppearanceChanges(usernameInput, usernameProblemC, messageError, messageRight);
					}
					else if(usernameInput.value != "") {
						messageRight = "Μοναδικό Username, αποδεκτό";
						IfElementErrorOfExistOrRightAppearanceChanges(usernameInput, usernameProblemC, messageError, messageRight);
					}
				}
			}
		});
	});

	emailInput.addEventListener("focusout", function() {
		$.ajax({
			type: 'POST',
			url: "../Php/searchEmailPhp.php",
			data: {key: emailInput.value},
			success: function(data) {
				var messageError = "";
				var messageRight = "";
				if(data == 1) {
					messageError = "Αυτό το Email υπάρχει ήδη !";
					IfElementErrorOfExistOrRightAppearanceChanges(emailInput, emailProblemC, messageError, messageRight);
				}
				else if(data == 2) {
					messageError = "Υπάρχει πρώην υπάλληλος με το ίδιο Email ! <br>Επιστρέψτε στις Καρτέλες για να τον προσλάβετε !";
					IfElementErrorOfExistOrRightAppearanceChanges(emailInput, emailProblemC, messageError, messageRight);
				}
				else {
					if(!ValidateEmail(emailInput.value)) {
						messageError = "Δεν πληρεί τις προδιαγραφές ενός Email !";
						IfElementErrorOfExistOrRightAppearanceChanges(emailInput, emailProblemC, messageError, messageRight);
					}
					else if(emailInput.value != "") {
						messageRight = "Μοναδικό Email, αποδεκτό";
						IfElementErrorOfExistOrRightAppearanceChanges(emailInput, emailProblemC, messageError, messageRight);
					}
				}
			}
		});
	});

	afmInput.addEventListener("focusout", function() {
		$.ajax({
			type: 'POST',
			url: "../Php/searchAfmPhp.php",
			data: {key: afmInput.value},
			success: function(data) {
				var messageError = "";
				var messageRight = "";
				if(data == 1) {
					messageError = "Αυτό το ΑΦΜ υπάρχει ήδη !";
					IfElementErrorOfExistOrRightAppearanceChanges(afmInput, afmProblemC, messageError, messageRight);
				}
				else if(data == 2) {
					messageError = "Υπάρχει πρώην υπάλληλος με το ίδιο ΑΦΜ ! <br>Επιστρέψτε στις Καρτέλες για να τον προσλάβετε !";
					IfElementErrorOfExistOrRightAppearanceChanges(afmInput, afmProblemC, messageError, messageRight);
				}
				else {
					if(afmInput.value != "" && afmInput.value.length == 9) {
						messageRight = "Μοναδικό ΑΦΜ, αποδεκτό";
						IfElementErrorOfExistOrRightAppearanceChanges(afmInput, afmProblemC, messageError, messageRight);
					}
				}
			}
		});
	});

	amkaInput.addEventListener("focusout", function() {
		$.ajax({
			type: 'POST',
			url: "../Php/searchAmkaPhp.php",
			data: {key: amkaInput.value},
			success: function(data) {
				var messageError = "";
				var messageRight = "";
				if(data == 1) {
					messageError = "Αυτό το AMKA υπάρχει ήδη !";
					IfElementErrorOfExistOrRightAppearanceChanges(amkaInput, amkaProblemC, messageError, messageRight);
				}
				else if(data == 2) {
					messageError = "Υπάρχει πρώην υπάλληλος με το ίδιο ΑΜΚΑ ! <br>Επιστρέψτε στις Καρτέλες για να τον προσλάβετε !";
					IfElementErrorOfExistOrRightAppearanceChanges(amkaInput, amkaProblemC, messageError, messageRight);
				}
				else {
					if(amkaInput.value != "" && amkaInput.value.length == 11) {
						messageRight = "Μοναδικό AMKA, αποδεκτό";
						IfElementErrorOfExistOrRightAppearanceChanges(amkaInput, amkaProblemC, messageError, messageRight);
					}
				}
			}
		});
	});
}

//(5)->ERROR OR RIGHT INPUTS ALERT FROM SERVER CHECK
function IfElementErrorOfExistOrRightAppearanceChanges(element, elementAlert, messageError, messageRight) {
	var index = ReturnIndexForErrorArr(element);
	
	if(messageRight == "") {
		element.style.borderColor = "red";
		element.style.borderWidth = "2px";
		elementAlert.style.color = "red";
		elementAlert.innerHTML = messageError;
		errorArr[index] = 1;
	}
	else {
		element.style.borderColor = "white";
		element.style.borderWidth = "1px";
		elementAlert.style.color = "green";
		elementAlert.innerHTML = messageRight;
		errorArr[index] = 0;
	}
}

//(4),(5)->RETURN INDEX OF ERROR ARRAY THAT SHOWS THE INPUT THAT IS BEING CHECKED
function ReturnIndexForErrorArr(elmnt) {
	var index = 0;
	
	if(elmnt.name == "Username") {
		index = 0;
	}
	else if(elmnt.name == "Email") {
		index = 1;
	}
	else if(elmnt.name == "Name") {
		index = 2;
	}
	else if(elmnt.name == "Wage") {
		index = 3;
	}
	else if(elmnt.name == "Password") {
		index = 4;
	}
	else if(elmnt.name == "PasswordRe") {
		index = 5;
	}
	else if(elmnt.name == "AFM") {
		index = 6;
	}
	else if(elmnt.name == "AMKA") {
		index = 7;
	}

	return index;
}



//*(6)SEARCH BAR FUNCTION OF RECRUIT OF NEW EMPLOYEE / DECIDE IF SEARCH BAR WILL NEEDED IN THIS PAGE OR NOT
function RecruitNewEmployeeSearchBarStart() {
	searchEmployeeC.style.display = "none";
	//searchEmployeeBtn.addEventListener("click", RecruitNewEmployeeSearchBarFunction);
}

//(6)->SEARCH BAR DOESNT SHOW UP HERE SO WE DONT NEED ANY FUNCTIONS
/*//(6)->SEARCH BAR BUTTON EVENT FUNCTION OF RECRUIT OF NEW EMPLOYEE 
function RecruitNewEmployeeSearchBarFunction() {

}*/



//*(7)FUNCTION THAT IS BEING CALLED TO MAKE SURE THAT USER WANTS TO SEND DATA TO DATABASE 
function CheckForConfirmRecruitEmployee() {
	var allOk = 1;
	
	if(errorArr[0] == 0 && errorArr[1] == 0 && errorArr[2] == 0 && errorArr[3] == 0 && errorArr[4] == 0 && errorArr[5] == 0 && errorArr[6] == 0 && errorArr[7] == 0) {
		allOk = 1;
	}
	else {
		allOk = 0;
	}

	if(allOk) {
		alertInfoForCreatNewItemC.style.display = "none";
		alertAddNewInfoC.style.display = "block";
		addNewInfoTitleTextC.innerHTML = "ΠΡΟΣΛΗΨΗ ΝΕΟΥ ΥΠΑΛΛΗΛΟΥ";
		addNewInfoTextC.innerHTML = "Ολα τα πεδία είναι έγκυρα. Είστε σίγουρος ότι θέλετε να προσλάβετε νέο υπάλληλο.";

		yesAddNewInfoBtn.addEventListener("click", function() {
			HireNewEmployee();
		});
		yesAddNewInfoBtn.focus();
		noAddNewInfoBtn.addEventListener("click", function() {
			alertAddNewInfoC.style.display = "none";
		});
	}
	else {
		alertAddNewInfoC.style.display = "none";
		coverPageHelperC.style.display = "block";
		alertInfoForCreatNewItemC.style.display = "table";
		alertInfoForCreatNewItemTextC.innerHTML = "Υπάρχει κάποιο λάθος. Βεβαιωθείτε, ότι είναι αποδεκτά και συμπληρωμένα όλα τα στοιχεία και δεν υπάρχει καμία ένδειξη προβλήματος !";
		alertInfoForCreatNewItemBtn.innerHTML = "Το κατάλαβα";
		alertInfoForCreatNewItemBtn.focus();
	}
	alertInfoForCreatNewItemBtn.addEventListener("click", function() {
		UnderstandAlertMessageBtn();
	});
}

//(7)->EVENT WHEN CLICK BUTTON FROM ALERT MESSAGES
function UnderstandAlertMessageBtn() {
	alertInfoForCreatNewItemC.style.display = "none";
	coverPageHelperC.style.display = "none";
	if(insertedEmployee) {
		location.reload();
	}
}

//(7)->SEND INFO TO SERVER AFTER CONFIRM
function HireNewEmployee() {
	/*var newEmployeeToHire = new Employee(usernameInput.value, emailInput.value, nameInput.value, iconSlct.value, TransformBranchTo("number", branchIdSlct.value), 
										TranslateStatusTo("english", statusSlct.value), TranslateSexTo("english", sexSlct.value), wageInput.value,
										ConvertFromDate(new Date()), afmInput.value, amkaInput.value);*/

	var newEmployee = {
    	'username': usernameInput.value,
    	'email': emailInput.value,
   		'name': nameInput.value,
   		'icon' : iconSlct.value,
    	'branchId': TransformBranchTo("number", branchIdSlct.value),
    	'status': TranslateStatusTo("english", statusSlct.value),
    	'sex': TranslateSexTo("english", sexSlct.value),
    	'wage' : wageInput.value,
    	'recruitmentDay' : ConvertFromDate(new Date()),
    	'password': passwordInput.value,
    	'afm' : afmInput.value,
    	'amka' : amkaInput.value
	};

    newEmployee = JSON.stringify(newEmployee);

	$.ajax({
		type: 'POST',
		url: "../Php/hireNewEmployeePhp.php",
		data: {employeeHireObj: newEmployee},
		success: function(data) {
			//alert(data);
			if(data == 1) {
				//ALERT MESSAGE
				insertedEmployee = 1;
				coverPageHelperC.style.display = "block";
				alertAddNewInfoC.style.display = "none";
				alertInfoForCreatNewItemC.style.display = "table";
				alertInfoForCreatNewItemTextC.innerHTML = "Η ΔΙΑΔΙΚΑΣΙΑ ΟΛΟΚΛΗΡΩΘΗΚΕ ΕΠΙΤΥΧΩΣ(η σελίδα θα ανανεωθεί)";
				alertInfoForCreatNewItemBtn.innerHTML = "Το κατάλαβα";
				alertInfoForCreatNewItemBtn.focus();
			}
			else {
				alertAddNewInfoC.style.display = "none";
				alertInfoForCreatNewItemC.style.display = "table";
				alertInfoForCreatNewItemTextC.innerHTML = "ΚΑΤΙ ΠΗΓΕ ΛΑΘΟΣ";
				alertInfoForCreatNewItemBtn.innerHTML = "Το κατάλαβα";
				alertInfoForCreatNewItemBtn.focus();
			}
		}
	});
}