
//INITIALIZE VARIABLES FOR STYLING 
var coverPageHelperC = document.getElementById("coverPageHelperC");
var alertInfoForCreatNewItemC = document.getElementById("alertInfoForCreatNewItemC");
var alertInfoForCreatNewItemTextC = document.getElementById("alertInfoForCreatNewItemTextC");
var alertInfoForCreatNewItemBtn = document.getElementById("alertInfoForCreatNewItemBtn");
var alertAddNewInfoC = document.getElementById("alertAddNewInfoC");
var addNewInfoTitleTextC = document.getElementById("addNewInfoTitleTextC");
var addNewInfoTextC = document.getElementById("addNewInfoTextC");
var yesAddNewInfoBtn = document.getElementById("yesAddNewInfoBtn");
var noAddNewInfoBtn = document.getElementById("noAddNewInfoBtn");
var categoryNewBranchSlct = document.getElementById("categoryNewBranchSlct");
var branchIdNewBranchInpt = document.getElementById("branchIdNewBranchInpt");
var locationNewBranchInpt = document.getElementById("locationNewBranchInpt");
var addressNewBranchInpt = document.getElementById("addressNewBranchInpt");
var imageNewBranchInpt = document.getElementById("imageNewBranchInpt");
var managerNewBranchSlct = document.getElementById("managerNewBranchSlct");
var statusNewBranchSlct = document.getElementById("statusNewBranchSlct");
var storeSizeNewBranchInpt = document.getElementById("storeSizeNewBranchInpt");
var storeIdNewBranchInpt = document.getElementById("storeIdNewBranchInpt");
var otherBranchesConnectedSlct = document.getElementById("otherBranchesConnectedSlct");
var branchesSelectViewBtn = document.getElementById("branchesSelectViewBtn");
var otherBranchesConnectedShowPanelListC = document.getElementById("otherBranchesConnectedShowPanelListC");
var confirmNewBranchBtn = document.getElementById("confirmNewBranchBtn");

//VARIABLES INITIALIZATION
var branchesObjs = [];
var branchToConnect = "";
var connectBranches = [];
var managerFound = 0;
var newBranchObject = [];
var statusBranchArrayTranslate = ["Ενεργό", "Υπό-επισκευή", "Υπό-κατασκευή", "Μη ενεργό"];
var statusBranchArray = ["Active", "Under_R", "Under_C", "Problem"];
var insertedBranch = 0;

//MAIN FUNCTION HERE
StartCreationOfBranch()


//*(1)START OF CREATE NEW BRANCH SERVER
async function StartCreationOfBranch() {
	var branchesArray = [];

	branchesArray = await GetAllBranches();
	branchesObjs = ConvertObjectsArrayToBranchObjsArray(branchesArray);
	GiveToSelectOptionsBranchesArray(branchesArray);
	branchesSelectViewBtn.addEventListener("click", function () {
		ClickConnectAction();
	});
	CreateOrUpdateShowViewOfConnectedBranches();
	InitializeAndKeyPressCheckEvents();
}



//*(2)GET ALL BRANCHES FROM SERVER FOR GIVING THE OPTION TO THE NEW BRANCH TO CHOOSE ITS CONNECTIONS
function GetAllBranches() {
	var array = [];
	return new Promise((resolve, reject) => {
		$.ajax({
			type: 'POST',
			url: "../Php/getBranchesPhp.php",
			data: {},
			success: function(data) {
				//alert(data);
				array = JSON.parse(data);
				resolve(array);
			}
		});
	});
}



//*(3)CREATE OPTIONS FOR THE SELECT ELEMENT OF BRANCHES THAT CAN BE CONNECTED
function GiveToSelectOptionsBranchesArray(branchesArray) {
	var options = [];

	if(branchesArray.length == 0) {
		otherBranchesConnectedSlct.disabled = true;
		branchesSelectViewBtn.disabled = true;
		branchesSelectViewBtn.style.background = "rgb(48, 47, 48)";
		branchesSelectViewBtn.style.color = "white";
		options[i] = document.createElement("option");
		options[i].className = "optionsOnCreateBranchForBranches";
		options[i].innerHTML = "Δεν βρέθηκε κατάστημα";
		otherBranchesConnectedSlct.appendChild(options[i]);
	}
	else {
		for(var i = 0; i < branchesArray.length; i++) {
			options[i] = document.createElement("option");
			options[i].className = "optionsOnCreateBranchForBranches";
			options[i].name = branchesObjs[i].getId();
			options[i].innerHTML = "#" + branchesObjs[i].getId() + " - " + branchesObjs[i].getLocation() + " - " + branchesObjs[i].getStreet();
			otherBranchesConnectedSlct.appendChild(options[i]);
		}
	}
}



//*(4)EVENT THAT TRIGGERS WHEN A BRANCH FIELD IS BEING CLICKED, TO BE CHOSEN TO CONNECT
function ClickConnectAction() {
	var error = 0;

	for(var i = 0; i < branchesObjs.length; i++) {
		if(otherBranchesConnectedSlct.value.includes(branchesObjs[i].getId())) {
			for(var j = 0; j < connectBranches.length; j++) {
				if(connectBranches[j].getId() == branchesObjs[i].getId()) {
					error = 1;
					break;
				}
			}
			if(!error) {
				document.getElementById("otherBranchesConnectedShowC").style.borderColor = "white";
				connectBranches.push(branchesObjs[i]);
				branchToConnect = branchesObjs[i];
			}
		}
	}

	if(!error) {
		CreateOrUpdateShowViewOfConnectedBranches();
	}
}

//(1),(4)->CREATE VIEW, IF IT IS CALLED FIRST TIME, OR UPDATE VIEW OF CONNECTED BRANCHES PANEL 
function CreateOrUpdateShowViewOfConnectedBranches() {
	if(connectBranches.length == 0) {
		otherBranchesConnectedShowPanelListC.innerHTML = "";
		var emptyConnectBrancListInfoC = document.createElement("div");
		emptyConnectBrancListInfoC.id = "emptyConnectBrancListInfoC";
		if(branchesObjs.length == 0) {
			emptyConnectBrancListInfoC.innerHTML = "ΔΕΝ ΥΠΑΡΧΟΥΝ ΔΙΑΘΕΣΙΜΑ ΚΑΤΑΣΤΗΜΑΤΑ..";
			emptyConnectBrancListInfoC.style.background = "orange";
		}
		else {
			emptyConnectBrancListInfoC.innerHTML = "ΚΑΝΕΝΑ ΚΑΤΑΣΤΗΜΑ ΑΚΟΜΑ..";
		}
		otherBranchesConnectedShowPanelListC.appendChild(emptyConnectBrancListInfoC);
	}
	else {
		if(otherBranchesConnectedShowPanelListC.contains(document.getElementById("emptyConnectBrancListInfoC"))) {
			document.getElementById("emptyConnectBrancListInfoC").remove();
		}
		var div = document.createElement("div");
		div.className = "lineConnectShowBranchesC";
		div.name = branchToConnect.getId();
		var textC = document.createElement("div");
		textC.className = "lineConnectShowBranchesTextC";
		textC.innerHTML = "#" + branchToConnect.getId() + " - " + branchToConnect.getLocation() + " - " + branchToConnect.getStreet();
		var button = document.createElement("button");
		button.className = "nextToLineConnectShowBranchesDeleteBtn";
		button.title = "Διαγραφή";
		button.addEventListener("click", function() {
			for(var i = 0; i < connectBranches.length; i++) {
				if(connectBranches[i].getId() == div.name) {
					connectBranches.splice(i, 1);
				}
			}
			div.remove();

			if(connectBranches.length == 0) {
				var emptyConnectBrancListInfoC = document.createElement("div");
				emptyConnectBrancListInfoC.id = "emptyConnectBrancListInfoC";
				emptyConnectBrancListInfoC.innerHTML = "ΚΑΝΕΝΑ ΚΑΤΑΣΤΗΜΑ ΑΚΟΜΑ..";
				emptyConnectBrancListInfoC.style.background = "rgb(186, 162, 16)";
				document.getElementById("otherBranchesConnectedShowC").style.borderColor = "white";
				otherBranchesConnectedShowPanelListC.appendChild(emptyConnectBrancListInfoC);
			}
		});
		var buttonImg = document.createElement("img");
		buttonImg.className = "nextToLineConnectShowBranchesDeleteBtnImg";
		button.appendChild(buttonImg);
		div.appendChild(textC);
		div.appendChild(button);
		otherBranchesConnectedShowPanelListC.appendChild(div);
	}
}



//*(5)INITIALIZATION OF ALL INPUTS AND MAKE VALIDATION CHECKS
async function InitializeAndKeyPressCheckEvents() {
	//INITIALIZE
	branchIdNewBranchInpt.value = CompareIdWithATableAndReturn(4, connectBranches);
	branchIdNewBranchInpt.disabled = "true";
	storeIdNewBranchInpt.value = branchIdNewBranchInpt.value + storeSizeNewBranchInpt.value;
	storeIdNewBranchInpt.disabled = "true";

	//KEYPRESS EVENTS
	branchIdNewBranchInpt.addEventListener("keypress", function() {
		this.style.border = "1px solid rgb(13, 18, 24)";
		OnlyNumberKey(event, "");
	});

	locationNewBranchInpt.addEventListener("keypress", function(e) {
		NotAllowSymbol(e, 33);
		NotAllowSymbol(e, 35);
		NotAllowSymbol(e, 36);
		NotAllowSymbol(e, 39);
		NotAllowSymbol(e, 44);
		NotAllowSymbol(e, 46);
	});

	addressNewBranchInpt.addEventListener("keypress", function(e) {
		NotAllowSymbol(e, 33);
		NotAllowSymbol(e, 35);
		NotAllowSymbol(e, 36);
		NotAllowSymbol(e, 39);
		NotAllowSymbol(e, 44);
		NotAllowSymbol(e, 46);
	});

	imageNewBranchInpt.addEventListener("keypress", NoWhiteSpace);
	//managerNewBranchSlct.addEventListener("keypress", NoWhiteSpace);
	SearchManagerOptions();
	storeSizeNewBranchInpt.addEventListener("keypress", function() {
		OnlyNumberKey(event, "");
	});
	storeSizeNewBranchInpt.addEventListener("input", function() {
		var n = storeSizeNewBranchInpt.value;
		if(storeSizeNewBranchInpt.value == "") {
			storeIdNewBranchInpt.value = branchIdNewBranchInpt.value;
		}
		else {
			var zerofilled = ("0000" + n).slice(-4);
			storeIdNewBranchInpt.value = branchIdNewBranchInpt.value + zerofilled;
		}
	})
	confirmNewBranchBtn.addEventListener("click", function() {
		ConfirmButtonCheck();
	});
	

	alertInfoForCreatNewItemBtn.addEventListener("click", function() {
		UnderstandAlertMessageBtn();
	});
}

//(5)->SEARCH AND RETURN EMPLOYEE MANAGERS AVAILABLE, IF THERE IS. IF NOT, SHOW A MESSAGE
function SearchManagerOptions() {
	$.ajax({
		type: 'POST',
		url: "../Php/getAvailableManagersPhp.php",
		data: {},
		success: function(data) {
			var unemployedEmployees = JSON.parse(data);
			if(unemployedEmployees.length == 0) {
				alertInfoForCreatNewItemC.style.display = "table";
				alertInfoForCreatNewItemTextC.innerHTML = "Δεν υπάρχει διαθέσιμος υπάλληλος για την Διαχείριση νέου Καταστήματος.<br>Το κατάστημα δεν μπορεί να ορισθεί ως Ενεργό ή ως Υπό-επισκευή, μέχρις ότου, να προσληφθεί ένας υπεύθυνος.";
				alertInfoForCreatNewItemBtn.innerHTML = "Το κατάλαβα";
				alertInfoForCreatNewItemBtn.focus();
				document.getElementById("statusActiveOptn").disabled = true;
				document.getElementById("statusUnderROptn").disabled = true;
				SelectValue("statusNewBranchSlct", "Υπό-κατασκευή");
				managerNewBranchSlct.disabled = "true";
				managerFound = 0;
			}
			else {
				alertInfoForCreatNewItemC.style.display = "none";
				document.getElementById("statusActiveOptn").disabled = false;
				document.getElementById("statusUnderROptn").disabled = false;
				SelectValue("statusNewBranchSlct", "Ενεργό");
				for(var i = 0; i < unemployedEmployees.length; i++) {
					var option = document.createElement("option");
					option.innerHTML = unemployedEmployees[i].username;
					option.id = unemployedEmployees[i].id;
					option.title = unemployedEmployees[i].name;
					managerNewBranchSlct.appendChild(option);
				}
				managerFound = 1;
			}
		}	
	});
}

//(5)->CHANGE SELECT ELEMENT
function SelectValue(selectId, optionValToSelect){
	var selectElement = document.getElementById(selectId);
	var selectOptions = selectElement.options;
	for(var opt, j = 0; opt = selectOptions[j]; j++) {
		if(opt.value == optionValToSelect) {
			selectElement.selectedIndex = j;
			break;
		}
	}
}

//(5)->CONFIM BUTTON EVENT
async function ConfirmButtonCheck() {
	var continueNoError = 0;

	//continueNoError += IfElementNotEmpty(branchIdNewBranchInpt);
	continueNoError += IfElementNotEmpty(locationNewBranchInpt);
	continueNoError += IfElementNotEmpty(addressNewBranchInpt);
	continueNoError += IfElementNotEmpty(imageNewBranchInpt);
	//continueNoError += IfElementNotEmpty(managerNewBranchSlct);
	continueNoError += IfElementNotEmpty(storeSizeNewBranchInpt);

	var managerOptions = managerNewBranchSlct.selectedOptions;
	var chosenManagerOption = "";

	for(var i = 0; i < managerOptions.length; i++) {
		if(managerNewBranchSlct.value == managerOptions[i].innerHTML) {
			chosenManagerOption = managerOptions[i];
		}
	}

	var statusEnglish = TranslateBranchStatusTo("english", statusNewBranchSlct.value);

	var idsOfConnections = [];
	var connectedBranchesIdsArray = [];

	if(branchesObjs.length == 0) {

	}
	else {
		var helperAr = await GetIdsOfConnectedBranches();

		idsOfConnections = helperAr[0];
		connectedBranchesIdsArray = helperAr[1];
	}

	newBranchObject = {
    	'id': branchIdNewBranchInpt.value,
    	'type': categoryNewBranchSlct.value,
   		'street': addressNewBranchInpt.value,
    	'location': locationNewBranchInpt.value,
    	'image': imageNewBranchInpt.value,
    	'managerId': chosenManagerOption.id,
    	'managerUsername' : managerNewBranchSlct.value,
    	'storeId': storeIdNewBranchInpt.value,
    	'status' : statusEnglish,
    	'idsOfConnections' : idsOfConnections,
    	'connectBranches' : connectedBranchesIdsArray
    };

	newBranchObject = JSON.stringify(newBranchObject);
	if(branchesObjs.length == 0) {
		continueNoError++;
	}
	else {
		if(connectBranches.length > 0) {
			continueNoError++;
	    }
		else {
			document.getElementById("emptyConnectBrancListInfoC").style.background = "red";
			document.getElementById("otherBranchesConnectedShowC").style.borderColor = "red";
		}
	}

	yesAddNewInfoBtn.addEventListener("click", function() {
		SendNewBranchInfoToServer();
	});
	noAddNewInfoBtn.addEventListener("click", function() {
		alertAddNewInfoC.style.display = "none";
	});

	//IF THERE IS AVAILABLE MANAGER
	if(continueNoError == 5) {
		alertAddNewInfoC.style.display = "block";
		addNewInfoTitleTextC.innerHTML = "ΠΡΟΣΘΗΚΗ ΝΕΟΥ ΚΑΤΑΣΤΗΜΑΤΟΣ";
		
		if(managerFound) {
			addNewInfoTextC.innerHTML = "Είστε σίγουρος για την δημιουργία ενός νέου καταστήματος, στην περιοχή "
										+ locationNewBranchInpt.value + ", σε κατάσταση " + statusNewBranchSlct.value
										+ " και με μάνατζερ " + managerNewBranchSlct.value + ";";
		}
		//IF THERE IS NO AVAILABLE MANAGER
		else {
			addNewInfoTextC.innerHTML = "Είστε σίγουρος για την δημιουργία ενός νέου καταστήματος χωρίς υπεύθυνο, στην περιοχή "
										+ locationNewBranchInpt.value + ", σε κατάσταση " + statusNewBranchSlct.value + ";";
		}
		yesAddNewInfoBtn.focus();
	}
}

//(5)->WITH CLICK CHECK AND UPDATE INFO, IF ELEMENT IS EMPTY OR NOT
function IfElementNotEmpty(element) {
	if(element.value == "") {
		element.style.borderColor = "red";
		element.style.borderWidth = "3px";
		element.placeholder = "Το πεδίο είναι κενό!";
		return 0;
	}
	else {
		element.style.borderColor = "rgb(22, 36, 53)";
		element.style.borderWidth = "1px";
		element.placeholder = "";
		return 1;
	}
}

//(5)->GET IDS OF CONNECTED BRANCHES AND ADD ID OF EACH CONNECTION
async function GetIdsOfConnectedBranches() {
	var helperArray = [];
	var idsOfConn = [];
	var ids = [];
	var newId = "";

	var connectionsIds = await GetIdsOfConnections();
	for(var i = 0; i < connectBranches.length; i++) {
		newId = CompareIdWithATableAndReturn(8, connectionsIds);
		idsOfConn.push(newId);
		ids.push(connectBranches[i].getId());
		connectionsIds.push(newId);
	}

	helperArray.push(idsOfConn);
	helperArray.push(ids);

	return helperArray;
}

//(5)->GET CONNECTIONS ID
function GetIdsOfConnections() {
	var array = [];
	return new Promise((resolve, reject) => {
		$.ajax({
			type: 'POST',
			url: "../Php/getIdsOfConnectionsPhp.php",
			data: {},
			success: function(data) {
				//alert(data);
				array = JSON.parse(data);
				resolve(array);
			}
		});
	});
}

//(5)->IF EVERYTHING IS ALRIGHT, THIS FUNCTION IS BEING CALLED TO CREATE THE NEW BRANCH AND SEND IT TO THE SERVER
function SendNewBranchInfoToServer() {
	$.ajax({
		type: 'POST',
		url: "../Php/createNewBranchPhp.php",
		data: {newBranch: newBranchObject, user: userIdIn},
		success: function(data) {
			//alert(data);
			if(data == 1) {
				//ALERT MESSAGE
				insertedBranch = 1;
				coverPageHelperC.style.display = "block";
				alertAddNewInfoC.style.display = "none";
				alertInfoForCreatNewItemC.style.display = "table";
				alertInfoForCreatNewItemTextC.innerHTML = "Η ΔΙΑΔΙΚΑΣΙΑ ΟΛΟΚΛΗΡΩΘΗΚΕ ΕΠΙΤΥΧΩΣ<br>(η σελίδα θα ανανεωθεί )";
				alertInfoForCreatNewItemBtn.innerHTML = "Το κατάλαβα";
			}
			else {
				alertAddNewInfoC.style.display = "none";
				alertInfoForCreatNewItemC.style.display = "table";
				alertInfoForCreatNewItemTextC.innerHTML = "Κάτι πήγε λάθος.<br>Παρακαλώ ανανεώστε ή ξαναπροσπαθήστε αργότερα.";
				alertInfoForCreatNewItemBtn.innerHTML = "Το κατάλαβα";
			}
			alertInfoForCreatNewItemBtn.focus();
		}
	});
}

//(5)->EVENT WHEN CLICK BUTTON FROM ALERT MESSAGES
function UnderstandAlertMessageBtn() {
	alertInfoForCreatNewItemC.style.display = "none";
	if(insertedBranch) {
		location.reload();
	}
}