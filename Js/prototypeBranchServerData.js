
//DECLARE GLOBAL VARIABLES
var prototypeBranchViewC;
var topPartC;
var midPartC;
var midRightPartC;
var bottomPartC;
var problemWithManager = 0;
var employeesOfThisBranchArray = [];

//MAIN FUNCTION
FindThisBranch();


//*(1)START OF PROTOTYPE BRANCH SERVER
async function FindThisBranch() {
	employeesOfThisBranchArray = await GetAllEmployeesThatWorkInThisBranch(branchArray[countBranch].getId());

	AddIntoVarsTheElements();
	AddInfoTop();
	AddInfoMiddle();
	AddInfoBottom();
	if(topPartC.children[0].innerHTML == "Σταθμός") {
		topPartC.children[5].click();
	}
	countBranch++;
}



//(1)->GET ALL EMPLOYEES THAT WORK IN THIS BRANCH, FROM THE SERVER SIDE
function GetAllEmployeesThatWorkInThisBranch(branchId) {
	return new Promise ((resolve, reject) => {
		$.ajax({
			type: 'POST',
			url: "../Php/getAllEmployeesThatWorkHerePhp.php",
			data: {brId: branchId},
			success: function(data) {
				data = JSON.parse(data);
				var employeesObj = ConvertObjectsArrayToEmployeeObjsArray(data);
				resolve(employeesObj);
			}
		});
	});
}



//*(2)INITIALIZE STYLING VARIABLES
function AddIntoVarsTheElements() {
	prototypeBranchViewC = document.getElementsByClassName("prototypeBranchViewC")[countBranch];
	topPartC = prototypeBranchViewC.children[0];
	midPartC = prototypeBranchViewC.children[1];
	midRightPartC = prototypeBranchViewC.children[1].children[1];
	bottomPartC = prototypeBranchViewC.children[2];
}



//*(3)TOP PART OF PROTOTYPE BRANCH CONTAINER
function AddInfoTop() {
	var id = prototypeBranchViewC.parentElement.id.match(/\d+/)[0];
	var c = countBranch;
	
	//#typeBrViewC
	topPartC.children[0].innerHTML = branchArray[countBranch].getType();
	//#statusBrViewC
	StatusChooseIcon();
	//#uniqueIdBrViewC
	topPartC.children[2].innerHTML = "#" + branchArray[countBranch].getId();
	//#editBrViewBtn
	topPartC.children[3].addEventListener("click", function() {
		EditInfoOfThisBranch(id, document.getElementsByClassName("prototypeBranchViewC")[id], c);
	});
	//#deleteBrViewBtn
	topPartC.children[4].addEventListener("click", function() {
		DeleteBranch(id, document.getElementsByClassName("prototypeBranchViewC")[id], c);
	});
	//#connectBrViewBtn
	topPartC.children[5].addEventListener("click", function() {
		ConnectBranches(id, document.getElementsByClassName("prototypeBranchViewC")[id], c);
	});
}

//(3)->CHOOSE ICON, DEPENDING FROM THE STATUS OF THE BRANCH
function StatusChooseIcon() {
	if(branchArray[countBranch].getStatus() == "Active") {
		topPartC.children[1].style.backgroundImage = "url(../Assets/icons8_ok_30px.png)";
		topPartC.children[1].title = "Ενεργά";
	}
	else if(branchArray[countBranch].getStatus() == "Under_R") {
		topPartC.children[1].style.backgroundImage = "url(../Assets/icons8_construction_carpenter_ruler_30px.png)";
		topPartC.children[1].title = "Υπό-επισκευή";
	}
	else if(branchArray[countBranch].getStatus() == "Under_C") {
		topPartC.children[1].style.backgroundImage = "url(../Assets/icons8_construction_30px.png)";
		topPartC.children[1].title = "Υπο-κατασκευή";
	}
	else if(branchArray[countBranch].getStatus() == "Problem") {
		topPartC.children[1].style.backgroundImage = "url(../Assets/icons8_high_priority_30px_2.png)";
		topPartC.children[1].title = "Μη ενεργά";
	}
}

//(3)->FUNCTION BEING CALLED WHEN USER WANTS TO EDIT THE INFO OF THE BRANCH
function EditInfoOfThisBranch(id, element, branchCount) {
	var topC = element.children[0];
	var midC = element.children[1];
	var bottomUpDownC = element.children[2];

	//WAITING TO OPEN
	if(!branchSituationArray[id]) {
		var serverCom = new ServerCommunication();
		serverCom.BranchEditInfo(branchArray[branchCount]);
	}
	else {

	}
}

//(3)->FUNCTION BEING CALLED WHEN USER WANTS TO DELETE THE BRANCH
function DeleteBranch(id, element, branchCount) {
	var topC = element.children[0];
	var midC = element.children[1];
	var bottomUpDownC = element.children[2];

	var serverCom = new ServerCommunication();
	serverCom.DeleteThisBranch(branchArray[branchCount]);
}

//(3)->FUNCTION BEING CALLED WHEN USER WANTS TO EDIT THE CONNECTIONS OF THE BRANCH
function ConnectBranches(id, element, branchCount) {
	var topC = element.children[0];
	var midC = element.children[1];
	var bottomUpDownC = element.children[2];

	var serverCom = new ServerCommunication();
	serverCom.EditTheConnectionsOfThisBranch(branchArray[branchCount]);
}



//*(4)MIDDLE PART OF PROTOTYPE BRANCH CONTAINER
async function AddInfoMiddle() {
	var id = prototypeBranchViewC.parentElement.id.match(/\d+/)[0];

	//#imageBranchC
	midPartC.children[0].children[0].style.content = "url(../Assets/BranchesImages/" + branchArray[id].getImageSrc() + ")";
	//#locationBranchC
	midRightPartC.children[0].children[1].innerHTML = branchArray[id].getLocation();
	//#streetBranchC
	midRightPartC.children[0].children[2].innerHTML = "(" + branchArray[id].getStreet() + ")";
	//#managerNameC
	if(branchArray[id].getManager() == null) {
		midRightPartC.children[1].children[1].innerHTML = "Δεν έχει ορισθεί υπεύθυνος διαχείρισης !";
		ManagerChooseIcon(null);
		problemWithManager = 1;
	}
	else {
		var manager = await FindEmployee(branchArray[id].getManager());
		midRightPartC.children[1].addEventListener("mouseover", function() {

		});
		manager.createId("name", midRightPartC.children[1], midRightPartC.children[1], manager.getName());
		midRightPartC.children[1].children[1].innerHTML = manager.getName();
		ManagerChooseIcon(manager);
	}
	//#adminControlManagerC
	midRightPartC.children[2].children[0].innerHTML = "Υπάλληλοι: ";
	midRightPartC.children[2].children[0].style.float = "left";
	midRightPartC.children[2].children[1].innerHTML = employeesOfThisBranchArray.length;
	midRightPartC.children[2].children[1].style.float = "left";
	midRightPartC.children[2].children[1].style.fontWeight = "bold";
	midRightPartC.children[2].children[1].style.fontStyle = "italic";
	midRightPartC.children[2].children[1].style.marginLeft = "10px";
	//#adminControlManagerC
	midRightPartC.children[3].children[0].innerHTML = "Λεωφορεία: ";
	midRightPartC.children[3].children[0].style.float = "left";
	midRightPartC.children[3].children[1].innerHTML = "#BusesNumber";
	midRightPartC.children[3].children[1].style.float = "left";
	midRightPartC.children[3].children[1].style.fontWeight = "bold";
	midRightPartC.children[3].children[1].style.fontStyle = "italic";
	midRightPartC.children[3].children[1].style.marginLeft = "10px";
	//#adminControlManagerC
	midRightPartC.children[4].children[0].innerHTML = "Υπεύθυνος Καταστήματος: ";
	midRightPartC.children[4].children[0].style.float = "left";
	var adminControlEmployee = await branchArray[id].getAdminControlEmployeeObj();
	midRightPartC.children[4].children[1].innerHTML = adminControlEmployee.getUsername();
	midRightPartC.children[4].children[1].style.float = "left";
	midRightPartC.children[4].children[1].style.fontWeight = "bold";
	midRightPartC.children[4].children[1].style.marginLeft = "10px";
	if(userIdIn == branchArray[id].getAdminControl()) {
		midRightPartC.children[4].children[1].style.color = "rgb(255, 215, 0)";
	}
}

//(4)->CHOOSE THE ICON, THAT THE MANAGER OF THIS BRANCH, HAS
async function ManagerChooseIcon(manager) {
	if(manager != null) {
		var id = prototypeBranchViewC.parentElement.id.match(/\d+/)[0];
		midRightPartC.children[1].children[0].style.content = "url(../Assets/PersonType/" + manager.getUserImageSrc() + ")";
	}
	else {
		midRightPartC.children[1].children[0].style.content = "url(../Assets/PersonType/icons8_puzzled_40px_1.png)";
	}
}

//(4)->FIND MANAGER'S INFO
async function FindEmployee(manager) {
	var id = prototypeBranchViewC.parentElement.id.match(/\d+/)[0];
	return (await branchArray[id].findEmployeeInfo(manager));
}



//*(5)DOWN PART OF PROTOTYPE BRANCH CONTAINER
function AddInfoBottom() {
	var id = prototypeBranchViewC.parentElement.id.match(/\d+/)[0];
	//#branchInfoBtn
	bottomPartC.children[0].children[0].addEventListener("click", function() {
		OpenBranchInfo(id, document.getElementsByClassName("prototypeBranchViewC")[id]);
	});

	CreateTheViewOfAllEmployees();

	if(problemWithManager) {
		bottomPartC.children[0].children[0].innerHTML = "Ανενεργό, λόγω μη εύρεσης manager !";
		bottomPartC.children[0].children[0].disabled = true;
		bottomPartC.children[0].children[0].style.background = "grey";
	}
	else {
		bottomPartC.children[0].children[0].innerHTML = "Πληροφορίες για το κατάστημα: " + branchArray[id].getLocation();
	}
}

//(5)->OPENING BRANCH DETAILS FOR EMPLOYEES
function OpenBranchInfo(id, element) {
	var topC = element.children[0];
	var midC = element.children[1];
	var bottomUpDownC = element.children[2];

	//WAITING TO OPEN
	if(!branchSituationArray[id]) {
		bottomUpDownC.children[0].style.top = "-200px";
		bottomUpDownC.children[0].children[0].style.borderRadius = "2px";
	}
	//WAITING TO CLOSE
	else {
		bottomUpDownC.children[0].style.top = "7px";
		bottomUpDownC.children[0].children[0].style.borderRadius = "2px 2p 0px 0px";
	}

	//DISABLE BUTTONS WHEN BRANCH INFO IS ON MOVE
	bottomUpDownC.children[0].children[0].disabled = true;
	bottomUpDownC.children[0].children[0].style.opacity = "0.3";
	bottomUpDownC.children[0].children[0].style.cursor = "auto";
	topC.children[3].disabled = true;
	topC.children[3].style.opacity = "0.3";
	topC.children[3].style.cursor = "auto";
	setTimeout(function() {
		bottomUpDownC.children[0].children[0].disabled = false;
		bottomUpDownC.children[0].children[0].focus();
		bottomUpDownC.children[0].children[0].style.opacity = "1";
		bottomUpDownC.children[0].children[0].style.cursor = "pointer";
		if(!branchSituationArray[id]) {
			topC.children[3].disabled = false;
			topC.children[3].style.opacity = "1";
			topC.children[3].style.cursor = "pointer";
		}
	}, 1000);

	//console.log(id + "    " + branchSituationArray[id])

	if(branchSituationArray[id]) {
		branchSituationArray[id] = 0;
	}
	else {
		branchSituationArray[id] = 1;
	}
}

//(5)->CREATE THE VIEW FOR DETAILS OF THE EMPLOYEES THAT WORK IN THIS BRANCH
function CreateTheViewOfAllEmployees() {
	var allEmplInfoC = bottomPartC.children[0].children[1];
	var c = countBranch;

	var allContainerForBranchEmplC = document.createElement("div");
	allContainerForBranchEmplC.className = "allContainerForBranchEmplC";

	//MANAGER EMPLOYEE CONTAINER
	var managerEmplForBranchViewC = document.createElement("div");
	managerEmplForBranchViewC.className = "managerEmplForBranchViewC";

	var managerEmplForBranchViewTitleC = document.createElement("div");
	managerEmplForBranchViewTitleC.className = "managerEmplForBranchViewTitleC";
	managerEmplForBranchViewTitleC.innerHTML = "Υπεύθυνος Διαχείρισης :";
	managerEmplForBranchViewC.appendChild(managerEmplForBranchViewTitleC);

	var managerEmplForBranchViewContentC = document.createElement("div");
	managerEmplForBranchViewContentC.className = "managerEmplForBranchViewContentC";
	managerEmplForBranchViewC.appendChild(managerEmplForBranchViewContentC);

	allContainerForBranchEmplC.appendChild(managerEmplForBranchViewC);

	//AGENCY EMPLOYEES CONTAINER
	var agencyEmplForBranchViewC = document.createElement("div");
	agencyEmplForBranchViewC.className = "agencyEmplForBranchViewC";

	var agencyEmplForBranchViewTitleC = document.createElement("div");
	agencyEmplForBranchViewTitleC.className = "agencyEmplForBranchViewTitleC";
	agencyEmplForBranchViewTitleC.innerHTML = "Υπάλληλοι Πρακτορείου :";
	agencyEmplForBranchViewC.appendChild(agencyEmplForBranchViewTitleC);

	var agencyEmplForBranchViewContentC = document.createElement("div");
	agencyEmplForBranchViewContentC.className = "agencyEmplForBranchViewContentC";
	agencyEmplForBranchViewC.appendChild(agencyEmplForBranchViewContentC);

	allContainerForBranchEmplC.appendChild(agencyEmplForBranchViewC);

	//STORE EMPLOYEES CONTAINER
	var storeEmplForBranchViewC = document.createElement("div");
	storeEmplForBranchViewC.className = "storeEmplForBranchViewC";

	var storeEmplForBranchViewTitleC = document.createElement("div");
	storeEmplForBranchViewTitleC.className = "storeEmplForBranchViewTitleC";
	storeEmplForBranchViewTitleC.innerHTML = "Υπεύθυνοι Αποθήκης :";
	storeEmplForBranchViewC.appendChild(storeEmplForBranchViewTitleC);

	var storeEmplForBranchViewContentC = document.createElement("div");
	storeEmplForBranchViewContentC.className = "storeEmplForBranchViewContentC";
	storeEmplForBranchViewC.appendChild(storeEmplForBranchViewContentC);
	
	allContainerForBranchEmplC.appendChild(storeEmplForBranchViewC);

	//DRIVER EMPLOYEE CONTAINER
	var driverForBranchViewC = document.createElement("div");
	driverForBranchViewC.className = "driverForBranchViewC";

	var driverForBranchViewTitleC = document.createElement("div");
	driverForBranchViewTitleC.className = "driverForBranchViewTitleC";
	driverForBranchViewTitleC.innerHTML = "Οδηγοί :";
	driverForBranchViewC.appendChild(driverForBranchViewTitleC);

	var driverForBranchViewContentC = document.createElement("div");
	driverForBranchViewContentC.className = "driverForBranchViewContentC";
	driverForBranchViewC.appendChild(driverForBranchViewContentC);

	allContainerForBranchEmplC.appendChild(driverForBranchViewC);

	//SECURITY EMPLOYEE CONTAINER
	var securityForBranchViewC = document.createElement("div");
	securityForBranchViewC.className = "securityForBranchViewC";

	var securityForBranchViewTitleC = document.createElement("div");
	securityForBranchViewTitleC.className = "securityForBranchViewTitleC";
	securityForBranchViewTitleC.innerHTML = "Φύλακες :";
	securityForBranchViewC.appendChild(securityForBranchViewTitleC);

	var securityForBranchViewContentC = document.createElement("div");
	securityForBranchViewContentC.className = "securityForBranchViewContentC";
	securityForBranchViewC.appendChild(securityForBranchViewContentC);

	allContainerForBranchEmplC.appendChild(securityForBranchViewC);

	//CLEANER EMPLOYEE CONTAINER
	var cleanerForBranchViewC = document.createElement("div");
	cleanerForBranchViewC.className = "cleanerForBranchViewC";

	var cleanerForBranchViewTitleC = document.createElement("div");
	cleanerForBranchViewTitleC.className = "cleanerForBranchViewTitleC";
	cleanerForBranchViewTitleC.innerHTML = "Καθαριστής :";
	cleanerForBranchViewC.appendChild(cleanerForBranchViewTitleC);

	var cleanerForBranchViewContentC = document.createElement("div");
	cleanerForBranchViewContentC.className = "cleanerForBranchViewContentC";
	cleanerForBranchViewC.appendChild(cleanerForBranchViewContentC);

	allContainerForBranchEmplC.appendChild(cleanerForBranchViewC);

	allEmplInfoC.appendChild(allContainerForBranchEmplC);

	var elementHoverC = "";
	var textToCopy = "";

	for(var i = 0; i < employeesOfThisBranchArray.length; i++) {
		textToCopy = employeesOfThisBranchArray[i].getName();
		if(employeesOfThisBranchArray[i].getStatus() == "Employee Manager") {
			var manager = document.createElement("div");
			manager.className = "itemsInsideC";
			manager.title = employeesOfThisBranchArray[i].getUsername();

			var managerImg = document.createElement("img");
			managerImg.className = "itemsInsideCImg";
			manager.appendChild(managerImg);

			var managerNameC = document.createElement("div");
			managerNameC.className = "itemsInsideNameC";
			managerNameC.id = i;
			managerNameC.innerHTML = employeesOfThisBranchArray[i].getName();
			manager.appendChild(managerNameC);

			elementHoverC = managerNameC;

			managerEmplForBranchViewContentC.appendChild(manager);
		}
		else if(employeesOfThisBranchArray[i].getStatus() == "Agency Employee") {
			var agencyEmpl = document.createElement("div");
			agencyEmpl.className = "itemsInsideC";
			agencyEmpl.title = employeesOfThisBranchArray[i].getUsername();

			var agencyEmplImg = document.createElement("img");
			agencyEmplImg.className = "itemsInsideCImg";
			agencyEmpl.appendChild(agencyEmplImg);

			var agencyEmplNameC = document.createElement("div");
			agencyEmplNameC.className = "itemsInsideNameC";
			agencyEmplNameC.innerHTML = employeesOfThisBranchArray[i].getName();
			agencyEmpl.appendChild(agencyEmplNameC);

			elementHoverC = agencyEmplNameC;

			agencyEmplForBranchViewContentC.appendChild(agencyEmpl);
		}
		else if(employeesOfThisBranchArray[i].getStatus() == "Store Employee") {
			var storeEmpl = document.createElement("div");
			storeEmpl.className = "itemsInsideC";
			storeEmpl.title = employeesOfThisBranchArray[i].getUsername();

			var storeEmplImg = document.createElement("img");
			storeEmplImg.className = "itemsInsideCImg";
			storeEmpl.appendChild(storeEmplImg);

			var storeEmplNameC = document.createElement("div");
			storeEmplNameC.className = "itemsInsideNameC";
			storeEmplNameC.innerHTML = employeesOfThisBranchArray[i].getName();
			storeEmpl.appendChild(storeEmplNameC);

			elementHoverC = storeEmplNameC;
			
			storeEmplForBranchViewContentC.appendChild(storeEmpl);
		}
		else if(employeesOfThisBranchArray[i].getStatus() == "Driver") {
			var driver = document.createElement("div");
			driver.className = "itemsInsideC";
			driver.title = employeesOfThisBranchArray[i].getUsername();

			var driverImg = document.createElement("img");
			driverImg.className = "itemsInsideCImg";
			driver.appendChild(driverImg);

			var driverNameC = document.createElement("div");
			driverNameC.className = "itemsInsideNameC";
			driverNameC.innerHTML = employeesOfThisBranchArray[i].getName();
			driver.appendChild(driverNameC);
			
			elementHoverC = driverNameC;

			driverForBranchViewContentC.appendChild(driver);
		}
		else if(employeesOfThisBranchArray[i].getStatus() == "Security") {
			var security = document.createElement("div");
			security.className = "itemsInsideC";
			security.title = employeesOfThisBranchArray[i].getUsername();

			var securityImg = document.createElement("img");
			securityImg.className = "itemsInsideCImg";
			security.appendChild(securityImg);

			var securityNameC = document.createElement("div");
			securityNameC.className = "itemsInsideNameC";
			securityNameC.innerHTML = employeesOfThisBranchArray[i].getName();
			security.appendChild(securityNameC);
			
			elementHoverC = securityNameC;

			securityForBranchViewContentC.appendChild(storeEmpl);
		}
		else if(employeesOfThisBranchArray[i].getStatus() == "Cleaner") {
			var cleaner = document.createElement("div");
			cleaner.className = "itemsInsideC";
			cleaner.title = employeesOfThisBranchArray[i].getUsername();

			var cleanerImg = document.createElement("img");
			cleanerImg.className = "itemsInsideCImg";
			cleaner.appendChild(cleanerImg);

			var cleanerNameC = document.createElement("div");
			cleanerNameC.className = "itemsInsideNameC";
			cleanerNameC.innerHTML = employeesOfThisBranchArray[i].getName();
			cleaner.appendChild(cleanerNameC);
			
			elementHoverC = cleanerNameC;

			cleanerForBranchViewContentC.appendChild(cleaner);
		}

		employeesOfThisBranchArray[i].createId("name", elementHoverC, "", textToCopy);
	}
}