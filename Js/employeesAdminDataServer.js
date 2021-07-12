
//INITIALIZE VARIABLES FOR STYLING 
var onlineAdminTextC = document.getElementById("onlineAdminTextC");
var onlineEmployeeTextC = document.getElementById("onlineEmployeeTextC");
var lastUpdateInfoC = document.getElementById("lastUpdateInfoC");
var searchEmployeeInpt = document.getElementById("searchEmployeeInpt");
var newBranchBtn = document.getElementById("newBranchBtn");
var viewEmployeeBtn = document.getElementById("viewEmployeeBtn");
var recruitmentEmployeeBtn = document.getElementById("recruitmentEmployeeBtn");
var dischargeEmployeeBtn = document.getElementById("dischargeEmployeeBtn");
var resignationEmployeeBtn = document.getElementById("resignationEmployeeBtn");
var currentAction = "StartView";
var lastAction = "none";
var employeesObjSArray = [];

var loadEmployeesC = document.getElementById("loadEmployeesC");
var searchEmployeeC = document.getElementById("searchEmployeeC");
var employeeContentC = document.getElementById("employeeContentC");

viewEmployeeBtn.addEventListener("click", StartEmployeeScreen);
recruitmentEmployeeBtn.addEventListener("click", RecruitmentEmployeeScreen);
dischargeEmployeeBtn.addEventListener("click", DischargeEmployeeScreen);
resignationEmployeeBtn.addEventListener("click", ResignationEmployeeScreen);

ServerEmployee();

async function ServerEmployee() {
	StartLoaderOnMainInfo();
	ClearStatusData();
	StartLoadingStatusInfo();
	//MAKE OBJECTS FROM SERVER EMPLOYEES OBJECTS
	phpObjectConvertToJsObject(await GetAllEmployees());
	await new Promise(wait => setTimeout(wait, 1000));
	StopLoaderOnMainInfo();
	GetUsersIn();
	StopLoadingStatusInfo();
	NoWhiteSpaceInSearchBar();
	StartEmployeeScreen();

	setInterval(async function() {
		GetUsersIn();
	}, 15000);
}

function phpObjectConvertToJsObject(employeesArray) {
	for(var i = 0; i < employeesArray.length; i++) {
		var employee = new Employee(employeesArray[i].username, employeesArray[i].email, employeesArray[i].name,
					employeesArray[i].icon, employeesArray[i].branchId, employeesArray[i].status, employeesArray[i].sex,
					employeesArray[i].wage, employeesArray[i].recruitmentDay);

		employeesObjSArray.push(employee);
	}
	//alert(employee.getDateDifferenceFromWhenEmployeeHired("months"));
}

function StartEmployeeScreen() {
	if((sessionStorage.getItem("Load") != "On") && (lastAction != "StartView")) {
		ChangeScreen("ShowEmployees");
		//ChangeScreen("RecruitNewEmployee");
		currentAction = "StartView";
	}
	lastAction = currentAction;
}

function RecruitmentEmployeeScreen() {
	if((sessionStorage.getItem("Load") != "On") && (lastAction != "Recruit")) {
		ChangeScreen("RecruitNewEmployee");
		currentAction = "Recruit";
	}
	lastAction = currentAction;
}

function DischargeEmployeeScreen() {
	if((sessionStorage.getItem("Load") != "On") && (lastAction != "Discharge")) {
		ChangeScreen("DischargeEmployee");
		currentAction = "Discharge";
	}
	lastAction = currentAction;
}

function ResignationEmployeeScreen() {
	if((sessionStorage.getItem("Load") != "On") && (lastAction != "Resign")) {
		ChangeScreen("ResignEmployee");
		currentAction = "Resign";
	}
	lastAction = currentAction;
}

function StartLoaderOnMainInfo() {
	var loaderC = document.createElement("div");
	loaderC.id = "loaderC";
	loadEmployeesC.appendChild(loaderC);
	searchEmployeeC.style.display = "none";
	employeeContentC.style.display = "none";
	loadEmployeesC.style.display = "block";
	sessionStorage.setItem("Load", "On");
}

function ClearStatusData() {
	onlineAdminTextC.innerHTML = "";
	onlineEmployeeTextC.innerHTML = "";

	lastUpdateInfoC.innerHTML = "";
}

function StartLoadingStatusInfo() {
	onlineAdminTextC.style.animation = "roundBorderToRight 1s linear infinite";
	onlineEmployeeTextC.style.animation = "roundBorderToLeft 1s linear infinite";
}

function GetAllEmployees() {
	var emplArray = [];
	return new Promise((resolve, reject) => {
		$.ajax({
			type: 'POST',
			url: "../Php/getEmployeesPhp.php",
			data: {},
			success: function(data) {
				//alert(data);
				emplArray = JSON.parse(data);
				resolve(emplArray);
			}
		});
	});
}

function GetUsersIn() {
	//USER ADMINS ONLINE
	$.ajax({
		type: 'POST',
		url: "../Php/getCountOfAdminsOnlinePhp.php",
		data: {},
		success: function(data) {
			onlineAdminTextC.innerHTML = data;
		}
	});
	//OTHER USER EMPLOYEES
	$.ajax({
		type: 'POST',
		url: "../Php/getCountOfEmployeesOnlinePhp.php",
		data: {},
		success: function(data) {
			onlineEmployeeTextC.innerHTML = data;
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

function StopLoaderOnMainInfo() {
	var loaderC = document.getElementById("loaderC");
	loadEmployeesC.innerHTML = "";
	searchEmployeeC.style.display = "block";
	employeeContentC.style.display = "block";
	loadEmployeesC.style.display = "none";
	sessionStorage.setItem("Load", "Off");
}

function StopLoadingStatusInfo() {
	onlineAdminTextC.style.animation = "none";
	onlineEmployeeTextC.style.animation = "none";
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

//NO WHITE SPACE IN SEARCH BAR
function NoWhiteSpaceInSearchBar() {
	$("#searchEmployeeInpt").on({
  		keydown: function(e) {
    	if (e.which === 32)
      		return false;
  		},
  		change: function() {
    		this.value = this.value.replace(/\s/g, "");
  		}
	});
}