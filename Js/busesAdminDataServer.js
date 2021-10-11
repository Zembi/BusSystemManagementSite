
//INITIALIZE VARIABLES FOR STYLING


//INITIALIZE GLOBAL VARIABLES
var alreadyChosenBranch = null;
var chosenBranch = null;
var alreadyChosenBus = null;
var chosenBus = null;

//MAIN FUNCTION
ServerBus();

//HEART OF FUNCTIONS IN THIS FILE
async function ServerBus() {
	var allBranchesArr = await GetAllBranches();
	AddStartingValuesToHtmlElements();
	CreateTheBranchesView(allBranchesArr);
	CreateTheBusesView();
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
	for (var i = 0; i < allBranchesArr.length; i++) {
		PrototypeOfBranchView(allBranchesArr[i]);
	}
}

//(2)->EACH BRANCH BUTTON PROTOTYPE STRUCTURE
function PrototypeOfBranchView(branchArr) {
	var branchBusesContentC = document.getElementById("branchBusesContentC");

	var mainPlaceForBranchBtn = document.createElement("button");
	mainPlaceForBranchBtn.className = "mainPlaceForBranchBtn";
	mainPlaceForBranchBtn.id = branchArr.id;
	mainPlaceForBranchBtn.addEventListener("click", function() {
		chosenBranch = this.id;
		var parseBranch = "#" + branchArr.id + " _ " + branchArr.location;
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

		if(busesArr.length == 0) {
			busesFromChosenBranchContentC.style.background = "white";
			ShowScreenOfBusesPanelWhenThereAreNoBuses();
		}
		else {
			busesFromChosenBranchContentC.style.background = "rgb(240, 245, 255)";
		}
		
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
	elemntToOpen.style.border = "4px solid darkgreen";

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
function PrototypeOfBusView(busesArr, branchLoc) {
	var busesFromChosenBranchContentC = document.getElementById("busesFromChosenBranchContentC");

	var mainPlaceForBusBtn = document.createElement("button");
	mainPlaceForBusBtn.className = "mainPlaceForBusBtn";
	mainPlaceForBusBtn.id = busesArr.id;
	mainPlaceForBusBtn.tabIndex = -1;
	mainPlaceForBusBtn.addEventListener("click", function() {
		chosenBus = this.id;
		ShowViewDetailsOfBus(busesArr, branchLoc);
		StylingButtonOfBuses();
		alreadyChosenBus = chosenBus;
	});

	var availabilityBusesC = document.createElement("div");
	availabilityBusesC.className = "availabilityBusesC";
	mainPlaceForBusBtn.appendChild(availabilityBusesC);
	if(busesArr.availability == "1") {
		availabilityBusesC.style.background = "rgb(39, 238, 8)";
	}
	else {
		availabilityBusesC.style.background = "rgb(240, 82, 84)";
	}

	var idBusesC = document.createElement("div");
	idBusesC.className = "idBusesC";
	idBusesC.innerHTML = "######";
	idBusesC.style.fontSize = "22px";
	idBusesC.addEventListener("mouseover", function() {
		idBusesC.innerHTML = busesArr.id;
		idBusesC.style.fontSize = "18px";
		idBusesC.style.fontWeight = "bold";
		idBusesC.style.marginTop = "3px";
	});
	idBusesC.addEventListener("mouseout", function() {
		idBusesC.innerHTML = "######";
		idBusesC.style.fontSize = "22px";
		idBusesC.style.fontWeight = "unset";
		idBusesC.style.marginTop = "0px";
	});
	mainPlaceForBusBtn.appendChild(idBusesC);

	var infoBusesC = document.createElement("div");
	infoBusesC.className = "infoBusesC";
	infoBusesC.innerHTML = busesArr.info;
	mainPlaceForBusBtn.appendChild(infoBusesC);

	busesFromChosenBranchContentC.appendChild(mainPlaceForBusBtn);
}


//*(5)OPEN WHEN BUS BUTTON IS PRESSED, TO SHOW DETAILS
function ShowViewDetailsOfBus(busesArr, branchLoc) {
	var busesFromChosenBranchTitleC = document.getElementById("busesFromChosenBranchTitleC");
	var busesFromChosenBranchContentC = document.getElementById("busesFromChosenBranchContentC");
	
	busesFromChosenBranchTitleC.innerHTML = "ΛΕΩΦΟΡΕΙΟ | ";
	
	var idBusChosenSp = document.createElement("span");
	idBusChosenSp.id = "idBusChosenSp";
	idBusChosenSp.innerHTML = busesArr.id;
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
	branchConnectedBusC.innerHTML = "Κατάστημα που ανήκει: <br>";

	var branchConnectedBusTextC = document.createElement("div");
	branchConnectedBusTextC.id = "branchConnectedBusTextC";
	branchConnectedBusTextC.innerHTML = branchLoc;
	branchConnectedBusC.appendChild(branchConnectedBusTextC);

	busesInfoDetailsFromChosenBranchC.appendChild(branchConnectedBusC);

	var infoBusC = document.createElement("div");
	infoBusC.id = "infoBusC";
	infoBusC.innerHTML = busesArr.info;
	busesInfoDetailsFromChosenBranchC.appendChild(infoBusC);

	busesFromChosenBranchContentC.appendChild(busesInfoDetailsFromChosenBranchC);
}

//(5)->BUSES BUTTON CHOSEN STYLING
function StylingButtonOfBuses() {
	var elemntToOpen = document.getElementById(chosenBus);
	elemntToOpen.style.border = "6px solid orange";
	elemntToOpen.style.borderTop = "2px solid black";
	elemntToOpen.style.borderBottom = "2px solid black";

	if(alreadyChosenBus != null && chosenBus != alreadyChosenBus) {
		var elemntToClose = document.getElementById(alreadyChosenBus);
		elemntToClose.style.border = "2px solid black";
	}
}