
//VARIABLES INITIALIZE
//ALERT DIVS
var alertInfoForCreatNewItemC = document.getElementById("alertInfoForCreatNewItemC");
var alertInfoForCreatNewItemTextC = document.getElementById("alertInfoForCreatNewItemTextC");
var alertInfoForCreatNewItemBtn = document.getElementById("alertInfoForCreatNewItemBtn");
var coverPageHelperC = document.getElementById("coverPageHelperC");
var alertAddNewInfoC = document.getElementById("alertAddNewInfoC");
var addNewInfoTitleTextC = document.getElementById("addNewInfoTitleTextC");
var addNewInfoTextC = document.getElementById("addNewInfoTextC");
var yesAddNewInfoBtn = document.getElementById("yesAddNewInfoBtn");
var noAddNewInfoBtn = document.getElementById("noAddNewInfoBtn");
var deleteInfoBtn = document.getElementById("deleteInfoBtn");
var exitEditBtn = document.getElementById("exitEditBtn");
//SHOW EMPLOYEES VARIABLES
var searchEmployeeC = document.getElementById("searchEmployeeC");
var searchEmployeeInpt = document.getElementById("searchEmployeeInpt");
var searchEmployeeBtn = document.getElementById("searchEmployeeBtn");
var searchBarUsernameBtn = document.getElementById("searchBarUsernameBtn");
var searchBarAFMBtn = document.getElementById("searchBarAFMBtn");
var searchBarAMKABtn = document.getElementById("searchBarAMKABtn");
var titleOfContentC = document.getElementById("titleOfContentC");
var showContentC = document.getElementById("showContentC");
var centerShowContentC = document.getElementById("centerShowContentC");
var allInfoLockedBtn = document.getElementById("allInfoLockedBtn");
var allInfoLockedImg = allInfoLockedBtn.getElementsByTagName("img")[0];
var leftClickEmployeesBtn = document.getElementById("leftClickEmployeesBtn");
var rightClickEmployeesBtn = document.getElementById("rightClickEmployeesBtn");
var downShowEmployeesCountC = document.getElementById("downShowEmployeesCountC");
var leftNoEmployee1C = document.getElementById("leftNoEmployee1C");
var leftNoEmployee2C = document.getElementById("leftNoEmployee2C");
var rightNoEmployee1C = document.getElementById("rightNoEmployee1C");
var rightNoEmployee2C = document.getElementById("rightNoEmployee2C");
//DISCHARGE VARIABLES
var dischargeTitleOfContentC = document.getElementById("dischargeTitleOfContentC");
var dischargeContentC = document.getElementById("dischargeContentC");
var dischargeCenterContentC = document.getElementById("dischargeCenterContentC");
//RESIGN VARIABLES
var resignTitleOfContentC = document.getElementById("resignTitleOfContentC");
var resignContentC = document.getElementById("resignContentC");
var resignCenterContentC = document.getElementById("resignCenterContentC");

var idOfPanels = [0, 1, 2];
var sidesCounter = 0;
var filterOption = "Username";
var filterBtnCounter = [1, 0, 0];


//NEW DIV WHERE EMPLOYEE DIVS WILL BE
var allElementsC = document.createElement("div");
allElementsC.id = "allElementsC";
allElementsC.style.left = 0;
centerShowContentC.appendChild(allElementsC);


// 1/3 PART OF THIS FILE FUNCTIONS
ShowEmployeesStart();

//HEART OF 1/3 FUNCTIONS IN THIS FILE
function ShowEmployeesStart() {
	TitleCreateShowView();
	CreateShowView();
	BtnListenerForEmployeesShowView();
	StartSearchBarFunctions();
}



//*(1)INIALITZE TITLE OF SHOW VIEW OF EMPLOYEES CONTENT
function TitleCreateShowView() {
	titleOfContentC.innerHTML = "ΠΡΟΒΟΛΗ ΚΑΙ ΕΠΕΞΕΡΓΑΣΙΑ ΣΤΟΙΧΕΙΩΝ ΥΠΑΛΛΗΛΩΝ";
}



//*(2)CREATE THE SHOW VIEW OF EMPLOYESS
function CreateShowView() {
	if(sessionStorage.getItem("lockCheck") === null) {
		sessionStorage.setItem("lockCheck", "locked");
	}

	CreateTheLockButton();
	allInfoLockedBtn.addEventListener("click", ChangeStatementLockOrUnlock);

	//CREATE THE POSITION WHERE THE ELEMENTS IS GONNA MOVE IN AND OUT
	for(var i = 0; i < employeesObjSArray.length; i++) {
		employeesObjSArray[i].CreatePanelShowViewOfEmployee(allElementsC, i);
	}
	CounterForEmployeesAndShow();
	downShowEmployeesCountC.title = "Υπάλληλοι: " + employeesObjSArray.length;
}

//(2)->CHECK AND CHANGE LOCK OR UNLOCK STATUS 
function ChangeStatementLockOrUnlock() {
	if(sessionStorage.getItem("lockCheck") == "unlocked") {
		sessionStorage.setItem("lockCheck", "locked");
	}
	else {
		sessionStorage.setItem("lockCheck", "unlocked");
	}

	for(var i = 0; i < employeesObjSArray.length; i++) {
		var idName = employeesObjSArray[i].getUsername() + " ++++ " + i;
		employeesObjSArray[i].HideOrShowInfoLock(document.getElementById(idName));
	}

	CreateTheLockButton();
}

//(2)->CREATE THE LOCK BUTTONS IF IT IS LOCK OR UNLOCK
function CreateTheLockButton() {
	if(sessionStorage.getItem("lockCheck") === null) {
		sessionStorage.setItem("lockCheck", "unlocked");
		allInfoLockedBtn.title = "Κλείδωμα";
		allInfoLockedImg.style.content = "url(../Assets/icons8_unlock_50px.png)";
		allInfoLockedBtn.addEventListener("mouseover", function() {
			allInfoLockedImg.style.content = "url(../Assets/icons8_unlock_50px_2.png)";
		});
		allInfoLockedBtn.addEventListener("mouseout", function() {
			allInfoLockedImg.style.content = "url(../Assets/icons8_unlock_50px.png)";
		});
	}
	else {
		if(sessionStorage.getItem("lockCheck") == "unlocked") {
			allInfoLockedBtn.title = "Κλείδωμα προσωπικών στοιχείων υπαλλήλου";
			allInfoLockedImg.style.content = "url(../Assets/icons8_unlock_50px.png)";
			allInfoLockedBtn.addEventListener("mouseover", function() {
				allInfoLockedImg.style.content = "url(../Assets/icons8_unlock_50px_2.png)";
			});
			allInfoLockedBtn.addEventListener("mouseout", function() {
				allInfoLockedImg.style.content = "url(../Assets/icons8_unlock_50px.png)";
			});
		}
		else {
			allInfoLockedBtn.title = "Ξεκλείδωμα προσωπικών στοιχείων υπαλλήλου";
			allInfoLockedImg.style.content = "url(../Assets/icons8_lock_50px.png)";
			allInfoLockedBtn.addEventListener("mouseover", function() {
				allInfoLockedImg.style.content = "url(../Assets/icons8_lock_50px_2.png)";
			});
			allInfoLockedBtn.addEventListener("mouseout", function() {
				allInfoLockedImg.style.content = "url(../Assets/icons8_lock_50px.png)";
			});
		}
	}
}



//*(3)LEFT AND RIGHT BTNS INITIALIZE FOR SHOW VIEW
function BtnListenerForEmployeesShowView() {
	leftClickEmployeesBtn.addEventListener("click", LeftBtnListener);
	rightClickEmployeesBtn.addEventListener("click", RightBtnListener);
}

//(3)->LEFT MOVEMENT OF EMPLOYEES SHOWVIEW
function LeftBtnListener() {
	var panelOfEmployeeC = document.getElementsByClassName("panelOfEmployeeC")[0];

	if(idOfPanels[0] == 0) {

	}
	else {
		var n = allElementsC.getBoundingClientRect().width / 3;
		var sum = (parseFloat(allElementsC.style.left) + n) + "px";
		allElementsC.style.left = sum;
		for(var i = 0; i < idOfPanels.length; i++) {
			idOfPanels[i]--;
		}
	}

	CounterForEmployeesAndShow();
}

//(3)->RIGHT MOVEMENT OF EMPLOYEES SHOWVIEW
function RightBtnListener() {
	var panelOfEmployeeC = document.getElementsByClassName("panelOfEmployeeC")[0];

	if(idOfPanels[2] == ((employeesObjSArray.length - 1))) {
	
	}
	else {
		var n = allElementsC.getBoundingClientRect().width / 3;
		var sum = (parseFloat(allElementsC.style.left) - n) + "px";
		allElementsC.style.left = sum;
		for(var i = 0; i < idOfPanels.length; i++) {
			idOfPanels[i]++;
		}
	}

	CounterForEmployeesAndShow();
}

//(3)->FUNCTION TO KEEP TRACK OF THE 3 EMPLOYEES THAT ARE IN VIEW
function CounterForEmployeesAndShow() {

	if(idOfPanels[0] == 0) {
		leftNoEmployee1C.style.display = "none";
		leftNoEmployee2C.style.display = "none";
		if(!sidesCounter) {
			centerShowContentC.style.borderLeft = "16px solid rgb(13, 18, 24)";
			sidesCounter = 1;
		}
		else {
			centerShowContentC.style.borderLeft = "16px solid rgb(240, 40, 73)";
			setTimeout(function() {
				centerShowContentC.style.borderLeft = "16px solid rgb(13, 18, 24)";
			}, 500);
		}
	}
	else if(idOfPanels[0] == 1) {
		sidesCounter = 0;
		leftNoEmployee1C.style.display = "none";
		leftNoEmployee2C.style.display = "block";
		centerShowContentC.style.borderLeft = "16px solid rgb(13, 18, 24)";
	}
	else {
		leftNoEmployee1C.style.display = "block";
		leftNoEmployee2C.style.display = "block";
		centerShowContentC.style.borderLeft = "16px solid rgb(13, 18, 24)";
	}

	if(idOfPanels[2] == ((employeesObjSArray.length - 1))) {
		rightNoEmployee1C.style.display = "none";
		rightNoEmployee2C.style.display = "none";
		if(!sidesCounter) {
			centerShowContentC.style.borderRight = "16px solid rgb(13, 18, 24)";
			sidesCounter = 1;
		}
		else {
			centerShowContentC.style.borderRight = "16px solid rgb(240, 40, 73)";
			setTimeout(function() {
				centerShowContentC.style.borderRight = "16px solid rgb(13, 18, 24)";
			}, 500);
		}
	}
	else if(idOfPanels[2] == ((employeesObjSArray.length - 2))) {
		sidesCounter = 0;
		rightNoEmployee1C.style.display = "block";
		rightNoEmployee2C.style.display = "none";
		centerShowContentC.style.borderRight = "16px solid rgb(13, 18, 24)";
	}
	else {
		rightNoEmployee1C.style.display = "block";
		rightNoEmployee2C.style.display = "block";
		centerShowContentC.style.borderRight = "16px solid rgb(13, 18, 24)";
	}
}



//*(4)SEARCH BAR FUNCTION OF SHOW VIEW EMPLOYEES / DECIDE IF SEARCH BAR WILL NEEDED IN THIS PAGE OR NOT
function StartSearchBarFunctions() {
	searchEmployeeC.style.display = "block";

	//SEARCH BAR FILTERS
	FilterChangeAppear();
	searchBarUsernameBtn.addEventListener("click", function() {
		UsernameSearchFilterFunctions();
	});
	searchBarAFMBtn.addEventListener("click", function() {
		AFMSearchFilterFunctions();
	});
	searchBarAMKABtn.addEventListener("click", function() {
		AMKASearchFilterFunctions();
	});

	searchEmployeeBtn.addEventListener("click", ShowViewEmployeesSearchBar);
}

//(4)->SEARCH BAR USERNAME FILTER FUNCTIONS
function UsernameSearchFilterFunctions() {
	filterBtnCounter = [1, 0, 0];
	FilterChangeAppear();
}

//(4)->SEARCH BAR AFM FILTER FUNCTIONS
function AFMSearchFilterFunctions() {
	filterBtnCounter = [0, 1, 0];
	FilterChangeAppear();
}

//(4)->SEARCH BAR AMKA FILTER FUNCTIONS
function AMKASearchFilterFunctions() {
	filterBtnCounter = [0, 0, 1];
	FilterChangeAppear();
}

//(4)->SEARCH BAR FILTER BUTTONS CHANGE APPREARCE
function FilterChangeAppear() {
	//CLEAR APPEARANCE OF FILTER BUTTONS DEPEND ON LAST CLICK
	if(filterOption == "Username") {
		if(filterBtnCounter[0] == 0) {
			searchEmployeeInpt.value = "";
		}
	}
	else if(filterOption == "Afm") {
		if(filterBtnCounter[1] == 0) {
			searchEmployeeInpt.value = "";
		}
	}
	else if(filterOption == "Amka") {
		if(filterBtnCounter[2] == 0) {
			searchEmployeeInpt.value = "";
		}
	}

	//IF USERNAME IS PRESSED
	if(filterBtnCounter[0] == 1) {
		filterOption = "Username";

		searchEmployeeInpt.placeholder = "Ψάξε έναν υπάλληλο με το Username του";
		searchBarUsernameBtn.style.background = "rgb(13, 18, 24)";
		searchBarUsernameBtn.style.color = "white";
		searchBarUsernameBtn.style.border = "1px solid rgb(255, 215, 0)";
		searchEmployeeInpt.oninput = function () {
			if (this.value.length > 25) {
				this.value = this.value.slice(0, 25); 
			}
		}

		searchBarAFMBtn.style.background = "white";
		searchBarAFMBtn.style.color = "rgb(13, 18, 24)";
		searchBarAFMBtn.style.border = "none";
		searchBarAFMBtn.addEventListener("mouseover", function() {
			if(filterBtnCounter[1] == 0) {
				this.style.background = "rgb(255, 215, 0)";
				this.style.color = "rgb(13, 18, 24)";
			}
		});
		searchBarAFMBtn.addEventListener("mouseout", function() {
			if(filterBtnCounter[1] == 0) {
				this.style.background = "white";
				this.style.color = "rgb(13, 18, 24)";
			}
		});

		searchBarAMKABtn.style.background = "white";
		searchBarAMKABtn.style.color = "rgb(13, 18, 24)";
		searchBarAMKABtn.style.border = "none";
		searchBarAMKABtn.addEventListener("mouseover", function() {
			if(filterBtnCounter[2] == 0) {
				this.style.background = "rgb(255, 215, 0)";
				this.style.color = "rgb(13, 18, 24)";
			}
		});
		searchBarAMKABtn.addEventListener("mouseout", function() {
			if(filterBtnCounter[2] == 0) {
				this.style.background = "white";
				this.style.color = "rgb(13, 18, 24)";
			}
		});
	}
	//IF AFM IS PRESSED
	else if(filterBtnCounter[1] == 1) {
		filterOption = "Afm";

		searchBarUsernameBtn.style.background = "white";
		searchBarUsernameBtn.style.color = "rgb(13, 18, 24)";
		searchBarUsernameBtn.style.border = "none";
		searchBarUsernameBtn.addEventListener("mouseover", function() {
			if(filterBtnCounter[0] == 0) {
				this.style.background = "rgb(255, 215, 0)";
				this.style.color = "rgb(13, 18, 24)";
			}
		});
		searchBarUsernameBtn.addEventListener("mouseout", function() {
			if(filterBtnCounter[0] == 0) {
				this.style.background = "white";
				this.style.color = "rgb(13, 18, 24)";
			}
		});

		searchEmployeeInpt.placeholder = "Ψάξε έναν υπάλληλο με το ΑΦΜ του";
		searchBarAFMBtn.style.background = "rgb(13, 18, 24)";
		searchBarAFMBtn.style.color = "white";
		searchBarAFMBtn.style.border = "1px solid rgb(255, 215, 0)";
		searchEmployeeInpt.oninput = function () {
			if (this.value.length > 9) {
				this.value = this.value.slice(0, 9); 
			}
		}

		searchBarAMKABtn.style.background = "white";
		searchBarAMKABtn.style.color = "rgb(13, 18, 24)";
		searchBarAMKABtn.style.border = "none";
		searchBarAMKABtn.addEventListener("mouseover", function() {
			if(filterBtnCounter[2] == 0) {
				this.style.background = "rgb(255, 215, 0)";
				this.style.color = "rgb(13, 18, 24)";
			}
		});
		searchBarAMKABtn.addEventListener("mouseout", function() {
			if(filterBtnCounter[2] == 0) {
				this.style.background = "white";
				this.style.color = "rgb(13, 18, 24)";
			}
		});
	}
	//IF AMKA IS PRESSED
	else if(filterBtnCounter[2] == 1) {
		filterOption = "Amka";

		searchBarUsernameBtn.style.background = "white";
		searchBarUsernameBtn.style.color = "rgb(13, 18, 24)";
		searchBarUsernameBtn.style.border = "none";
		searchBarUsernameBtn.addEventListener("mouseover", function() {
			if(filterBtnCounter[0] == 0) {
				this.style.background = "rgb(255, 215, 0)";
				this.style.color = "rgb(13, 18, 24)";
			}
		});
		searchBarUsernameBtn.addEventListener("mouseout", function() {
			if(filterBtnCounter[0] == 0) {
				this.style.background = "white";
				this.style.color = "rgb(13, 18, 24)";
			}
		});
		
		searchBarAFMBtn.style.background = "white";
		searchBarAFMBtn.style.color = "rgb(13, 18, 24)";
		searchBarAFMBtn.style.border = "none";
		searchBarAFMBtn.addEventListener("mouseover", function() {
			if(filterBtnCounter[1] == 0) {
				this.style.background = "rgb(255, 215, 0)";
				this.style.color = "rgb(13, 18, 24)";
			}
		});
		searchBarAFMBtn.addEventListener("mouseout", function() {
			if(filterBtnCounter[1] == 0) {
				this.style.background = "white";
				this.style.color = "rgb(13, 18, 24)";
			}
		});

		searchEmployeeInpt.placeholder = "Ψάξε έναν υπάλληλο με το ΑΜΚΑ του";
		searchBarAMKABtn.style.background = "rgb(13, 18, 24)";
		searchBarAMKABtn.style.color = "white";
		searchBarAMKABtn.style.border = "1px solid rgb(255, 215, 0)";
		searchEmployeeInpt.oninput = function () {
			if (this.value.length > 11) {
				this.value = this.value.slice(0, 11); 
			}
		}
	}
}

//(4)->SEARCH BAR BUTTON EVENT FUNCTION OF SHOW VIEW EMPLOYEES
function ShowViewEmployeesSearchBar() {
	var found = 0;
	var searchWord = searchEmployeeInpt.value;
	for(var i = 0; i < employeesObjSArray.length; i++) {
		if(filterOption == "Username") {
			if(searchWord == employeesObjSArray[i].getUsername()) {
				found = 1;
				MoveSlideView(i);
				idOfEmployeeFound = employeesObjSArray[i].getUsername() + " ++++ " + i;
				LightPanelOfEmployee(idOfEmployeeFound);
			}
		}
		else if(filterOption == "Afm") {
			if(searchWord == employeesObjSArray[i].getAFM()) {
				found = 1;
				MoveSlideView(i);
				idOfEmployeeFound = employeesObjSArray[i].getUsername() + " ++++ " + i;
				LightPanelOfEmployee(idOfEmployeeFound);
			}
		}
		else if(filterOption == "Amka") {
			if(searchWord == employeesObjSArray[i].getAMKA()) {
				found = 1;
				MoveSlideView(i);
				idOfEmployeeFound = employeesObjSArray[i].getUsername() + " ++++ " + i;
				LightPanelOfEmployee(idOfEmployeeFound);
			}
		}
	}

	//IF SEARCH DOESN'T FOUND ANY RESULT OR IT IS EMPTY 
	if(searchWord == "") {
		alertInfoForCreatNewItemC.style.display = "table";
		alertInfoForCreatNewItemTextC.innerHTML = "Το πεδίο της αναζήτησης είναι κενό !";
		alertInfoForCreatNewItemBtn.innerHTML = "Το κατάλαβα";
		alertInfoForCreatNewItemBtn.focus();
		alertInfoForCreatNewItemBtn.addEventListener("click", function() {
			alertInfoForCreatNewItemC.style.display = "none";
		});
	}
	else if(!found) {
		if(filterOption == "Username") {
			alertInfoForCreatNewItemC.style.display = "table";
			alertInfoForCreatNewItemTextC.innerHTML = "Δεν βρέθηκε υπάλληλος με Username " + searchWord + " !";
			alertInfoForCreatNewItemBtn.innerHTML = "Το κατάλαβα";
			alertInfoForCreatNewItemBtn.focus();
			alertInfoForCreatNewItemBtn.addEventListener("click", function() {
				alertInfoForCreatNewItemC.style.display = "none";
			});
		}
		else if(filterOption == "Afm") {
			if(searchWord.length != 9) {
				alertInfoForCreatNewItemC.style.display = "table";
				alertInfoForCreatNewItemTextC.innerHTML = "Το ΑΦΜ απαιτεί ακριβώς 9 αριθμητικά ψηφία !";
				alertInfoForCreatNewItemBtn.innerHTML = "Το κατάλαβα";
				alertInfoForCreatNewItemBtn.focus();
				alertInfoForCreatNewItemBtn.addEventListener("click", function() {
					alertInfoForCreatNewItemC.style.display = "none";
				});
			}
			else {
				alertInfoForCreatNewItemC.style.display = "table";
				alertInfoForCreatNewItemTextC.innerHTML = "Δεν βρέθηκε υπάλληλος με ΑΦΜ " + searchWord + " !";
				alertInfoForCreatNewItemBtn.innerHTML = "Το κατάλαβα";
				alertInfoForCreatNewItemBtn.focus();
				alertInfoForCreatNewItemBtn.addEventListener("click", function() {
					alertInfoForCreatNewItemC.style.display = "none";
				});
			}
		}
		else if(filterOption == "Amka") {
			if(searchWord.length != 11) {
				alertInfoForCreatNewItemC.style.display = "table";
				alertInfoForCreatNewItemTextC.innerHTML = "Το ΑΜΚΑ απαιτεί ακριβώς 11 αριθμητικά ψηφία !";
				alertInfoForCreatNewItemBtn.innerHTML = "Το κατάλαβα";
				alertInfoForCreatNewItemBtn.focus();
				alertInfoForCreatNewItemBtn.addEventListener("click", function() {
					alertInfoForCreatNewItemC.style.display = "none";
				});
			}
			else {
				alertInfoForCreatNewItemC.style.display = "table";
				alertInfoForCreatNewItemTextC.innerHTML = "Δεν βρέθηκε υπάλληλος με AMKA " + searchWord + " !";
				alertInfoForCreatNewItemBtn.innerHTML = "Το κατάλαβα";
				alertInfoForCreatNewItemBtn.focus();
				alertInfoForCreatNewItemBtn.addEventListener("click", function() {
					alertInfoForCreatNewItemC.style.display = "none";
				});
			}
		}
	}
}

//(4)->MOVE THE SLIDE THAT HAS ALL THE EMPLOYEES
function MoveSlideView(pos) {
	//DECIDE IF SLIDE HAS TO MOVE LEFT OR RIGHT
	if(idOfPanels[0] > pos) {
		var timesMove = idOfPanels[2] - pos;
		console.log("LEFT BTN LISTENER  " + timesMove);
		if(pos == 0) {
			for(var i = 0; i < timesMove; i++) {
				LeftBtnListener();
			}
		}
		else {
			for(var i = 0; i < timesMove; i++) {
				LeftBtnListener();
			}
		}
	}
	else if(idOfPanels[2] < pos) {
		var timesMove = pos - idOfPanels[2];
		console.log("RIGHT BTN LISTENER  " + timesMove);
		if(pos == (employeesObjSArray.length - 1)) {
			for(var i = 0; i < timesMove; i++) {
				RightBtnListener();
			}
		}
		else {
			for(var i = 0; i < (timesMove + 1); i++) {
				RightBtnListener();
			}
		}
	}
}

//(4)->LIGHT PANEL OF EMPLOYEE THAT FOUND FROM SEARCH BAR
function LightPanelOfEmployee(idOfEmployeeFound) {
	var panelOfEmployeeFound = document.getElementById(idOfEmployeeFound);
	panelOfEmployeeFound.querySelector("#employeeStatusC").style.transition = "background 0.3s";
	setTimeout( function() {
		panelOfEmployeeFound.querySelector("#employeeStatusC").style.background = "rgb(123, 106, 128)";
		panelOfEmployeeFound.style.borderColor = "rgb(123, 106, 128)";
		panelOfEmployeeFound.style.borderWidth = "3px";
		panelOfEmployeeFound.querySelector("#employeeStatusC").style.height = "50px";
	}, 1000);
	setTimeout( function() {
		panelOfEmployeeFound.querySelector("#employeeStatusC").style.background = "rgb(13, 18, 24)";
		panelOfEmployeeFound.style.borderColor = "darkgrey";
		panelOfEmployeeFound.style.borderWidth = "1px 2px 1px 2px";
		panelOfEmployeeFound.querySelector("#employeeStatusC").style.height = "auto";
	}, 2000);
}



// 2/3 PART OF THIS FILE FUNCTIONS
//RESIGN AND DISCHARGE FUNCTIONS
DischargeEmployeesStart();

//HEART OF 1/3 FUNCTIONS IN THIS FILE
function DischargeEmployeesStart() {
	TitleCCreateDischargeView();
	CreateDischargeOrResignView("Discharge");
	//BtnListenerForDischargeEmployees();
	//DischargeSearchBarFunctions();	
}



//*(1)INIALITZE TITLE OF DISCHARGE VIEW OF EMPLOYEES CONTENT
function TitleCCreateDischargeView() {
	dischargeTitleOfContentC.innerHTML = "ΑΡΧΕΙΟ ΑΠΟΛΥΜΕΝΩΝ";
}



//*(2)CREATE THE DISCHARGE VIEW OF EMPLOYESS
async function CreateDischargeOrResignView(type) {
	var exEmployees = await GetExEmployees(type);
	var btn1 = document.getElementsByClassName("infoAboutDblClickBtn")[0];
	var btn2 = document.getElementsByClassName("infoAboutDblClickBtn")[1];

	if(exEmployees.length == 0) {
		if(type == "Discharge") {
			btn1.style.display = "none";
		}
		else {
			btn2.style.display = "none";
		}
	}
	else {
		var exEmployeesArrayElements = [];
		var openOptionForHiringBackCounter = 0;
		var posDorR = 0;

		if(type == "Discharge") {
			btn1.style.display = "block";
			btn1.addEventListener("click", function() {
				alertInfoForCreatNewItemC.style.display = "table";
				alertInfoForCreatNewItemTextC.innerHTML = "Κάνοντας διπλό κλικ, πάνω στα στοιχεία ενός πρώην υπαλλήλου, σας δίνεται η επιλογή να τον επαναπροσλάβετε, καθώς και να τον διαγράψετε οριστικά από το σύστημα.";
				alertInfoForCreatNewItemBtn.focus();
				alertInfoForCreatNewItemBtn.innerHTML = "Το κατάλαβα";
				alertInfoForCreatNewItemBtn.addEventListener("click", function() {
					alertInfoForCreatNewItemC.style.display = "none";
				});
			});
			posDorR = 0;
		}
		else {
			btn2.style.display = "block";
			btn2.addEventListener("click", function() {
				alertInfoForCreatNewItemC.style.display = "table";
				alertInfoForCreatNewItemTextC.innerHTML = "Κάνοντας διπλό κλικ, πάνω στα στοιχεία ενός πρώην υπαλλήλου, σας δίνεται η επιλογή να τον επαναπροσλάβετε, καθώς και να τον διαγράψετε οριστικά από το σύστημα.";
				alertInfoForCreatNewItemBtn.focus();
				alertInfoForCreatNewItemBtn.innerHTML = "Το κατάλαβα";
				alertInfoForCreatNewItemBtn.addEventListener("click", function() {
					alertInfoForCreatNewItemC.style.display = "none";
				});
			});
			posDorR = 1;
		}

		for(var i = 0; i < exEmployees.length; i++) {
			var currentRow = [];
			//NAME CREATE ROW
			var rowNameC = document.createElement("div");
			rowNameC.className = "rowNameC";
			rowNameC.id = i;
			rowNameC.name = exEmployees[i].name;
			rowNameC.innerHTML = exEmployees[i].name;
			//exEmployeesArrayElements.push(rowNameC);
			currentRow.push(rowNameC);
			document.getElementsByClassName("nameExEmployeeViewC")[posDorR].appendChild(rowNameC);

			//EMAIL CREATE ROW
			var rowEmailC = document.createElement("div");
			rowEmailC.className = "rowEmailC";
			rowEmailC.id = i;
			rowEmailC.name = exEmployees[i].email;
			rowEmailC.innerHTML = exEmployees[i].email;
			//exEmployeesArrayElements.push(rowEmailC);
			currentRow.push(rowEmailC);
			document.getElementsByClassName("emailExEmployeeViewC")[posDorR].appendChild(rowEmailC);

			//ICON CREATE ROW
			var rowIconC = document.createElement("div");
			rowIconC.className = "rowIconC";
			rowIconC.id = i;
			rowIconC.name = exEmployees[i].icon;
			rowIconC.innerHTML = exEmployees[i].icon;
			//exEmployeesArrayElements.push(rowIconC);
			currentRow.push(rowIconC);
			document.getElementsByClassName("iconExEmployeeViewC")[posDorR].appendChild(rowIconC);

			//LAST BRANCH CREATE ROW
			var rowLastBranchIdC = document.createElement("div");
			rowLastBranchIdC.className = "rowLastBranchIdC";
			rowLastBranchIdC.id = i;
			rowLastBranchIdC.name = exEmployees[i].lastBranchId;
			if(exEmployees[i].lastBranchId == null) {
				rowLastBranchIdC.innerHTML = "----";
				rowLastBranchIdC.title = "Δεν είχε ορισθεί σε κατάστημα, πριν την αποδεύσμευση του.";
			}
			else {
				rowLastBranchIdC.innerHTML = "#" + exEmployees[i].lastBranchId;
			}
			//exEmployeesArrayElements.push(rowLastBranchIdC);
			currentRow.push(rowLastBranchIdC);
			document.getElementsByClassName("lastBranchIdExEmployeeViewC")[posDorR].appendChild(rowLastBranchIdC);

			//LAST STATUS CREATE ROW
			var rowLastStatusC = document.createElement("div");
			rowLastStatusC.className = "rowLastStatusC";
			rowLastStatusC.id = i;
			rowLastStatusC.name = exEmployees[i].lastStatus;
			rowLastStatusC.innerHTML = TranslateStatusTo("greek", exEmployees[i].lastStatus);
			//exEmployeesArrayElements.push(rowLastStatusC);
			currentRow.push(rowLastStatusC);
			document.getElementsByClassName("lastStatusExEmployeeViewC")[posDorR].appendChild(rowLastStatusC);

			//LAST WAGE CREATE ROW
			var rowLastWageC = document.createElement("div");
			rowLastWageC.className = "rowLastWageC";
			rowLastWageC.id = i;
			rowLastWageC.name = exEmployees[i].lastWage;
			rowLastWageC.innerHTML = RoundDecimal(exEmployees[i].lastWage, 2) + " €";
			//exEmployeesArrayElements.push(rowLastWageC);
			currentRow.push(rowLastWageC);
			document.getElementsByClassName("lastWageExEmployeeViewC")[posDorR].appendChild(rowLastWageC);

			//SEX CREATE ROW
			var rowSexC = document.createElement("div");
			rowSexC.className = "rowSexC";
			rowSexC.id = i;
			rowSexC.name = exEmployees[i].sex;
			rowSexC.innerHTML = TranslateSexTo("greek", exEmployees[i].sex);
			//exEmployeesArrayElements.push(rowSexC);
			currentRow.push(rowSexC);
			document.getElementsByClassName("sexExEmployeeViewC")[posDorR].appendChild(rowSexC);

			//RECRUITMENT DAY CREATE ROW
			var rowRecruitmentDayC = document.createElement("div");
			rowRecruitmentDayC.className = "rowRecruitmentDayC";
			rowRecruitmentDayC.id = i;
			rowRecruitmentDayC.name = exEmployees[i].recruitmentDay;
			rowRecruitmentDayC.innerHTML = exEmployees[i].recruitmentDay;
			//exEmployeesArrayElements.push(rowRecruitmentDayC);
			currentRow.push(rowRecruitmentDayC);
			document.getElementsByClassName("recruitmentDayExEmployeeViewC")[posDorR].appendChild(rowRecruitmentDayC);
			
			//END DAY CREATE ROW
			var rowEndDayC = document.createElement("div");
			rowEndDayC.className = "rowEndDayC";
			rowEndDayC.id = i;
			rowEndDayC.name = exEmployees[i].endDay;
			rowEndDayC.innerHTML = exEmployees[i].endDay;
			//exEmployeesArrayElements.push(rowEndDayC);
			currentRow.push(rowEndDayC);
			document.getElementsByClassName("endDayExEmployeeViewC")[posDorR].appendChild(rowEndDayC);

			//WAY OUT OF COMPANY CREATE ROW
			var rowWayOutOfCompanyC = document.createElement("div");
			rowWayOutOfCompanyC.id = i;
			rowWayOutOfCompanyC.className = "rowWayOutOfCompanyC";
			rowWayOutOfCompanyC.name = exEmployees[i].wayOutOfCompany;
			rowWayOutOfCompanyC.innerHTML = TranslateWayOutOfCompanyTo("greek", exEmployees[i].wayOutOfCompany);
			//exEmployeesArrayElements.push(rowWayOutOfCompanyC);
			currentRow.push(rowWayOutOfCompanyC);
			document.getElementsByClassName("wayOutOfCompanyExEmployeeViewC")[posDorR].appendChild(rowWayOutOfCompanyC);

			//AFM CREATE ROW (AFK SUPPOSED TO BE AFM)
			var rowAfkC = document.createElement("div");
			rowAfkC.className = "rowAfkC";
			rowAfkC.id = i;
			rowAfkC.name = exEmployees[i].afm;
			rowAfkC.innerHTML = exEmployees[i].afm;
			//exEmployeesArrayElements.push(rowAfkC);
			currentRow.push(rowAfkC);
			document.getElementsByClassName("afmExEmployeeViewC")[posDorR].appendChild(rowAfkC);

			//AMKA CREATE ROW
			var rowAmkaC = document.createElement("div");
			rowAmkaC.className = "rowAmkaC";
			rowAmkaC.id = i;
			rowAmkaC.name = exEmployees[i].amka;
			rowAmkaC.innerHTML = exEmployees[i].amka;
			//exEmployeesArrayElements.push(rowAmkaC);
			currentRow.push(rowAmkaC);
			document.getElementsByClassName("amkaExEmployeeViewC")[posDorR].appendChild(rowAmkaC);

			//REASON CREATE ROW
			var rowReasonC = document.createElement("div");
			rowReasonC.className = "rowReasonC";
			rowReasonC.id = i;
			rowReasonC.name = exEmployees[i].reason;
			rowReasonC.title = exEmployees[i].reason;
			rowReasonC.innerHTML = exEmployees[i].reason;
			//exEmployeesArrayElements.push(rowReasonC);
			currentRow.push(rowReasonC);
			document.getElementsByClassName("reasonExEmployeeViewC")[posDorR].appendChild(rowReasonC);
			
			exEmployeesArrayElements.push(currentRow);

			for(var j = 0; j < currentRow.length; j++) {
				currentRow[j].addEventListener("mouseover", function() {
					var pos = this.id;

					for(var h = 0; h < currentRow.length; h++) {
						exEmployeesArrayElements[pos][h].style.background = "white";
						exEmployeesArrayElements[pos][h].style.color = "rgb(13, 18, 24)";
						exEmployeesArrayElements[pos][h].style.borderColor = "rgb(13, 18, 24)";
					}
				});

				currentRow[j].addEventListener("mouseout", function() {
					var pos = this.id;

					for(var h = 0; h < currentRow.length; h++) {
						exEmployeesArrayElements[pos][h].style.background = "transparent";
						exEmployeesArrayElements[pos][h].style.color = "white";
						exEmployeesArrayElements[pos][h].style.borderColor = "white";
					}
				});

				currentRow[j].addEventListener("dblclick", function() {
					alertInfoForCreatNewItemC.style.display = "none";
					if(openOptionForHiringBackCounter == 0) {
						var helper2 = [];
						var pos = this.id;
						var exEmployee = exEmployees[pos];

						for(var h = 0; h < currentRow.length; h++) {
							var helperForHiringC = document.createElement("div");
							helperForHiringC.className = "helperForHiringC";
							helper2.push(helperForHiringC);
							exEmployeesArrayElements[pos][h].appendChild(helperForHiringC);
						}

						openOptionForHiringBackCounter = 1;
						alertAddNewInfoC.style.display = "block";
						addNewInfoTitleTextC.innerHTML = "ΕΠΑΝΑΠΡΟΣΛΗΨΗ ΥΠΑΛΛΗΛΟΥ";
						addNewInfoTextC.innerHTML = "Θέλετε να επαναπροσλάβετε, τον πρώην υπάλληλο || " + exEmployee.name + " || ;<br>Η πρόσληψη ενός πρώην υπαλλήλου, μπορεί να προκαλέσει προβλήματα στην λειτουργία των καταστημάτων.<br>Βεβαιωθείτε πρώτα, ότι έχετε ενημερώσει τον πρώην υπάλληλο και τον μάνατζερ του καταστήματος. <br>Θα χρειαστεί να ορίσετε νέο όνομα χρήστη και να ενημερώσετε το κατάστημα που θα δουλεύει, την θέση την οποία θα έχει, καθώς και τον μισθό που θα παίρνει.";
						yesAddNewInfoBtn.focus();
						yesAddNewInfoBtn.addEventListener("click", ServeCommunicateToHireBackExEmployee);

						function ServeCommunicateToHireBackExEmployee() {
							var editWindowC = document.getElementById("editWindowC");
							var editTitleTextC = document.getElementById("editTitleTextC");
							var editInfoGetterLeftC = document.getElementById("editInfoGetterLeftC");
							var editInfoGetterRightC = document.getElementById("editInfoGetterRightC");

							alertAddNewInfoC.style.display = "none";
							deleteInfoBtn.style.display = "none";
							editWindowC.style.display = "block";
							var serverCommun = new ServerCommunication();
							serverCommun.HireBackExEmployee(exEmployee);
						}

						noAddNewInfoBtn.addEventListener("click", function() {
							alertAddNewInfoC.style.display = "none";
							deleteInfoBtn.style.display = "none";
							for(var h = 0; h < helper2.length; h++) {
								helper2[h].remove();
							}
							openOptionForHiringBackCounter = 0;
						});
						deleteInfoBtn.style.display = "block";
						deleteInfoBtn.addEventListener("click", function() {
							alertAddNewInfoC.style.display = "none";
							deleteInfoBtn.style.display = "none";
							openOptionForHiringBackCounter = 1;
							
							//MAKE SURE BEFORE EMPLOYEE IS BEING DELETED
							alertAddNewInfoC.style.display = "block";
							addNewInfoTitleTextC.innerHTML = "ΔΙΑΓΡΑΦΗ ΠΡΩΗΝ ΥΠΑΛΛΗΛΟΥ";
							addNewInfoTextC.innerHTML = "Θέλετε να διαγράψετε οριστικά, τον πρώην υπάλληλο || " + exEmployee.name + " || ;<br>Προσοχή, η διαγραφή του είναι οριστική!";
							
							yesAddNewInfoBtn.removeEventListener("click", ServeCommunicateToHireBackExEmployee);
							yesAddNewInfoBtn.addEventListener("click", function() {
								coverPageHelperC.style.display = "block";
								var serverCommun = new ServerCommunication();
								serverCommun.DeleteExEmployee(exEmployee.id);
							});
							noAddNewInfoBtn.focus();
							noAddNewInfoBtn.addEventListener("click", function() {
								alertAddNewInfoC.style.display = "none";
							});
						});

						exitEditBtn.addEventListener("click", function() {
							alertAddNewInfoC.style.display = "none";
							deleteInfoBtn.style.display = "none";
							for(var h = 0; h < helper2.length; h++) {
								helper2[h].remove();
							}
							openOptionForHiringBackCounter = 0;
						});
					}
					else {

					}
				});
			}
		}
	}
}

//(2)->ASYNC FUNCTION THAT RETURNS EX EMPLOYEES DEPEND FROM THE TYPE(DISCHARGED OR RESIGNED EMPLOYEES)
function GetExEmployees(type) {
	return new Promise ((resolve, reject) => {
		$.ajax({
			type: 'POST',
			url: "../Php/getExEmployeesPhp.php",
			data: {tp: type},
			success: function(data) {
				data = JSON.parse(data);
				resolve(data);
			}
		});
	});
}



// 3/3 PART OF THIS FILE FUNCTIONS
ResignEmployeesStart();

//HEART OF 1/3 FUNCTIONS IN THIS FILE (3/3 TOTAL TILL NOW)
function ResignEmployeesStart() {
	TitleCCreateResignView();
	CreateDischargeOrResignView("Resign");
	//BtnListenerForResignEmployees();
	//ResignSearchBarFunctions();	
}


//*(1)INIALITZE TITLE OF RESIGN VIEW OF EMPLOYEES CONTENT
function TitleCCreateResignView() {
	resignTitleOfContentC.innerHTML = "ΑΡΧΕΙΟ ΠΑΡΑΙΤΗΘΕΝΤΩΝ";
}