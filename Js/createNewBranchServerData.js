
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
var branchesObjs = [];
var branchToConnect = "";
var connectBranches = [];
var managerFound = 0;
var newBranchObject = [];
var statusBranchArrayTranslate = ["Ενεργό", "Υπό-επισκευή", "Υπό-κατασκευή", "Μη ενεργό"];
var statusBranchArray = ["Active", "Under_R", "Under_C", "Problem"];
var insertedBranch = 0;

StartCreationOfBranch()

async function StartCreationOfBranch() {
	var branchesArray = [];

	branchesArray = await GetAllBranches();
	MakeObjectBranchObject(branchesArray);
	GiveToSelectOptionsBranchesArray(branchesArray);
	branchesSelectViewBtn.addEventListener("click", function () {ClickConnectAction();});
	CreateOrUpdateShowViewOfConnectedBranches();
	InitializeAndKeyPressCheckEvents();
}

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
	});
	confirmNewBranchBtn.addEventListener("click", function() {
		ConfirmButtonCheck();
	});
	
	alertInfoForCreatNewItemBtn.addEventListener("click", function() {
		UnderstandAlertMessageBtn();
	});
}

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

function MakeObjectBranchObject(branchesAr) {
	for(var i = 0; i < branchesAr.length; i++) {
		branchesObjs[i] = new Branch(branchesAr[i].id, branchesAr[i].type, branchesAr[i].street, branchesAr[i].location, branchesAr[i].image, branchesAr[i].manager, branchesAr[i].storeId, branchesAr[i].status);
	}
}

function GiveToSelectOptionsBranchesArray(branchesAr) {
	var options = [];
	for(var i = 0; i < branchesAr.length; i++) {
		options[i] = document.createElement("option");
		options[i].className = "optionsOnCreateBranchForBranches";
		options[i].name = branchesObjs[i].getId();
		options[i].innerHTML = "#" + branchesObjs[i].getId() + " - " + branchesObjs[i].getLocation() + " - " + branchesObjs[i].getStreet();
		otherBranchesConnectedSlct.appendChild(options[i]);
	}
}

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

function CreateOrUpdateShowViewOfConnectedBranches() {
	if(connectBranches.length == 0) {
		var emptyConnectBrancListInfoC = document.createElement("div");
		emptyConnectBrancListInfoC.id = "emptyConnectBrancListInfoC";
		emptyConnectBrancListInfoC.innerHTML = "ΚΑΝΕΝΑ ΚΑΤΑΣΤΗΜΑ ΑΚΟΜΑ..";
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
			console.log(connectBranches.length);
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
					option.title = unemployedEmployees[i].name;
					managerNewBranchSlct.appendChild(option);
				}
				managerFound = 1;
			}
		}	
	});
}

//EVENT WHEN CLICK BUTTON FROM ALERT MESSAGES
function UnderstandAlertMessageBtn() {
	alertInfoForCreatNewItemC.style.display = "none";
	if(insertedBranch) {
		location.reload();
	}
}

//CHANGE SELECT ELEMENT
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

//** WITH CLICK CHECK AND UPDATE INFO
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

//CONFIM BUTTON EVENT
function ConfirmButtonCheck() {
	var continueNoError = 0;

	//continueNoError += IfElementNotEmpty(branchIdNewBranchInpt);
	continueNoError += IfElementNotEmpty(locationNewBranchInpt);
	continueNoError += IfElementNotEmpty(addressNewBranchInpt);
	continueNoError += IfElementNotEmpty(imageNewBranchInpt);
	//continueNoError += IfElementNotEmpty(managerNewBranchSlct);
	continueNoError += IfElementNotEmpty(storeSizeNewBranchInpt);

	var statusEnglish = TranslateStatusTo("english", statusNewBranchSlct.value);
	var connectedBranchesIdString = GetIdsOfConnectedBranches();

	newBranchObject = {
    	'id': branchIdNewBranchInpt.value,
    	'type': categoryNewBranchSlct.value,
   		'street': addressNewBranchInpt.value,
    	'location': locationNewBranchInpt.value,
    	'image': imageNewBranchInpt.value,
    	'manager': managerNewBranchSlct.value,
    	'storeId': storeIdNewBranchInpt.value,
    	'status' : statusEnglish,
    	'connectBranches' : connectedBranchesIdString
    };

	newBranchObject = JSON.stringify(newBranchObject);
	if(connectBranches.length > 0) {
		continueNoError++;
    }
	else {
		document.getElementById("emptyConnectBrancListInfoC").style.background = "red";
		document.getElementById("otherBranchesConnectedShowC").style.borderColor = "red";
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
	}
}

//GET IDS OF CONNECTED BRANCHES
function GetIdsOfConnectedBranches() {
	var ids = "(";

	for(var i = 0; i < connectBranches.length; i++) {
		if(i != (connectBranches.length - 1)) {
			ids += "#" + connectBranches[i].getId() + ", ";
		}
		else {
			ids += "#" + connectBranches[i].getId();
		}
	}
	ids += ")";
	
	return ids;
}

function SendNewBranchInfoToServer() {
	$.ajax({
		type: 'POST',
		url: "../Php/createNewBranchPhp.php",
		data: {newBranch: newBranchObject},
		success: function(data) {
			if(data == 1) {
				//ALERT MESSAGE
				insertedBranch = 1;
				coverPageHelperC.style.display = "block";
				alertAddNewInfoC.style.display = "none";
				alertInfoForCreatNewItemC.style.display = "table";
				alertInfoForCreatNewItemTextC.innerHTML = "Η ΔΙΑΔΙΚΑΣΙΑ ΟΛΟΚΛΗΡΩΘΗΚΕ ΕΠΙΤΥΧΩΣ(η σελίδα θα ανανεωθεί )";
				alertInfoForCreatNewItemBtn.innerHTML = "Το κατάλαβα";
			}
			else {
				alertAddNewInfoC.style.display = "none";
				alertInfoForCreatNewItemC.style.display = "table";
				alertInfoForCreatNewItemTextC.innerHTML = "ΚΑΤΙ ΠΗΓΕ ΛΑΘΟΣ";
				alertInfoForCreatNewItemBtn.innerHTML = "Το κατάλαβα";
			}
		}
	});
}