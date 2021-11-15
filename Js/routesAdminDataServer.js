//INITIALIZE VARIABLES FOR STYLING
var alertAddNewInfoC = document.getElementById("alertAddNewInfoC");
var alertInfoForCreatNewItemC = document.getElementById("alertInfoForCreatNewItemC");
var alertInfoForCreatNewItemTextC = document.getElementById("alertInfoForCreatNewItemTextC");
var alertInfoForCreatNewItemBtn = document.getElementById("alertInfoForCreatNewItemBtn");

var routesTitleC = document.getElementById("routesTitleC");
var branchRoutesContentC = document.getElementById("branchRoutesContentC");
var startToOrFromDestinationSlct = document.getElementById("startToOrFromDestinationSlct");
var branchRoutesTitleC = document.getElementById("branchRoutesTitleC");
var topLeftArrowImgC = document.getElementById("topLeftArrowImgC");
var topRightArrowImgC = document.getElementById("topRightArrowImgC");
var bottomLeftArrowImgC = document.getElementById("bottomLeftArrowImgC");
var bottomRightArrowImgC = document.getElementById("bottomRightArrowImgC");
var connectedBranchRoutesTitleC = document.getElementById("connectedBranchRoutesTitleC");
var connectedBranchRoutesContentC = document.getElementById("connectedBranchRoutesContentC");
var chosenBranchRoutesTitleC = document.getElementById("chosenBranchRoutesTitleC");
var chosenBranchRoutesContentC = document.getElementById("chosenBranchRoutesContentC");
var chosenBranchRoutesAllContentWhenWaitingC = document.getElementById("chosenBranchRoutesAllContentWhenWaitingC");
var chosenBranchRoutesAllContentAfterWaitingC = document.getElementById("chosenBranchRoutesAllContentAfterWaitingC");
var editRouteBtn = document.getElementById("editRouteBtn");
var addNewRouteBtn = document.getElementById("addNewRouteBtn");
var deleteRoutesBtn = document.getElementById("deleteRoutesBtn");
var newRouteAddInfoC = document.getElementById("newRouteAddInfoC");
var openCloseNewRouteAddBtn = document.getElementById("openCloseNewRouteAddBtn");
var openCloseNewRouteAddBtnImg = document.getElementById("openCloseNewRouteAddBtnImg");
var newRouteAddInfoContentC = document.getElementById("newRouteAddInfoContentC");
var newAddedRouteImgC = document.getElementById("newAddedRouteImgC");
var newAddedRouteC = document.getElementById("newAddedRouteC");

//INITIALIZE GLOBAL VARIABLES
var allBranchesArr = [];
var afterFilterBranchesArr = [];
var connectedBranches = [];
var afterFilterConnectedBranchesArr = [];
var allRoutesArr = [];
var currentRoutesArr = [];

var alreadyChosenBranch = null;
var chosenBranch = null;
var chosenBranchObj = null;

var alreadyChosenConnBranch = null;
var chosenConnBranch = null;
var chosenConnBranchObj = null;

var routeEventOpened = null;

//MAIN FUNCTION
ServerRoutes();


//*(1)HEART OF FUNCTIONS IN THIS FILE
async function ServerRoutes() {
	allBranchesArr = await GetAllBranches();
	allBranchesArr = ConvertObjectsArrayToBranchObjsArray(allBranchesArr);
	
	//ONLY ACTIVE BRANCHES
	for(var i = 0; i < allBranchesArr.length; i++) {
		if(allBranchesArr[i].getStatus() == "Active") {
			afterFilterBranchesArr.push(allBranchesArr[i]); 
		}
	}

	//allRoutesArr = await GetAllRoutes();

	AddStartingValuesToHtmlElements();
	CreateTheBranchesView();
	AddMainEvents();
	StartingScreenOfBranchConnected();
	StartingScreenOfRoutes();
}



//*(2)GET ALL BRANCHES, AS OBJECTS IN ARRAY, FROM THE SERVER SIDE
function GetAllBranches() {
	return new Promise ((resolve, reject) => {
		$.ajax({
			type: 'POST',
			url: "../Php/getBranchesPhp.php",
			data: {},
			success: function(data) {
				var branches = JSON.parse(data);
				//alert(data);
				resolve(branches);
			}
		});
	});
}



//*(3)GET ALL ROUTES, AS OBJECTS IN ARRAY, FROM THE SERVER SIDE
function GetAllRoutes() {
	return new Promise ((resolve, reject) => {
		$.ajax({
			type: 'POST',
			url: "../Php/getRoutesPhp.php",
			data: {},
			success: function(data) {
				var routes = JSON.parse(data);
				//alert(data);
				resolve(routes);
			}
		});
	});
}



//*(4)ADD VALUES TO EXISTING ELEMENTS FROM HTML FILE, SO IT DOESNT SHOW UP BEFORE JS LOADS CAUSE THERE ARE ASYNC FUNCTIONS
function AddStartingValuesToHtmlElements() {
	routesTitleC.innerHTML = "ΔΡΟΜΟΛΟΓΙΑ ΛΕΩΦΟΡΕΙΩΝ";

	branchRoutesTitleC.innerHTML = "ΚΑΤΑΣΤΗΜΑΤΑ ΕΠΙΛΟΓΗΣ";

	connectedBranchRoutesTitleC.innerHTML = "ΣΥΝΔΕΔΕΜΕΝΑ ΚΑΤΑΣΤΗΜΑΤΑ";

	chosenBranchRoutesTitleC.innerHTML = "ΔΡΟΜΟΛΟΓΙΑ ΕΠΙΛΕΓΜΕΝΟΥ ΚΑΤΑΣΤΗΜΑΤΟΣ";
}



//*(5)CREATE THE DEFAULT VIEW OF BRANCHES PANEL 
function CreateTheBranchesView() {
	for (var i = 0; i < allBranchesArr.length; i++) {
		PrototypeOfBranchView(allBranchesArr[i], i);
	}
}

//(5)->EACH BRANCH BUTTON PROTOTYPE STRUCTURE
async function PrototypeOfBranchView(branchArr, index) {
	var mainPlaceForBranchBtn = document.createElement("button");
	mainPlaceForBranchBtn.className = "mainPlaceForBranchBtn";
	mainPlaceForBranchBtn.id = branchArr.getId();
	mainPlaceForBranchBtn.addEventListener("click", function() {
		var thisId = this.id;

		if(alreadyChosenBranch != thisId) {

			chosenBranch = thisId;

			alreadyChosenConnBranch = null;
			chosenConnBranch = null;
			
			//FIND FROM THE ARRAY WITH ALL THE BRANCHES, THE CHOSEN ONE
			chosenBranchObj = allBranchesArr.find(function(branch, index) {
				if(branch.getId() == thisId) {
					return true;
				}
			});

			StylingButtonOfBranches();
			var parseBranch = branchArr.getLocation() + " (#" + branchArr.getId() + ")";
			DownloadProcessOfThisBranchInfo(branchArr);

			alreadyChosenBranch = chosenBranch;
		}
	});

	var firstColumnForBranchRoutesC = document.createElement("div");
	firstColumnForBranchRoutesC.className = "firstColumnForBranchRoutesC";

	//IMAGE OF THIS BRANCH
	var imgOfBranchRoutesImg = document.createElement("img");
	imgOfBranchRoutesImg.className = "imgOfBranchRoutesImg";
	imgOfBranchRoutesImg.style.content = "url(../Assets/BranchesImages/" + branchArr.getImageSrc() + ")";
	firstColumnForBranchRoutesC.appendChild(imgOfBranchRoutesImg);

	mainPlaceForBranchBtn.appendChild(firstColumnForBranchRoutesC);


	var secondColumnForBranchRoutesC = document.createElement("div");
	secondColumnForBranchRoutesC.className = "secondColumnForBranchRoutesC";

	var firstLineOfBranchRoutesViewC = document.createElement("div");
	firstLineOfBranchRoutesViewC.className = "firstLineOfBranchRoutesViewC";

	//ID OF THIS BRANCH
	var idBranchBusesC = document.createElement("div");
	idBranchBusesC.className = "idBranchBusesC";
	firstLineOfBranchRoutesViewC.appendChild(idBranchBusesC);

	var busesOfThisBranch = await branchArr.getBuses();

	//LOCATION OF THIS BRANCH
	var locationBranchBusesC = document.createElement("div");
	locationBranchBusesC.className = "locationBranchBusesC";
	locationBranchBusesC.innerHTML = branchArr.getLocation();
	firstLineOfBranchRoutesViewC.appendChild(locationBranchBusesC);

	//RIGHT CONTAINER OF BRANCH BUSES
	var rightBranchInfoC = document.createElement("div");
	rightBranchInfoC.className = "rightBranchInfoC";

		//COUNT OF BUSES CONNECTED TO THIS BRANCH
		var allBranchBusesC = document.createElement("div");
		allBranchBusesC.className = "allBranchBusesC";

		var allBranchBusesTextC = document.createElement("div");
		allBranchBusesTextC.className = "allBranchBusesTextC";
		allBranchBusesTextC.innerHTML = "Λεωφορεία: ";
		allBranchBusesC.appendChild(allBranchBusesTextC);

		var allBranchBusesNumC = document.createElement("div");
		allBranchBusesNumC.className = "allBranchBusesNumC";
		allBranchBusesNumC.innerHTML = busesOfThisBranch.length;
		allBranchBusesC.appendChild(allBranchBusesNumC);

		rightBranchInfoC.appendChild(allBranchBusesC);

		var availBusesOfThisBranch = await branchArr.getAvailableBuses();

		//COUNT OF AVAILABLE BUSES CONNECTED TO THIS BRANCH
		var availableBranchBusesC = document.createElement("div");
		availableBranchBusesC.className = "availableBranchBusesC";

		var availableBranchBusesTextC = document.createElement("div");
		availableBranchBusesTextC.className = "availableBranchBusesTextC";
		availableBranchBusesTextC.innerHTML = "Διαθέσιμα: ";
		availableBranchBusesC.appendChild(availableBranchBusesTextC);

		var availableBranchBusesNumC = document.createElement("div");
		availableBranchBusesNumC.className = "availableBranchBusesNumC";
		availableBranchBusesNumC.innerHTML = availBusesOfThisBranch.length;
		availableBranchBusesC.appendChild(availableBranchBusesNumC);

		rightBranchInfoC.appendChild(availableBranchBusesC);

		//STATUS OF THIS BRANCH
		var statusBranchBusesC = document.createElement("div");
		statusBranchBusesC.className = "statusBranchBusesC";

		var statusBranchBusesImgC = document.createElement("div");
		statusBranchBusesImgC.className = "statusBranchBusesImgC";
		StatusChooseIcon(statusBranchBusesImgC, branchArr);
		statusBranchBusesC.appendChild(statusBranchBusesImgC);

		rightBranchInfoC.appendChild(statusBranchBusesC);


	firstLineOfBranchRoutesViewC.appendChild(rightBranchInfoC);

	secondColumnForBranchRoutesC.appendChild(firstLineOfBranchRoutesViewC);	

	//STREET OF THIS BRANCH
	var streetBranchBusesC = document.createElement("div");
	streetBranchBusesC.className = "streetBranchBusesC";
	streetBranchBusesC.innerHTML = branchArr.getStreet();
	secondColumnForBranchRoutesC.appendChild(streetBranchBusesC);

	mainPlaceForBranchBtn.appendChild(secondColumnForBranchRoutesC);

	branchRoutesContentC.appendChild(mainPlaceForBranchBtn);
}

//(5)->BRANCH BUTTON CHOSEN STYLING
function StylingButtonOfBranches() {
	var elemntToOpen = document.getElementById(chosenBranch);
	elemntToOpen.style.border = "4px solid orange";
	//elemntToOpen.style.borderLeft = "2px solid black";
	//elemntToOpen.style.borderRight = "2px solid black";

	if(alreadyChosenBranch != null && chosenBranch != alreadyChosenBranch) {
		var elemntToClose = document.getElementById(alreadyChosenBranch);
		elemntToClose.style.border = "2px solid black";
	}
}

//(5)->DOWNLOAD CONNECTED BRANCHES AND ROUTES FOR THE CHOSEN BRANCH
async function DownloadProcessOfThisBranchInfo(branch) {
	connectedBranches = await branch.getObjConnectedBranches();

	afterFilterConnectedBranchesArr = [];
	for(var i = 0; i < connectedBranches.length; i++) {
		if(connectedBranches[i].getStatus() == "Active") {
			afterFilterConnectedBranchesArr.push(connectedBranches[i]);
		}
	}

	addNewRouteBtn.disabled = true;
	editRouteBtn.disabled = false;
	deleteRoutesBtn.disabled = false;

	CreateTheConnectedBranchesView();
	FindAndCreateTheViewOfTheRoutesOfThisBranch();
	
	if(connectedBranches.length == 0) {
		//SHOW EMPTY CONTAINER OF BRANCHES
		EmptyConnectedBrancesArray();
	}
}

//(5)->CREATE THE VIEW OF CONNECTED BRANCHES PANEL 
function CreateTheConnectedBranchesView() {
	connectedBranchRoutesContentC.innerHTML = "";

	for (var i = 0; i < connectedBranches.length; i++) {
		PrototypeOfConnectedBranchView(connectedBranches[i], i);
	}
}

//(5)->EACH BRANCH CONNECTION BUTTON PROTOTYPE STRUCTURE
async function PrototypeOfConnectedBranchView(branchArr, index) {
	var mainPlaceForBranchBtn = document.createElement("button");
	mainPlaceForBranchBtn.className = "mainPlaceForBranchBtn";
	mainPlaceForBranchBtn.id = branchArr.getId() + "ConnectedBr";

	mainPlaceForBranchBtn.addEventListener("click", function() {
		var thisId = this.id;
		thisId = thisId.substring(0, thisId.length - 11);

		if(alreadyChosenConnBranch != thisId) {
			chosenConnBranch = thisId;

			//FIND FROM THE ARRAY WITH ALL THE BRANCHES, THE CHOSEN ONE
			chosenConnBranchObj = connectedBranches.find(function(branch, index) {
				if(branch.getId() == thisId) {
					return true;
				}
			});

			StylingButtonOfConnectedBranches();
			var parseBranch = branchArr.getLocation() + " (#" + branchArr.getId() + ")";
			DownloadProcessOfThisBranchWithConnectedBranchInfo();

			addNewRouteBtn.click();
			
			alreadyChosenConnBranch = chosenConnBranch;
		}
	});


	var firstColumnForBranchRoutesC = document.createElement("div");
	firstColumnForBranchRoutesC.className = "firstColumnForBranchRoutesC";

	//IMAGE OF THIS BRANCH
	var imgOfBranchRoutesImg = document.createElement("img");
	imgOfBranchRoutesImg.className = "imgOfBranchRoutesImg";
	imgOfBranchRoutesImg.style.content = "url(../Assets/BranchesImages/" + branchArr.getImageSrc() + ")";
	firstColumnForBranchRoutesC.appendChild(imgOfBranchRoutesImg);

	mainPlaceForBranchBtn.appendChild(firstColumnForBranchRoutesC);


	var secondColumnForBranchRoutesC = document.createElement("div");
	secondColumnForBranchRoutesC.className = "secondColumnForBranchRoutesC";

	var firstLineOfBranchRoutesViewC = document.createElement("div");
	firstLineOfBranchRoutesViewC.className = "firstLineOfBranchRoutesViewC";

	//ID OF THIS BRANCH
	var idBranchBusesC = document.createElement("div");
	idBranchBusesC.className = "idBranchBusesC";
	firstLineOfBranchRoutesViewC.appendChild(idBranchBusesC);

	var busesOfThisBranch = await branchArr.getBuses();

	//LOCATION OF THIS BRANCH
	var locationBranchBusesC = document.createElement("div");
	locationBranchBusesC.className = "locationBranchBusesC";
	locationBranchBusesC.innerHTML = branchArr.getLocation();
	firstLineOfBranchRoutesViewC.appendChild(locationBranchBusesC);

	//COUNT OF BUSES CONNECTED TO THIS BRANCH
	var allBranchBusesC = document.createElement("div");
	allBranchBusesC.className = "allBranchBusesC";
	allBranchBusesC.innerHTML = "";
	firstLineOfBranchRoutesViewC.appendChild(allBranchBusesC);

	secondColumnForBranchRoutesC.appendChild(firstLineOfBranchRoutesViewC);	

	//STREET OF THIS BRANCH
	var streetBranchBusesC = document.createElement("div");
	streetBranchBusesC.className = "streetBranchBusesC";
	streetBranchBusesC.innerHTML = branchArr.getStreet();
	secondColumnForBranchRoutesC.appendChild(streetBranchBusesC);

	//RIGHT CONTAINER OF BRANCH BUSES
	var rightBranchInfoC = document.createElement("div");
	rightBranchInfoC.className = "rightBranchInfoC";

		//STATUS OF THIS BRANCH
		var statusBranchBusesC = document.createElement("div");
		statusBranchBusesC.className = "statusBranchBusesC";

		var statusBranchBusesImgC = document.createElement("div");
		statusBranchBusesImgC.className = "statusBranchBusesImgC";
		StatusChooseIcon(statusBranchBusesImgC, branchArr);
		statusBranchBusesC.appendChild(statusBranchBusesImgC);

		rightBranchInfoC.appendChild(statusBranchBusesC);

	secondColumnForBranchRoutesC.appendChild(rightBranchInfoC);

	mainPlaceForBranchBtn.appendChild(secondColumnForBranchRoutesC);

	connectedBranchRoutesContentC.appendChild(mainPlaceForBranchBtn);

	//CHANGES OF STYLING FOR BRNCHES CONNECTED
	mainPlaceForBranchBtn.style.color = "white";
	mainPlaceForBranchBtn.style.border = "2px solid darkgrey";
}

//(5)->CONNECTED BRANCH BUTTON CHOSEN STYLING
function StylingButtonOfConnectedBranches() {
	var elemntToOpen = document.getElementById(chosenConnBranch + "ConnectedBr");
	elemntToOpen.style.border = "4px solid orange";

	if(alreadyChosenConnBranch != null && chosenConnBranch != alreadyChosenConnBranch) {
		var elemntToClose = document.getElementById(alreadyChosenConnBranch + "ConnectedBr");
		elemntToClose.style.border = "2px solid darkgrey";
	}
}

//(5)->DOWNLOAD ROUTES AND SHOW VIEW THOSE THAT ARE CONNECTED
function DownloadProcessOfThisBranchWithConnectedBranchInfo(branch) {
	addNewRouteBtn.disabled = false;
	editRouteBtn.disabled = false;
	deleteRoutesBtn.disabled = false;

	FindAndCreateTheViewOfTheRoutesOfThisBranch();

	if(connectedBranches.length == 0) {
		//SHOW EMPTY CONTAINER OF BRANCHES
		EmptyConnectedBrancesArray();
	}
}

//(5)->NO CONNECTED BRANCHES TO THIS BRANCH
function EmptyConnectedBrancesArray() {
	connectedBranchRoutesContentC.innerHTML = "";

	var emptyConnectedBranchesImgC = document.createElement("div");
	emptyConnectedBranchesImgC.id = "emptyConnectedBranchesImgC";

	var emptyConnectedBranchesTextC = document.createElement("div");
	emptyConnectedBranchesTextC.id = "emptyConnectedBranchesTextC";
	emptyConnectedBranchesTextC.innerHTML = "ΔΕΝ ΒΡΕΘΗΚΕ ΣΥΝΔΕΔΕΜΕΝΟ ΚΑΤΑΣΤΗΜΑ ΣΤΟ ΚΑΤΑΣΤΗΜΑ: " + chosenBranchObj.getLocation();
	emptyConnectedBranchesImgC.appendChild(emptyConnectedBranchesTextC);

	var emptyConnectedBranchesImg = document.createElement("img");
	emptyConnectedBranchesImg.id = "emptyConnectedBranchesImg";
	emptyConnectedBranchesImgC.appendChild(emptyConnectedBranchesImg);

	connectedBranchRoutesContentC.appendChild(emptyConnectedBranchesImgC);
}

//(5)->FIND ALL THE ROUTES OF THE CHOSEN BRANCH AND SHOW VIEW THEM 
function FindAndCreateTheViewOfTheRoutesOfThisBranch() {
	newRouteAddInfoContentC.innerHTML = "";
	
	NewRouteCActionToCloseFinally();

	currentRoutesArr = RouteOfCurrentBranch(allRoutesArr);

	if(currentRoutesArr.length > 0) {
		console.log(currentRoutesArr);

		var routeDesignTable = new RouteDesignTable(currentRoutesArr);
		routeDesignTable.desginTableWithDays();
	}
	else {
		chosenBranchRoutesAllContentWhenWaitingC.style.display = "none";
		chosenBranchRoutesAllContentAfterWaitingC.style.display = "block";
		chosenBranchRoutesAllContentAfterWaitingC.innerHTML = "";

		var endWaitingOfRoutesImgC = document.createElement("div");
		endWaitingOfRoutesImgC.id = "endWaitingOfRoutesImgC";

		var endWaitingOfRoutesTextC = document.createElement("div");
		endWaitingOfRoutesTextC.id = "endWaitingOfRoutesTextC";
		endWaitingOfRoutesTextC.innerHTML = "ΔΕΝ ΥΠΑΡΧΟΥΝ ΔΡΟΜΟΛΟΓΙΑ ΓΙΑ ΤΟ ΣΥΓΚΕΚΡΙΜΕΝΟ ΚΑΤΑΣΤΗΜΑ: " + chosenBranchObj.getLocation();
		endWaitingOfRoutesImgC.appendChild(endWaitingOfRoutesTextC);

		var endWaitingOfRoutesImg = document.createElement("img");
		endWaitingOfRoutesImg.id = "endWaitingOfRoutesImg";
		endWaitingOfRoutesImgC.appendChild(endWaitingOfRoutesImg);
		
		chosenBranchRoutesAllContentAfterWaitingC.appendChild(endWaitingOfRoutesImgC);

		addNewRouteBtn.disabled = false;
		editRouteBtn.disabled = true;
		deleteRoutesBtn.disabled = true;
	}
}

//(5)->CHOSEN BRANCH ROUTES
function RouteOfCurrentBranch(allRoutes) {
	var routesFromArr = [];

	for(var i = 0; i < allRoutes.length; i++) {
		if(allRoutes[i].getFrom() == chosenBranch) {
			routesFromArr.push(allRoutes[i]);
		}
	}

	return routesFromArr;
}

//(5)->CREATE THE TITLE ROW AND EACH ROW TO VIEW ROUTES
function RowOfEachRouteInTheShowView(msg) {
	//MAIN ROW OF ROUTES
	if(msg == "default") {

	}
	//EACH ROW ROUTE
	else {

	}
}



//*(6)ADD MAIN EVENTS THAT TRIGGER FROM DEFAULT SCREEN
function AddMainEvents() {
	var addNewCStatus = 0;
	var editCStatus = 0;
	var deleteCStatus = 0;

	//DEFAULT
	ArrowDirection("right");

	//ON CHANGE SELECT VALUE
	startToOrFromDestinationSlct.addEventListener("change", function() {
		if(this.value == "Προς") {
			ArrowDirection("right");
		}
		else {
			ArrowDirection("left");
		}
	});

	//EDIT, ADD AND DELETE ROUTES BUTTON EVENTS
	openCloseNewRouteAddBtn.tabIndex = "-1";

	addNewRouteBtn.addEventListener("click", function() {
		addNewRouteBtn.disabled = true;
		editRouteBtn.disabled = false;
		deleteRoutesBtn.disabled = false;

		addNewCStatus = 0;
		if(editCStatus) {
			EditCActionToClose();
		}
		AddNewRoute();

		setTimeout(function(){
			openCloseNewRouteAddBtn.click();
		}, 10);
	});

		openCloseNewRouteAddBtn.addEventListener("click", function() {
			OpenCloseNewRouteContainer(addNewCStatus);
			if(addNewCStatus) {
				addNewCStatus = 0;
			}
			else {
				addNewCStatus = 1;
			}
		});

	editRouteBtn.addEventListener("click", function() {
		addNewRouteBtn.disabled = false;
		editRouteBtn.disabled = true;
		deleteRoutesBtn.disabled = false;

		editCStatus = 0;
		if(addNewCStatus) {
			NewRouteCActionToClose();
		}
		EditRoute();
	});

	deleteRoutesBtn.addEventListener("click", function() {
		addNewRouteBtn.disabled = false;
		editRouteBtn.disabled = false;
		deleteRoutesBtn.disabled = true;

		deleteCStatus = 0;
		if(addNewCStatus) {
			NewRouteCActionToClose();
		}

		DeleteRoutes();
	});
}

//(6)->ADD NEW ROUTE
function AddNewRoute() {
	openCloseNewRouteAddBtn.tabIndex = "0";
	routeEventOpened = "addNew";
	CheckRouteEventOpened();
}

//(6)->ACTIONS WHEN OPEN ADD NEW ROUTE CONTAINER TRIGGERS
function OpenCloseNewRouteContainer(status) {
	if(status == 0) {
		NewRouteCActionToOpen();
	}
	else {
		NewRouteCActionToClose();
	}
}

//(6)->ACTIONS WHEN ADD NEW ROUTE CONTAINER, IS ABOUT TO OPEN
function NewRouteCActionToOpen() {
	newRouteAddInfoC.style.display = "block";
	newRouteAddInfoC.style.position = "relative";
	newRouteAddInfoC.style.left = "auto";
	newRouteAddInfoC.style.borderRadius = "0";
	newRouteAddInfoC.style.transform = "translate(0, 0)";
	
	openCloseNewRouteAddBtn.style.float = "left";
	openCloseNewRouteAddBtnImg.style.transform = "translate(-50%, 0) rotate(180deg)";

	newRouteAddInfoContentC.style.display = "block";
	newRouteAddInfoContentC.style.float = "right";
	newRouteAddInfoContentC.style.left = "63px";
	newRouteAddInfoContentC.style.right = "0";

	newAddedRouteImgC.style.display = "table";
	newAddedRouteC.style.display = "block";

	chosenBranchRoutesC.style.marginTop = "60px";

	CreateTheAddRouteView();
}

//(6)->CREATE THE VIEW OF ADD ROUTES
async function CreateTheAddRouteView() {
	var routesIds = await GetIdsOfRoutes();
	var day = "";
	//IF DESTINATION IS BRANCH OR NOT
	var foundConnectedBranchLoc = true;
	var foundBranchLoc = true;

	var from = "";
	var fromId = null;
	var stations = [];
	var to = "";
	var toId = null;

	newRouteAddInfoContentC.innerHTML = "";

	//RESET EVERYTHING IN ADD NEW ROUTE INFO
	var addNewRouteTitleC = document.createElement("div");
	addNewRouteTitleC.id = "addNewRouteTitleC";

	var addNewRouteTitleTextC = document.createElement("div");
	addNewRouteTitleTextC.id = "addNewRouteTitleTextC";
	addNewRouteTitleTextC.innerHTML = "Δημιουργία νέου δρομολογίου";
	addNewRouteTitleC.appendChild(addNewRouteTitleTextC);

	newRouteAddInfoContentC.appendChild(addNewRouteTitleC);

	//RESET EVERYTHING IN ADD NEW ROUTE INFO
	var resetAddNewRouteC = document.createElement("div");
	resetAddNewRouteC.id = "resetAddNewRouteC";

	var resetAddNewRouteBtn = document.createElement("button");
	resetAddNewRouteBtn.id = "resetAddNewRouteBtn";
	resetAddNewRouteBtn.innerHTML = "ΕΠΑΝΑΦΟΡΑ";
	resetAddNewRouteC.appendChild(resetAddNewRouteBtn);
	resetAddNewRouteBtn.addEventListener("click", function() {
		CreateTheAddRouteView();
	});

	newRouteAddInfoContentC.appendChild(resetAddNewRouteC);

	var firstRowAddRouteC = document.createElement("div");
	firstRowAddRouteC.id = "firstRowAddRouteC";

	var firstRowCenterAddRouteC = document.createElement("div");
	firstRowCenterAddRouteC.id = "firstRowCenterAddRouteC";

	var secondRowAddRouteC = document.createElement("div");
	secondRowAddRouteC.id = "secondRowAddRouteC";

	//DATE FOR ADDING NEW ROUTE CONTAINER
	var dateTimeAddNewRouteC = document.createElement("div");
	dateTimeAddNewRouteC.id = "dateTimeAddNewRouteC";

	var dateTimeAddNewRouteTitleC = document.createElement("div");
	dateTimeAddNewRouteTitleC.id = "dateTimeAddNewRouteTitleC";
	dateTimeAddNewRouteTitleC.innerHTML = "Ημερομηνία και ώρα";
	dateTimeAddNewRouteC.appendChild(dateTimeAddNewRouteTitleC);

	var date = new Date();
	day = ConvertDayNumToString(date.getDay());

	var convertedDate = ConvertDateToStringForInputDateTime(date);

	var dateTimeAddNewRouteInpt = document.createElement("input");
	dateTimeAddNewRouteInpt.id = "dateTimeAddNewRouteInpt";
	dateTimeAddNewRouteInpt.type = "datetime-local";
	dateTimeAddNewRouteInpt.name = "routeTime";
	dateTimeAddNewRouteInpt.value = convertedDate;
	dateTimeAddNewRouteC.appendChild(dateTimeAddNewRouteInpt);

	var dateTimeAddNewRouteForEveryWeekOrNotC = document.createElement("div");
	dateTimeAddNewRouteForEveryWeekOrNotC.id = "dateTimeAddNewRouteForEveryWeekOrNotC";
	dateTimeAddNewRouteC.appendChild(dateTimeAddNewRouteForEveryWeekOrNotC);

	var dateTimeAddNewRouteForEveryWeekOrNotInpt = document.createElement("input");
	dateTimeAddNewRouteForEveryWeekOrNotInpt.id = "dateTimeAddNewRouteForEveryWeekOrNotInpt";
	dateTimeAddNewRouteForEveryWeekOrNotInpt.type = "checkbox";
	dateTimeAddNewRouteForEveryWeekOrNotInpt.checked = true;
	dateTimeAddNewRouteForEveryWeekOrNotC.appendChild(dateTimeAddNewRouteForEveryWeekOrNotInpt);

	dateTimeAddNewRouteInpt.addEventListener("change", function() {
		var newDate = new Date(dateTimeAddNewRouteInpt.value);
		if(newDate != "Invalid Date") {
			day = ConvertDayNumToString(newDate.getDay());

			dateTimeAddNewRouteForEveryWeekOrNotInpt.disabled = false;
			dateTimeAddNewRouteForEveryWeekOrNotInpt.style.display = "block";
			dateTimeAddNewRouteForEveryWeekOrNotBtn.disabled = false;
			dateTimeAddNewRouteForEveryWeekOrNotBtn.innerHTML = "Για κάθε " + day + "";
		}
		else {
			day = null;

			dateTimeAddNewRouteForEveryWeekOrNotInpt.disabled = true;
			dateTimeAddNewRouteForEveryWeekOrNotInpt.style.display = "none";
			dateTimeAddNewRouteForEveryWeekOrNotBtn.disabled = true;
			dateTimeAddNewRouteForEveryWeekOrNotBtn.innerHTML = "Η ημερομηνία δεν υπάρχει";
		}
	});

	var dateTimeAddNewRouteForEveryWeekOrNotBtn = document.createElement("button");
	dateTimeAddNewRouteForEveryWeekOrNotBtn.id = "dateTimeAddNewRouteForEveryWeekOrNotBtn";
	dateTimeAddNewRouteForEveryWeekOrNotBtn.innerHTML = "Για κάθε " + day + "";
	dateTimeAddNewRouteForEveryWeekOrNotC.appendChild(dateTimeAddNewRouteForEveryWeekOrNotBtn);
	dateTimeAddNewRouteForEveryWeekOrNotBtn.addEventListener("click", function() {
		dateTimeAddNewRouteForEveryWeekOrNotInpt.click();
	});

	firstRowCenterAddRouteC.appendChild(dateTimeAddNewRouteC);

	//BRANCH FROM, FOR THE NEW ROUTE CONTAINER
	var branchFromAddNewRouteC = document.createElement("div");
	branchFromAddNewRouteC.id = "branchFromAddNewRouteC";

	var branchFromAddNewRouteTitleC = document.createElement("div");
	branchFromAddNewRouteTitleC.id = "branchFromAddNewRouteTitleC";
	branchFromAddNewRouteTitleC.innerHTML = "Από";
	branchFromAddNewRouteC.appendChild(branchFromAddNewRouteTitleC);

	var branchFromAddNewRouteTextC = document.createElement("div");
	branchFromAddNewRouteTextC.id = "branchFromAddNewRouteTextC";
	if(chosenBranchObj != null) {
		branchFromAddNewRouteTextC.innerHTML = chosenBranchObj.getLocation();
		branchFromAddNewRouteTextC.name = chosenBranchObj.getId();
		branchFromAddNewRouteTextC.title = branchFromAddNewRouteTextC.innerHTML;
	}
	else {
		branchFromAddNewRouteTextC.innerHTML = "";
		branchFromAddNewRouteTextC.name = "null";
	}

	from = branchFromAddNewRouteTextC.innerHTML;
	fromId = branchFromAddNewRouteTextC.name;
	branchFromAddNewRouteC.appendChild(branchFromAddNewRouteTextC);

	firstRowCenterAddRouteC.appendChild(branchFromAddNewRouteC);

	//BRANCH TO, FOR THE NEW ROUTE CONTAINER
	//ARRAY CONTAINER OF BETWEEN LOCATIONS, IF NEEDED
	var addNewStoppingPointsToRouteC = document.createElement("div");
	addNewStoppingPointsToRouteC.id = "addNewStoppingPointsToRouteC";

	var addNewStoppingPointsToRouteContentC = document.createElement("div");
	addNewStoppingPointsToRouteContentC.id = "addNewStoppingPointsToRouteContentC";

	var addNewStoppingPointsToRouteTitleC = document.createElement("div");
	addNewStoppingPointsToRouteTitleC.id = "addNewStoppingPointsToRouteTitleC";
	addNewStoppingPointsToRouteTitleC.innerHTML = "Ενδιάμεσες Στάσεις";
	addNewStoppingPointsToRouteContentC.appendChild(addNewStoppingPointsToRouteTitleC);

	var addNewStoppingPointsToRouteContentTextC = document.createElement("div");
	addNewStoppingPointsToRouteContentTextC.id = "addNewStoppingPointsToRouteContentTextC";

	var rowOfBtnsInsideNewRouteStationC = document.createElement("div");
	rowOfBtnsInsideNewRouteStationC.id = "rowOfBtnsInsideNewRouteStationC";

	/*
	var addExistingBranchToNewRouteBtn = document.createElement("button");
	addExistingBranchToNewRouteBtn.id = "addExistingBranchToNewRouteBtn";
	addExistingBranchToNewRouteBtn.innerHTML = "+ Κατάστημα";
	rowOfBtnsInsideNewRouteStationC.appendChild(addExistingBranchToNewRouteBtn);
	addExistingBranchToNewRouteBtn.tabIndex = "-1";
	var counterB = 0;
	addExistingBranchToNewRouteBtn.addEventListener("click", function() {
		var addBranchBetweenEachRowC = document.createElement("div");
		addBranchBetweenEachRowC.id = counterB + "branchRouteBetweenC";
		addBranchBetweenEachRowC.className = "addBranchBetweenEachRowC";

		var addBranchBetweenEachRowSlct = document.createElement("select");
		addBranchBetweenEachRowSlct.id = counterB + "branchRouteBetweenInpt";
		addBranchBetweenEachRowSlct.className = "addBranchBetweenEachRowSlct";
		//addBranchBetweenEachRowSlct.value = ;
		addBranchBetweenEachRowC.appendChild(addBranchBetweenEachRowSlct);
		
		addBranchOrStoppingPointBetweenC.appendChild(addBranchBetweenEachRowC);

		counterB++;
	});*/

	var addNewStoppingPointToNewRouteBtn = document.createElement("button");
	addNewStoppingPointToNewRouteBtn.id = "addNewStoppingPointToNewRouteBtn";
	addNewStoppingPointToNewRouteBtn.innerHTML = "+ Στάση";
	rowOfBtnsInsideNewRouteStationC.appendChild(addNewStoppingPointToNewRouteBtn);
	addNewStoppingPointToNewRouteBtn.tabIndex = "-1";
	var counterSP = 0;

	//WORK HERE
	addNewStoppingPointToNewRouteBtn.addEventListener("click", function() {
		var editable = false;
		var lastValue = null;
		var thisValue = "";

		var addStoppingPointBetweenEachRowC = document.createElement("div");
		//addStoppingPointBetweenEachRowC.id = counterSP + "newStoppingPointRouteBetweenC";
		addStoppingPointBetweenEachRowC.className = "addStoppingPointBetweenEachRowC";

		ArrowsForBetweenStoppingPoints(addStoppingPointBetweenEachRowC, counterSP);
			
		//ADD BUTTONS TO EACH ROW OF BETWEEN BRANCH OR STOPPING POINT
		var editBetweenRoutesPointsBtn = document.createElement("button");
		//editBetweenRoutesPointsBtn.id = counterSP + "editBetweenRoutesPointsBtn";
		editBetweenRoutesPointsBtn.className = "editBetweenRoutesPointsBtn";
		editBetweenRoutesPointsBtn.disabled = true;

		var editBetweenRoutesPointsBtnImg = document.createElement("img");
		editBetweenRoutesPointsBtnImg.className = "editBetweenRoutesPointsBtnImg";
		editBetweenRoutesPointsBtn.appendChild(editBetweenRoutesPointsBtnImg);

		addStoppingPointBetweenEachRowC.appendChild(editBetweenRoutesPointsBtn);

		var deleteBetweenRoutesPointsBtn = document.createElement("button");
		//deleteBetweenRoutesPointsBtn.id = counterSP + "deleteBetweenRoutesPointsBtn";
		deleteBetweenRoutesPointsBtn.className = "deleteBetweenRoutesPointsBtn";
		deleteBetweenRoutesPointsBtn.disabled = true;

		var deleteBetweenRoutesPointsBtnImg = document.createElement("img");
		deleteBetweenRoutesPointsBtnImg.className = "deleteBetweenRoutesPointsBtnImg";
		deleteBetweenRoutesPointsBtn.appendChild(deleteBetweenRoutesPointsBtnImg);

		deleteBetweenRoutesPointsBtn.addEventListener("click", function() {
			addBranchOrStoppingPointBetweenC.removeChild(addStoppingPointBetweenEachRowC);

			stations = DeleteStationFromArray(counterSP, stations, thisValue);

			counterSP--;
		});

		addStoppingPointBetweenEachRowC.appendChild(deleteBetweenRoutesPointsBtn);


		var addStoppingPointBetweenEachRowInpt = document.createElement("input");
		//addStoppingPointBetweenEachRowInpt.id = counterSP + "newStoppingPointRouteBetweenInpt";
		addStoppingPointBetweenEachRowInpt.className = "addStoppingPointBetweenEachRowInpt";
		addStoppingPointBetweenEachRowInpt.placeholder = "Τουλάχιστον 2 χαρακτήρες";
		addStoppingPointBetweenEachRowInpt.value = "";
		addStoppingPointBetweenEachRowC.appendChild(addStoppingPointBetweenEachRowInpt);

		addBranchOrStoppingPointBetweenC.appendChild(addStoppingPointBetweenEachRowC);
		
		addStoppingPointBetweenEachRowInpt.focus();

		addStoppingPointBetweenEachRowInpt.addEventListener("focusin", function() {
			editBetweenRoutesPointsBtn.disabled = true;
			deleteBetweenRoutesPointsBtn.disabled = true;
		});
		addStoppingPointBetweenEachRowInpt.addEventListener("focusout", function() {
			thisValue = addStoppingPointBetweenEachRowInpt.value;

			editBetweenRoutesPointsBtn.disabled = false;
			deleteBetweenRoutesPointsBtn.disabled = false;

			this.disabled = true;

			//IF INPUT VALUE IS LESS THAN TWO CHARS
			if(this.value.length < 2) {
				addBranchOrStoppingPointBetweenC.removeChild(addStoppingPointBetweenEachRowC);

				stations = DeleteStationFromArray(counterSP, stations, lastValue);

				counterSP--;

				return 0;
			}

			//CHECK IF THERE ARE ONLY SPACES
			if(!this.value.replace(/\s/g, '').length) {
				addBranchOrStoppingPointBetweenC.removeChild(addStoppingPointBetweenEachRowC);

				stations = DeleteStationFromArray(counterSP, stations, lastValue);

				counterSP--;

				return 0;
			}

			//CHECK IF STATION IS ALREADY IN
			var foundStation = false;

			var indexOfFoundStation = stations.findIndex( function(station, index) {
				if(station == addStoppingPointBetweenEachRowInpt.value) {
					return true;
				}
			});

			if(indexOfFoundStation >= 0) {
				foundStation = true;
			}

			if(foundStation) {
				if(!editable) {
					alertAddNewInfoC.style.display = "none";
					alertInfoForCreatNewItemC.style.display = "table";
					alertInfoForCreatNewItemTextC.innerHTML = "Υπάρχει ήδη, η στάση '" + this.value + "' !";
					alertInfoForCreatNewItemBtn.innerHTML = "Το κατάλαβα";
					alertInfoForCreatNewItemBtn.focus();
					alertInfoForCreatNewItemBtn.addEventListener("click", function() {
						CloseAlertMessages();
					});
					addBranchOrStoppingPointBetweenC.removeChild(addStoppingPointBetweenEachRowC);

					stations = DeleteStationFromArray(counterSP, stations, lastValue);

					counterSP--;

					return 0;
				}
			}

			//CHECK IF STATION IS SAME WITH START
			if(this.value == from) {
				alertAddNewInfoC.style.display = "none";
				alertInfoForCreatNewItemC.style.display = "table";
				alertInfoForCreatNewItemTextC.innerHTML = "Δεν μπορεί να ορισθεί ως στάση, η αφετηρία !";
				alertInfoForCreatNewItemBtn.innerHTML = "Το κατάλαβα";
				alertInfoForCreatNewItemBtn.focus();
				alertInfoForCreatNewItemBtn.addEventListener("click", function() {
					CloseAlertMessages();
				});
				addBranchOrStoppingPointBetweenC.removeChild(addStoppingPointBetweenEachRowC);

				stations = DeleteStationFromArray(counterSP, stations, lastValue);

				counterSP--;

				return 0;
			}

			//CHECK IF STATION IS SAME WITH END
			if(this.value == branchToAddNewRouteTextInpt.value) {
				alertAddNewInfoC.style.display = "none";
				alertInfoForCreatNewItemC.style.display = "table";
				alertInfoForCreatNewItemTextC.innerHTML = "Δεν μπορεί να ορισθεί ως στάση, ο τελικός προορισμός !";
				alertInfoForCreatNewItemBtn.innerHTML = "Το κατάλαβα";
				alertInfoForCreatNewItemBtn.focus();
				alertInfoForCreatNewItemBtn.addEventListener("click", function() {
					CloseAlertMessages();
				});
				addBranchOrStoppingPointBetweenC.removeChild(addStoppingPointBetweenEachRowC);

				stations = DeleteStationFromArray(counterSP, stations, lastValue);

				counterSP--;

				return 0;
			}

			//CHECK IF FOUND BRANCH, IS NOT CONNECTED
			var foundAllBr = false;

			var indexOfFoundBranch = allBranchesArr.findIndex( function(branch, index) {
				if(branch.getLocation() == addStoppingPointBetweenEachRowInpt.value) {
					return true;
				}
			});

			if(indexOfFoundBranch >= 0) {
				foundAllBr = true;
			}

			var foundConnBr = false;

			var indexOfFoundBranchConnected = connectedBranches.findIndex( function(branch, index) {
				if(branch.getLocation() == addStoppingPointBetweenEachRowInpt.value) {
					return true;
				}
			});

			if(indexOfFoundBranchConnected >= 0) {
				foundConnBr = true;
			}

			if(foundAllBr) {
				if(foundConnBr) {
					if(!editable) {
						stations.push(this.value);
					}
					else {
						if(thisValue != lastValue) {

							var indexOfFoundStationToEdit = stations.findIndex( function(station, index) {
								if(station == lastValue) {
									return true;
								}
							});
						}

						stations[indexOfFoundStationToEdit] = thisValue;
					}
				}
				else {
					alertAddNewInfoC.style.display = "none";
					alertInfoForCreatNewItemC.style.display = "table";
					alertInfoForCreatNewItemTextC.innerHTML = "Δεν μπορεί να ορισθεί ως στάση, μη συνδεδεμένο κατάστημα !";
					alertInfoForCreatNewItemBtn.innerHTML = "Το κατάλαβα";
					alertInfoForCreatNewItemBtn.focus();
					alertInfoForCreatNewItemBtn.addEventListener("click", function() {
						CloseAlertMessages();
						this.focus();
					});
					addBranchOrStoppingPointBetweenC.removeChild(addStoppingPointBetweenEachRowC);

					stations = DeleteStationFromArray(counterSP, stations, lastValue);

					counterSP--;

					return 0;
				}
			}
			else {
				if(!editable) {
					stations.push(this.value);
				}
				else {
					if(thisValue != lastValue) {
						var indexOfFoundStationToEdit = stations.findIndex( function(station, index) {
							if(station == lastValue) {
								return true;
							}
						});

						stations[indexOfFoundStationToEdit] = thisValue;
					}
				}
			}

			lastValue = thisValue;
		});
		addStoppingPointBetweenEachRowInpt.addEventListener("keypress", function(e) {
			if(e.which == 13){
				this.blur();
			}
			NotAllowSymbol(e, 33);
			NotAllowSymbol(e, 35);
			NotAllowSymbol(e, 36);
			NotAllowSymbol(e, 39);
			NotAllowSymbol(e, 44);
			NotAllowSymbol(e, 46);
		});
		addStoppingPointBetweenEachRowInpt.addEventListener("input", function() {
			var indexOfFoundBranch = allBranchesArr.findIndex(function(branch, index) {
				if(branch.getLocation() == branchToAddNewRouteTextInpt.value) {
					return true;
				}
			});
		});

		//LastArrowsForBetweenStoppingPoints(addBranchOrStoppingPointBetweenC, counterSP);

		//EDIT BTN FOR STATION
		editBetweenRoutesPointsBtn.addEventListener("click", function() {
			addStoppingPointBetweenEachRowInpt.disabled = false;

			editable = true;

			addStoppingPointBetweenEachRowInpt.focus();
		});

		counterSP++;
	});

	addNewStoppingPointsToRouteContentTextC.appendChild(rowOfBtnsInsideNewRouteStationC);

	var addBranchOrStoppingPointBetweenC = document.createElement("div");
	addBranchOrStoppingPointBetweenC.id = "addBranchOrStoppingPointBetweenC";

	addNewStoppingPointsToRouteContentTextC.appendChild(addBranchOrStoppingPointBetweenC);

	addNewStoppingPointsToRouteContentC.appendChild(addNewStoppingPointsToRouteContentTextC);
	addNewStoppingPointsToRouteC.appendChild(addNewStoppingPointsToRouteContentC);

	firstRowCenterAddRouteC.appendChild(addNewStoppingPointsToRouteC); 

	//FINAL DESTINATION CONTAINER
	var branchToAddNewRouteC = document.createElement("div");
	branchToAddNewRouteC.id = "branchToAddNewRouteC";

	var branchToAddNewRouteTitleC = document.createElement("div");
	branchToAddNewRouteTitleC.id = "branchToAddNewRouteTitleC";
	branchToAddNewRouteTitleC.innerHTML = "Προς (Κατάστημα)";
	branchToAddNewRouteC.appendChild(branchToAddNewRouteTitleC);

	var branchToAddNewRouteTextInpt = document.createElement("input");
	branchToAddNewRouteTextInpt.id = "branchToAddNewRouteTextInpt";
	//CONTINUE AFTER #branchToAddNewRouteDifferentFinalDestinationInpt CREATION, DOWN
	branchToAddNewRouteTextInpt.title = branchToAddNewRouteTextInpt.value;
	branchToAddNewRouteTextInpt.disabled = true;
	branchToAddNewRouteC.appendChild(branchToAddNewRouteTextInpt);
	branchToAddNewRouteTextInpt.addEventListener("keypress", function(e) {
		NotAllowSymbol(e, 33);
		NotAllowSymbol(e, 35);
		NotAllowSymbol(e, 36);
		NotAllowSymbol(e, 39);
		NotAllowSymbol(e, 44);
		NotAllowSymbol(e, 46);
	});
	branchToAddNewRouteTextInpt.addEventListener("input", function() {
		CheckFromEachInputIfRouteLocationInputIsOk(this, stations);

		to = branchToAddNewRouteTextInpt.value;
		toId = branchToAddNewRouteTextInpt.name;
	});

	to = branchToAddNewRouteTextInpt.value;
	toId = branchToAddNewRouteTextInpt.name;

	firstRowCenterAddRouteC.appendChild(branchToAddNewRouteC);

	firstRowAddRouteC.appendChild(firstRowCenterAddRouteC);

	newRouteAddInfoContentC.appendChild(firstRowAddRouteC);

	var topSideOfBranchNewRouteSideC = document.createElement("div");
	topSideOfBranchNewRouteSideC.id = "topSideOfBranchNewRouteSideC";

	//GIVE CHOICE TO USER, TO ADD DIFFERENT FINAL DESTINATION, THAT DOESN'T EXIST
	var leftSideOfBranchNewRouteOptionOneInptC = document.createElement("div");
	leftSideOfBranchNewRouteOptionOneInptC.id = "leftSideOfBranchNewRouteOptionOneInptC";

	var branchToAddNewRouteDifferentFinalDestinationC = document.createElement("div");
	branchToAddNewRouteDifferentFinalDestinationC.id = "branchToAddNewRouteDifferentFinalDestinationC";

	var branchToAddNewRouteDifferentFinalDestinationInpt = document.createElement("input");
	branchToAddNewRouteDifferentFinalDestinationInpt.id = "branchToAddNewRouteDifferentFinalDestinationInpt";
	branchToAddNewRouteDifferentFinalDestinationInpt.type = "checkbox";
	branchToAddNewRouteDifferentFinalDestinationC.appendChild(branchToAddNewRouteDifferentFinalDestinationInpt);
	branchToAddNewRouteDifferentFinalDestinationInpt.addEventListener("click", function() {
		if(branchToAddNewRouteTextInpt.disabled) {
			branchToAddNewRouteTextInpt.disabled = false;
			branchToAddNewRouteTextInpt.focus();
		}
		else {
			branchToAddNewRouteTitleC.innerHTML = "Προς (Κατάστημα)";
			branchToAddNewRouteTextInpt.disabled = true;
			if(chosenConnBranch == null) {
				if(this.value.length < 2) {
					branchToAddNewRouteTextInpt.value = "";
				}
				branchToAddNewRouteTextInpt.placeholder = "Εισάγετε προορισμό";
			}
			else {
				branchToAddNewRouteTextInpt.value = chosenConnBranchObj.getLocation();
				branchToAddNewRouteTextInpt.placeholder = "Τουλάχιστον 2 χαρακτήρες";
			}
			branchToAddNewRouteTextInpt.style.fontStyle = "normal";

			if(branchToAddNewRouteStoppingPointsInpt.checked) {
				branchToAddNewRouteTextInpt.style.color = "white";
				branchToAddNewRouteTextInpt.style.border = "1px solid rgb(255, 215, 0)";
			}
			else {
				branchToAddNewRouteTextInpt.style.color = "black";
				branchToAddNewRouteTextInpt.style.border = "1px solid black";
			}
		}
	});

	var branchToAddNewRouteDifferentFinalDestinationBtn = document.createElement("button");
	branchToAddNewRouteDifferentFinalDestinationBtn.id = "branchToAddNewRouteDifferentFinalDestinationBtn";
	branchToAddNewRouteDifferentFinalDestinationBtn.innerHTML = "Επεξεργασία τελικού προορισμού, σε περίπτωση μη καταχωρημένης τοποθεσίας, ή ειδικής ανάγκης";
	branchToAddNewRouteDifferentFinalDestinationC.appendChild(branchToAddNewRouteDifferentFinalDestinationBtn);
	branchToAddNewRouteDifferentFinalDestinationBtn.addEventListener("click", function() {
		branchToAddNewRouteDifferentFinalDestinationInpt.click();
	});

	//CONTINUE HERE
	//IF NO CHOSEN BRANCH IS CONNECTED
	if(chosenConnBranch == null) {
		branchToAddNewRouteTextInpt.value = "";
		branchToAddNewRouteTextInpt.name = null;
		branchToAddNewRouteTextInpt.placeholder = "Εισάγετε προορισμό";
		branchToAddNewRouteDifferentFinalDestinationInpt.click();
		branchToAddNewRouteDifferentFinalDestinationInpt.disabled = true;
		branchToAddNewRouteDifferentFinalDestinationBtn.disabled = true;
	}
	else {
		branchToAddNewRouteTextInpt.value = chosenConnBranchObj.getLocation();
		branchToAddNewRouteTextInpt.name = chosenConnBranchObj.getId();
		branchToAddNewRouteTextInpt.placeholder = "Τουλάχιστον 2 χαρακτήρες";
	}

	leftSideOfBranchNewRouteOptionOneInptC.appendChild(branchToAddNewRouteDifferentFinalDestinationC);

	topSideOfBranchNewRouteSideC.appendChild(leftSideOfBranchNewRouteOptionOneInptC);

	//GIVE CHOICE TO USER, TO ADD STOPPING POINTS TO A ROUTE
	var rightSideOfBranchNewRouteOptionOneInptC = document.createElement("div");
	rightSideOfBranchNewRouteOptionOneInptC.id = "rightSideOfBranchNewRouteOptionOneInptC";

	var branchToAddNewRouteStoppingPointsC = document.createElement("div");
	branchToAddNewRouteStoppingPointsC.id = "branchToAddNewRouteStoppingPointsC";

	var branchToAddNewRouteStoppingPointsInpt = document.createElement("input");
	branchToAddNewRouteStoppingPointsInpt.id = "branchToAddNewRouteStoppingPointsInpt";
	branchToAddNewRouteStoppingPointsInpt.type = "checkbox";
	branchToAddNewRouteStoppingPointsC.appendChild(branchToAddNewRouteStoppingPointsInpt);
	branchToAddNewRouteStoppingPointsInpt.addEventListener("click", function() {
		if(this.checked) {
			//StartArrowsForBetweenStoppingPoints(addBranchOrStoppingPointBetweenC, counterSP);
			dateTimeAddNewRouteC.style.marginTop = "73px";
			branchFromAddNewRouteC.style.marginTop = "73px";
			branchToAddNewRouteC.style.marginTop = "73px";

			branchFromAddNewRouteTitleC.style.textAlign = "right";

			branchFromAddNewRouteTextC.style.background = "rgb(22, 36, 53)";
			branchFromAddNewRouteTextC.style.color = "white";
			branchFromAddNewRouteTextC.style.border = "1px solid rgb(255, 215, 0)";

			branchToAddNewRouteTitleC.style.textAlign = "left";

			branchToAddNewRouteTextInpt.style.background = "rgb(22, 36, 53)";
			branchToAddNewRouteTextInpt.style.color = "white";
			branchToAddNewRouteTextInpt.style.border = "1px solid rgb(255, 215, 0)";

			addNewStoppingPointsToRouteC.style.display = "block";
			//addExistingBranchToNewRouteBtn.tabIndex = "0";
			addNewStoppingPointToNewRouteBtn.tabIndex = "0";
			addNewStoppingPointToNewRouteBtn.click();

			if(foundBranchLoc) {
				if(branchToAddNewRouteTextInpt.value == from) {
					branchToAddNewRouteTextInpt.style.border = "2px solid red";
				}
				else {
					if(foundConnectedBranchLoc) {
						branchToAddNewRouteTextInpt.style.border = "1px solid rgb(255, 215, 0)";
					}
					else {
						branchToAddNewRouteTextInpt.style.border = "2px solid red";
					}
				}

				branchToAddNewRouteTextInpt.style.color = "white";
			}
			else {
				branchToAddNewRouteTextInpt.style.color = "rgb(255, 215, 0)";
			}
		}
		else {
			dateTimeAddNewRouteC.style.marginTop = "70px";
			branchFromAddNewRouteC.style.marginTop = "70px";
			branchToAddNewRouteC.style.marginTop = "70px";

			branchFromAddNewRouteTitleC.style.textAlign = "center";

			branchFromAddNewRouteTextC.style.background = "white";
			branchFromAddNewRouteTextC.style.color = "black";
			branchFromAddNewRouteTextC.style.border = "1px solid black";

			branchToAddNewRouteTitleC.style.textAlign = "center";
			
			branchToAddNewRouteTextInpt.style.background = "white";
			branchToAddNewRouteTextInpt.style.color = "black";
			branchToAddNewRouteTextInpt.style.border = "1px solid black";

			addNewStoppingPointsToRouteC.style.display = "none";
			//addExistingBranchToNewRouteBtn.tabIndex = "-1";
			addNewStoppingPointToNewRouteBtn.tabIndex = "-1";

			if(foundBranchLoc) {
				if(branchToAddNewRouteTextInpt.value == from) {
					branchToAddNewRouteTextInpt.style.border = "2px solid red";
				}
				else {
					if(foundConnectedBranchLoc) {
						branchToAddNewRouteTextInpt.style.border = "1px solid black";
					}
					else {
						branchToAddNewRouteTextInpt.style.border = "2px solid red";
					}
				}

				branchToAddNewRouteTextInpt.style.color = "black";
			}
			else {
				branchToAddNewRouteTextInpt.style.color = "orange";
			}
		}
	});

	var branchToAddNewRouteStoppingPointsBtn = document.createElement("button");
	branchToAddNewRouteStoppingPointsBtn.id = "branchToAddNewRouteStoppingPointsBtn";
	branchToAddNewRouteStoppingPointsBtn.innerHTML = "Προσθήκη ενδιάμεσων στάσεων, είτε ως απλές περιοχές, είτε ως υπάρχοντα καταστήματα";
	branchToAddNewRouteStoppingPointsC.appendChild(branchToAddNewRouteStoppingPointsBtn);
	branchToAddNewRouteStoppingPointsBtn.addEventListener("click", function() {
		branchToAddNewRouteStoppingPointsInpt.click();
	});

	rightSideOfBranchNewRouteOptionOneInptC.appendChild(branchToAddNewRouteStoppingPointsC);

	topSideOfBranchNewRouteSideC.appendChild(rightSideOfBranchNewRouteOptionOneInptC);

	secondRowAddRouteC.appendChild(topSideOfBranchNewRouteSideC);

	var bottomSideOfBranchNewRouteSideC = document.createElement("div");
	bottomSideOfBranchNewRouteSideC.id = "bottomSideOfBranchNewRouteSideC";

	//ROUTE DURATION CONTAINER, TO ADD TO THE NEW ROUTE
	var branchToAddNewRouteDurationC = document.createElement("div");
	branchToAddNewRouteDurationC.id = "branchToAddNewRouteDurationC";

	var branchToAddNewRouteDurationTitleC = document.createElement("div");
	branchToAddNewRouteDurationTitleC.id = "branchToAddNewRouteDurationTitleC";
	branchToAddNewRouteDurationTitleC.innerHTML = "Διάρκεια δρομολογίου";
	branchToAddNewRouteDurationC.appendChild(branchToAddNewRouteDurationTitleC);

	var branchToAddNewRouteDurationContentC = document.createElement("div");
	branchToAddNewRouteDurationContentC.id = "branchToAddNewRouteDurationContentC";
	branchToAddNewRouteDurationC.appendChild(branchToAddNewRouteDurationContentC);

	var branchToAddNewRouteDurationHourC = document.createElement("div");
	branchToAddNewRouteDurationHourC.id = "branchToAddNewRouteDurationHourC";

	var branchToAddNewRouteDurationHourInpt = document.createElement("input");
	branchToAddNewRouteDurationHourInpt.id = "branchToAddNewRouteDurationHourInpt";
	branchToAddNewRouteDurationHourInpt.type = "number";
	branchToAddNewRouteDurationHourInpt.min = 0;
	branchToAddNewRouteDurationHourInpt.value = "00";
	branchToAddNewRouteDurationHourInpt.max = 23;
	branchToAddNewRouteDurationHourC.appendChild(branchToAddNewRouteDurationHourInpt);
	branchToAddNewRouteDurationHourInpt.addEventListener("keypress", function() {
		OnlyNumberKey(event, "");
	});
	branchToAddNewRouteDurationHourInpt.addEventListener("input", function() {
		if(this.value.length > 2) {
			this.value = this.value.slice(0, 2); 
		}
	});
	branchToAddNewRouteDurationHourInpt.addEventListener("focusout", function() {
		this.value = AddZerosToTime(this.value);
	});

	branchToAddNewRouteDurationHourTitleC = document.createElement("div");
	branchToAddNewRouteDurationHourTitleC.id = "branchToAddNewRouteDurationHourTitleC";
	branchToAddNewRouteDurationHourTitleC.innerHTML = "Ώρες";
	branchToAddNewRouteDurationHourC.appendChild(branchToAddNewRouteDurationHourTitleC);

	branchToAddNewRouteDurationContentC.appendChild(branchToAddNewRouteDurationHourC);

	var branchToAddNewRouteDurationMiddlePartC = document.createElement("div");
	branchToAddNewRouteDurationMiddlePartC.id = "branchToAddNewRouteDurationMiddlePartC";
	branchToAddNewRouteDurationMiddlePartC.innerHTML = ":";
	branchToAddNewRouteDurationContentC.appendChild(branchToAddNewRouteDurationMiddlePartC);

	var branchToAddNewRouteDurationMinutesC = document.createElement("div");
	branchToAddNewRouteDurationMinutesC.id = "branchToAddNewRouteDurationMinutesC";

	var branchToAddNewRouteDurationMinutesInpt = document.createElement("input");
	branchToAddNewRouteDurationMinutesInpt.id = "branchToAddNewRouteDurationMinutesInpt";
	branchToAddNewRouteDurationMinutesInpt.type = "number";
	branchToAddNewRouteDurationMinutesInpt.min = 0;
	branchToAddNewRouteDurationMinutesInpt.max = 59;
	branchToAddNewRouteDurationMinutesInpt.value = "00";
	branchToAddNewRouteDurationMinutesC.appendChild(branchToAddNewRouteDurationMinutesInpt);
	branchToAddNewRouteDurationMinutesInpt.addEventListener("keypress", function() {
		OnlyNumberKey(event, "");
	});
	branchToAddNewRouteDurationMinutesInpt.addEventListener("input", function() {
		if(this.value.length > 2) {
			this.value = this.value.slice(0, 2);
		}
	});
	branchToAddNewRouteDurationMinutesInpt.addEventListener("focusout", function() {
		this.value = AddZerosToTime(this.value);
	});
	branchToAddNewRouteDurationMinutesTitleC = document.createElement("div");
	branchToAddNewRouteDurationMinutesTitleC.id = "branchToAddNewRouteDurationMinutesTitleC";
	branchToAddNewRouteDurationMinutesTitleC.innerHTML = "Λεπτά";
	branchToAddNewRouteDurationMinutesC.appendChild(branchToAddNewRouteDurationMinutesTitleC);

	branchToAddNewRouteDurationContentC.appendChild(branchToAddNewRouteDurationMinutesC);

	bottomSideOfBranchNewRouteSideC.appendChild(branchToAddNewRouteDurationC);

	//BUSES AVALABLE, FROM STARTING BRANCH, FOR THE NEW ROUTE
	var branchToAddNewRouteAvailBusToChooseC = document.createElement("div");
	branchToAddNewRouteAvailBusToChooseC.id = "branchToAddNewRouteAvailBusToChooseC";

	var branchToAddNewRouteAvailBusToChooseTitleC = document.createElement("div");
	branchToAddNewRouteAvailBusToChooseTitleC.id = "branchToAddNewRouteAvailBusToChooseTitleC";
	branchToAddNewRouteAvailBusToChooseTitleC.innerHTML = "Διαθέσιμα λεωφορεία";
	branchToAddNewRouteAvailBusToChooseC.appendChild(branchToAddNewRouteAvailBusToChooseTitleC);

	var branchToAddNewRouteAvailBusToChooseSlct = document.createElement("select");
	branchToAddNewRouteAvailBusToChooseSlct.id = "branchToAddNewRouteAvailBusToChooseSlct";
	var availBuses = await chosenBranchObj.getAvailableBuses();
	availBuses = ConvertObjectsArrayToBusObjsArray(availBuses);

	if(availBuses.length == 0) {
		var option = document.createElement("option");
		option.id = "null";
		option.innerHTML = "Δεν υπάρχει διαθέσιμο λεωφορείο";
		branchToAddNewRouteAvailBusToChooseSlct.appendChild(option);
	}
	else {
		for(var i = 0; i < availBuses.length; i++) {
			var option = document.createElement("option");
			option.id = availBuses[i].getId();
			option.title = "#" + availBuses[i].getId();
			option.innerHTML = availBuses[i].getInfo();
			branchToAddNewRouteAvailBusToChooseSlct.appendChild(option);
		}
	}
	branchToAddNewRouteAvailBusToChooseC.appendChild(branchToAddNewRouteAvailBusToChooseSlct);

	branchToAddNewRouteAvailBusToChooseSlct.addEventListener("change", function() {
		var busOptionNow = branchToAddNewRouteAvailBusToChooseSlct.options[branchToAddNewRouteAvailBusToChooseSlct.selectedIndex];
		if(busOptionNow.id != "null") {
			branchToAddNewRouteAvailBusIdToChooseRightTextC.innerHTML = busOptionNow.id;
		}
	});
	var selectedIndexBusesOption = branchToAddNewRouteAvailBusToChooseSlct.options[branchToAddNewRouteAvailBusToChooseSlct.selectedIndex];

	var branchToAddNewRouteAvailBusIdToChooseOverallC = document.createElement("div");
	branchToAddNewRouteAvailBusIdToChooseOverallC.id = "branchToAddNewRouteAvailBusIdToChooseOverallC";

	var branchToAddNewRouteAvailBusIdToChooseC = document.createElement("div");
	branchToAddNewRouteAvailBusIdToChooseC.id = "branchToAddNewRouteAvailBusIdToChooseC";

	var branchToAddNewRouteAvailBusIdToChooseLeftTextC = document.createElement("div");
	branchToAddNewRouteAvailBusIdToChooseLeftTextC.id = "branchToAddNewRouteAvailBusIdToChooseLeftTextC";
	branchToAddNewRouteAvailBusIdToChooseLeftTextC.innerHTML = "Κωδικός λεωφορείου: ";
	branchToAddNewRouteAvailBusIdToChooseC.appendChild(branchToAddNewRouteAvailBusIdToChooseLeftTextC);

	var branchToAddNewRouteAvailBusIdToChooseRightTextC = document.createElement("div");
	branchToAddNewRouteAvailBusIdToChooseRightTextC.id = "branchToAddNewRouteAvailBusIdToChooseRightTextC";
	if(selectedIndexBusesOption.id == "null") {
		branchToAddNewRouteAvailBusIdToChooseC.style.display = "none";
	}
	else {
		branchToAddNewRouteAvailBusIdToChooseRightTextC.innerHTML = selectedIndexBusesOption.id;
	}
	branchToAddNewRouteAvailBusIdToChooseC.appendChild(branchToAddNewRouteAvailBusIdToChooseRightTextC);

	branchToAddNewRouteAvailBusIdToChooseOverallC.appendChild(branchToAddNewRouteAvailBusIdToChooseC);

	branchToAddNewRouteAvailBusToChooseC.appendChild(branchToAddNewRouteAvailBusIdToChooseOverallC);

	bottomSideOfBranchNewRouteSideC.appendChild(branchToAddNewRouteAvailBusToChooseC);

	//BUTTON TO SEND INFO OF NEW ROUTE TO SERVER
	var newRouteAddBtn = document.createElement("button");
	newRouteAddBtn.id = "newRouteAddBtn";
	newRouteAddBtn.innerHTML = "ΠΡΟΣΘΗΚΗ";
	bottomSideOfBranchNewRouteSideC.appendChild(newRouteAddBtn);

	newRouteAddBtn.addEventListener("click", async function() {
		var date = new Date(dateTimeAddNewRouteInpt.value);
		var stationsIds = [];

		for(var i = 0; i < stations.length; i++) {
			var indexOfFoundStationIfItIsBranch = connectedBranches.findIndex( function(branch, index) {		
				if(branch.getLocation() == stations[i]) {
					return true;
				}
			});

			//IF NOT FOUND
			if(indexOfFoundStationIfItIsBranch > -1) {
				stationsIds.push("#" + connectedBranches[indexOfFoundStationIfItIsBranch].getId());
			}
			//IF FOUND
			else {
				stationsIds.push(stations[i]);
			}
		}

		var id = CompareIdWithATableAndReturn(10, routesIds);
		//routesIds.push(id);
		var day;
		var hourStart = AddZerosToTime(date.getHours()) + ":" + AddZerosToTime(date.getMinutes());
		var durationHour = branchToAddNewRouteDurationHourInpt.value;
		var durationMin = branchToAddNewRouteDurationMinutesInpt.value;
		var duration = durationHour + ":" + durationMin;

		var newDate = date;
		newDate.setHours(newDate.getHours() + parseInt(durationHour));
		newDate.setMinutes(newDate.getMinutes() + parseInt(durationMin));

		var hourArrival = AddZerosToTime(newDate.getHours()) + ":" + AddZerosToTime(newDate.getMinutes());
		var busId;
		var dateObj;

		var selectedIndexBusesOption = branchToAddNewRouteAvailBusToChooseSlct.options[branchToAddNewRouteAvailBusToChooseSlct.selectedIndex];

		if(selectedIndexBusesOption.id == "null") {
			busId = null;
		}
		else {
			busId = selectedIndexBusesOption.id;
		}

		if(dateTimeAddNewRouteForEveryWeekOrNotInpt.checked) {
			day = date.getDay();
			dateObj = null;
		}
		else {
			day = null;
			dateObj = date;
		}

		if(stationsIds.length == 0) {
			stationsIds = null;
		}

		var newRoute = {
			'id': id,
			'start': fromId,
			'end': toId,
			'day': day,
			'date': dateObj,
			'hourStart': hourStart,
			'hourArrival': hourArrival,
			'duration': duration,
   			'stations': stationsIds,
			'busId': busId,
			'active': 1
		};

		var route = ConvertObjectToRouteObj(newRoute);
		await route.main();
	});

	secondRowAddRouteC.appendChild(bottomSideOfBranchNewRouteSideC);

	newRouteAddInfoContentC.appendChild(secondRowAddRouteC);
}

//(6)->START ARROWS IMAGE 
function StartArrowsForBetweenStoppingPoints(mainC, typeOfArrow) {
	var destinationForStartRowC = document.createElement("div");
	destinationForStartRowC.id = typeOfArrow + "DestinationForStartRowC";
	destinationForStartRowC.className = "destinationForEachRowC";

	var destinationForStartRowImg = document.createElement("img");
	destinationForStartRowImg.id = typeOfArrow + "DestinationForStartRowImg";
	destinationForStartRowImg.className = "destinationForEachRowImg";
	destinationForStartRowC.appendChild(destinationForStartRowImg);

	var destinationForStartRowSecondImg = document.createElement("img");
	destinationForStartRowSecondImg.id = typeOfArrow + "DestinationForStartRowSecondImg";
	destinationForStartRowSecondImg.className = "destinationForEachRowImg";
	destinationForStartRowC.appendChild(destinationForStartRowSecondImg);

	//STYLING
	destinationForStartRowImg.style.left = "15px";
	destinationForStartRowImg.style.right = "auto";
	destinationForStartRowImg.style.transform = "translate(0, 0) rotate(-90deg)";

	destinationForStartRowSecondImg.style.left = "25px";
	destinationForStartRowSecondImg.style.right = "auto";
	destinationForStartRowSecondImg.style.transform = "translate(0, 0) rotate(-90deg)";

	var d1 = document.getElementById(typeOfArrow + "DestinationForStartRowC");
	
	if(typeOfArrow == 0 && d1 == null) {
		mainC.appendChild(destinationForStartRowC);
	}
}

//(6)->ARROWS IMAGE 
function ArrowsForBetweenStoppingPoints(mainC, typeOfArrow) {
	var destinationForEachRowC = document.createElement("div");
	//destinationForEachRowC.id = typeOfArrow + "DestinationForEachRowC";
	destinationForEachRowC.className = "destinationForEachRowC";

	var destinationForEachRowImg = document.createElement("img");
	//destinationForEachRowImg.id = typeOfArrow + "DestinationForEachRowImg";
	destinationForEachRowImg.className = "destinationForEachRowImg";
	destinationForEachRowC.appendChild(destinationForEachRowImg);

	//STYLING
	destinationForEachRowImg.style.left = "50%";
	destinationForEachRowImg.style.right = "auto";
	destinationForEachRowImg.style.transform = "translate(-50%, 0)";

	mainC.appendChild(destinationForEachRowC);
}

//(6)->LAST ARROWS IMAGE 
function LastArrowsForBetweenStoppingPoints(mainC, typeOfArrow) {
	var destinationForLastRowC = document.createElement("div");
	destinationForLastRowC.id = typeOfArrow + "DestinationForLastRowC";
	destinationForLastRowC.className = "destinationForLastRowC";

	var destinationForLastRowImg = document.createElement("img");
	destinationForLastRowImg.id = typeOfArrow + "DestinationForLastRowImg";
	destinationForLastRowImg.className = "destinationForEachRowImg";
	destinationForLastRowC.appendChild(destinationForLastRowImg);

	var destinationForLastRowSecondImg = document.createElement("img");
	destinationForLastRowSecondImg.id = typeOfArrow + "DestinationForLastRowSecondImg";
	destinationForLastRowSecondImg.className = "destinationForEachRowImg";
	destinationForLastRowC.appendChild(destinationForLastRowSecondImg);

	//STYLING
	destinationForLastRowImg.style.left = "auto";
	destinationForLastRowImg.style.right = "15px";
	destinationForLastRowImg.style.transform = "translate(0, 0) rotate(-90deg)";

	destinationForLastRowSecondImg.style.left = "auto";
	destinationForLastRowSecondImg.style.right = "25px";
	destinationForLastRowSecondImg.style.transform = "translate(0, 0) rotate(-90deg)";

	var previousD3 = document.getElementsByClassName("destinationForLastRowC");

	for(var i = 0; i < previousD3.length; i++) {
		mainC.removeChild(previousD3[i]);
	}
	
	mainC.appendChild(destinationForLastRowC);
}

//(6)->DELETE STATION IF IT DOESNT MEET REQUIREMENTS
function DeleteStationFromArray(counter, array, value) {
	var d1 = document.getElementById(counter + "DestinationForStartRowC");
	var d2 = document.getElementById(counter + "DestinationForEachRowC");
	var d3 = document.getElementById(counter + "DestinationForLastRowC");

	var indexOfFoundStationToDelete = array.findIndex( function(station, index) {		
		if(station == value) {
			return true;
		}
	});

	if(indexOfFoundStationToDelete > -1) {
		array.splice(indexOfFoundStationToDelete, 1);
	}

	CheckFromEachInputIfRouteLocationInputIsOk(branchToAddNewRouteTextInpt, array);

	return array;
}

//(6)->ACTIONS WHEN ADD NEW ROUTE CONTAINER, IS ABOUT TO CLOSE
function NewRouteCActionToClose() {
	newRouteAddInfoC.style.display = "block";
	newRouteAddInfoC.style.position = "absolute";
	newRouteAddInfoC.style.left = "-100.5%";
	newRouteAddInfoC.style.borderRadius = "0 6px 6px 0";
	newRouteAddInfoC.style.transform = "translate(0, 0)";

	openCloseNewRouteAddBtn.style.float = "right";
	openCloseNewRouteAddBtnImg.style.transform = "translate(-50%, 0) rotate(0deg)";

	newRouteAddInfoContentC.style.display = "none";
	newRouteAddInfoContentC.style.float = "left";
	newRouteAddInfoContentC.style.left = "0";
	newRouteAddInfoContentC.style.right = "63px";

	newAddedRouteImgC.style.display = "none";
	newAddedRouteC.style.display = "none";

	chosenBranchRoutesC.style.marginTop = "100px";
}

//(6)->ACTIONS WHEN ADD NEW ROUTE CONTAINER, IS ABOUT TO CLOSE FINALLY
function NewRouteCActionToCloseFinally() {
	newRouteAddInfoC.style.display = "none";

	openCloseNewRouteAddBtn.style.float = "right";

	newAddedRouteImgC.style.display = "none";
	newAddedRouteC.style.display = "none";

	chosenBranchRoutesC.style.marginTop = "100px";
}

//(6)->EDIT ROUTE
function EditRoute() {
	routeEventOpened = "edit";
	CheckRouteEventOpened();
}

//(6)->ACTIONS WHEN EDIT ROUTE CONTAINER TRIGGERS
function OpenCloseEditRouteContainer(status) {
	if(status == 0) {
		EditCActionToOpen();
	}
	else {
		EditCActionToClose();
	}
}

//(6)->ACTIONS WHEN EDIT ROUTE CONTAINER, IS ABOUT TO OPEN
function EditCActionToOpen() {
}

//(6)->ACTIONS WHEN EDIT ROUTE CONTAINER, IS ABOUT TO CLOSE
function EditCActionToClose() {
}

//(6)->DELETE ROUTES
function DeleteRoutes() {
	routeEventOpened = "delete";
	CheckRouteEventOpened();

	//var serverCommun = new ServerCommunication();
	//serverCommun.deleteRoutes(routesToDelete)
}

//(6)->DECIDE EVENT OF BUTTONS AND CHECK WHICH IS OPEN NOW
function CheckRouteEventOpened() {
	if(routeEventOpened == null) {

	}
	else if(routeEventOpened == "addNew") {
		newRouteAddInfoC.style.display = "block";
	}
	else if(routeEventOpened == "edit") {
		newRouteAddInfoC.style.display = "none";
	}
	else if(routeEventOpened == "delete") {
		newRouteAddInfoC.style.display = "none";
	}
}

//(6)->CHECK IF INPUT IS A BRANCH, A NEW LOCATION, IF IT IS A STATION, IF IT IS LESS THAN 2 CHARS OR IF IT IS EMPTY
function CheckFromEachInputIfRouteLocationInputIsOk(input, stations) {
	var typeOfFinalDestination = "";

	//CHECK IF THERE ARE LESS THAN 2 CHARS IN INPUT
	if(input.value.length < 2) {
		typeOfFinalDestination = "Τουλάχιστον 2 χαρακτήρες !";

		input.style.border = "2px solid red";
		input.name = "wrong";
		branchToAddNewRouteC.style.width = "200px";
		branchToAddNewRouteC.style.marginTop = "72px";
		branchToAddNewRouteTitleC.style.fontSize = "14px";
	}
	else {
		typeOfFinalDestination = "Τοποθεσία";
		typeOfFinalDestination = "Προς (" + typeOfFinalDestination + ")";

		input.style.border = "1px solid black";
		input.name = input.value;
		branchToAddNewRouteC.style.width = "180px";
		branchToAddNewRouteC.style.marginTop = "70px";
		branchToAddNewRouteTitleC.style.fontSize = "16px";
	}


	//IF VALUE OF INPUT IS ALREADY A STATION
	var indexOfFoundStation = stations.findIndex( function(station, index) {
		if(station == input.value) {
			return true;
		}
	});

	var foundStation = false;

	if(indexOfFoundStation >= 0) {
		foundStation = true;
	}

	if(foundStation) {
		typeOfFinalDestination = "Προορισμός ίδιος με στάση !";
		
		input.style.border = "2px solid red";
		input.name = "wrong";
		branchToAddNewRouteC.style.width = "200px";
		branchToAddNewRouteC.style.marginTop = "72px";
		branchToAddNewRouteTitleC.style.fontSize = "14px";
	}

	//INDEX TO FIND BRANCH FROM CONNECTED BRANCHES
	var indexOfFoundBranchConnected = connectedBranches.findIndex( function(branch, index) {
		if(branch.getLocation() == input.value) {
			return true;
		}
	});

	if(indexOfFoundBranchConnected < 0) {
		foundConnectedBranchLoc = false;
	}
	else {
		foundConnectedBranchLoc = true;
	}


	//INDEX TO FIND BRANCH FROM ALL BRANCHES
	var indexOfFoundBranch = allBranchesArr.findIndex( function(branch, index) {
		if(branch.getLocation() == input.value) {
			return true;
		}
	});

	if(indexOfFoundBranch < 0) {
		foundBranchLoc = false;
	}
	else {
		foundBranchLoc = true;
	}

	input.title = input.value;


	//IF IT IS A BRANCH CONNECTED
	if(foundBranchLoc) {
		if(allBranchesArr[indexOfFoundBranch].getLocation() == branchFromAddNewRouteTextC.value) {
			typeOfFinalDestination = "Προορισμός ίδιος με αρχή !";
			
			input.style.border = "2px solid red";
			input.name = "wrong";
			branchToAddNewRouteC.style.width = "200px";
			branchToAddNewRouteC.style.marginTop = "72px";
			branchToAddNewRouteTitleC.style.fontSize = "14px";
		}
		else {
			if(foundConnectedBranchLoc) {
				typeOfFinalDestination = "Κατάστημα";
				typeOfFinalDestination = "Προς (" + typeOfFinalDestination + ")";
			
				input.style.border = "1px solid black";
				input.name = "#" + allBranchesArr[indexOfFoundBranch].getId();
			}
			else {
				if(input.value == branchFromAddNewRouteTextC.innerHTML) {
					typeOfFinalDestination = "Προορισμός ίδιος με την αφετηρία !";
					branchToAddNewRouteC.style.width = "250px";
				}
				else {
					typeOfFinalDestination = "Το κατάστημα δεν είναι συνδεδεμένο !";
					branchToAddNewRouteC.style.width = "262px";
				}

				input.style.border = "2px solid red";
				input.name = "wrong";
				branchToAddNewRouteC.style.marginTop = "72px";
				branchToAddNewRouteTitleC.style.fontSize = "14px";
			}
		}
			
		input.style.fontStyle = "normal";
		if(branchToAddNewRouteStoppingPointsInpt.checked) {
			input.style.color = "white";
		}
		else {
			input.style.color = "black";
		}
	}
	//IF IT ISN'T A BRANCH
	else {
		input.style.fontStyle = "italic";
			
		if(branchToAddNewRouteStoppingPointsInpt.checked) {
			input.style.color = "rgb(255, 215, 0)";
		}
		else {
			input.style.color = "orange";
		}

		input.name = input.value;
	}

	branchToAddNewRouteTitleC.innerHTML = typeOfFinalDestination;
}


//*(7)DECIDE THE DIRECTION OF ARROWS FOR BRANCHES ROUTES
function ArrowDirection(msg) {
	if(msg == "right") {
		topLeftArrowImgC.style.display = "block";
		topRightArrowImgC.style.display = "block";
		bottomLeftArrowImgC.style.display = "none";
		bottomRightArrowImgC.style.display = "none";
	}
	else if(msg == "left") {
		topLeftArrowImgC.style.display = "none";
		topRightArrowImgC.style.display = "none";
		bottomLeftArrowImgC.style.display = "block";
		bottomRightArrowImgC.style.display = "block";
	}
}



//*(8)CREATE THE DEFAULT VIEW OF CONNECTED BRANCHES PANEL 
function StartingScreenOfBranchConnected() {
	var waitingOfConnectedBranchesImgC = document.createElement("div");
	waitingOfConnectedBranchesImgC.id = "waitingOfConnectedBranchesImgC";

	var waitingOfConnectedBranchesTextC = document.createElement("div");
	waitingOfConnectedBranchesTextC.id = "waitingOfConnectedBranchesTextC";
	waitingOfConnectedBranchesTextC.innerHTML = "ΕΠΙΛΕΞΤΕ ΚΑΤΑΣΤΗΜΑ";
	waitingOfConnectedBranchesImgC.appendChild(waitingOfConnectedBranchesTextC);

	var waitingOfConnectedBranchesImg = document.createElement("img");
	waitingOfConnectedBranchesImg.id = "waitingOfConnectedBranchesImg";
	waitingOfConnectedBranchesImgC.appendChild(waitingOfConnectedBranchesImg);

	connectedBranchRoutesContentC.appendChild(waitingOfConnectedBranchesImgC);
}



//*(9)GET ALL BRANCHES, AS OBJECTS IN ARRAY, FROM THE SERVER SIDE
function GetIdsOfRoutes() {
	return new Promise ((resolve, reject) => {
		$.ajax({
			type: 'POST',
			url: "../Php/getIdsOfRoutesPhp.php",
			data: {},
			success: function(data) {
				var routesIds = JSON.parse(data);
				//alert(data);
				resolve(routesIds);
			}
		});
	});
}



//*(10)CREATE THE DEFAULT VIEW OF ROUTES PANEL 
function StartingScreenOfRoutes() {
	chosenBranchRoutesAllContentWhenWaitingC.style.display = "block";
	chosenBranchRoutesAllContentAfterWaitingC.style.display = "none";

	var waitingOfRoutesImgC = document.createElement("div");
	waitingOfRoutesImgC.id = "waitingOfRoutesImgC";

	var waitingOfRoutesTextC = document.createElement("div");
	waitingOfRoutesTextC.id = "waitingOfRoutesTextC";
	waitingOfRoutesTextC.innerHTML = "ΕΠΙΛΕΞΤΕ ΚΑΤΑΣΤΗΜΑ";
	waitingOfRoutesImgC.appendChild(waitingOfRoutesTextC);

	var waitingOfRoutesImg = document.createElement("img");
	waitingOfRoutesImg.id = "waitingOfRoutesImg";
	waitingOfRoutesImgC.appendChild(waitingOfRoutesImg);
	
	chosenBranchRoutesAllContentWhenWaitingC.appendChild(waitingOfRoutesImgC);

	addNewRouteBtn.disabled = true;
	editRouteBtn.disabled = true;
	deleteRoutesBtn.disabled = true;
}