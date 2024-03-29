
class ButtonListener {

	constructor(type) {
		this.type = type;

		//EXIT EDIT BUTTON
		this.exitEditBtn = document.getElementById("exitEditBtn");
		this.requestsBtn = document.getElementById("requestsBtn");
		if(this.type == "ADMIN") {
			//IF CLASS IS BEING CALLED FROM ADMIN SITE
			this.homeBtn = document.getElementById("homeBtn");
			this.menuBtn = document.getElementById("menuBtn");
			this.branchesBtn = document.getElementById("branchesBtn");
			this.employeesBtn = document.getElementById("employeesBtn");
			this.routesBtn = document.getElementById("routesBtn");
			this.busesBtn = document.getElementById("busesBtn");
			this.centerScreenBtn = document.getElementById("centerScreenBtn");
			this.notifcationSendBtn = document.getElementById("notifcationSendBtn");
		}
		else if(type == "EMPLOYEE") {
			//IF CLASS IS BEING CALLED FROM EMPLOYEE SITE
		}
	}

	AddEventsToButtons() {
			
		//EXIT EDIT BUTTON
		exitEditBtn.addEventListener("click", this.ExitEditBtnButtonListener);
		requestsBtn.addEventListener("click", this.RequestsButtonListenerAdmin);
		if(this.type == "ADMIN") {
			//IF CLASS IS BEING CALLED FROM ADMIN SITE
			homeBtn.addEventListener("click", this.HomeButtonListener);
			menuBtn.addEventListener("click", this.MenuButtonListener);
			branchesBtn.addEventListener("click", this.BranchesButtonListenerAdmin);
			employeesBtn.addEventListener("click", this.EmployeesButtonListenerAdmin);
			routesBtn.addEventListener("click", this.RoutesButtonListenerAdmin);
			busesBtn.addEventListener("click", this.BusesButtonListenerAdmin);
			centerScreenBtn.addEventListener("click", this.CenterScreenButtonListenerAdmin);
			notifcationSendBtn.addEventListener("click", this.NotifcationsSendButtonListenerAdmin);
		}
		else if(type == "EMPLOYEE") {
			//IF CLASS IS BEING CALLED FROM EMPLOYEE SITE
		}
	}

	//EXIT EDIT BUTTON EVENT
	ExitEditBtnButtonListener() {
		CloseAlertMessages();
		var editWindowC = document.getElementById("editWindowC");
		editWindowC.style.display = "none";
		var coverEditC = document.getElementById("coverEditC");
		coverEditC.innerHTML = "";
		coverEditC.style.display = "none";
		var downContainerOfEditC = document.getElementById("downContainerOfEditC");
		downContainerOfEditC.innerHTML = "";
		downContainerOfEditC.style.display = "none";
	}

	//MENU BUTTON EVENTS
	MenuButtonListener() {
		//CloseAlertMessages();
		var leftC = document.getElementById("leftC");
		var leftFixedC = document.getElementById("leftFixedC");
		var menuSymbolC = document.getElementById("menuSymbolC");

		if(leftFixedC.offsetWidth != 0) {
			leftC.style.width = 0;
			rightC.style.width = "calc(100% - " + leftC.style.width + ")";
			leftFixedC.style.width = leftC.style.width;
			menuSymbolC.style.boxShadow = "none";
			this.style.background = "transparent";
			this.style.borderRadius = "0 4px 4px 0";
			this.style.border = "none";
			this.addEventListener("mouseover", function() {
				this.style.background = "rgb(255, 215, 0)";
				this.style.border = "none";
			});
			this.addEventListener("mouseout", function() {
				this.style.background = "rgb(13, 18, 24, 0.8)";
				this.style.border = "none";
			});
			centerScreenBtn.style.display = "inline-block";
		}
		else {
			leftC.style.width = "240px";
			rightC.style.width = "calc(100% - " + leftC.style.width + ")";
			leftFixedC.style.width = leftC.style.width;
			menuSymbolC.style.boxShadow = "2px 0px 2px black";
			this.style.borderRadius = "0 0 4px 4px";
			this.style.background = "rgb(13, 18, 24)";
			this.style.border = "2px solid rgb(13, 18, 24)";
			this.addEventListener("mouseover", function() {
				this.style.background = "rgb(255, 215, 0)";
				this.style.border = "2px solid rgb(10, 24, 41)";
			});
			this.addEventListener("mouseout", function() {
				this.style.background = "rgb(13, 18, 24)";
				this.style.border = "2px solid rgb(13, 18, 24)";
			});
			centerScreenBtn.style.display = "none";
		}
	}

	//HOME BUTTON ADMIN EVENTS
	HomeButtonListener() {
		CloseAlertMessages();
		var menuScrnA = new MenuScreenAdmin(homeBtn.name);
		menuScrnA.ChooseFromActionId();
	}

	//BRANCHES BUTTON ADMIN EVENTS
	BranchesButtonListenerAdmin() {
		CloseAlertMessages();
		var menuScrnA = new MenuScreenAdmin(branchesBtn.name);
		menuScrnA.ChooseFromActionId();
	}

	//EMPLOYEES BUTTON ADMIN EVENTS
	EmployeesButtonListenerAdmin() {
		CloseAlertMessages();
		var menuScrnA = new MenuScreenAdmin(employeesBtn.name);
		menuScrnA.ChooseFromActionId();
	}
	
	//ROUTES BUTTON ADMIN EVENTS
	RoutesButtonListenerAdmin() {
		CloseAlertMessages();
		var menuScrnA = new MenuScreenAdmin(routesBtn.name);
		menuScrnA.ChooseFromActionId();
	}

	//BUSES BUTTON ADMIN EVENTS
	BusesButtonListenerAdmin() {
		CloseAlertMessages();
		var menuScrnA = new MenuScreenAdmin(busesBtn.name);
		menuScrnA.ChooseFromActionId();
	}

	//CENTER SCREEN BUTTON ADMIN EVENTS
	CenterScreenButtonListenerAdmin() {
		CloseAlertMessages();
		if(leftFixedC.offsetWidth != 0) {
		}
		else {
			var contentInfoC = document.getElementById("contentInfoC");
			contentInfoC.scrollIntoView({block: 'end', inline: 'center'});
		}
	}

	//NOTIFICATIONS BUTTON ADMIN EVENTS
	NotifcationsSendButtonListenerAdmin() {
		CloseAlertMessages();
		var editWindowC = document.getElementById("editWindowC");
		var editTitleTextC = document.getElementById("editTitleTextC");
		var editInfoGetterLeftC = document.getElementById("editInfoGetterLeftC");
		var editInfoGetterRightC = document.getElementById("editInfoGetterRightC");
		var downContainerOfEditC = document.getElementById("downContainerOfEditC");
		var receiverArray = [];
		var receiverEmplObjArray = [];
		var receiverIdArray = [];
		var specialSymbol = "__CoDe__";

		editWindowC.style.display = "table";
		editTitleTextC.innerHTML = "ΝΕΑ ΕΙΔΟΠΟΙΗΣΗ";
		editInfoGetterLeftC.innerHTML = "";
		editInfoGetterRightC.innerHTML = "";
		downContainerOfEditC.innerHTML = "";

		//ID OF NOTIFICATION
		var idNotifInptC = document.createElement("div");
		idNotifInptC.id = "idNotifInptC";
		var idNotifTextC = document.createElement("div");
		idNotifTextC.id = "idNotifTextC";
		idNotifTextC.innerHTML = "Μοναδικός αριθμός";
		var idNotifInpt = document.createElement("input");
		idNotifInpt.id = "idNotifInpt";
		idNotifInpt.addEventListener("keypress", NoWhiteSpace);
		FindRightId();

		async function FindRightId() {
			var idArray = await GetAllNotificationsIds();
			idNotifInpt.value = CompareIdWithATableAndReturn(12, idArray);
		}

		idNotifInpt.oninput = function () {
			if (this.value.length > 12) {
				this.value = this.value.slice(0, 12);
			}
		}
		idNotifInpt.disabled = true;

		idNotifInptC.appendChild(idNotifTextC);
		idNotifInptC.appendChild(idNotifInpt);
		editInfoGetterLeftC.appendChild(idNotifInptC);

		//TYPE OF NOTIFICATION
		var typeNotifInptC = document.createElement("div");
		typeNotifInptC.id = "typeNotifInptC";
		var typeNotifTextC = document.createElement("div");
		typeNotifTextC.id = "typeNotifTextC";
		typeNotifTextC.innerHTML = "Τύπος";
		var typeNotifSlct = document.createElement("select");
		typeNotifSlct.id = "typeNotifSlct";
		typeNotifSlct.addEventListener("keypress", NoWhiteSpace);
		typeNotifSlct.oninput = function () {
			if (this.value.length > 50) {
				this.value = this.value.slice(0, 50);
			}
		}
		var typeOptions = ["Γενική ενημέρωση συστήματος", "Πληροφόρηση", "Κρίσιμη πληροφόρηση", "Αίτημα", "Πρόσληψη νέου υπαλλήλου", "Πρόσληψη πρώην υπαλλήλου", "Επεξεργασία στοιχείων υπαλλήλου", "Αποδέσμευση υπαλλήλου", "Προσθήκη καταστήματος", "Επεξεργασία στοιχείων καταστημάτων", "Διαγραφή καταστήματος", "Δημιουργία νέου δρομολογίου", "Επεξεργασία δρομολογίου"];
		for(var i = 0; i < typeOptions.length; i++) {
			var option = document.createElement("option");
			option.name = typeOptions[i];
			option.innerHTML = typeOptions[i];
			typeNotifSlct.appendChild(option);
		}

		typeNotifInptC.appendChild(typeNotifTextC);
		typeNotifInptC.appendChild(typeNotifSlct);
		//typeNotifSlct.focus();
		editInfoGetterLeftC.appendChild(typeNotifInptC);

		//RECEIVER OF NOTIFICATION
		downContainerOfEditC.style.display = "block";

		var receiverNotifInptC = document.createElement("div");
		receiverNotifInptC.id = "receiverNotifInptC";
		var receiverNotifContentC = document.createElement("div");
		receiverNotifContentC.id = "receiverNotifContentC";
		var receiverNotifBtn = document.createElement("button");
		receiverNotifBtn.id = "receiverNotifBtn";
		receiverNotifBtn.innerHTML = "Προσθήκη παραλήπτη/ων";
		receiverNotifBtn.addEventListener("click", function() {
			coverEditC.style.display = "block";
			backReceiverBtn.focus();
		});

		downContainerOfEditC.appendChild(receiverNotifContentC);
		receiverNotifInptC.appendChild(receiverNotifBtn);
		editInfoGetterLeftC.appendChild(receiverNotifInptC);

		//WHEN receiverNotifBtn BUTTON PRESSED
		var coverEditC = document.getElementById("coverEditC");
		var backReceiverBtn = document.createElement("button");
		backReceiverBtn.id = "backReceiverBtn";
		backReceiverBtn.innerHTML = "ΠΙΣΩ";
		backReceiverBtn.addEventListener("click", function() {
			coverEditC.style.display = "none";
			receiverNotifBtn.focus();
		});
		var receiverListContentC = document.createElement("div");
		receiverListContentC.id = "receiverListContentC";
		var receiverCenterListContentC = document.createElement("div");
		receiverCenterListContentC.id = "receiverCenterListContentC";
		receiverListContentC.appendChild(receiverCenterListContentC);

		coverEditC.appendChild(backReceiverBtn);
		coverEditC.appendChild(receiverListContentC);

			//GET THE BRANCHES THAT ADMIN CONTROL AND CREATE A BIG CHECKBOX LIST
		CreateListOfReceiverOptions();

		async function CreateListOfReceiverOptions() {
			var receiverBranchesOptions = await GetBranchesThatAdminControl();

			await AddNewRowToOptionReceiverList(0, "Γενικοί Διαχειριστές");
			for(var i = 0; i < receiverBranchesOptions.length; i++) {
				if(receiverBranchesOptions[i].manager == null) {

				}
				else {
					var branchTitle = "#" + receiverBranchesOptions[i].id + " - " + receiverBranchesOptions[i].street + " - " + receiverBranchesOptions[i].location;
					await AddNewRowToOptionReceiverList(receiverBranchesOptions[i].id, branchTitle);
				}
			}
		}
		
		//CHECKBOX THAT ALLOWS CONFIRMATION OR NOT
		var checkForAnswerC = document.createElement("id");
		checkForAnswerC.id = "checkForAnswerC";

		var checkBoxOfAnswerOrNotInpt = document.createElement("input");
		checkBoxOfAnswerOrNotInpt.id = "checkBoxOfAnswerOrNotInpt";
		checkBoxOfAnswerOrNotInpt.type = "checkbox";

		checkForAnswerC.appendChild(checkBoxOfAnswerOrNotInpt);

		var checkBoxOfAnswerOrNotLabel = document.createElement("label");
		checkBoxOfAnswerOrNotLabel.id = "checkBoxOfAnswerOrNotLabel";
		checkBoxOfAnswerOrNotLabel.for = "checkBoxOfAnswerOrNotInpt";

		var checkBoxOfAnswerOrNotBtn = document.createElement("button");
		checkBoxOfAnswerOrNotBtn.id = "checkBoxOfAnswerOrNotBtn";
		checkBoxOfAnswerOrNotBtn.innerHTML = "Επιβεβαίωση από παραλήπτη";
		checkBoxOfAnswerOrNotBtn.addEventListener("click", function() {
			checkBoxOfAnswerOrNotInpt.click();
		});
		checkBoxOfAnswerOrNotLabel.appendChild(checkBoxOfAnswerOrNotBtn);

		checkForAnswerC.appendChild(checkBoxOfAnswerOrNotLabel);

		editInfoGetterLeftC.appendChild(checkForAnswerC);

		var checkboxOpen = true;
		CheckChosenTypeOfNotifToTriggerCheckBox();
		typeNotifSlct.addEventListener("change", function() {
			CheckChosenTypeOfNotifToTriggerCheckBox();
		});

		function CheckChosenTypeOfNotifToTriggerCheckBox() {
			if(typeNotifSlct.value == "Γενική ενημέρωση συστήματος" || typeNotifSlct.value == "Πληροφόρηση" || typeNotifSlct.value == "Κρίσιμη πληροφόρηση") {
				checkForAnswerC.style.display = "none";
				checkboxOpen = false;
				receiverNotifInptC.style.marginBottom = "50px";
				checkBoxOfAnswerOrNotInpt.tabIndex = -1;
				checkBoxOfAnswerOrNotBtn.tabIndex = -1;
				//checkBoxOfAnswerOrNotInpt.disabled = true;
				//checkBoxOfAnswerOrNotBtn.style.color = "darkgrey";
			}
			else {
				checkForAnswerC.style.display = "table";
				checkboxOpen = true;
				receiverNotifInptC.style.marginBottom = "0";
				checkBoxOfAnswerOrNotInpt.tabIndex = 1;
				checkBoxOfAnswerOrNotBtn.tabIndex = 1;
				//checkBoxOfAnswerOrNotInpt.disabled = false;
				//checkBoxOfAnswerOrNotBtn.style.color = "white";
			}
		}

		//BUTTON 
		var sendNotifbtn = document.createElement("button");
		sendNotifbtn.id = "sendNotifbtn";
		sendNotifbtn.innerHTML = "Αποστολή";

		editInfoGetterLeftC.appendChild(sendNotifbtn);

		//TEXT OF NOTIFICATION
		var textNotifInptC = document.createElement("div");
		textNotifInptC.id = "textNotifInptC";
		var textNotifTextC = document.createElement("div");
		textNotifTextC.id = "textNotifTextC";
		textNotifTextC.innerHTML = "Μήνυμα";
		var textNotifTextAr = document.createElement("textarea");
		textNotifTextAr.id = "textNotifTextAr";
		textNotifTextAr.placeholder = "Γράψτε ένα μήνυμα.\nΠροσοχή! Το μήνυμα δεν αλλάζει, μετά την αποστολή της ειδοποίησης.";
		textNotifTextAr.oninput = function () {
			if (this.value.length > 1000) {
				this.value = this.value.slice(0, 1000);
			}
		}
		textNotifTextAr.addEventListener("input", function() {
			if(this.value != "") {
				textNotifTextAr.style.border = "2px solid rgb(118, 118, 118)";
			}
		});

		textNotifInptC.appendChild(textNotifTextC);
		textNotifInptC.appendChild(textNotifTextAr);
		editInfoGetterRightC.appendChild(textNotifInptC);

		//TAB INDEXES
		typeNotifSlct.tabIndex = 1;
		receiverNotifBtn.tabIndex = 1;
		sendNotifbtn.tabIndex = 3;
		textNotifTextAr.tabIndex = 2;
		typeNotifSlct.focus();

		sendNotifbtn.addEventListener("click", function() {
			alertInfoForCreatNewItemC.style.display = "none";
			var textNotifTextAr = document.getElementById("textNotifTextAr");
			var error = 0;

			if(receiverArray.length == 0) {
				error += 1;
			}
			if(textNotifTextAr.value == "") {
				error += 2;
				textNotifTextAr.style.border = "2px solid red";
			}

			if(error != 0) {
				alertInfoForCreatNewItemC.style.display = "table";
				alertInfoForCreatNewItemBtn.innerHTML = "Το κατάλαβα";
				if(error == 1) {
					alertInfoForCreatNewItemTextC.innerHTML = "Δεν έχετε ορίσει παραλήπτη, για το μήνυμα σας!";
				}
				else if(error == 2) {
					alertInfoForCreatNewItemTextC.innerHTML = "Γράψτε ένα μήνυμα, πρώτα!";
				}
				else if(error == 3) {
					alertInfoForCreatNewItemTextC.innerHTML = "Για να ολοκληρώσετε την διαδικασία αποστολής, βεβαιωθείτε ότι έχετε ορίσει παραλήπτη και έχετε γράψει κάποιο μήνυμα!";
				}
				alertInfoForCreatNewItemBtn.focus();
				alertInfoForCreatNewItemBtn.addEventListener("click", function() {
					alertInfoForCreatNewItemC.style.display = "none";
				});
			}
			else {
				var approve;
				if(checkBoxOfAnswerOrNotInpt.checked && checkboxOpen) {
					approve = true;
				}
				else {
					approve = false;
				}

				alertAddNewInfoC.style.display = "block";
				addNewInfoTitleTextC.innerHTML = "ΕΠΙΚΥΡΩΣΗ ΑΠΟΣΤΟΛΗΣ";
				addNewInfoTextC.innerHTML = "Είστε σίγουρος για την αποστολή νέου μυνήματος, με θέμα | " + typeNotifSlct.value + " |.<br>Μετά την αποστολή, δεν μπορεί να ανακληθεί το μήνυμα, οπότε σιγούρεψτε, πρώτα, τα στοιχεία που έχετε συμπληρώσει. ";
				
				yesAddNewInfoBtn.addEventListener("click", function() {
					alertAddNewInfoC.style.display = "none";
					SendNotificationToServer(approve, idNotifInpt.value, typeNotifSlct.value, receiverIdArray, textNotifTextAr.value);
				});
				yesAddNewInfoBtn.focus();
				noAddNewInfoBtn.addEventListener("click", function() {
					alertAddNewInfoC.style.display = "none";
				});
			}
		});

		async function AddNewRowToOptionReceiverList(id, title) {
			var employeesUsersArray = await GetAllEmployeesThatWorkInThisBranch(id);

			//BIG CATEGORY OF RECEIVERS
			var firstFloor = 1;
			//MIDDLE CATEGORY OF RECEIVERS
			var secondFloor = 2;
			//EACH RECEIVER'S CHECKBOX
			var thirdFloor = 3;

			var adminArray = [];
			var managerEmplArray = [];
			var agencyEmplArray = [];
			var storeEmplArray = [];

			//CREATE BRANCH PLACE IN LIST
			var placeForBranchC = document.createElement("div");
			placeForBranchC.className = "placeForBranchC";

			var titleOfBranchC = document.createElement("div");
			titleOfBranchC.className = "titleBranchC";
			titleOfBranchC.id = id;
			var titleOfBranchCheckBox = document.createElement("input");
			titleOfBranchCheckBox.className = "titleRecCheckBox";
			titleOfBranchCheckBox.type = "checkbox";
			titleOfBranchCheckBox.innerHTML = title;
			titleOfBranchC.appendChild(titleOfBranchCheckBox);
			var titleOfBranchBtn = document.createElement("button");
			titleOfBranchBtn.className = "titleRecBtn";
			titleOfBranchBtn.innerHTML = title;
			titleOfBranchBtn.id = id;
			titleOfBranchC.appendChild(titleOfBranchBtn);

			titleOfBranchCheckBox.id = id + "ALL";
			titleOfBranchCheckBox.name = id;
			titleOfBranchBtn.name = titleOfBranchCheckBox.id;
			titleOfBranchCheckBox.addEventListener("change", function () {
				if(!this.checked) {
					//WHEN CLICK EMPTYING ARRAY
					if(document.getElementById("EmploManag" + id + "ALL").checked) {
						document.getElementById("EmploManag" + id + "ALL").disabled = false;
						document.getElementsByName("EmploManag" + id + "ALL")[0].disabled = false;
						$("#EmploManag" + id + "ALL").trigger("click");
					}
					if(document.getElementById("AgencyEmpl" + id + "ALL").checked) {
						document.getElementById("AgencyEmpl" + id + "ALL").disabled = false;
						document.getElementsByName("AgencyEmpl" + id + "ALL")[0].disabled = false;
						$("#AgencyEmpl" + id + "ALL").trigger("click");
					}
					if(document.getElementById("StoreEmpl" + id + "ALL").checked) {
						document.getElementById("StoreEmpl" + id + "ALL").disabled = false;
						document.getElementsByName("StoreEmpl" + id + "ALL")[0].disabled = false;
						$("#StoreEmpl" + id + "ALL").trigger("click");
					}
				}
				else {
					//WHEN CLICK PUSHING ARRAY
					if(!document.getElementById("EmploManag" + id + "ALL").checked) {
						$("#EmploManag" + id + "ALL").trigger("click");
					}
					document.getElementById("EmploManag" + id + "ALL").disabled = true;
					document.getElementsByName("EmploManag" + id + "ALL")[0].disabled = true;

					if(!document.getElementById("AgencyEmpl" + id + "ALL").checked) {
						$("#AgencyEmpl" + id + "ALL").trigger("click");
					}
					document.getElementById("AgencyEmpl" + id + "ALL").disabled = true;
					document.getElementsByName("AgencyEmpl" + id + "ALL")[0].disabled = true;

					if(!document.getElementById("StoreEmpl" + id + "ALL").checked) {
						$("#StoreEmpl" + id + "ALL").trigger("click");
					}
					document.getElementById("StoreEmpl" + id + "ALL").disabled = true;
					document.getElementsByName("StoreEmpl" + id + "ALL")[0].disabled = true;
				}
			});
			titleOfBranchBtn.addEventListener("click", function() {
				$("#" + this.name).trigger("click");
			});

			placeForBranchC.appendChild(titleOfBranchC);

			if(id != 0) {

				var managerEmpTitleC = document.createElement("div");
				managerEmpTitleC.className = "titleRecC";
				managerEmpTitleC.id = id;
				var managerEmpTitleCheckBox = document.createElement("input");
				managerEmpTitleCheckBox.className = "titleRecCheckBox";
				managerEmpTitleCheckBox.type = "checkbox";
				managerEmpTitleC.appendChild(managerEmpTitleCheckBox);
				var managerEmplTitleBtn = document.createElement("button");
				managerEmplTitleBtn.className = "titleRecBtn";
				managerEmplTitleBtn.innerHTML = "Υπεύθυνος Διαχείρισης";
				managerEmpTitleC.appendChild(managerEmplTitleBtn);

				managerEmpTitleCheckBox.id = "EmploManag" + id + "ALL";
				managerEmpTitleCheckBox.name = id;
				managerEmplTitleBtn.name = managerEmpTitleCheckBox.id;
				managerEmpTitleCheckBox.addEventListener("change", function () {
					if(this.checked == true) {
						EnableOrDisableCheckBoxes("Disable", "EmploManag", managerEmplArray, id);
						for(var i = 0; i < managerEmplArray.length; i++) {
							var helper = "EmploManag" + id + specialSymbol + managerEmplArray[i].id;
							var index = receiverArray.indexOf(helper);
							if(index == -1) {
								receiverArray.push(helper);
								receiverEmplObjArray.push(managerEmplArray[i]);
							}
						}
					}
					else {
						EnableOrDisableCheckBoxes("Enable", "EmploManag", managerEmplArray, id);
						for(var i = 0; i < managerEmplArray.length; i++) {
							var helper = "EmploManag" + id + specialSymbol + managerEmplArray[i].id;
							var index = receiverArray.indexOf(helper);
							receiverArray.splice(index, 1);
							receiverEmplObjArray.splice(index, 1);
						}
					}

					DecideDownContainerInfo(id, secondFloor);
				});
				managerEmplTitleBtn.addEventListener("click", function() {
					$("#" + this.name).trigger("click");
				});
				
				var managerEmpContentC = document.createElement("div");
				managerEmpContentC.className = "managerEmpContentC";

				placeForBranchC.appendChild(managerEmpTitleC);
				placeForBranchC.appendChild(managerEmpContentC);


				var agencyEmpTitleC = document.createElement("div");
				agencyEmpTitleC.className = "titleRecC";
				agencyEmpTitleC.id = id;
				var agencyEmpTitleCheckBox = document.createElement("input");
				agencyEmpTitleCheckBox.className = "titleRecCheckBox";
				agencyEmpTitleCheckBox.type = "checkbox";
				agencyEmpTitleC.appendChild(agencyEmpTitleCheckBox);
				var agencyEmplTitleBtn = document.createElement("button");
				agencyEmplTitleBtn.className = "titleRecBtn";
				agencyEmplTitleBtn.innerHTML = "Υπάλληλοι Πρακτορείου";
				agencyEmpTitleC.appendChild(agencyEmplTitleBtn);

				agencyEmpTitleCheckBox.id = "AgencyEmpl" + id + "ALL";
				agencyEmpTitleCheckBox.name = id;
				agencyEmplTitleBtn.name = agencyEmpTitleCheckBox.id;
				agencyEmpTitleCheckBox.addEventListener("change", function () {
					if(this.checked == true) {
						EnableOrDisableCheckBoxes("Disable", "AgencyEmpl", agencyEmplArray, id);
						for(var i = 0; i < agencyEmplArray.length; i++) {
							var helper = "AgencyEmpl" + id + specialSymbol + agencyEmplArray[i].id;
							var index = receiverArray.indexOf(helper);
							if(index == -1) {
								receiverArray.push(helper);
								receiverEmplObjArray.push(agencyEmplArray[i]);
							}
						}
					}
					else {
						EnableOrDisableCheckBoxes("Enable", "AgencyEmpl", agencyEmplArray, id);
						for(var i = 0; i < agencyEmplArray.length; i++) {
							var helper = "AgencyEmpl" + id + specialSymbol + agencyEmplArray[i].id;
							var index = receiverArray.indexOf(helper);
							receiverArray.splice(index, 1);
							receiverEmplObjArray.splice(index, 1);
						}
					}

					DecideDownContainerInfo(id, secondFloor);
				});
				agencyEmplTitleBtn.addEventListener("click", function() {
					$("#" + this.name).trigger("click");
				});

				var agencyEmpContentC = document.createElement("div");
				agencyEmpContentC.className = "agencyEmpContentC";

				placeForBranchC.appendChild(agencyEmpTitleC);
				placeForBranchC.appendChild(agencyEmpContentC);


				var storeEmplTitleC = document.createElement("div");
				storeEmplTitleC.className = "titleRecC";
				storeEmplTitleC.id = id;
				var storeEmplTitleCheckBox = document.createElement("input");
				storeEmplTitleCheckBox.className = "titleRecCheckBox";
				storeEmplTitleCheckBox.type = "checkbox";
				storeEmplTitleC.appendChild(storeEmplTitleCheckBox);
				var storeEmplTitleBtn = document.createElement("button");
				storeEmplTitleBtn.className = "titleRecBtn";
				storeEmplTitleBtn.innerHTML = "Υπεύθυνοι Αποθήκης";
				storeEmplTitleC.appendChild(storeEmplTitleBtn);

				storeEmplTitleCheckBox.id = "StoreEmpl" + id + "ALL";
				storeEmplTitleCheckBox.name = id;
				storeEmplTitleBtn.name = storeEmplTitleCheckBox.id;
				storeEmplTitleCheckBox.addEventListener("change", function () {
					if(this.checked == true) {
						EnableOrDisableCheckBoxes("Disable", "StoreEmpl", storeEmplArray, id);
						for(var i = 0; i < storeEmplArray.length; i++) {
							var helper = "StoreEmpl" + id + specialSymbol + storeEmplArray[i].id;
							var index = receiverArray.indexOf(helper);
							if(index == -1) {
								receiverArray.push(helper);
								receiverEmplObjArray.push(storeEmplArray[i]);
							}
						}
					}
					else {
						EnableOrDisableCheckBoxes("Enable", "StoreEmpl", storeEmplArray, id);
						for(var i = 0; i < storeEmplArray.length; i++) {
							var helper = "StoreEmpl" + id + specialSymbol + storeEmplArray[i].id;
							var index = receiverArray.indexOf(helper);
							receiverArray.splice(index, 1);
							receiverEmplObjArray.splice(index, 1);
						}
					}

					DecideDownContainerInfo(id, secondFloor);
				});
				storeEmplTitleBtn.addEventListener("click", function() {
					$("#" + this.name).trigger("click");
				});

				var storeEmpContentC = document.createElement("div");
				storeEmpContentC.className = "storeEmpContentC";

				placeForBranchC.appendChild(storeEmplTitleC);
				placeForBranchC.appendChild(storeEmpContentC);


				for(var i = 0; i < employeesUsersArray.length; i++) {
					if(employeesUsersArray[i].id != employeeIn.getId()) {
						var checkBoxC = document.createElement("div");
						checkBoxC.className = "checkBoxC";

						var checkBox = document.createElement("input");
						checkBox.className = "checkBox";
						checkBox.name = i;
						checkBox.type = "checkBox";
						checkBoxC.appendChild(checkBox);

						var checkBoxBtn = document.createElement("button");
						checkBoxBtn.className = "checkBoxBtn";
						checkBoxBtn.innerHTML = employeesUsersArray[i].name + "  (" + employeesUsersArray[i].username + ")";
						checkBoxC.appendChild(checkBoxBtn);

						var h = "";
						if(employeesUsersArray[i].status == "Employee Manager") {
							managerEmpContentC.appendChild(checkBoxC);
							managerEmplArray.push(employeesUsersArray[i]);
							h = "EmploManag";
						}
						else if(employeesUsersArray[i].status == "Agency Employee") {
							agencyEmpContentC.appendChild(checkBoxC);
							agencyEmplArray.push(employeesUsersArray[i]);
							h = "AgencyEmpl";
						}
						else if(employeesUsersArray[i].status == "Store Employee") {
							storeEmpContentC.appendChild(checkBoxC);
							storeEmplArray.push(employeesUsersArray[i]);
							h = "StoreEmpl";
						}

						//IMPORTANT PART THAT PUTS IN ARRAY RECEIVER ID
						checkBox.id = h + id + specialSymbol + employeesUsersArray[i].id;
						checkBoxBtn.name = checkBox.id;
						checkBox.addEventListener("change", function () {
							if(this.checked == true) {
								receiverArray.push(this.id);
								receiverEmplObjArray.push(employeesUsersArray[this.name]);
							}
							else {
								var index = receiverArray.indexOf(this.id);
								receiverArray.splice(index, 1);
								receiverEmplObjArray.splice(index, 1);
							}

							DecideDownContainerInfo(id, thirdFloor, "");
						});

						checkBoxBtn.addEventListener("click", function() {
							$("#" + this.name).trigger("click");
						});
					}
				}
			}
			else {
				titleOfBranchCheckBox.style.opacity = 0;
				titleOfBranchCheckBox.disabled = true;
				for(var i = 0; i < employeesUsersArray.length; i++) {
					if(employeesUsersArray[i].id != employeeIn.getId()) {
						var adminEmpContentC = document.createElement("div");
						adminEmpContentC.className = "adminEmpContentC";

						placeForBranchC.appendChild(adminEmpContentC);

						var checkBoxC = document.createElement("div");
						checkBoxC.className = "checkBoxC";

						var checkBox = document.createElement("input");
						checkBox.className = "checkBox";
						checkBox.name = i;
						checkBox.type = "checkBox";
						checkBoxC.appendChild(checkBox);

						var checkBoxBtn = document.createElement("button");
						checkBoxBtn.className = "checkBoxBtn";
						checkBoxBtn.innerHTML = employeesUsersArray[i].name + "  (" + employeesUsersArray[i].username + ")";
						checkBoxC.appendChild(checkBoxBtn);

						var h = "";
						adminEmpContentC.appendChild(checkBoxC);
						adminArray.push(employeesUsersArray[i]);
						h = "Admin";

						//IMPORTANT PART THAT PUTS IN ARRAY RECEIVER ID
						checkBox.id = h + id + specialSymbol + employeesUsersArray[i].id;
						checkBoxBtn.name = checkBox.id;
						checkBox.addEventListener("change", function () {
							if(this.checked == true) {
								receiverArray.push(this.id);
								receiverEmplObjArray.push(employeesUsersArray[this.name]);
							}
							else {
								var index = receiverArray.indexOf(this.id);
								receiverArray.splice(index, 1);
								receiverEmplObjArray.splice(index, 1);
							}

							DecideDownContainerInfo(id, firstFloor);
						});
						checkBoxBtn.addEventListener("click", function() {
							$("#" + this.name).trigger("click");
						});
					}
					else {
						//placeForBranchC.style.display = "none";
					}
				}
			}


			receiverCenterListContentC.appendChild(placeForBranchC);
		}

		function EnableOrDisableCheckBoxes(typeOfCall, status, array, id) {
			for(var i = 0; i < array.length; i++) {
				var helper = status + id + specialSymbol + array[i].id;
				var chBox = document.getElementById(helper);
				var chBoxBtn = document.getElementsByName(helper)[0];
				if(typeOfCall == "Disable") {
					chBox.disabled = true;
					chBox.checked = true;
					chBoxBtn.disabled = true;
				}
				else if(typeOfCall == "Enable") {
					chBox.disabled = false;
					chBox.checked = false;
					chBoxBtn.disabled = false;
				}
			}
		}

		function DecideDownContainerInfo(id, floor, receiversOfCategoryArray) {
			SendInfoFromReceiverArrayToDownContainer(receiversOfCategoryArray);
		}

		function SendInfoFromReceiverArrayToDownContainer(receiversOfCategoryArray) {
			var downContainerOfEditC = document.getElementById("downContainerOfEditC");
			downContainerOfEditC.innerHTML = "";
			receiverIdArray = [];

			for(var i = 0; i < receiverArray.length; i++) {
				var receiverC = document.createElement("div");
				receiverC.className = "receiverC";
				var helper = receiverArray[i].substr(receiverArray[i].indexOf(specialSymbol) + specialSymbol.length, receiverArray[i].length);
				var foundIdIndex = CompareIdForUsernameAndReturnIndexOfObject(receiverEmplObjArray, helper);
				receiverIdArray.push(helper);
				receiverC.innerHTML = receiverEmplObjArray[foundIdIndex].username;
				downContainerOfEditC.appendChild(receiverC);
			}
		}

		function GetAllNotificationsIds() {
			return new Promise ((resolve, reject) => {
				$.ajax({
					type: 'POST',
					url: "../Php/getIdsOfNotificationsPhp.php",
					data: {type: "All", user: employeeIn.getId()},
					success: function(data) {
						data = JSON.parse(data);
						resolve(data);
					}
				});
			});
		}

		function GetBranchesThatAdminControl() {
			return new Promise ((resolve, reject) => {
				$.ajax({
					type: 'POST',
					url: "../Php/getBranchesThatAdminControlsPhp.php",
					data: {id: employeeIn.getId()},
					success: function(data) {
						data = JSON.parse(data);
						resolve(data);
					}
				});
			});
		}

		function GetAllEmployeesThatWorkInThisBranch(branchId) {
			return new Promise ((resolve, reject) => {
				$.ajax({
					type: 'POST',
					url: "../Php/getAllEmployeesThatWorkHerePhp.php",
					data: {brId: branchId},
					success: function(data) {
						data = JSON.parse(data);
						resolve(data);
					}
				});
			});
		}

		function SendNotificationToServer(approveRep, notifId, notifType, receivAr, notifText) {
			var receivMsg = "";
			var answerDefaultStatus = "";
			var dateTimeSend = ConvertFromDate(new Date()) + " " + ConvertToTime(new Date());

			for(var i = 0; i < receivAr.length; i++) {
				receivMsg += receivAr[i] + "$" + 0 + "#";
				if(i != (receivAr.length - 1)) {
					answerDefaultStatus += "0,";
				}
				else {
					answerDefaultStatus += "0";
				}
			}

			alertInfoForCreatNewItemC.style.display = "none";
			$.ajax({
				type: 'POST',
				url: "../Php/sendNotificationToServerPhp.php",
				data: {approve: approveRep, id: notifId, type: notifType, text: notifText, sender: employeeIn.getId(), receiver: receivMsg, answer: answerDefaultStatus, date: dateTimeSend},
				success: function(data) {
					//alert(data);
					if(data == 1) {
						alertInfoForCreatNewItemTextC.innerHTML = "Το μήνυμα στάλθηκε επιτυχώς.";
					}
					else if(data == 0) {
						alertInfoForCreatNewItemTextC.innerHTML = "Υπήρξε κάποιο πρόβλημα!<br>Το μήνυμα δεν στάλθηκε!<br>Επαναλάβετε την διαδικασία μετά από μία ανανέωση της σελίδας. Σε περίπτωση, που συνεχίσει να υπάρχει το πρόβλημα, είναι πολύ πιθανό να ευθύνεται το σύστημα.";
					}
					exitEditBtn.click();
					alertInfoForCreatNewItemC.style.display = "table";
					alertInfoForCreatNewItemBtn.innerHTML = "Το κατάλαβα";
					alertInfoForCreatNewItemBtn.addEventListener("click", function() {
						alertInfoForCreatNewItemC.style.display = "none";
					});
					alertInfoForCreatNewItemBtn.focus();

					if(sessionStorage.getItem('action') == "Requests") {
						location.reload();
					}
				}
			});
		}
	}

	//REQUESTS BUTTON EVENTS
	RequestsButtonListenerAdmin() {
		CloseAlertMessages();
		var menuScrnA = new MenuScreenAdmin(requestsBtn.name);
		menuScrnA.ChooseFromActionId();
	}
}