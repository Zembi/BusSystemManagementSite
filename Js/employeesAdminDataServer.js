
//INITIALIZE VARIABLES FOR STYLING 
var onlineAdminTextC = document.getElementById("onlineAdminTextC");
var onlineEmployeeTextC = document.getElementById("onlineEmployeeTextC");
var lastUpdateInfoC = document.getElementById("lastUpdateInfoC");
var searchEmployeeInpt = document.getElementById("searchEmployeeInpt");
var newBranchBtn = document.getElementById("newBranchBtn");
var viewEmployeeBtn = document.getElementById("viewEmployeeBtn");
var recruitmentEmployeeBtn = document.getElementById("recruitmentEmployeeBtn");
var currentAction = "StartView";
var lastAction = "none";
var employeesObjSArray = [];

var loadEmployeesC = document.getElementById("loadEmployeesC");
var searchEmployeeC = document.getElementById("searchEmployeeC");
var employeeContentC = document.getElementById("employeeContentC");

viewEmployeeBtn.addEventListener("click", StartEmployeeScreen);
recruitmentEmployeeBtn.addEventListener("click", RecruitmentEmployeeScreen);


//MAIN FUNCTION
ServerEmployee();



//*(1)EMPLOYEES SERFVER START FROM HERE(ALL MAIN FUNCTIONS IS BEING CALLED)
async function ServerEmployee() {
	StartLoaderOnMainInfo();
	ClearStatusData();
	StartLoadingStatusInfo();
	//MAKE OBJECTS FROM SERVER EMPLOYEES OBJECTS
	PhpObjectConvertToJsObject(await GetEmployeesWithPasswd());
	employeesObjSArray.sort(SortBranchId);
	await new Promise(wait => setTimeout(wait, 1000));
	StopLoaderOnMainInfo();
	GetUsersIn();
	StopLoadingStatusInfo();
	NoWhiteSpaceInSearchBar();
	StartEmployeeScreen();
	//RecruitmentEmployeeScreen();
	
	setInterval(async function() {
		GetUsersIn();
	}, 15000);
}



//*(2)START LOADING SCREEN
function StartLoaderOnMainInfo() {
	var loaderC = document.createElement("div");
	loaderC.id = "loaderC";
	loadEmployeesC.appendChild(loaderC);
	searchEmployeeC.style.display = "none";
	employeeContentC.style.display = "none";
	loadEmployeesC.style.display = "block";
	sessionStorage.setItem("Load", "On");
}

//(2)->STOP LOADER WHEN ALL EMPLOYEES ARE LOADED TO CLIENT SIDE
function StopLoaderOnMainInfo() {
	var loaderC = document.getElementById("loaderC");
	loadEmployeesC.innerHTML = "";
	searchEmployeeC.style.display = "block";
	employeeContentC.style.display = "block";
	loadEmployeesC.style.display = "none";
	sessionStorage.setItem("Load", "Off");
}



//*(3)CLEAR ONLINE EMPLOYEES CONTAINERS FROM ANY PREVIOUS VALUE
function ClearStatusData() {
	onlineAdminTextC.innerHTML = "";
	onlineEmployeeTextC.innerHTML = "";

	lastUpdateInfoC.innerHTML = "";
}

//(3)->LOADING ONLINE EMPLOYEES CONTAINERS
function StartLoadingStatusInfo() {
	onlineAdminTextC.style.animation = "roundBorderToRight 1s linear infinite";
	onlineEmployeeTextC.style.animation = "roundBorderToLeft 1s linear infinite";
}

//(3)->STOP LOADING USERS ONLINE INFO 
function StopLoadingStatusInfo() {
	onlineAdminTextC.style.animation = "none";
	onlineEmployeeTextC.style.animation = "none";
}



//*(4)GET ALL EMPLOYEES FROM SERVER SIDE AND CONVERT IT TO EMPLOYEE OBJECTS
function PhpObjectConvertToJsObject(employees) {
	for(var i = 0; i < employees.length; i++) {
		var employee = new Employee(employees[i].id, employees[i].username, employees[i].email, employees[i].name,
					employees[i].icon, employees[i].branchId, employees[i].status, employees[i].sex,
					employees[i].wage, employees[i].recruitmentDay, employees[i].AFM, employees[i].AMKA, employees[i].password);

		employeesObjSArray.push(employee);
	}
}

//(4)->GET EMPLOYEES USERS FROM SERVER, TO SEND TO PhpObjectConvertToJsObject FUNCTION (THOSE WHO CAN CONNECT TO THE SYSTEM)
function GetEmployeesWithPasswd() {
	var emplArray = [];
	return new Promise((resolve, reject) => {
		$.ajax({
			type: 'POST',
			url: "../Php/getEmployeesWithPasswdPhp.php",
			data: {},
			success: function(data) {
				//alert(data);
				emplArray = JSON.parse(data);
				resolve(emplArray);
			}
		});
	});
}

//(4)->SORT FUNCTION OF EMPLOYEES WITH BRANCH ID 
function SortBranchId(a, b) {
	return a.getBranchId() - b.getBranchId();
}



//*(5)GET USERS THAT ARE SIGN IN. SPLIT IN TWO CATEGORIES, ADMINS AND REST OF EMPLOYEES(MANAGER, AGENCY AND STORE EMPLOYEES)
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

//(5)->INFORM WHEN LAST UPDATE CHANGE HAS BEEN DONE, ABOUT USERS ONLINE INFO
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



//*(6)NOT ALLOW WHITE SPACE IN SEARCH BAR
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



//*(7)WHEN viewEmployeeBtn BUTTON IS TRIGGERED, LOAD ShowEmployees.html (DEFAULT SCREEN)
function StartEmployeeScreen() {
	if((sessionStorage.getItem("Load") != "On") && (lastAction != "StartView")) {
		ChangeScreen("ShowEmployees");
		currentAction = "StartView";
	}
	lastAction = currentAction;
}



//*(8)WHEN recruitmentEmployeeBtn BUTTON IS TRIGGERED, LOAD RecruitNewEmployee.html
function RecruitmentEmployeeScreen() {
	if((sessionStorage.getItem("Load") != "On") && (lastAction != "Recruit")) {
		ChangeScreen("RecruitNewEmployee");
		currentAction = "Recruit";
	}
	lastAction = currentAction;
}

//(7)(8)->FUNCTION THAT IS BEING CALLED WHEN BUTTON IS PRESSED, TO CHANGE EMPLOYEES CONTENT SCREEN
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