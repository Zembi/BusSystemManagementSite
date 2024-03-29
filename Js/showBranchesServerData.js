
//VARIABLES INITIALIZATION
var activeBranchNumC = document.getElementById("activeBranchNumC");
var underReconstBranchNumC = document.getElementById("underReconstBranchNumC");
var underConstBranchNumC = document.getElementById("underConstBranchNumC");
var problemBranchNumC = document.getElementById("problemBranchNumC");

var lastUpdateInfoC = document.getElementById("lastUpdateInfoC");

var loadBranchesC = document.getElementById("loadBranchesC");
var showBranchesC = document.getElementById("showBranchesC");
var countBranch = 0;

//MAIN FUNCTION HERE
FindBranchesStatusAndCreateView();


//*(1)START OF BRANCHES SERVER
async function FindBranchesStatusAndCreateView() {
	StartLoaderOnMainInfo();
	ClearStatusData();
	StartLoadingStatusInfo();
	TitleAndBasicActionsOfBranches();
	for(var i = 0; i < branchArray.length; i++) {
		var id = "branches" + i + "C";
		CreateElementForBranch(id);
		await PrototypeOfBranchList("PrototypeBranchView", id);
	}
	StatusInfo();
	lastUpdateInfoC.innerHTML = UpdateChange();
	StopLoadingStatusInfo();
	StopLoaderOnMainInfo();
}



//*(2)START LOADING SCREEN
function StartLoaderOnMainInfo() {
	var loaderC = document.createElement("div");
	loaderC.id = "loaderC";
	loadBranchesC.appendChild(loaderC);
	showBranchesC.style.display = "none";
	loadBranchesC.style.display = "block";
	sessionStorage.setItem("Load", "On");
}

//(2)->STOP LOADER WHEN ALL BRANCHES ARE LOADED TO CLIENT SIDE
function StopLoaderOnMainInfo() {
	var loaderC = document.getElementById("loaderC");
	loadBranchesC.innerHTML = "";
	showBranchesC.style.display = "block";
	loadBranchesC.style.display = "none";
	sessionStorage.setItem("Load", "Off");
}



//*(3)CLEAR ONLINE EMPLOYEES CONTAINERS FROM ANY PREVIOUS VALUE
function ClearStatusData() {
	activeBranchNumC.innerHTML = "";
	underReconstBranchNumC.innerHTML = "";
	underConstBranchNumC.innerHTML = "";
	problemBranchNumC.innerHTML = "";

	lastUpdateInfoC.innerHTML = "";
}

//(3)->LOADING ONLINE EMPLOYEES CONTAINERS
function StartLoadingStatusInfo() {
	activeBranchNumC.style.animation = "roundBorderToRight 1s linear infinite";
	underReconstBranchNumC.style.animation = "roundBorderToLeft 1s linear infinite";
	underConstBranchNumC.style.animation = "roundBorderToRight 1s linear infinite";
	problemBranchNumC.style.animation = "roundBorderToLeft 1s linear infinite";
}

//(3)->STOP LOADING USERS ONLINE INFO 
function StopLoadingStatusInfo() {
	activeBranchNumC.style.animation = "none";
	underReconstBranchNumC.style.animation = "none";
	underConstBranchNumC.style.animation = "none";
	problemBranchNumC.style.animation = "none";
}



//*(4)TITLE OF THIS SHOW VIEW AND CREATE ACTIONS FOR ALL BRANCHES
function TitleAndBasicActionsOfBranches() {
	var titleShowBranchesC = document.getElementById("titleShowBranchesC");
	var titleTextShowBranchesC = document.getElementById("titleTextShowBranchesC");

	titleTextShowBranchesC.innerHTML = "ΠΡΟΒΟΛΗ ΚΑΤΑΣΤΗΜΑΤΩΝ";
	ActionOfOpeningAndClosingAllBranchesInfo();
}

//(4)->CREATE ACTION OF OPENING AND CLOSING ALL BRANCHES INFO, WITH ONE BUTTON
function ActionOfOpeningAndClosingAllBranchesInfo() {
	var buttonsMenuActionsC = document.getElementById("buttonsMenuActionsC");

	var openCloseAllBranchesInfoBtn = document.createElement("button");
	openCloseAllBranchesInfoBtn.id = "openCloseAllBranchesInfoBtn";
	openCloseAllBranchesInfoBtn.innerHTML = "Άνοιγμα όλων των πληροφοριών";
	openCloseAllBranchesInfoBtn.name = 0;
	openCloseAllBranchesInfoBtn.addEventListener("click", function() {
		if(this.name == 0) {
			OpenAllBranchInfoButtons();
			this.innerHTML = "Κλείσιμο όλων των πληροφοριών";
			this.name = 1;
		}
		else {
			CloseAllBranchInfoButtons();
			this.innerHTML = "Άνοιγμα όλων των πληροφοριών";
			this.name = 0;
		}
	});

	buttonsMenuActionsC.appendChild(openCloseAllBranchesInfoBtn);
}

//(4)->OPEN ALL BRANCH INFO BUTTONS
function OpenAllBranchInfoButtons() {
	var allBranchesViewC = document.getElementsByClassName("prototypeBranchViewC");
	var buttonsInfoArray = [];

	//REMOVE DISABLED BUTTONS
	for(var i = 0; i < allBranchesViewC.length; i++) {
		var branchInfoBtn = allBranchesViewC[i].querySelector("#branchInfoBtn");

		if(!branchInfoBtn.disabled) {
			buttonsInfoArray.push(branchInfoBtn);
		}
	}

	for(var i = (buttonsInfoArray.length - 1); i >= 0; i--) {
		if(buttonsInfoArray[i].name == 0) {
			buttonsInfoArray[i].click();
		}
	}
}

//(4)->CLOSE ALL BRANCH INFO BUTTONS
function CloseAllBranchInfoButtons() {
	var allBranchesViewC = document.getElementsByClassName("prototypeBranchViewC");
	var buttonsInfoArray = [];

	//REMOVE DISABLED BUTTONS
	for(var i = 0; i < allBranchesViewC.length; i++) {
		var branchInfoBtn = allBranchesViewC[i].querySelector("#branchInfoBtn");

		if(!branchInfoBtn.disabled) {
			buttonsInfoArray.push(branchInfoBtn);
		}
	}

	for(var i = (buttonsInfoArray.length - 1); i >= 0; i--) {
		if(buttonsInfoArray[i].name == 1) {
			buttonsInfoArray[i].click();
		}
	}
}



//*(5)CREATE DIV ELEMENTS FOR EACH BRANCH
function CreateElementForBranch(id) {
	var div = document.createElement("div");
	div.id = id;
	div.className = "branchListViewC";
	showBranchesC.appendChild(div);
}

//(5)->FUNCTION THAT IS USED, TO CHANGE FULLFILL ELEMENTS, THAT HAVE BEEN CREATED FROM CreateElementForBranch FUNCTION, WITH PrototypeBranchView.html ELEMENTS
function PrototypeOfBranchList(action, id) {
	return new Promise ((resolve, reject) => {
	//FILE CALL
		setTimeout(function() {
		 	resolve();
		}, 200);
		var file = "BranchesScreens/" + action + ".html";
		$(function(){
			$("#" + id).load(file, function(response, status, xhr) {
					if(status == "error") {
						alert("Error: " + xhr.status + " " + xhr.statusText);
					}
				})
		});
	});
}



//*(6)CHECK STATUS INFO OF BRANCH
function StatusInfo() {
	var a = 0;
	var u_R = 0;
	var u_C = 0;
	var p = 0;

	for(var i = 0; i < branchArray.length; i++) {
		if(branchArray[i].getStatus() == "Active") {
			a++;
		}
		else if(branchArray[i].getStatus() == "Under_R") {
			u_R++;
		}
		else if(branchArray[i].getStatus() == "Under_C") {
			u_C++;
		}
		else if(branchArray[i].getStatus() == "Problem") {
			p++;
		}
	}
	
	activeBranchNumC.innerHTML = a;
	underReconstBranchNumC.innerHTML = u_R;
	underConstBranchNumC.innerHTML = u_C;
	problemBranchNumC.innerHTML = p;
}



//*(7)INFORM WHEN LAST UPDATE CHANGE HAS BEEN DONE, ABOUT BRANCHES STATUS INFO
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