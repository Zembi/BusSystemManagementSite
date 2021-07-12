
var searchEmployeeInpt = document.getElementById("searchEmployeeInpt");
var searchEmployeeBtn = document.getElementById("searchEmployeeBtn");
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
var idOfPanels = [0, 1, 2];
var sidesCounter = 0;

//NEW DIV WHERE EMPLOYEE DIVS WILL BE
var allElementsC = document.createElement("div");
allElementsC.id = "allElementsC";
allElementsC.style.left = 0;
centerShowContentC.appendChild(allElementsC);

showEmployeesStart();

function showEmployeesStart() {
	FindTitleAndEmployeesAndCreateView();
	CreateShowView();
	BtnListenerForEmployees();
	StartSearchBarFunctions();
}

function FindTitleAndEmployeesAndCreateView() {
	titleOfContentC.innerHTML = "ΠΡΟΒΟΛΗ ΚΑΙ ΕΠΕΞΕΡΓΑΣΙΑ ΣΤΟΙΧΕΙΩΝ ΥΠΑΛΛΗΛΩΝ";
}

function StartSearchBarFunctions() {
	searchEmployeeBtn.addEventListener("click", ShowViewEmployeesSearchBar);
}

/*function DischargeEmployeeSearchBar() {

}

function ResignEmployeeSearchBar() {

}*/

function ShowViewEmployeesSearchBar() {
	var found = 0;
	var searchUsername = searchEmployeeInpt.value;
	for(var i = 0; i < employeesObjSArray.length; i++) {
		if(searchUsername == employeesObjSArray[i].getUsername()) {
			found = 1;
			MoveSlideView(i);
			idOfEmployeeFound = searchUsername + " ++++ " + i;
			LightPanelOfEmployee(idOfEmployeeFound);
		}
	}

	//IF USERNAME DOESN'T FOUND
	if(!found) {
		alert("Δεν βρέθηκε ο υπάλληλος με Username " + searchUsername);
	}
}

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

function LightPanelOfEmployee(idOfEmployeeFound) {
	var panelOfEmployeeFound = document.getElementById(idOfEmployeeFound);
	panelOfEmployeeFound.style.transition = "background 0.3s";
	setTimeout( function() {
		panelOfEmployeeFound.style.background = "rgb(123, 106, 128)";
	}, 1000);
	setTimeout( function() {
		panelOfEmployeeFound.style.background = "rgb(22, 36, 53)";
	}, 2000);
	/*panelOfEmployeeFound.addEventListener("mouseover", function() {
		panelOfEmployeeFound.style.background = "rgb(19, 36, 43)";
	});
	panelOfEmployeeFound.addEventListener("mouseout", function() {
		panelOfEmployeeFound.style.background = "rgb(22, 36, 53)";
	});*/
}

function BtnListenerForEmployees() {
	leftClickEmployeesBtn.addEventListener("click", LeftBtnListener);
	rightClickEmployeesBtn.addEventListener("click", RightBtnListener);
}

function CreateShowView() {
	if(sessionStorage.getItem("lockCheck") === null) {
		sessionStorage.setItem("lockCheck", "locked");
	}

	allInfoLockedBtn.addEventListener("click", ChangeStatementLockOrUnlock);
	CreateTheLockButton();

	//CREATE THE POSITION WHERE THE ELEMENTS IS GONNA MOVE IN AND OUT
	for(var i = 0; i < employeesObjSArray.length; i++) {
		employeesObjSArray[i].CreateSlideShowView(allElementsC, i);
	}
	CounterForEmployeesAndShow();
	downShowEmployeesCountC.title = "Υπάλληλοι: " + employeesObjSArray.length;
}

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
			allInfoLockedBtn.title = "Ξεκλείδωμα";
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

function LeftBtnListener() {
	var panelOfEmployeeC = document.getElementsByClassName("panelOfEmployeeC")[0];

	if(idOfPanels[0] == 0) {

	}
	else {
		var sum = (parseInt(allElementsC.style.left) + panelOfEmployeeC.offsetWidth) + "px";
		allElementsC.style.left = sum;
		for(var i = 0; i < idOfPanels.length; i++) {
			idOfPanels[i]--;
		}
	}

	CounterForEmployeesAndShow();
}

function RightBtnListener() {
	var panelOfEmployeeC = document.getElementsByClassName("panelOfEmployeeC")[0];
	
	if(idOfPanels[2] == ((employeesObjSArray.length - 1))) {
	
	}
	else {
		var sum = (parseInt(allElementsC.style.left) - panelOfEmployeeC.offsetWidth) + "px";
		allElementsC.style.left = sum;
		for(var i = 0; i < idOfPanels.length; i++) {
			idOfPanels[i]++;
		}
	}

	CounterForEmployeesAndShow();
}

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
		centerShowContentC.style.borderLeft = "6px solid rgb(13, 18, 24)";
	}
	else {
		leftNoEmployee1C.style.display = "block";
		leftNoEmployee2C.style.display = "block";
		centerShowContentC.style.borderLeft = "6px solid rgb(13, 18, 24)";
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
		centerShowContentC.style.borderRight = "6px solid rgb(13, 18, 24)";
	}
	else {
		rightNoEmployee1C.style.display = "block";
		rightNoEmployee2C.style.display = "block";
		centerShowContentC.style.borderRight = "6px solid rgb(13, 18, 24)";
	}
}