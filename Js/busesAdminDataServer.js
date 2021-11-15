
//INITIALIZE VARIABLES FOR STYLING


//INITIALIZE GLOBAL VARIABLES
var alreadyChosenBranch = null;
var chosenBranch = null;
var alreadyChosenBus = null;
var chosenBus = null;
var currentBusObj = null;

//MAIN FUNCTION
ServerBus();

//HEART OF FUNCTIONS IN THIS FILE
async function ServerBus() {
	var allBranchesArr = await GetAllBranches();
	AddStartingValuesToHtmlElements();
	CreateTheBranchesView(allBranchesArr);
	CreateTheBusesView();
	CreateTheEditButtons();
}

//ADD VALUES TO EXISTING ELEMENTS FROM HTML FILE, SO IT DOESNT SHOW UP BEFORE JS LOADS CAUSE THERE ARE ASYNC FUNCTIONS
function AddStartingValuesToHtmlElements() {
	var busesTitleC = document.getElementById("busesTitleC");
	busesTitleC.innerHTML = "ΑΡΧΕΙΟ ΛΕΩΦΟΡΕΙΩΝ";
	var branchBusesTitleC = document.getElementById("branchBusesTitleC");
	branchBusesTitleC.innerHTML = "ΚΑΤΑΣΤΗΜΑΤΑ";
	var busesFromChosenBranchTitleC = document.getElementById("busesFromChosenBranchTitleC");
	busesFromChosenBranchTitleC.innerHTML = "ΛΕΩΦΟΡΕΙΑ";
}



//*(1)GET ALL BRANCHES, AS OBJECTS IN ARRAY, FROM THE SERVER SIDE
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



//*(2)CREATE THE DEFAULT VIEW OF BRANCHES PANEL 
function CreateTheBranchesView(allBranchesArr) {
	PrototypeOfBranchView("NULL");
	for (var i = 0; i < allBranchesArr.length; i++) {
		PrototypeOfBranchView(allBranchesArr[i]);
	}
}

//(2)->EACH BRANCH BUTTON PROTOTYPE STRUCTURE
function PrototypeOfBranchView(branchArr) {
	if(branchArr != "NULL") {
		var branchBusesContentC = document.getElementById("branchBusesContentC");

		var mainPlaceForBranchBtn = document.createElement("button");
		mainPlaceForBranchBtn.className = "mainPlaceForBranchBtn";
		mainPlaceForBranchBtn.id = branchArr.id;
		mainPlaceForBranchBtn.addEventListener("click", function() {
			chosenBranch = this.id;
			var parseBranch = branchArr.location + " (#" + branchArr.id + ")";
			CheckForBusesThroughBranchChosen(parseBranch);
			StylingButtonOfBranches();
			alreadyChosenBranch = chosenBranch;
		});

		var idBranchBusesC = document.createElement("div");
		idBranchBusesC.className = "idBranchBusesC";
		idBranchBusesC.innerHTML = "#" + branchArr.id + " -";
		mainPlaceForBranchBtn.appendChild(idBranchBusesC);

		var locationBranchBusesC = document.createElement("div");
		locationBranchBusesC.className = "locationBranchBusesC";
		locationBranchBusesC.innerHTML = branchArr.location + " -";
		mainPlaceForBranchBtn.appendChild(locationBranchBusesC);

		var streetBranchBusesC = document.createElement("div");
		streetBranchBusesC.className = "streetBranchBusesC";
		streetBranchBusesC.innerHTML = branchArr.street;
		mainPlaceForBranchBtn.appendChild(streetBranchBusesC);

		branchBusesContentC.appendChild(mainPlaceForBranchBtn);
	}
	else {
		var branchBusesContentC = document.getElementById("branchBusesContentC");

		var mainPlaceForBranchBtn = document.createElement("button");
		mainPlaceForBranchBtn.className = "mainPlaceForBranchBtn";
		mainPlaceForBranchBtn.id = "NULL";
		mainPlaceForBranchBtn.addEventListener("click", function() {
			chosenBranch = this.id;
			var parseBranch = "NULL";
			CheckForBusesThroughBranchChosen(parseBranch);
			StylingButtonOfBranches();
			alreadyChosenBranch = chosenBranch;
		});
		mainPlaceForBranchBtn.style.background = "darkgrey";

		var idBranchBusesC = document.createElement("div");
		idBranchBusesC.className = "idBranchBusesC";
		idBranchBusesC.innerHTML = "Λεωφορεία που δεν ανήκουν σε κάποιο κατάστημα";
		mainPlaceForBranchBtn.appendChild(idBranchBusesC);

		var locationBranchBusesC = document.createElement("div");
		locationBranchBusesC.className = "locationBranchBusesC";
		locationBranchBusesC.innerHTML = "";
		mainPlaceForBranchBtn.appendChild(locationBranchBusesC);

		var streetBranchBusesC = document.createElement("div");
		streetBranchBusesC.className = "streetBranchBusesC";
		streetBranchBusesC.innerHTML = "";
		mainPlaceForBranchBtn.appendChild(streetBranchBusesC);

		branchBusesContentC.appendChild(mainPlaceForBranchBtn);
	}
}



//*(3)CREATE THE DEFAULT VIEW OF BUSES PANEL
function CreateTheBusesView() {
	var busesFromChosenBranchContentC = document.getElementById("busesFromChosenBranchContentC");
	
	var fullScreenOfNoBusesC = document.createElement("div");
	fullScreenOfNoBusesC.id = "fullScreenOfNoBusesC";

	var noBusesImg = document.createElement("div");
	noBusesImg.id = "noBusesImg";
	noBusesImg.style.width = "200px";
	noBusesImg.style.height = "200px";
	noBusesImg.style.content = "url(../Assets/icons8_wait_120px.png)";
	noBusesImg.addEventListener("mouseover", function() {
		this.style.content = "url(../Assets/icons8_wait_120px_2.png)";
	});
	noBusesImg.addEventListener("mouseout", function() {
		this.style.content = "url(../Assets/icons8_wait_120px.png)";
	});
	noBusesImg.style.animation = "spin 2s ease infinite";
	fullScreenOfNoBusesC.appendChild(noBusesImg);

	var emptyBusesTextC = document.createElement("div");
	emptyBusesTextC.id = "emptyBusesTextC";
	emptyBusesTextC.style.color = "rgb(58, 65, 89)";
	emptyBusesTextC.style.fontSize = "24px";
	emptyBusesTextC.style.marginTop = "30px";
	emptyBusesTextC.innerHTML = "ΕΠΙΛΕΞΤΕ ΚΑΤΑΣΤΗΜΑ...";
	fullScreenOfNoBusesC.appendChild(emptyBusesTextC);

	busesFromChosenBranchContentC.appendChild(fullScreenOfNoBusesC)
}



//*(4)CHECK AND SHOW THE BUSES THAT ARE CONNECTED TO THE CHOSEN BRANCH
async function CheckForBusesThroughBranchChosen(branchLoc) {
	if(chosenBranch != null && chosenBranch != alreadyChosenBranch) {
		var busesArr = await GetBusesForThisBranch(chosenBranch);
		var busesFromChosenBranchContentC = document.getElementById("busesFromChosenBranchContentC");
		busesFromChosenBranchContentC.innerHTML = "";

		chosenBus = null;
		if(busesArr.length == 0) {
			busesFromChosenBranchContentC.style.background = "white";
			ShowScreenOfBusesPanelWhenThereAreNoBuses();
		}
		else {
			busesFromChosenBranchContentC.style.background = "rgb(240, 245, 255)";
		}
		
		busesArr = ConvertObjectsArrayToBusObjsArray(busesArr);
		for(var i = 0; i < busesArr.length; i++) {
			PrototypeOfBusView(busesArr[i], branchLoc);
		}

		var busesFromChosenBranchTitleC = document.getElementById("busesFromChosenBranchTitleC");
		busesFromChosenBranchTitleC.innerHTML = "ΛΕΩΦΟΡΕΙΑ";
	}
}

//(4)->BRANCH BUTTON CHOSEN STYLING
function StylingButtonOfBranches() {
	var elemntToOpen = document.getElementById(chosenBranch);
	elemntToOpen.style.border = "4px solid orange";
	elemntToOpen.style.borderLeft = "2px solid black";
	elemntToOpen.style.borderRight = "2px solid black";

	if(alreadyChosenBranch != null && chosenBranch != alreadyChosenBranch) {
		var elemntToClose = document.getElementById(alreadyChosenBranch);
		elemntToClose.style.border = "2px solid black";
	}
}

//(4)->STYLING OF BUSES PANEL WHEN THERE ARE NO BUSES FOUND
function ShowScreenOfBusesPanelWhenThereAreNoBuses() {
	var busesFromChosenBranchContentC = document.getElementById("busesFromChosenBranchContentC");
	
	var fullScreenOfNoBusesC = document.createElement("div");
	fullScreenOfNoBusesC.id = "fullScreenOfNoBusesC";

	var noBusesImg = document.createElement("div");
	noBusesImg.id = "noBusesImg";
	noBusesImg.style.width = "250px";
	noBusesImg.style.height = "200px";
	noBusesImg.style.content = "url(../Assets/icons8_empty_box_120px_2.png)";
	noBusesImg.style.transform = "translate(-50%, -50%)";
	fullScreenOfNoBusesC.appendChild(noBusesImg);

	var emptyBusesTextC = document.createElement("div");
	emptyBusesTextC.id = "emptyBusesTextC";
	emptyBusesTextC.style.color = "darkgrey";
	emptyBusesTextC.style.fontSize = "20px";
	emptyBusesTextC.style.marginTop = "10px";
	emptyBusesTextC.innerHTML = "ΔΕΝ ΒΡΕΘΗΚΕ ΚΑΝΕΝΑ ΛΕΩΦΟΡΕΙΟ ΣΕ ΑΥΤΟ ΤΟ ΚΑΤΑΣΤΗΜΑ!";
	fullScreenOfNoBusesC.appendChild(emptyBusesTextC);

	busesFromChosenBranchContentC.appendChild(fullScreenOfNoBusesC)
}

//(4)->FIND BUSES THAT CONNECTED TO CURRENT BRACH CHOSEN
function GetBusesForThisBranch(branchId) {
	return new Promise ((resolve, reject) => {
		$.ajax({
			type: 'POST',
			url: "../Php/getBusesConnectedToThisBranchPhp.php",
			data: {id: branchId},
			success: function(data) {
				var buses = JSON.parse(data);
				//alert(data);
				resolve(buses);
			}
		});
	});
}

//(4)->EACH BUS BUTTON PROTOTYPE STRUCTURE
function PrototypeOfBusView(bus, branchLoc) {
	var busesFromChosenBranchContentC = document.getElementById("busesFromChosenBranchContentC");

	var mainPlaceForBusBtn = document.createElement("button");
	mainPlaceForBusBtn.className = "mainPlaceForBusBtn";
	mainPlaceForBusBtn.id = bus.getId();
	mainPlaceForBusBtn.tabIndex = -1;
	mainPlaceForBusBtn.addEventListener("click", function() {
		chosenBus = this.id;
		currentBusObj = bus;
		ConvertObjectToBusObj
		StylingButtonOfBuses();
		alreadyChosenBus = chosenBus;
	});
	mainPlaceForBusBtn.addEventListener("dblclick", function() {
		ShowViewDetailsOfBus(bus, branchLoc);
	});

	var availabilityBusesC = document.createElement("div");
	availabilityBusesC.className = "availabilityBusesC";
	mainPlaceForBusBtn.appendChild(availabilityBusesC);
	if(bus.getAvailability() == "1") {
		availabilityBusesC.style.background = "rgb(39, 238, 8)";
	}
	else {
		availabilityBusesC.style.background = "rgb(240, 82, 84)";
	}

	var idBusesC = document.createElement("div");
	idBusesC.className = "idBusesC";
	idBusesC.innerHTML = "##";
	idBusesC.style.fontSize = "22px";
	idBusesC.addEventListener("mouseover", function() {
		idBusesC.innerHTML = bus.getId();
		idBusesC.style.fontSize = "18px";
		idBusesC.style.fontWeight = "bold";
		idBusesC.style.marginTop = "3px";
	});
	idBusesC.addEventListener("mouseout", function() {
		idBusesC.innerHTML = "##";
		idBusesC.style.fontSize = "22px";
		idBusesC.style.fontWeight = "unset";
		idBusesC.style.marginTop = "0px";
	});
	mainPlaceForBusBtn.appendChild(idBusesC);

	var infoBusesC = document.createElement("div");
	infoBusesC.className = "infoBusesC";
	infoBusesC.innerHTML = bus.getInfo();
	mainPlaceForBusBtn.appendChild(infoBusesC);

	busesFromChosenBranchContentC.appendChild(mainPlaceForBusBtn);
}



//*(5)OPEN WHEN BUS BUTTON IS PRESSED, TO SHOW DETAILS
function ShowViewDetailsOfBus(bus, branchLoc) {
	var busesFromChosenBranchTitleC = document.getElementById("busesFromChosenBranchTitleC");
	var busesFromChosenBranchContentC = document.getElementById("busesFromChosenBranchContentC");
	
	busesFromChosenBranchTitleC.innerHTML = "ΛΕΩΦΟΡΕΙΟ | ";
	
	var idBusChosenSp = document.createElement("span");
	idBusChosenSp.id = "idBusChosenSp";
	idBusChosenSp.innerHTML = bus.getId();
	idBusChosenSp.title = "Κωδικός επιλεγμένου λεωφορείου"
	busesFromChosenBranchTitleC.appendChild(idBusChosenSp);

	var busesInfoDetailsFromChosenBranchC = document.createElement("div");
	busesInfoDetailsFromChosenBranchC.id = "busesInfoDetailsFromChosenBranchC";
	busesInfoDetailsFromChosenBranchC.style.display = "block";

	var closeBusDetailsBtn = document.createElement("button");
	closeBusDetailsBtn.id = "closeBusDetailsBtn";
	closeBusDetailsBtn.innerHTML = "X";
	closeBusDetailsBtn.addEventListener("click", function() {
		busesFromChosenBranchTitleC.innerHTML = "ΛΕΩΦΟΡΕΙΑ";
		busesInfoDetailsFromChosenBranchC.innerHTML = "";
		busesInfoDetailsFromChosenBranchC.style.display = "none";
	});
	busesInfoDetailsFromChosenBranchC.appendChild(closeBusDetailsBtn);

	var branchConnectedBusC = document.createElement("div");
	branchConnectedBusC.id = "branchConnectedBusC";
	if(branchLoc != "NULL") {
		branchConnectedBusC.innerHTML = "Κατάστημα που ανήκει: <br>";
	}
	else {
		branchConnectedBusC.innerHTML = "Δεν ανήκει σε κάποιο κατάστημα <br>";
	}

	var branchConnectedBusTextC = document.createElement("div");
	branchConnectedBusTextC.id = "branchConnectedBusTextC";
	if(branchLoc != "NULL") {
		branchConnectedBusTextC.innerHTML = branchLoc;
	}
	else {
		branchConnectedBusTextC.innerHTML = "";
	}
	branchConnectedBusC.appendChild(branchConnectedBusTextC);

	busesInfoDetailsFromChosenBranchC.appendChild(branchConnectedBusC);

	var editBusToChosendBranchBtn = document.createElement("button");
	editBusToChosendBranchBtn.id = "editBusToChosendBranchBtn";
	editBusToChosendBranchBtn.addEventListener("click", function(e) {
		EditBusesButtonEvent(e);
	});
	var editBusToChosendBranchBtnImg = document.createElement("img");
	editBusToChosendBranchBtnImg.id = "editBusToChosendBranchBtnImg";
	editBusToChosendBranchBtn.appendChild(editBusToChosendBranchBtnImg);

	busesInfoDetailsFromChosenBranchC.appendChild(editBusToChosendBranchBtn);

	var infoBusC = document.createElement("div");
	infoBusC.id = "infoBusC";
	infoBusC.innerHTML = bus.getInfo();
	busesInfoDetailsFromChosenBranchC.appendChild(infoBusC);

	busesFromChosenBranchContentC.appendChild(busesInfoDetailsFromChosenBranchC);
}

//(5)->BUSES BUTTON CHOSEN STYLING
function StylingButtonOfBuses() {
	var elemntToOpen = document.getElementById(chosenBus);
	elemntToOpen.style.height = "47px";
	elemntToOpen.style.boxShadow = "0 0 10px black";
	elemntToOpen.style.border = "4px solid orange";
	elemntToOpen.style.borderLeft = "2px solid black";
	elemntToOpen.style.borderRight = "2px solid black";

	if(alreadyChosenBus != null && chosenBus != alreadyChosenBus && document.getElementById(alreadyChosenBus) != null) {
		var elemntToClose = document.getElementById(alreadyChosenBus);
		elemntToClose.style.height = "43px";
		elemntToClose.style.boxShadow = "none";
		elemntToClose.style.border = "2px solid black";
	}
}



//*(6)INITIALIZATION OF ADD AND DELETE BUTTONS FUNCTIONS
function CreateTheEditButtons() {
	var addBusToChosendBranchBtn = document.getElementById("addBusToChosendBranchBtn");
	var deleteBusToChosendBranchBtn = document.getElementById("deleteBusToChosendBranchBtn");

	addBusToChosendBranchBtn.addEventListener("click", function(e) {
		AddBusesButtonEvent(e);
	});

	deleteBusToChosendBranchBtn.addEventListener("click", function(e) {
		DeleteBusesButtonEvent(e);
	});
}

//(6)->ADD NEW BUS TO CHOSEN BRANCH EVENT
async function AddBusesButtonEvent(e) {
	if(chosenBranch != null) {
		var branch = "";
		if(chosenBranch != "NULL") {
			branch = await FindBranch(chosenBranch);
			branch = ConvertObjectToBranchObj(branch);
		}
		else {
			branch = "NULL";
		}

		var serverCommun = new ServerCommunication();
		serverCommun.AddNewBusToServer(branch);
	}
	else {
		alertInfoForCreatNewItemC.style.display = "table";
		alertInfoForCreatNewItemTextC.innerHTML = "Επιλέξτε κατάστημα για να προσθέσετε νέο λεωφορείο!";
		alertInfoForCreatNewItemBtn.innerHTML = "Το κατάλαβα";
		alertInfoForCreatNewItemBtn.focus();
		alertInfoForCreatNewItemBtn.addEventListener("click", function() {
			alertInfoForCreatNewItemC.style.display = "none";
		});
	}
	e.stopPropagation();
	e.preventDefault();
}

//(6)->DELETE CHOSEN BUS FROM CHOSEN BRANCH EVENT
async function DeleteBusesButtonEvent(e) {
	if(chosenBus != null) {
		var branch = "";
		if(chosenBranch != "NULL") {
			branch = await currentBusObj.findBranchConnectedObject();
			branch = ConvertObjectToBranchObj(branch);
		}
		else {
			branch = "NULL";
		}

		var serverCommun = new ServerCommunication();
		serverCommun.DeleteBusFromServer(currentBusObj, branch);
	}
	else {
		alertInfoForCreatNewItemC.style.display = "table";
		alertInfoForCreatNewItemTextC.innerHTML = "Επιλέξτε πρώτα λεωφορείο για να το διαγράψετε!";
		alertInfoForCreatNewItemBtn.innerHTML = "Το κατάλαβα";
		alertInfoForCreatNewItemBtn.focus();
		alertInfoForCreatNewItemBtn.addEventListener("click", function() {
			alertInfoForCreatNewItemC.style.display = "none";
		});
	}

	e.stopPropagation();
	e.preventDefault();
}

//(6)->EDIT CHOSEN BUS FROM CHOSEN BRANCH EVENT
async function EditBusesButtonEvent(e) {
	if(chosenBus != null) {
		var serverCommun = new ServerCommunication();
		serverCommun.UpdateBusToServer(currentBusObj);
	}
	else {
		alertInfoForCreatNewItemC.style.display = "table";
		alertInfoForCreatNewItemTextC.innerHTML = "Επιλέξτε πρώτα λεωφορείο για να το διαγράψετε!";
		alertInfoForCreatNewItemBtn.innerHTML = "Το κατάλαβα";
		alertInfoForCreatNewItemBtn.focus();
		alertInfoForCreatNewItemBtn.addEventListener("click", function() {
			alertInfoForCreatNewItemC.style.display = "none";
		});
	}

	e.stopPropagation();
	e.preventDefault();
}

//(6)->GET IDS OF BUSES FROM SERVER
function GetAllIdsOfBuses(){
	return new Promise ((resolve, reject) => {
		$.ajax({
			type: 'POST',
			url: "../Php/getIdsOfBusesPhp.php",
			data: {},
			success: function(data) {
				//alert(data);
				resolve(data);
			}
		});
	});
}

//(6)->GET CHOSEN BRANCH SERVER
function FindBranch(id){
	return new Promise ((resolve, reject) => {
		$.ajax({
			type: 'POST',
			url: "../Php/findBranchPhp.php",
			data: {branch: id},
			success: function(data) {
				//alert(data);
				data = JSON.parse(data);
				resolve(data);
			}
		});
	});
}
