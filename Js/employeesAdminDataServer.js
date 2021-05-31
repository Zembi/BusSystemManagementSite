
//INITIALIZE VARIABLES FOR STYLING 
var lastUpdateInfoC = document.getElementById("lastUpdateInfoC");
var listOfBranchesBtn = document.getElementById("listOfBranchesBtn");
var newBranchBtn = document.getElementById("newBranchBtn");
var viewEmployeeBtn = document.getElementById("viewEmployeeBtn");
var recruitmentEmployeeBtn = document.getElementById("recruitmentEmployeeBtn");
var dischargeEmployeeBtn = document.getElementById("dischargeEmployeeBtn");
var resignationEmployeeBtn = document.getElementById("resignationEmployeeBtn");
var currentAction = "Start";
var lastAction = "none";

viewEmployeeBtn.addEventListener("click", StartEmployeeScreen);
recruitmentEmployeeBtn.addEventListener("click", RecruitmentEmployeeScreen);
dischargeEmployeeBtn.addEventListener("click", DischargeEmployeeScreen);
resignationEmployeeBtn.addEventListener("click", ResignationEmployeeScreen);

ServerEmployee();

function ServerEmployee() {
	StartEmployeeScreen();

	GetUsersOnline();
	setInterval(function() { 
		GetUsersOnline();
	}, 15000);
}

function StartEmployeeScreen() {
	if((sessionStorage.getItem("Load") != "On") && (lastAction != "Start")) {
		ChangeScreen("ShowEmployees");
		currentAction = "Start";
		viewEmployeeBtn.style.display = "none";
		MarginForBtnsOfMenu(viewEmployeeBtn, "none");
		recruitmentEmployeeBtn.style.display = "block";
		MarginForBtnsOfMenu(viewEmployeeBtn, "");
		dischargeEmployeeBtn.style.display = "block";
		MarginForBtnsOfMenu(viewEmployeeBtn, "");
		resignationEmployeeBtn.style.display = "block";
		MarginForBtnsOfMenu(viewEmployeeBtn, "last");
	}
	lastAction = currentAction;
}

function RecruitmentEmployeeScreen() {
	if((sessionStorage.getItem("Load") != "On") && (lastAction != "Recruit")) {
		ChangeScreen("RecruitNewEmployee");
		currentAction = "Recruit";
		viewEmployeeBtn.style.display = "block";
		MarginForBtnsOfMenu(viewEmployeeBtn, "");
		recruitmentEmployeeBtn.style.display = "none";
		MarginForBtnsOfMenu(viewEmployeeBtn, "none");
		dischargeEmployeeBtn.style.display = "block";
		MarginForBtnsOfMenu(viewEmployeeBtn, "");
		resignationEmployeeBtn.style.display = "block";
		MarginForBtnsOfMenu(viewEmployeeBtn, "last");
	}
	lastAction = currentAction;
}

function DischargeEmployeeScreen() {
	if((sessionStorage.getItem("Load") != "On") && (lastAction != "Discharge")) {
		ChangeScreen("DischargeEmployee");
		currentAction = "Discharge";
		viewEmployeeBtn.style.display = "block";
		MarginForBtnsOfMenu(viewEmployeeBtn, "");
		recruitmentEmployeeBtn.style.display = "block";
		MarginForBtnsOfMenu(viewEmployeeBtn, "");
		dischargeEmployeeBtn.style.display = "none";
		MarginForBtnsOfMenu(viewEmployeeBtn, "none");
		resignationEmployeeBtn.style.display = "block";
		MarginForBtnsOfMenu(viewEmployeeBtn, "last");
	}
	lastAction = currentAction;
}

function ResignationEmployeeScreen() {
	if((sessionStorage.getItem("Load") != "On") && (lastAction != "Resign")) {
		ChangeScreen("ResignEmployee");
		currentAction = "Resign";
		viewEmployeeBtn.style.display = "block";
		MarginForBtnsOfMenu(viewEmployeeBtn, "");
		recruitmentEmployeeBtn.style.display = "block";
		MarginForBtnsOfMenu(viewEmployeeBtn, "");
		dischargeEmployeeBtn.style.display = "block";
		MarginForBtnsOfMenu(viewEmployeeBtn, "");
		resignationEmployeeBtn.style.display = "none";
		MarginForBtnsOfMenu(viewEmployeeBtn, "none");
	}
	lastAction = currentAction;
}

function MarginForBtnsOfMenu(element, pos) {
	if(pos == "last") {
		element.style.margin = "0 0 0 30px";
	}
	else if(pos == "none") {
		element.style.margin = "0px";
	}
	else {
		element.style.margin = "0 30px 0 30px";
	}
}

function GetUsersOnline() {
	$.ajax({
		type: 'POST',
		url: "../Php/getCountOfAdminsOnlinePhp.php",
		data: {},
		success: function(data) {
			if(onlineAdminTextC.innerHTML != data) {
				onlineAdminTextC.innerHTML = data;
			}
		}
	});
	$.ajax({
		type: 'POST',
		url: "../Php/getCountOfEmployeesOnlinePhp.php",
		data: {},
		success: function(data) {
			if(onlineEmployeeTextC.innerHTML != data) {
				onlineEmployeeTextC.innerHTML = data;
			}
		}
	});
	lastUpdateInfoC.innerHTML = UpdateChange();
}

function UpdateChange() {
	var currentDate = new Date();
	var extraH = "";
	var extraM = "";
	var extraS = "";
	if(currentDate.getHours() < 10) {
		extraH = 0;
	}
	if(currentDate.getMinutes() < 10) {
		extraM = 0;
	}
	if(currentDate.getSeconds() < 10) {
		extraS = 0;
	}
	var dateTime = "Τελευταία ενημέρωση: " + currentDate.getDate() + "/" + (currentDate.getMonth() + 1) + "/" + currentDate.getFullYear() + "  -  " 
					+ extraH + currentDate.getHours() + ":" + extraM + currentDate.getMinutes() + ":" + extraS + currentDate.getSeconds();
	return dateTime;
}

function ChangeScreen(action) {
	//FILE CALL
	var file = "EmployeesScreens/" + action + ".html";

  	$(function(){
    	$("#employeeContentC").load(file, function(response, status, xhr) {
        	if(status == "error") {
        	  alert("Error: " + xhr.status + " " + xhr.statusText);
        	}
    	})
  });
}