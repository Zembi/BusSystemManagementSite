
var activeBranchNumC = document.getElementById("activeBranchNumC");
var underReconstBranchNumC = document.getElementById("underReconstBranchNumC");
var underConstBranchNumC = document.getElementById("underConstBranchNumC");
var problemBranchNumC = document.getElementById("problemBranchNumC");

var lastUpdateInfoC = document.getElementById("lastUpdateInfoC");

var loadC = document.getElementById("loadC");
var showBranchesC = document.getElementById("showBranchesC");
var countBranch = 0;

FindBranchesAndCreateView();

async function FindBranchesAndCreateView() {
	StartLoaderOnMainInfo();
	ClearStatusData();
	lastUpdateInfoC.innerHTML = "";
	StartLoadingStatusInfo();
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
	var dateTime = "Last Update: " + currentDate.getDate() + "/" + (currentDate.getMonth() + 1) + "/" + currentDate.getFullYear() + "  -  " 
					+ extraH + currentDate.getHours() + ":" + extraM + currentDate.getMinutes() + ":" + extraS + currentDate.getSeconds();
	return dateTime;
}

function StartLoaderOnMainInfo() {
	var loaderC = document.createElement("div");
	loaderC.id = "loaderC";
	loadC.appendChild(loaderC);
	showBranchesC.style.display = "none";
	loadC.style.display = "block";
	sessionStorage.setItem("Load", "On");
}

function StartLoadingStatusInfo() {
	activeBranchNumC.style.animation = "roundBorderToRight 1s linear infinite";
	underReconstBranchNumC.style.animation = "roundBorderToLeft 1s linear infinite";
	underConstBranchNumC.style.animation = "roundBorderToRight 1s linear infinite";
	problemBranchNumC.style.animation = "roundBorderToLeft 1s linear infinite";
}

function ClearStatusData() {
	activeBranchNumC.innerHTML = "";
	underReconstBranchNumC.innerHTML = "";
	underConstBranchNumC.innerHTML = "";
	problemBranchNumC.innerHTML = "";
}

function StopLoaderOnMainInfo() {
	var loaderC = document.getElementById("loaderC");
	loadC.innerHTML = "";
	showBranchesC.style.display = "block";
	loadC.style.display = "none";
	sessionStorage.setItem("Load", "Off");
}

function StopLoadingStatusInfo() {
	activeBranchNumC.style.animation = "none";
	underReconstBranchNumC.style.animation = "none";
	underConstBranchNumC.style.animation = "none";
	problemBranchNumC.style.animation = "none";
}

function CreateElementForBranch(id) {
	var div = document.createElement("div");
	div.id = id;
	div.className = "branchListViewC";
	showBranchesC.appendChild(div);
}

function PrototypeOfBranchList(action, id) {
	
 	return new Promise ((resolve, reject) => {
	//FILE CALL
		setTimeout(function() {
     	 	resolve();
     	}, 300);
		var file = "BranchesScreens/" + action + ".html";
		$(function(){
     	 	$("#" + id).load(file, 
      			function(response, status, xhr) {
					if(status == "error") {
    					alert("Error: " + xhr.status + " " + xhr.statusText);
  					}
  				})
   		});
    });
}