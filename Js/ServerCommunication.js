function ServerCommunication() {

	//OPENING WINDOW FOR EDITING INFO OF EMPLOYEE, CHECK FOR ERRORS AND COMMUNICATE WITH THE SERVER TO SEND THE CHANGED INFO
	this.UpdateInfoOfEmployee = function(panelOfEmployeeC, thisEmployee) {
		//CLOSE MENU IF IS OPENED
		var leftC = document.getElementById("leftC");
		var leftFixedC = document.getElementById("leftFixedC");
		var menuSymbolC = document.getElementById("menuSymbolC");
		var menuBtn = document.getElementById("menuBtn");
		var alertInfoForCreatNewItemC = document.getElementById("alertInfoForCreatNewItemC");
		var alertInfoForCreatNewItemTextC = document.getElementById("alertInfoForCreatNewItemTextC");
		var alertInfoForCreatNewItemBtn = document.getElementById("alertInfoForCreatNewItemBtn");
		var alertAddNewInfoC = document.getElementById("alertAddNewInfoC");
		var addNewInfoTitleTextC = document.getElementById("addNewInfoTitleTextC");
		var addNewInfoTextC = document.getElementById("addNewInfoTextC");
		var yesAddNewInfoBtn = document.getElementById("yesAddNewInfoBtn");
		var noAddNewInfoBtn = document.getElementById("noAddNewInfoBtn");

		var impChange = 0;

		if(leftFixedC.offsetWidth != 0) {
			leftC.style.width = 0;
			rightC.style.width = "calc(100% - " + leftC.style.width + ")";
			leftFixedC.style.width = leftC.style.width;
			menuSymbolC.style.boxShadow = "none";
			menuBtn.style.background = "transparent";
			menuBtn.style.borderRadius = "0 4px 4px 0";
			menuBtn.style.border = "none";
			menuBtn.addEventListener("mouseover", function() {
				this.style.background = "rgb(255, 215, 0)";
				this.style.border = "none";
			});
			menuBtn.addEventListener("mouseout", function() {
				this.style.background = "rgb(13, 18, 24, 0.8)";
				this.style.border = "none";
			});
			centerScreenBtn.style.display = "inline-block";
		}

		var statusArrayGr = ["Γενικός Διαχειριστής", "Υπεύθυνος Διαχείρισης", "Υπάλληλος Πρακτορείου", "Υπεύθυνος Αποθήκης", "Οδηγός", "Φύλακας", "Καθαριστής"];
		var statusArrayGr1 = ["Γενικός Διαχειριστής", "Υπεύθυνος Διαχείρισης", "Υπάλληλος Πρακτορείου", "Υπεύθυνος Αποθήκης"];
		var statusArrayGr2 = ["Οδηγός", "Φύλακας", "Καθαριστής"];
		var statusArrayEng = ["Admin", "Employee Manager", "Agency Employee", "Store Employee", "Driver", "Security", "Cleaner"];
		var statusArrayEng1 = ["Admin", "Employee Manager", "Agency Employee", "Store Employee"];
		var statusArrayEng2 = ["Driver", "Security", "Cleaner"];
		var statusNow = -10;
		
		//CREATE THE OPTIONS MENU FOR STATUS
		function CreateStatusOptions(select) {
			var options = [];
			var status = thisEmployee.getStatus();
			
			if(status == "Admin" || status == "Employee Manager" || status == "Agency Employee" || status == "Store Employee") {
				for(var i = 0; i < statusArrayGr1.length; i++) {
					if((statusArrayEng1[i] != "Admin" && status != "Admin") || (status == "Admin")) {
						options[i] = document.createElement("option");
						options[i].className = "optionsForStatus";
						options[i].innerHTML = statusArrayGr1[i];
						if(statusArrayEng1[i] == status) {
							options[i].selected = "selected";
							statusNow = i;	
						}
						select.appendChild(options[i]);
					}
				}
			}
			else if((status == "Driver" || status == "Security" || status == "Cleaner")) {
				for(var i = 0; i < statusArrayGr2.length; i++) {
					if((statusArrayEng2[i] != "Admin" && status != "Admin") || (status == "Admin")) {
						options[i] = document.createElement("option");
						options[i].className = "optionsForStatus";
						options[i].innerHTML = statusArrayGr2[i];
						if(statusArrayEng2[i] == status) {
							options[i].selected = "selected";
							statusNow = i;	
						}
						select.appendChild(options[i]);
					}
				}
			}
		}

		function GetStartingStatusOption(language) {
			if(language == "greek") {
				return statusArrayGr[statusNow];
			}
			else {
				return statusArrayEng[statusNow];
			}
		}

		var editWindowC = document.getElementById("editWindowC");
		editWindowC.style.display = "block";

		var editTitleTextC = document.getElementById("editTitleTextC");
		//editTitleNextC.innerHTML = "";
		editTitleTextC.innerHTML = "ΕΠΕΞΕΡΓΑΣΙΑ ΣΤΟΙΧΕΙΩΝ ΥΠΑΛΛΗΛΩΝ";

		var editInfoGetterLeftC = document.getElementById("editInfoGetterLeftC");
		editInfoGetterLeftC.innerHTML = "";

		var editInfoGetterRightC = document.getElementById("editInfoGetterRightC");
		editInfoGetterRightC.innerHTML = "";

		//EMPLOYEE USERNAME EDIT WINDOW
		var usernameEmployeeEditC = document.createElement("div");
		usernameEmployeeEditC.id = "usernameEmployeeEditC";
		usernameEmployeeEditC.style.display = "block";
		usernameEmployeeEditC.style.height = "65px";
		usernameEmployeeEditC.style.overflow = "visible";
		var usernameEmployeeEditTextC = document.createElement("div");
		usernameEmployeeEditTextC.id = "usernameEmployeeEditTextC";
		usernameEmployeeEditTextC.innerHTML = "Όνομα χρήστη";
		var usernameEmployeeEditInpt = document.createElement("input");
		usernameEmployeeEditInpt.id = "usernameEmployeeEditInpt";
		usernameEmployeeEditInpt.addEventListener("keypress", function() {
			UsernameInputPreventSymbols();
		});
		var usernameProblemC = document.createElement("div");
		usernameProblemC.id = "usernameProblemC";
		usernameProblemC.style.color = "red";
		usernameProblemC.style.fontSize = "14px";
		usernameProblemC.style.paddingLeft = "4px";
		usernameEmployeeEditInpt.oninput = function () {
			if (this.value.length > 25) {
				this.value = this.value.slice(0, 25); 
			}
		}
		usernameEmployeeEditInpt.value = thisEmployee.getUsername();
		usernameEmployeeEditC.appendChild(usernameEmployeeEditTextC);
		usernameEmployeeEditC.appendChild(usernameEmployeeEditInpt);
		usernameEmployeeEditC.appendChild(usernameProblemC);
		editInfoGetterLeftC.appendChild(usernameEmployeeEditC);

		//EMPLOYEE EMAIL EDIT WINDOW
		var emailEmployeeEditC = document.createElement("div");
		emailEmployeeEditC.id = "emailEmployeeEditC";
		emailEmployeeEditC.style.display = "block";
		emailEmployeeEditC.style.height = "65px";
		emailEmployeeEditC.style.overflow = "visible";
		var emailEmployeeEditTextC = document.createElement("div");
		emailEmployeeEditTextC.id = "emailEmployeeEditTextC";
		emailEmployeeEditTextC.innerHTML = "Email";
		var emailEmployeeEditInpt = document.createElement("input");
		emailEmployeeEditInpt.id = "emailEmployeeEditInpt";
		emailEmployeeEditInpt.addEventListener("keypress", NoWhiteSpace);
		emailEmployeeEditInpt.value = thisEmployee.getEmail();
		var emailProblemC = document.createElement("div");
		emailProblemC.id = "emailProblemC";
		emailProblemC.style.color = "red";
		emailProblemC.style.fontSize = "14px";
		emailProblemC.style.paddingLeft = "4px";
		emailEmployeeEditInpt.oninput = function () {
			if (this.value.length > 50) {
				this.value = this.value.slice(0, 35); 
			}
		}
		emailEmployeeEditC.appendChild(emailEmployeeEditTextC);
		emailEmployeeEditC.appendChild(emailEmployeeEditInpt);
		emailEmployeeEditC.appendChild(emailProblemC);
		editInfoGetterLeftC.appendChild(emailEmployeeEditC);

		//EMPLOYEE NAME EDIT WINDOW
		var nameEmployeeEditC = document.createElement("div");
		nameEmployeeEditC.id = "nameEmployeeEditC";
		nameEmployeeEditC.style.display = "block";
		nameEmployeeEditC.style.height = "65px";
		var nameEmployeeEditTextC = document.createElement("div");
		nameEmployeeEditTextC.id = "nameEmployeeEditTextC";
		nameEmployeeEditTextC.innerHTML = "Ονοματεπώνυμο";
		var nameEmployeeEditInpt = document.createElement("input");
		nameEmployeeEditInpt.id = "nameEmployeeEditInpt";
		nameEmployeeEditInpt.disabled = true;
		nameEmployeeEditInpt.oninput = function () {
			if (this.value.length > 35) {
				this.value = this.value.slice(0, 35); 
			}
		}
		nameEmployeeEditInpt.value = thisEmployee.getName();
		nameEmployeeEditC.appendChild(nameEmployeeEditTextC);
		nameEmployeeEditC.appendChild(nameEmployeeEditInpt);
		editInfoGetterLeftC.appendChild(nameEmployeeEditC);

		//EMPLOYEE WAGE EDIT WINDOW
		var wageEmployeeEditC = document.createElement("div");
		wageEmployeeEditC.id = "wageEmployeeEditC";
		wageEmployeeEditC.style.display = "block";
		wageEmployeeEditC.style.height = "65px"
		wageEmployeeEditC.style.overflow = "visible";
		var wageEmployeeEditTextC = document.createElement("div");
		wageEmployeeEditTextC.id = "wageEmployeeEditTextC";
		wageEmployeeEditTextC.innerHTML = "Μισθός (€)";
		var wageEmployeeEditInpt = document.createElement("input");
		wageEmployeeEditInpt.id = "wageEmployeeEditInpt";
		wageEmployeeEditInpt.type = "number";
		var wageProblemC = document.createElement("div");
		wageProblemC.id = "wageProblemC";
		wageProblemC.style.color = "red";
		wageProblemC.style.fontSize = "14px";
		wageProblemC.style.paddingLeft = "4px";
		wageEmployeeEditInpt.addEventListener("keypress", function() {
			OnlyNumberKey(event, "dot");
		});
		wageEmployeeEditInpt.oninput = function () {
			if (this.value.length > 15) {
				this.value = this.value.slice(0, 15); 
			}
		}
		wageEmployeeEditInpt.value = thisEmployee.getWage();
		wageEmployeeEditC.appendChild(wageEmployeeEditTextC);
		wageEmployeeEditC.appendChild(wageEmployeeEditInpt);
		wageEmployeeEditC.appendChild(wageProblemC);
		editInfoGetterLeftC.appendChild(wageEmployeeEditC);

		//EMPLOYEE STATUS EDIT WINDOW
		var statusEmployeeEditC = document.createElement("div");
		statusEmployeeEditC.id = "statusEmployeeEditC";
		statusEmployeeEditC.style.display = "block";
		statusEmployeeEditC.style.height = "65px";
		var statusEmployeeEditTextC = document.createElement("div");
		statusEmployeeEditTextC.id = "statusEmployeeEditTextC";
		statusEmployeeEditTextC.innerHTML = "Θέση";
		var statusEmployeeEditSelect = document.createElement("select");
		statusEmployeeEditSelect.id = "statusEmployeeEditSelect";
		CreateStatusOptions(statusEmployeeEditSelect);
		var currentStatusSelected = GetStartingStatusOption("greek");
		if(statusEmployeeEditSelect.value == "Γενικός Διαχειριστής") {
			statusEmployeeEditSelect.disabled = true;
		}
		statusEmployeeEditC.appendChild(statusEmployeeEditTextC);
		statusEmployeeEditC.appendChild(statusEmployeeEditSelect);
		editInfoGetterRightC.appendChild(statusEmployeeEditC);

		//EMPLOYEE BRANCHID EDIT WINDOW
		var branchIdEmployeeEditC = document.createElement("div");
		branchIdEmployeeEditC.id = "branchIdEmployeeEditC";
		branchIdEmployeeEditC.style.display = "block";
		branchIdEmployeeEditC.style.height = "65px";
		var branchIdEmployeeEditTextC = document.createElement("div");
		branchIdEmployeeEditTextC.id = "branchIdEmployeeEditTextC";
		branchIdEmployeeEditTextC.innerHTML = "Κωδικός καταστήματος";
		var branchIdEmployeeEditSlct = document.createElement("select");
		branchIdEmployeeEditSlct.id = "branchIdEmployeeEditSlct";
		branchIdEmployeeEditSlct.type = "text";
		if(thisEmployee.getBranchId() == 0) {
			branchIdEmployeeEditSlct.disabled = true;

			branchIdEmployeeEditSlct.innerHTML = "";
			var adminOption = document.createElement("option");
			adminOption.className = "optionsForBranch";
			adminOption.innerHTML = TransformBranchTo("string", thisEmployee.getBranchId());
			branchIdEmployeeEditSlct.appendChild(adminOption);
		}
		else {
			if(thisEmployee.getBranchId() == null) {
				branchIdEmployeeEditSlct.disabled = true;
			}
			else {
				branchIdEmployeeEditSlct.disabled = false;
			}
			this.UpdateBranchAvailable(thisEmployee.getId(), TranslateStatusTo("english", statusEmployeeEditSelect.value), thisEmployee.getBranchId(), branchIdEmployeeEditSlct);;
		}
		if(thisEmployee.getBranchId() != 0) {
			statusEmployeeEditSelect.addEventListener("change", function() {
				var serverCommun = new ServerCommunication();
				serverCommun.UpdateBranchAvailable(thisEmployee.getId(), TranslateStatusTo("english", statusEmployeeEditSelect.value), thisEmployee.getBranchId(), branchIdEmployeeEditSlct);
			});
		}

		branchIdEmployeeEditC.appendChild(branchIdEmployeeEditTextC);
		branchIdEmployeeEditC.appendChild(branchIdEmployeeEditSlct);
		editInfoGetterRightC.appendChild(branchIdEmployeeEditC);

		//EMPLOYEE RECRUITMENTDAY EDIT WINDOW
		var recruitmentDayEmployeeEditC = document.createElement("div");
		recruitmentDayEmployeeEditC.id = "recruitmentDayEmployeeEditC";
		recruitmentDayEmployeeEditC.style.display = "block";
		recruitmentDayEmployeeEditC.style.height = "65px";
		var recruitmentDayEmployeeEditTextC = document.createElement("div");
		recruitmentDayEmployeeEditTextC.id = "recruitmentDayEmployeeEditTextC";
		recruitmentDayEmployeeEditTextC.innerHTML = "Ημερομηνία πρόσληψης";
		var recruitmentDayEmployeeEditInpt = document.createElement("input");
		recruitmentDayEmployeeEditInpt.id = "recruitmentDayEmployeeEditInpt";
		recruitmentDayEmployeeEditInpt.type = "text";
		recruitmentDayEmployeeEditInpt.value = ConvertFromDate(thisEmployee.getRecruitmentDay());
		recruitmentDayEmployeeEditInpt.disabled = true;
		recruitmentDayEmployeeEditC.appendChild(recruitmentDayEmployeeEditTextC);
		recruitmentDayEmployeeEditC.appendChild(recruitmentDayEmployeeEditInpt);
		editInfoGetterRightC.appendChild(recruitmentDayEmployeeEditC);

		var editConfirmBtnC = document.createElement("div");
		editConfirmBtnC.id = "editConfirmBtnC";
		var editConfirmBtn = document.createElement("button");
		editConfirmBtn.id = "editConfirmBtn";
		editConfirmBtn.addEventListener("click", CallAsyncEmployee);
		editConfirmBtn.innerHTML = "ΕΝΗΜΕΡΩΣΗ";
		editConfirmBtnC.appendChild(editConfirmBtn);
		editInfoGetterRightC.appendChild(editConfirmBtnC);

		//** WITH CLICK CHECK AND UPDATE INFO
		function IfElementNoError(element, elementProblm) {
			if(element.value == "") {
				element.style.borderColor = "red";
				element.style.borderWidth = "3px";
				elementProblm.innerHTML = "Το πεδίο είναι κενό!";
				return 0;
			}
			else {
				element.style.borderColor = "rgb(22, 36, 53)";
				element.style.borderWidth = "2px";
				elementProblm.innerHTML = "";

				if(element.id == "usernameEmployeeEditInpt") {
					if(element.value.length < 8) {
						element.style.borderColor = "red";
						element.style.borderWidth = "3px";
						elementProblm.innerHTML = "Το Username περιέχει τουλάχιστον 8 χαρακήρες !";
						return 0;
					}
					else {
						element.style.borderColor = "rgb(22, 36, 53)";
						element.style.borderWidth = "2px";
						elementProblm.innerHTML = "";
						return 1;
					}
				}
				else if(element.id == "emailEmployeeEditInpt") {
					if(!ValidateEmail(element.value)) {
						element.style.borderColor = "red";
						element.style.borderWidth = "3px";
						elementProblm.innerHTML = "Δεν πληρεί τις προδιαγραφές ενός Email !";
						return 0;
					}
					else {
						element.style.borderColor = "rgb(22, 36, 53)";
						element.style.borderWidth = "2px";
						elementProblm.innerHTML = "";
						return 1;
					}
				}
				else if(element.id == "wageEmployeeEditInpt") {
					if(element.value < 450) {
						element.style.borderColor = "red";
						element.style.borderWidth = "3px";
						elementProblm.innerHTML = "Ο ελάχιστος μισθός είναι 450€ !";
						return 0;
					}
					else {
						element.style.borderColor = "rgb(22, 36, 53)";
						element.style.borderWidth = "2px";
						elementProblm.innerHTML = "";
						return 1;
					}
				}
				else {
					return 1;
				}
			}
		}

		//FIRST TIME USER PRESSES BUTTON TO UPDATE THE INFO OF THE CHOSEN EMPLOYEE
		function CallAsyncEmployee() {
			var latestInfoEmployee = {
				'id': thisEmployee.getId(),
    			'username': usernameEmployeeEditInpt.value,
    			'email': emailEmployeeEditInpt.value,
   				'name': nameEmployeeEditInpt.value,
    			'wage': wageEmployeeEditInpt.value,
    			'status': TranslateStatusTo("english", statusEmployeeEditSelect.value),
    			'branchId': branchIdEmployeeEditSlct.value
    		};

			var continueNoError = 0;
			continueNoError += IfElementNoError(usernameEmployeeEditInpt, usernameProblemC);
			continueNoError += IfElementNoError(emailEmployeeEditInpt, emailProblemC);
			continueNoError += IfElementNoError(wageEmployeeEditInpt, wageProblemC);
			continueNoError += IfElementNoError(statusEmployeeEditSelect, "");
			continueNoError += IfElementNoError(branchIdEmployeeEditSlct, "");

			if(continueNoError == 5) {
				if(thisEmployee.getUsername() == usernameEmployeeEditInpt.value && thisEmployee.getEmail() == emailEmployeeEditInpt.value && thisEmployee.getWage() == wageEmployeeEditInpt.value && thisEmployee.getStatus() == TranslateStatusTo("english", statusEmployeeEditSelect.value) && branchIdEmployeeEditSlct.value.includes(thisEmployee.getBranchId())) {
					alertInfoForCreatNewItemC.style.display = "table";
					alertInfoForCreatNewItemTextC.innerHTML = "Δεν έχει γίνει καμία αλλαγή!";
					alertInfoForCreatNewItemBtn.innerHTML = "Το κατάλαβα";
					alertInfoForCreatNewItemBtn.focus();
					alertInfoForCreatNewItemBtn.addEventListener("click", function() {
						alertInfoForCreatNewItemC.style.display = "none";
					});
				}
				else {
					var situationToStayAfterChange = "continue";

					alertAddNewInfoC.style.display = "block";
					alertInfoForCreatNewItemC.style.display = "none";

					ShowChangesOfEdit();
					if((userUsernameIn == thisEmployee.getUsername()) && (thisEmployee.getUsername() != usernameEmployeeEditInpt.value || thisEmployee.getEmail() != emailEmployeeEditInpt.value || TranslateStatusTo("greek", thisEmployee.getStatus()) != statusEmployeeEditSelect.value)) {
						addNewInfoTitleTextC.innerHTML = "ΕΠΕΞΕΡΓΑΣΙΑ ΤΩΝ ΣΤΟΙΧΕΙΩΝ ΣΑΣ";
						addNewInfoTextC.innerHTML = "Η αλλαγή ενός εκ των βασικών σας στοιχείων (Όνομα χρήστη ή/και Email), θα οδηγήσει σε αποσύνδεση. Βεβαιωθείτε ότι θυμάστε τα στοιχεία που αλλάξατε. Να ολοκληρωθεί η διαδικασία;";
						situationToStayAfterChange = "exit";
					}
					else {
						addNewInfoTitleTextC.innerHTML = "ΕΠΕΞΕΡΓΑΣΙΑ ΣΤΟΙΧΕΙΩΝ ΤΩΝ ΥΠΑΛΛΗΛΩΝ";
						addNewInfoTextC.innerHTML = "Η αλλαγή των προσωπικών στοιχείων ενός υπαλλήλου, μπορούν να προκαλέσουν προβλήματα στην λειτουργία των καταστημάτων.<br>Βεβαιωθείτε πρώτα, ότι έχετε ενημερώσει τον υπάλληλο και τον μάνατζερ του καταστήματος. <br>Θέλετε να ολοκληρώσετε την διαδικασία; (τα αλλαγμένα πεδία φαίνονται με πράσινο)<br>Η σελίδα θα ανανεωθεί αυτόματα αφού ολοκληρωθεί η διαδικασία.";
						situationToStayAfterChange = "continue";
					}
					yesAddNewInfoBtn.focus();
					jQuery('#yesAddNewInfoBtn').one("click", function() {EmployeeApproveClickOkBtn(latestInfoEmployee, situationToStayAfterChange);});
					noAddNewInfoBtn.addEventListener("click", function() {EmployeeClickCancelBtn();});
				}
			}
		}

		//CHECK EVERY INPUT IF IT'S VALUE IS CHANGED AND SHOW IT WITH GREEN BORDER
		function ShowChangesOfEdit() {
			if(thisEmployee.getUsername() != usernameEmployeeEditInpt.value) {
				usernameEmployeeEditInpt.style.borderColor = "green";
			}

			if(thisEmployee.getEmail() != emailEmployeeEditInpt.value) {
				emailEmployeeEditInpt.style.borderColor = "green";
			}

			if(thisEmployee.getName() != nameEmployeeEditInpt.value) {
				nameEmployeeEditInpt.style.borderColor = "green";
			}

			if(thisEmployee.getWage() != wageEmployeeEditInpt.value) {
				wageEmployeeEditInpt.style.borderColor = "green";
			}

			if(thisEmployee.getStatus() != TranslateStatusTo("english", statusEmployeeEditSelect.value)) {
				statusEmployeeEditSelect.style.borderColor = "green";
			}

			if(thisEmployee.getBranchId() == null) {
				if(branchIdEmployeeEditSlct.value.includes("#")) {
					branchIdEmployeeEditSlct.style.borderColor = "green";
				}
			}
			else {
				if(!branchIdEmployeeEditSlct.value.includes(thisEmployee.getBranchId())) {
					branchIdEmployeeEditSlct.style.borderColor = "green";
				}
			}
		}

		//BACK TO EDITING SCREEN
		function BackToWaitingEditPanel() {
			usernameEmployeeEditInpt.style.borderColor = "rgb(13, 18, 24)";
			emailEmployeeEditInpt.style.borderColor = "rgb(13, 18, 24)";
			nameEmployeeEditInpt.style.borderColor = "rgb(13, 18, 24)";
			wageEmployeeEditInpt.style.borderColor = "rgb(13, 18, 24)";
			statusEmployeeEditSelect.style.borderColor = "rgb(13, 18, 24)";
			branchIdEmployeeEditSlct.style.borderColor = "rgb(13, 18, 24)";
		}

		//FINAL CLICK THAT APPROVES UPDATE OF CHOSEN EMPLOYEE
		async function EmployeeApproveClickOkBtn(newInfoEmployee, situation) {
			var errorMessages = 0;
			errorMessages = await CreateAsyncEmployee(newInfoEmployee);

			if(errorMessages == 0) {
				if(situation == "exit") {
					document.getElementById("logOutBtn").click();
				}
				else {
					BackToWaitingEditPanel();
					if(situation == "continue") {
						location.reload();
					}
				}
			}
			else if(errorMessages == 1) {
				$.ajax({
					type: 'POST',
					url: "../Php/getEmployeesPhp.php",
					data: {},
					success: function(data) {
						var allEmployees = JSON.parse(data);
						var errorUsername = 0;
						var errorEmail = 0;

						for(var i = 0; i < allEmployees.length; i++) {
							if(allEmployees[i].username == usernameEmployeeEditInpt.value && usernameEmployeeEditInpt.value != thisEmployee.getUsername()) {
								errorUsername = 1;
								break;
							}
						}

						for(var i = 0; i < allEmployees.length; i++) {
							if(allEmployees[i].email == emailEmployeeEditInpt.value && emailEmployeeEditInpt.value != thisEmployee.getEmail()) {
								errorEmail = 1;
								break;
							}
						}

						alertAddNewInfoC.style.display = "none";
						alertInfoForCreatNewItemC.style.display = "table";
						//IF BOTH, USERNAME AND EMAIL, ARE CHANGED
						if(errorUsername && errorEmail) {
							alertInfoForCreatNewItemTextC.innerHTML = "Το email και το username υπάρχουν ήδη!<br>Ξαναπροσπαθήστε με διαφορετικά στοιχεία.";
						}
						//IF EMAIL IS CHANGED AND USERNAME IS THE SAME
						else if(errorEmail) {
							alertInfoForCreatNewItemTextC.innerHTML = "Υπάρχει ήδη υπάλληλος με το ίδιο email!<br>Ξαναπροσπαθήστε με διαφορετικό email.";
						}
						//IF USERNAME IS CHANGED AND EMAIL IS THE SAME
						else {
							alertInfoForCreatNewItemTextC.innerHTML = "Υπάρχει ήδη υπάλληλος με το ίδιο username!<br>Ξαναπροσπαθήστε με διαφορετικό username.";
						}

						alertInfoForCreatNewItemBtn.innerHTML = "Το κατάλαβα";
						alertInfoForCreatNewItemBtn.focus();
						alertInfoForCreatNewItemBtn.addEventListener("click", function() {
							CloseAlertMessages();
							EmployeeClickCancelBtn();
						});
					}
				});
			}
			else if(errorMessages == 2) {
				alertAddNewInfoC.style.display = "none";
				alertInfoForCreatNewItemC.style.display = "table";
				alertInfoForCreatNewItemTextC.innerHTML = "Υπάρχει πρώην υπάλληλος με το ίδιο email!<br>Ξαναπροσπαθήστε με διαφορετικά στοιχεία.";
				alertInfoForCreatNewItemBtn.innerHTML = "Το κατάλαβα";
				alertInfoForCreatNewItemBtn.focus();
				alertInfoForCreatNewItemBtn.addEventListener("click", function() {
					alertInfoForCreatNewItemC.style.display = "none";
					EmployeeClickCancelBtn();
				});
			}
		}

		function CreateAsyncEmployee(newInfoEmployee) {
			if(!newInfoEmployee.branchId.includes("#")) {
				newInfoEmployee.branchId = "";
			}
			else {
				newInfoEmployee.branchId = newInfoEmployee.branchId.substring(1, 5);
				if((newInfoEmployee.status != thisEmployee.getStatus() || newInfoEmployee.branchId != thisEmployee.getBranchId()) && thisEmployee.getStatus() == "Employee Manager") {
    				impChange = 1;
    			}
			}

			var employeeStr = JSON.stringify(newInfoEmployee);

			return new Promise ((resolve, reject) => {
				$.ajax({
					type: 'POST',
					url: "../Php/updateEmployeesEditPhp.php",
					data: {newEmployee: employeeStr, key: thisEmployee.getId(), importantChange: impChange, previousBranch: thisEmployee.getBranchId()},
					success: function(data) {
						//alert(data);
						resolve(data);
					}
				});
			});
		}

		function EmployeeClickCancelBtn() {
			alertAddNewInfoC.style.display = "none";
			usernameEmployeeEditInpt.value = thisEmployee.getUsername();
			emailEmployeeEditInpt.value = thisEmployee.getEmail();
			nameEmployeeEditInpt.value = thisEmployee.getName();
			wageEmployeeEditInpt.value = thisEmployee.getWage();
			statusEmployeeEditSelect.value = currentStatusSelected;
			if(thisEmployee.getBranchId() == 0) {
				branchIdEmployeeEditSlct.disabled = true;

				branchIdEmployeeEditSlct.innerHTML = "";
				var adminOption = document.createElement("option");
				adminOption.className = "optionsForBranch";
				adminOption.innerHTML = TransformBranchTo("string", thisEmployee.getBranchId());
				branchIdEmployeeEditSlct.appendChild(adminOption);
			}
			else {
				branchIdEmployeeEditSlct.disabled = false;
				var serverCommun = new ServerCommunication();
				serverCommun.UpdateBranchAvailable(thisEmployee.getId(), TranslateStatusTo("english", statusEmployeeEditSelect.value), thisEmployee.getBranchId(), branchIdEmployeeEditSlct);
			}
			BackToWaitingEditPanel();
		}
		//**
	}

	//HIRE BACK EX EMPLOYEE(DELETE HIM/HER FROM EX EMPLOYEES TABLES AND ADD TO EMPLOYEES AND USERS TABLE, IF NEEDED)
	this.HireBackExEmployee = function (employeeInfo) {
		var statusArrayGr = ["Γενικός Διαχειριστής", "Υπεύθυνος Διαχείρισης", "Υπάλληλος Πρακτορείου", "Υπεύθυνος Αποθήκης", "Οδηγός", "Φύλακας", "Καθαριστής"];
		var statusArrayGr1 = ["Γενικός Διαχειριστής", "Υπεύθυνος Διαχείρισης", "Υπάλληλος Πρακτορείου", "Υπεύθυνος Αποθήκης"];
		var statusArrayGr2 = ["Οδηγός", "Φύλακας", "Καθαριστής"];
		var statusArrayEng = ["Admin", "Employee Manager", "Agency Employee", "Store Employee", "Driver", "Security", "Cleaner"];
		var statusArrayEng1 = ["Admin", "Employee Manager", "Agency Employee", "Store Employee"];
		var statusArrayEng2 = ["Driver", "Security", "Cleaner"];
		var statusNow = -10;

		var errorArr = [1, 1, 1, 1];
		var passwdClickArray = [0, 0];
		var insertedExEmployee = 0;
		
		//CREATE THE OPTIONS MENU FOR STATUS
		function CreateStatusOptions(select) {
			var options = [];
			
			if(employeeInfo.lastStatus == "Admin" || employeeInfo.lastStatus == "Employee Manager" || employeeInfo.lastStatus == "Agency Employee" || employeeInfo.lastStatus == "Store Employee") {
				for(var i = 0; i < statusArrayGr1.length; i++) {
					if((statusArrayEng1[i] != "Admin" && employeeInfo.lastStatus != "Admin") || (employeeInfo.lastStatus == "Admin")) {
						options[i] = document.createElement("option");
						options[i].className = "optionsForStatus";
						options[i].innerHTML = statusArrayGr1[i];
						if(statusArrayEng1[i] == employeeInfo.lastStatus) {
							options[i].selected = "selected";
							statusNow = i;	
						}
						select.appendChild(options[i]);
					}
				}
			}
			else if((employeeInfo.lastStatus == "Driver" || employeeInfo.lastStatus == "Security" || employeeInfo.lastStatus == "Cleaner")) {
				for(var i = 0; i < statusArrayGr2.length; i++) {
					if((statusArrayEng2[i] != "Admin" && employeeInfo.lastStatus != "Admin") || (employeeInfo.lastStatus == "Admin")) {
						options[i] = document.createElement("option");
						options[i].className = "optionsForStatus";
						options[i].innerHTML = statusArrayGr2[i];
						if(statusArrayEng2[i] == employeeInfo.lastStatus) {
							options[i].selected = "selected";
							statusNow = i;	
						}
						select.appendChild(options[i]);
					}
				}
			}
		}

		function GetStartingStatusOption(language) {
			if(language == "greek") {
				return statusArrayGr[statusNow];
			}
			else {
				return statusArrayEng[statusNow];
			}
		}

		var editWindowC = document.getElementById("editWindowC");
		editWindowC.style.display = "block";

		var editTitleTextC = document.getElementById("editTitleTextC");
		//editTitleNextC.innerHTML = "";
		editTitleTextC.innerHTML = "ΕΠΑΝΑΠΡΟΣΛΗΨΗ ΠΡΩΗΝ ΥΠΑΛΛΗΛΟΥ";

		var editInfoGetterLeftC = document.getElementById("editInfoGetterLeftC");
		editInfoGetterLeftC.innerHTML = "";

		var editInfoGetterRightC = document.getElementById("editInfoGetterRightC");
		editInfoGetterRightC.innerHTML = "";

			
		//EX EMPLOYEE NAME HIREBACK WINDOW
		var nameEmployeeEditC = document.createElement("div");
		nameEmployeeEditC.id = "nameEmployeeEditC";
		nameEmployeeEditC.style.display = "block";
		nameEmployeeEditC.style.height = "75px";
		nameEmployeeEditC.style.overflow = "visible";
		var nameEmployeeEditTextC = document.createElement("div");
		nameEmployeeEditTextC.id = "nameEmployeeEditTextC";
		nameEmployeeEditTextC.innerHTML = "Ονοματεπώνυμο";
		var nameEmployeeEditInpt = document.createElement("input");
		nameEmployeeEditInpt.id = "nameEmployeeEditInpt";
		nameEmployeeEditInpt.disabled = true;
		nameEmployeeEditInpt.addEventListener("keypress", NoWhiteSpace);
		nameEmployeeEditInpt.oninput = function () {
			if (this.value.length > 25) {
				this.value = this.value.slice(0, 25); 
			}
		}
		nameEmployeeEditInpt.value = employeeInfo.name;
		nameEmployeeEditC.appendChild(nameEmployeeEditTextC);
		nameEmployeeEditC.appendChild(nameEmployeeEditInpt);
		editInfoGetterLeftC.appendChild(nameEmployeeEditC);

		//EX EMPLOYEE USERNAME HIREBACK WINDOW
		var usernameEmployeeEditC = document.createElement("div");
		usernameEmployeeEditC.id = "usernameEmployeeEditC";
		usernameEmployeeEditC.style.display = "block";
		usernameEmployeeEditC.style.height = "75px";
		usernameEmployeeEditC.style.overflow = "visible";
		var usernameEmployeeEditTextC = document.createElement("div");
		usernameEmployeeEditTextC.id = "usernameEmployeeEditTextC";
		usernameEmployeeEditTextC.innerHTML = "Νέο όνομα χρήστη";
		var usernameEmployeeEditInpt = document.createElement("input");
		usernameEmployeeEditInpt.id = "usernameEmployeeEditInpt";
		usernameEmployeeEditInpt.name = "Username";
		var usernameProblemC = document.createElement("div");
		usernameProblemC.id = "usernameProblemC";
		usernameProblemC.style.fontSize = "15px";
		usernameProblemC.style.paddingLeft = "4px";
		usernameEmployeeEditInpt.addEventListener("keypress", function() {
			UsernameInputPreventSymbols();
		});
		usernameEmployeeEditInpt.oninput = function () {
			if (this.value.length > 25) {
				this.value = this.value.slice(0, 25); 
			}
		}
		usernameEmployeeEditInpt.addEventListener("focusout", function() {
			var messageUsername = "Δεν έχετε ορίσει όνομα χρήστη !";
			IfElementEmptyOrNotAppearanceChanges(usernameEmployeeEditInpt, usernameProblemC, messageUsername);
		});
		usernameEmployeeEditInpt.addEventListener("focusout", function() {
			$.ajax({
				type: 'POST',
				url: "../Php/searchUsernamePhp.php",
				data: {key: usernameEmployeeEditInpt.value},
				success: function(data) {
					var messageError = "";
					var messageRight = "";
					if(data == 1) {
						messageError = "Αυτό το Username υπάρχει ήδη !";
						IfElementErrorOfExistOrRightAppearanceChanges(usernameEmployeeEditInpt, usernameProblemC, messageError, messageRight);
					}
					else {
						//MAKE SURE USERNAME IS AT LEAST 8 CHARACTERS
						if(usernameEmployeeEditInpt.value != "" && usernameEmployeeEditInpt.value.length < 8) {
							messageError = "Το Username περιέχει τουλάχιστον 8 χαρακήρες !";
							IfElementErrorOfExistOrRightAppearanceChanges(usernameEmployeeEditInpt, usernameProblemC, messageError, messageRight);
						}
						else if(usernameEmployeeEditInpt.value != "") {
							messageRight = "Μοναδικό Username, αποδεκτό";
							IfElementErrorOfExistOrRightAppearanceChanges(usernameEmployeeEditInpt, usernameProblemC, messageError, messageRight);
						}
					}
				}
			});
		});

		usernameEmployeeEditC.appendChild(usernameEmployeeEditTextC);
		usernameEmployeeEditC.appendChild(usernameEmployeeEditInpt);
		usernameEmployeeEditC.appendChild(usernameProblemC);
		editInfoGetterLeftC.appendChild(usernameEmployeeEditC);

		//ΕΧ EMPLOYEE PASSWORD HIREBACK WINDOW
		var passwordEmployeeEditC = document.createElement("div");
		passwordEmployeeEditC.id = "passwordEmployeeEditC";
		passwordEmployeeEditC.style.display = "block";
		passwordEmployeeEditC.style.height = "75px";
		passwordEmployeeEditC.style.overflow = "visible";
		var passwordEmployeeEditTextC = document.createElement("div");
		passwordEmployeeEditTextC.id = "passwordEmployeeEditTextC";
		passwordEmployeeEditTextC.innerHTML = "Νέος κωδικός";
		var passwordEmployeeEditInpt = document.createElement("input");
		passwordEmployeeEditInpt.id = "passwordEmployeeEditInpt";
		passwordEmployeeEditInpt.name = "Password";
		passwordEmployeeEditInpt.type = "password";
		if(employeeInfo.lastStatus == "Admin" || employeeInfo.lastStatus == "Employee Manager" || employeeInfo.lastStatus == "Agency Employee" || employeeInfo.lastStatus == "Store Employee") {
			errorArr[1] = 1;
		}
		else {
			passwordEmployeeEditInpt.disabled = true;
			errorArr[1] = 0;
		}
		passwordEmployeeEditInpt.style.paddingRight = "40px";
		var passwordEmployeeEditImgBtn = document.createElement("button");
		passwordEmployeeEditImgBtn.tabIndex = "-1";
		passwordEmployeeEditImgBtn.id = "passwordEmployeeEditImgBtn";
		passwordEmployeeEditImgBtn.className = "showPassword2Btn";
		passwordEmployeeEditImgBtn.title = "Click&See";
		var passwordEmployeeEditImg = document.createElement("img");
		passwordEmployeeEditImg.className = "showPassword2Img";
		passwordEmployeeEditImgBtn.appendChild(passwordEmployeeEditImg);
		var passwordProblemC = document.createElement("div");
		passwordProblemC.id = "passwordProblemC";
		passwordProblemC.style.fontSize = "15px";
		passwordProblemC.style.paddingLeft = "4px";
		passwordEmployeeEditInpt.oninput = function () {
			if (this.value.length > 25) {
				this.value = this.value.slice(0, 25); 
			}
		}

		passwordEmployeeEditC.appendChild(passwordEmployeeEditTextC);
		passwordEmployeeEditC.appendChild(passwordEmployeeEditInpt);
		passwordEmployeeEditC.appendChild(passwordEmployeeEditImgBtn);
		passwordEmployeeEditC.appendChild(passwordProblemC);
		editInfoGetterLeftC.appendChild(passwordEmployeeEditC);

		//ΕΧ EMPLOYEE PASSWORD REPEAT HIREBACK WINDOW
		var passwordRepeatEmployeeEditC = document.createElement("div");
		passwordRepeatEmployeeEditC.id = "passwordRepeatEmployeeEditC";
		passwordRepeatEmployeeEditC.style.display = "block";
		passwordRepeatEmployeeEditC.style.height = "75px";
		passwordRepeatEmployeeEditC.style.overflow = "visible";
		var passwordRepeatEmployeeEditTextC = document.createElement("div");
		passwordRepeatEmployeeEditTextC.id = "passwordRepeatEmployeeEditTextC";
		passwordRepeatEmployeeEditTextC.innerHTML = "Επικύρωση κωδικού";
		var passwordRepeatEmployeeEditInpt = document.createElement("input");
		passwordRepeatEmployeeEditInpt.id = "passwordRepeatEmployeeEditInpt";
		passwordRepeatEmployeeEditInpt.name = "PasswordRe";
		passwordRepeatEmployeeEditInpt.type = "password";
		if(employeeInfo.lastStatus == "Admin" || employeeInfo.lastStatus == "Employee Manager" || employeeInfo.lastStatus == "Agency Employee" || employeeInfo.lastStatus == "Store Employee") {
			errorArr[2] = 1;
		}
		else {
			passwordRepeatEmployeeEditInpt.disabled = true;
			errorArr[2] = 0;
		}
		passwordRepeatEmployeeEditInpt.style.paddingRight = "40px";
		var passwordRepeatEmployeeEditImgBtn = document.createElement("button");
		passwordRepeatEmployeeEditImgBtn.tabIndex = "-1";
		passwordRepeatEmployeeEditImgBtn.id = "passwordRepeatEmployeeEditImgBtn";
		passwordRepeatEmployeeEditImgBtn.className = "showPassword2Btn";
		passwordRepeatEmployeeEditImgBtn.title = "Click&See";
		var passwordRepeatEmployeeEditImg = document.createElement("img");
		passwordRepeatEmployeeEditImg.className = "showPassword2Img";
		passwordRepeatEmployeeEditImgBtn.appendChild(passwordRepeatEmployeeEditImg);
		var passwordRepeatProblemC = document.createElement("div");
		passwordRepeatProblemC.id = "passwordRepeatProblemC";
		passwordRepeatProblemC.style.fontSize = "15px";
		passwordRepeatProblemC.style.paddingLeft = "4px";
		passwordRepeatEmployeeEditInpt.oninput = function () {
			if (this.value.length > 25) {
				this.value = this.value.slice(0, 25); 
			}
		}

		passwordRepeatEmployeeEditC.appendChild(passwordRepeatEmployeeEditTextC);
		passwordRepeatEmployeeEditC.appendChild(passwordRepeatEmployeeEditInpt);
		passwordRepeatEmployeeEditC.appendChild(passwordRepeatEmployeeEditImgBtn);
		passwordRepeatEmployeeEditC.appendChild(passwordRepeatProblemC);
		editInfoGetterLeftC.appendChild(passwordRepeatEmployeeEditC);

		passwordEmployeeEditInpt.addEventListener("focusout", function() {
			var messagePassword = "Δεν έχετε ορίσει κωδικό !";
			var messagePasswordRepeat = "";
			IfElementEmptyOrNotAppearanceChanges(passwordEmployeeEditInpt, passwordProblemC, messagePassword);
			if(passwordEmployeeEditInpt.value != "") {
				if(passwordEmployeeEditInpt.value.length < 6 || passwordEmployeeEditInpt.value.length > 25) {
					messagePassword = "Ο κωδικός πρέπει να έχει από 6 μέχρι 25 ψηφία !";
					IfElementOtherErrorAppearanceChanges(passwordEmployeeEditInpt, passwordProblemC, messagePassword);
				}
				else if(passwordEmployeeEditInpt.value != passwordRepeatEmployeeEditInpt.value) {
					messagePasswordRepeat = "Ο κωδικός επιβεβαίωσης δεν ταιριάζει με τον αρχικό κωδικό !";
				}
				else {
					messagePasswordRepeat = "";
				}
				IfElementOtherErrorAppearanceChanges(passwordRepeatEmployeeEditInpt, passwordRepeatProblemC, messagePasswordRepeat);
			}
		});
		
		passwordRepeatEmployeeEditInpt.addEventListener("input", function() {
			if(passwordEmployeeEditInpt.value == "") {
				messagePasswordRepeat = "Συμπληρώστε το πεδίο του κωδικού, πρώτα !";
			}
			else if(passwordRepeatEmployeeEditInpt.value != "") {
				if(passwordEmployeeEditInpt.value != passwordRepeatEmployeeEditInpt.value) {
					messagePasswordRepeat = "Ο κωδικός επιβεβαίωσης δεν ταιριάζει με τον αρχικό κωδικό !";
				}
				else {
					messagePasswordRepeat = "";
				}
			}
			IfElementOtherErrorAppearanceChanges(passwordRepeatEmployeeEditInpt, passwordRepeatProblemC, messagePasswordRepeat);
		})
		passwordRepeatEmployeeEditInpt.addEventListener("focusout", function() {
			var messagePasswordRepeat = "Το πεδίο επιβεβαίωση κωδικού είναι κενό !";
			IfElementEmptyOrNotAppearanceChanges(passwordRepeatEmployeeEditInpt, passwordRepeatProblemC, messagePasswordRepeat);
			if(passwordEmployeeEditInpt.value == "") {
				messagePasswordRepeat = "Συμπληρώστε το πεδίο του κωδικού, πρώτα !";
			}
			else if(passwordRepeatEmployeeEditInpt.value != "") {
				if(passwordEmployeeEditInpt.value != passwordRepeatEmployeeEditInpt.value) {
					messagePasswordRepeat = "Ο κωδικός επιβεβαίωσης δεν ταιριάζει με τον αρχικό κωδικό !";
				}
				else {
					messagePasswordRepeat = "";
				}
			}
			IfElementOtherErrorAppearanceChanges(passwordRepeatEmployeeEditInpt, passwordRepeatProblemC, messagePasswordRepeat);
		});

		PasswordHideShowBtnsListeners();

		//INITIALIZE OF BUTTONS OF PASSWORD INPUTS
		function PasswordHideShowBtnsListeners() {
			passwordEmployeeEditImgBtn.addEventListener("click", function() {
				PasswordClick(passwordEmployeeEditInpt, passwordEmployeeEditImgBtn, passwordEmployeeEditImg, 0);
			});
			passwordRepeatEmployeeEditImgBtn.addEventListener("click", function() {
				PasswordClick(passwordRepeatEmployeeEditInpt, passwordRepeatEmployeeEditImgBtn, passwordRepeatEmployeeEditImg, 1);
			});
		}

		//FOR CHANGING PASSWORD INPUT TO TEXT INPUT AND BACK. COUNTING AND SEND TO OTHER FUNCTION FOR IMAGE CHANGE
		function PasswordClick(passwrdInpt, imgBtn, img, c) {

			if(passwdClickArray[c]) {

				passwdClickArray[c] = 0;
			}
			else if(!passwdClickArray[c]) {

				passwdClickArray[c] = 1;
			}

			CheckPasswordClickForPic(passwrdInpt, imgBtn, img, passwdClickArray[c]);
		}

		//CHANGE IMAGE WITH CLICK AND TYPE OF INPUT
		function CheckPasswordClickForPic(passwrdInpt, imgBtn, img, passwdClick) {

			if(passwdClick) {
				imgBtn.title = "Click&Hide";
				passwrdInpt.type = "text";
				img.style.content = "url('../Assets/passwdEyeOpenHover.png')";
				imgBtn.onmousemove = function () {
					img.style.content = "url('../Assets/passwdEyeOpenHover.png')";
				 }
				imgBtn.onmouseout = function () {
					img.style.content = "url('../Assets/passwdEyeOpen2.png')";
				}
			}
			else if(!passwdClick) {
				imgBtn.title = "Click&See";
				passwrdInpt.type = "password";
				img.style.content = "url('../Assets/passwdEyeClosedHover.png')";
				imgBtn.onmousemove = function () {
					img.style.content = "url('../Assets/passwdEyeClosedHover.png')";
				}
				imgBtn.onmouseout = function () {
					img.style.content = "url('../Assets/passwdEyeClosed2.png')";
				}
			}
		}

		//EMPLOYEE WAGE HIREBACK WINDOW
		var wageEmployeeEditC = document.createElement("div");
		wageEmployeeEditC.id = "wageEmployeeEditC";
		wageEmployeeEditC.style.display = "block";
		wageEmployeeEditC.style.height = "75px";
		wageEmployeeEditC.style.overflow = "visible";
		var wageEmployeeEditTextC = document.createElement("div");
		wageEmployeeEditTextC.id = "wageEmployeeEditTextC";
		wageEmployeeEditTextC.innerHTML = "Μισθός (€)";
		var wageEmployeeEditInpt = document.createElement("input");
		wageEmployeeEditInpt.id = "wageEmployeeEditInpt";
		wageEmployeeEditInpt.name = "Wage";
		wageEmployeeEditInpt.type = "number";
		var wageProblemC = document.createElement("div");
		wageProblemC.id = "wageProblemC";
		wageProblemC.style.fontSize = "15px";
		passwordRepeatProblemC.style.paddingLeft = "4px";
		wageEmployeeEditInpt.addEventListener("keypress", function() {
			OnlyNumberKey(event, "dot");
		});
		wageEmployeeEditInpt.oninput = function () {
			if (this.value.length > 15) {
				this.value = this.value.slice(0, 15); 
			}
		}
		wageEmployeeEditInpt.placeholder = RoundDecimal(employeeInfo.lastWage, 2);
		wageEmployeeEditInpt.addEventListener("focusout", function() {
			var messageWage = "Δεν έχετε ορίσει τον μηνιαίο μισθό !";
			IfElementEmptyOrNotAppearanceChanges(wageEmployeeEditInpt, wageProblemC, messageWage);
		
			//WAGE ALLOW ONLY 2 DECIMALS
			if(this.value != "") {
				this.value = RoundDecimal(this.value, 2);
			}

			//LOWEST WAGE IS 450
			if(wageEmployeeEditInpt.value != "" && wageEmployeeEditInpt.value < 450) {
				messageWage = "Ο ελάχιστος μισθός είναι 450€ !";
				IfElementOtherErrorAppearanceChanges(wageEmployeeEditInpt, wageProblemC, messageWage);
			}
		});

		wageEmployeeEditC.appendChild(wageEmployeeEditTextC);
		wageEmployeeEditC.appendChild(wageEmployeeEditInpt);
		wageEmployeeEditC.appendChild(wageProblemC);
		editInfoGetterRightC.appendChild(wageEmployeeEditC);

		//ΕΧ EMPLOYEE STATUS HIREBACK WINDOW
		var statusEmployeeEditC = document.createElement("div");
		statusEmployeeEditC.id = "statusEmployeeEditC";
		statusEmployeeEditC.style.display = "block";
		statusEmployeeEditC.style.height = "75px";
		statusEmployeeEditC.style.overflow = "visible";
		var statusEmployeeEditTextC = document.createElement("div");
		statusEmployeeEditTextC.id = "statusEmployeeEditTextC";
		statusEmployeeEditTextC.innerHTML = "Θέση";
		var statusEmployeeEditSelect = document.createElement("select");
		statusEmployeeEditSelect.id = "statusEmployeeEditSelect";
		CreateStatusOptions(statusEmployeeEditSelect);
		var currentStatusSelected = GetStartingStatusOption("greek");
		if(statusEmployeeEditSelect.value == "Γενικός Διαχειριστής") {
			statusEmployeeEditSelect.disabled = true;
		}

		statusEmployeeEditC.appendChild(statusEmployeeEditTextC);
		statusEmployeeEditC.appendChild(statusEmployeeEditSelect);
		editInfoGetterRightC.appendChild(statusEmployeeEditC);

		///ΕΧ EMPLOYEE BRANCHID HIREBACK WINDOW
		var branchIdEmployeeEditC = document.createElement("div");
		branchIdEmployeeEditC.id = "branchIdEmployeeEditC";
		branchIdEmployeeEditC.style.display = "block";
		branchIdEmployeeEditC.style.height = "75px";
		branchIdEmployeeEditC.style.overflow = "visible";
		var branchIdEmployeeEditTextC = document.createElement("div");
		branchIdEmployeeEditTextC.id = "branchIdEmployeeEditTextC";
		branchIdEmployeeEditTextC.innerHTML = "Κωδικός καταστήματος";
		var branchIdEmployeeEditSlct = document.createElement("select");
		branchIdEmployeeEditSlct.id = "branchIdEmployeeEditSlct";
		branchIdEmployeeEditSlct.type = "text";
		if(employeeInfo.lastBranchId == 0) {
			branchIdEmployeeEditSlct.disabled = true;

			branchIdEmployeeEditSlct.innerHTML = "";
			var adminOption = document.createElement("option");
			adminOption.className = "optionsForBranch";
			adminOption.innerHTML = TransformBranchTo("string", employeeInfo.lastBranchId);
			branchIdEmployeeEditSlct.appendChild(adminOption);
		}
		else {
			branchIdEmployeeEditSlct.disabled = false;
			this.UpdateBranchAvailable("", TranslateStatusTo("english", statusEmployeeEditSelect.value), employeeInfo.lastBranchId, branchIdEmployeeEditSlct);
		}
		if(employeeInfo.lastBranchId != 0) {
			statusEmployeeEditSelect.addEventListener("change", function() {
				var serverCommun = new ServerCommunication();
				serverCommun.UpdateBranchAvailable("", TranslateStatusTo("english", statusEmployeeEditSelect.value), employeeInfo.lastBranchId, branchIdEmployeeEditSlct);
			});
		}

		branchIdEmployeeEditC.appendChild(branchIdEmployeeEditTextC);
		branchIdEmployeeEditC.appendChild(branchIdEmployeeEditSlct);
		editInfoGetterRightC.appendChild(branchIdEmployeeEditC);

		//ΕΧ EMPLOYEE RECRUITMENTDAY HIREBACK WINDOW
		var recruitmentDayEmployeeEditC = document.createElement("div");
		recruitmentDayEmployeeEditC.id = "recruitmentDayEmployeeEditC";
		var recruitmentDayEmployeeEditTextC = document.createElement("div");
		recruitmentDayEmployeeEditTextC.id = "recruitmentDayEmployeeEditTextC";
		recruitmentDayEmployeeEditTextC.innerHTML = "Ημερομηνία επαναπρόσληψης";
		var recruitmentDayEmployeeEditInpt = document.createElement("input");
		recruitmentDayEmployeeEditInpt.id = "recruitmentDayEmployeeEditInpt";
		recruitmentDayEmployeeEditInpt.type = "text";
		recruitmentDayEmployeeEditInpt.value = ConvertFromDate(new Date());
		recruitmentDayEmployeeEditInpt.disabled = true;
		recruitmentDayEmployeeEditC.appendChild(recruitmentDayEmployeeEditTextC);
		recruitmentDayEmployeeEditC.appendChild(recruitmentDayEmployeeEditInpt);
		editInfoGetterRightC.appendChild(recruitmentDayEmployeeEditC);

		var editConfirmBtnC = document.createElement("div");
		editConfirmBtnC.id = "editConfirmBtnC";
		var editConfirmBtn = document.createElement("button");
		editConfirmBtn.id = "editConfirmBtn";
		editConfirmBtn.addEventListener("click", function() {
			CheckForConfirmRecruitEmployee();
		});
		editConfirmBtn.innerHTML = "ΕΝΗΜΕΡΩΣΗ";
		editConfirmBtnC.appendChild(editConfirmBtn);
		editInfoGetterRightC.appendChild(editConfirmBtnC);

		//ELEMENTS CHECK FOR EMPTY
		function IfElementEmptyOrNotAppearanceChanges(element, elementAlert, message) {
			var index = ReturnIndexForErrorArr(element);

			if(element.value == "") {
				element.style.borderColor = "red";
				element.style.borderWidth = "2px";
				elementAlert.style.color = "red";
				elementAlert.innerHTML = message;
				errorArr[index] = 1;
			}
			else {
				element.style.borderColor = "rgb(13, 18, 24)";
				element.style.borderWidth = "2px";
				elementAlert.innerHTML = "";
				errorArr[index] = 0;
			}
		}

		//ELEMENTS CHECK FOR ERROR INPUTS
		function IfElementOtherErrorAppearanceChanges(element, elementAlert, message) {
			var index = ReturnIndexForErrorArr(element);

			if(message != "") {
				element.style.borderColor = "red";
				element.style.borderWidth = "2px";
				elementAlert.style.color = "red";
				elementAlert.innerHTML = message;
				errorArr[index] = 1;
			}
			else {
				element.style.borderColor = "rgb(13, 18, 24)";
				element.style.borderWidth = "2px";
				elementAlert.innerHTML = "";
				errorArr[index] = 0;
			}
		}

		//ERROR OR RIGHT INPUTS ALERT FROM SERVER CHECK
		function IfElementErrorOfExistOrRightAppearanceChanges(element, elementAlert, messageError, messageRight) {
			var index = ReturnIndexForErrorArr(element);
			
			if(messageRight == "") {
				element.style.borderColor = "red";
				element.style.borderWidth = "2px";
				elementAlert.style.color = "red";
				elementAlert.innerHTML = messageError;
				errorArr[index] = 1;
			}
			else {
				element.style.borderColor = "rgb(13, 18, 24)";
				element.style.borderWidth = "2px";
				elementAlert.style.color = "green";
				elementAlert.innerHTML = messageRight;
				errorArr[index] = 0;
			}
		}

		//RETURN INDEX OF ERROR ARRAY THAT SHOWS THE INPUT THAT IS BEING CHECKED
		function ReturnIndexForErrorArr(elmnt) {
			var index = 0;
			
			if(elmnt.name == "Username") {
				index = 0;
			}
			else if(elmnt.name == "Password") {
				index = 1;
			}
			else if(elmnt.name == "PasswordRe") {
				index = 2;
			}
			else if(elmnt.name == "Wage") {
				index = 3;
			}

			return index;
		}

		//FUNCTION THAT IS BEING CALLED TO MAKE SURE THAT USER WANTS TO SEND DATA TO DATABASE 
		function CheckForConfirmRecruitEmployee() {
			var allOk = 1;
			
			if(errorArr[0] == 0 && errorArr[1] == 0 && errorArr[2] == 0 && errorArr[3] == 0 && branchIdEmployeeEditSlct.value.includes("#") && !($("#branchIdEmployeeEditSlct").val() === "")) {
				allOk = 1;
			}
			else {
				allOk = 0;
			}

			if(allOk) {
				alertInfoForCreatNewItemC.style.display = "none";
				alertAddNewInfoC.style.display = "block";
				addNewInfoTitleTextC.innerHTML = "ΠΡΟΣΛΗΨΗ ΠΡΩΗΝ ΥΠΑΛΛΗΛΟΥ";
				addNewInfoTextC.innerHTML = "Ολα τα πεδία είναι έγκυρα. Είστε σίγουρος ότι θέλετε να προσλάβετε πρώην υπάλληλο;";

				yesAddNewInfoBtn.addEventListener("click", function() {
					HireBackExEmployee();
				});
				yesAddNewInfoBtn.focus();
				noAddNewInfoBtn.addEventListener("click", function() {
					alertAddNewInfoC.style.display = "none";
				});
			}
			else {
				alertAddNewInfoC.style.display = "none";
				//coverPageHelperC.style.display = "block";
				alertInfoForCreatNewItemC.style.display = "table";
				alertInfoForCreatNewItemTextC.innerHTML = "Υπάρχει κάποιο λάθος. Βεβαιωθείτε, ότι είναι αποδεκτά και συμπληρωμένα όλα τα στοιχεία και δεν υπάρχει καμία ένδειξη προβλήματος !";
				alertInfoForCreatNewItemBtn.innerHTML = "Το κατάλαβα";
				alertInfoForCreatNewItemBtn.focus();
				alertInfoForCreatNewItemBtn.addEventListener("click", function() {
					alertInfoForCreatNewItemC.style.display = "none";
				});
			}
		}

		//EVENT WHEN CLICK BUTTON FROM ALERT MESSAGES
		function UnderstandAlertMessageBtn() {
			alertInfoForCreatNewItemC.style.display = "none";
			coverPageHelperC.style.display = "none";
			if(insertedExEmployee) {
				location.reload();
			}
		}

		//SEND INFO TO SERVER AFTER CONFIRM
		function HireBackExEmployee() {
			var newExEmployee = {
				'id': employeeInfo.id,
		    	'username': usernameEmployeeEditInpt.value,
		    	'email': employeeInfo.email,
		   		'name': employeeInfo.name,
		   		'icon' : employeeInfo.icon,
		    	'branchId': TransformBranchTo("number", branchIdEmployeeEditSlct.value),
		    	'status': TranslateStatusTo("english", statusEmployeeEditSelect.value),
		    	'sex': employeeInfo.sex,
		    	'wage' : wageEmployeeEditInpt.value,
		    	'recruitmentDay' : ConvertFromDate(new Date()),
		    	'password': passwordEmployeeEditInpt.value,
		    	'afm' : employeeInfo.afm,
		    	'amka' : employeeInfo.amka
			};

		    newExEmployee = JSON.stringify(newExEmployee);

			$.ajax({
				type: 'POST',
				url: "../Php/hireBackExEmployeePhp.php",
				data: {employeeHireObj: newExEmployee},
				success: function(data) {
					//alert(data);
					if(data == 1) {
						//ALERT MESSAGE
						insertedExEmployee = 1;
						//coverPageHelperC.style.display = "block";
						alertAddNewInfoC.style.display = "none";
						//alertInfoForCreatNewItemC.style.display = "table";
						//alertInfoForCreatNewItemTextC.innerHTML = "Η ΔΙΑΔΙΚΑΣΙΑ ΟΛΟΚΛΗΡΩΘΗΚΕ ΕΠΙΤΥΧΩΣ(η σελίδα θα ανανεωθεί)";
						//alertInfoForCreatNewItemBtn.innerHTML = "Το κατάλαβα";
						UnderstandAlertMessageBtn();
					}
					else {
						insertedExEmployee = 0;
						alertAddNewInfoC.style.display = "none";
						alertInfoForCreatNewItemC.style.display = "table";
						alertInfoForCreatNewItemTextC.innerHTML = "ΚΑΤΙ ΠΗΓΕ ΛΑΘΟΣ";
						alertInfoForCreatNewItemBtn.innerHTML = "Το κατάλαβα";
						alertInfoForCreatNewItemBtn.addEventListener("click", function() {
							alertInfoForCreatNewItemC.style.display = "none";
						});
					}
				}
			});
		}
	}

	//HIRE BACK EX EMPLOYEE(DELETE HIM/HER FROM EX EMPLOYEES TABLES AND ADD TO EMPLOYEES AND USERS TABLE, IF NEEDED)
	this.DeleteExEmployee = function (exEmployeeId) {
		$.ajax({
			type: 'POST',
			url: "../Php/deleteExEmployeePhp.php",
			data: {id: exEmployeeId},
			success: function(data) {
				//EX EMPLOYEE HAS BEEN DELETED SUCCESSFULLY
				if(data == 1) {
					alertAddNewInfoC.style.display = "none";
					alertInfoForCreatNewItemC.style.display = "table";
					alertInfoForCreatNewItemTextC.innerHTML = "Η ΔΙΑΔΙΚΑΣΙΑ ΟΛΟΚΛΗΡΩΘΗΚΕ ΕΠΙΤΥΧΩΣ(η σελίδα θα ανανεωθεί)";
					alertInfoForCreatNewItemBtn.innerHTML = "Το κατάλαβα";
					alertInfoForCreatNewItemBtn.addEventListener("click", function() {
						alertInfoForCreatNewItemC.style.display = "none";
						coverPageHelperC.style.display = "none";
						location.reload();
					});
					alertInfoForCreatNewItemBtn.focus();
				}
				//EX EMPLOYEE HASN'T BEEN DELETED SUCCESSFULLY
				else {
					alertAddNewInfoC.style.display = "none";
					alertInfoForCreatNewItemC.style.display = "table";
					alertInfoForCreatNewItemTextC.innerHTML = "ΚΑΤΙ ΠΗΓΕ ΛΑΘΟΣ";
					alertInfoForCreatNewItemBtn.innerHTML = "Το κατάλαβα";
					alertInfoForCreatNewItemBtn.addEventListener("click", function() {
						alertInfoForCreatNewItemC.style.display = "none";
					});
					alertInfoForCreatNewItemBtn.focus();
				}
			}
		});
	}

	//WHEN ADMIN CHANGE STATUS OF EMPLOYEE, SHOWS AVAILABLE BRANCHES TO WORK
	this.UpdateBranchAvailable = function (employeeIdKey, status, branchId, branchIdEditSelect) {
		$.ajax({
			type: 'POST',
			url: "../Php/getBranchesAvailableForEmployeePhp.php",
			data: {key: employeeIdKey, statusSearch: status},
			success: function(data) {
				//alert(data);
				//CREATE OPTIONS FOR BRANCH IDS AVAILABLE FOR EACH STATUS
				branchIdEditSelect.innerHTML = "";
				var availableBranchesArray = JSON.parse(data);
				var idsOfAvailBranchArray = [];
				var locOfAvailBranchArray = [];
				var streetOfAvailBranArray = [];
				for(var i = 0; i < availableBranchesArray.length; i++) {
					idsOfAvailBranchArray.push(availableBranchesArray[i].id);
					locOfAvailBranchArray.push(availableBranchesArray[i].location);
					streetOfAvailBranArray.push(availableBranchesArray[i].street);
				}
				if(branchId == null) {
					idsOfAvailBranchArray.push(branchId);
				}
				for(var i = 0; i < idsOfAvailBranchArray.length; i++) {
					var option = document.createElement("option");
					option.className = "optionsForBranch";
					option.innerHTML = TransformBranchTo("string", idsOfAvailBranchArray[i]) + " - " + locOfAvailBranchArray[i] + " - " + streetOfAvailBranArray[i];
					branchIdEditSelect.appendChild(option);
					if(branchId == idsOfAvailBranchArray[i]) {
						option.selected = "selected";
						if(employeeIdKey != "") {
							option.innerHTML += " (τωρινό)";
						}
						else {
							option.style.color = "rgb(138, 43, 226)";
							option.innerHTML += " (πρώην)";
						}
					}
					else {
						option.style.color = "green";
					}

					if(idsOfAvailBranchArray[i] == null) {
						option.innerHTML = "Δεν έχει ορισθεί κατάστημα";
						option.disabled = true;
						option.style.display = "none";
					}
				}
				if(branchIdEditSelect.length == 0 || (!branchIdEditSelect.value.includes("#") && branchIdEditSelect.length == 1)) {
					branchIdEditSelect.disabled = true;
					branchIdEditSelect.style.borderColor = "red";
				}
				else {
					branchIdEditSelect.disabled = false;
					branchIdEditSelect.style.borderColor = "rgb(13, 18, 24)";
				}
			}
		});
	}

	//WHEN ADMIN PRESSES BUTTON TO EDIT BRANCH INFO
	this.BranchEditInfo = function (branchObj) {
		var change = [0, 0, 0, 0];

		var editWindowC = document.getElementById("editWindowC");
		editWindowC.style.display = "block";

		var editTitleTextC = document.getElementById("editTitleTextC");
		//editTitleNextC.innerHTML = "";
		editTitleTextC.innerHTML = "ΕΠΕΞΕΡΓΑΣΙΑ ΣΤΟΙΧΕΙΩΝ ΚΑΤΑΣΤΗΜΑΤΟΣ";

		var editInfoGetterLeftC = document.getElementById("editInfoGetterLeftC");
		editInfoGetterLeftC.innerHTML = "";

		var editInfoGetterRightC = document.getElementById("editInfoGetterRightC");
		editInfoGetterRightC.innerHTML = "";

		//ADMIN CONTROL BRANCH EDIT INFO
		var adminControlBrC = document.createElement("div");
		adminControlBrC.id = "adminControlBrC";
		adminControlBrC.style.userSelect = "none";

		var adminControlTitleBrC = document.createElement("div");
		adminControlTitleBrC.id = "adminControlTitleBrC";
		adminControlTitleBrC.innerHTML = "Διαχειριστής";
		adminControlBrC.appendChild(adminControlTitleBrC);

		var adminControlContentBrInpt = document.createElement("input");
		adminControlContentBrInpt.id = "adminControlContentBrInpt";
		adminControlContentBrInpt.value = branchObj.getAdminControl();
		adminControlContentBrInpt.disabled = true;
		adminControlBrC.appendChild(adminControlContentBrInpt);

		editInfoGetterLeftC.appendChild(adminControlBrC);

		//STATUS BRANCH EDIT INFO
		var statusBrC = document.createElement("div");
		statusBrC.id = "statusBrC";
		statusBrC.style.userSelect = "none";

		var statusTitleBrC = document.createElement("div");
		statusTitleBrC.id = "statusTitleBrC";
		statusTitleBrC.innerHTML = "Κατάσταση";
		statusBrC.appendChild(statusTitleBrC);

		var statusContentBrSlct = document.createElement("select");
		statusContentBrSlct.id = "statusContentBrSlct";
		statusContentBrSlct.addEventListener("change", function() {
			if(this.value != TranslateBranchStatusTo("greek", branchObj.getStatus())) {
				this.style.border = "2px solid orange";
				change[0] = 1;
			}
			else {
				this.style.border = "2px solid rgb(13, 18, 24)";
				change[0] = 0;
			}
		});
		statusBrC.appendChild(statusContentBrSlct);

		if(branchObj.getManager() == null) {
			var branchStatusArray = ["Under_C", "Problem"];
		}
		else {
			var branchStatusArray = ["Active", "Under_R", "Under_C", "Problem"];
		}

		for(var i = 0; i < branchStatusArray.length; i++) {
			var option = document.createElement("option");
			option.innerHTML = TranslateBranchStatusTo("greek", branchStatusArray[i]);
			statusContentBrSlct.appendChild(option);
			if(branchStatusArray[i] == branchObj.getStatus()) {
				option.selected = true;
			}
		}

		editInfoGetterLeftC.appendChild(statusBrC);

		//TYPE BRANCH EDIT INFO
		var typeBrC = document.createElement("div");
		typeBrC.id = "typeBrC";
		typeBrC.style.userSelect = "none";

		var typeTitleBrC = document.createElement("div");
		typeTitleBrC.id = "typeTitleBrC";
		typeTitleBrC.innerHTML = "Τύπος";
		typeBrC.appendChild(typeTitleBrC);

		var typeContentBrSlct = document.createElement("select");
		typeContentBrSlct.id = "typeContentBrSlct";
		typeContentBrSlct.addEventListener("change", function() {
			if(this.value != branchObj.getType()) {
				this.style.border = "2px solid orange";
				change[1] = 1;
			}
			else {
				this.style.border = "2px solid rgb(13, 18, 24)";
				change[1] = 0;
			}
		});
		typeBrC.appendChild(typeContentBrSlct);

		var branchTypeArray = ["Σταθμός", "Απλό κατάστημα"];

		for(var i = 0; i < branchTypeArray.length; i++) {
			var option = document.createElement("option");
			option.innerHTML = branchTypeArray[i];
			typeContentBrSlct.appendChild(option);
			if(branchTypeArray[i] == branchObj.getType()) {
				option.selected = true;
			}
		}

		editInfoGetterLeftC.appendChild(typeBrC);

		//STREET BRANCH EDIT INFO
		var streetBrC = document.createElement("div");
		streetBrC.id = "streetBrC";
		streetBrC.style.userSelect = "none";

		var streetTitleBrC = document.createElement("div");
		streetTitleBrC.id = "streetTitleBrC";
		streetTitleBrC.innerHTML = "Οδός";
		streetBrC.appendChild(streetTitleBrC);

		var streetContentBrInpt = document.createElement("input");
		streetContentBrInpt.id = "streetContentBrInpt";
		streetContentBrInpt.value = branchObj.getStreet();
		streetContentBrInpt.addEventListener("change", function() {
			if(this.value != branchObj.getStreet()) {
				this.style.border = "2px solid orange";
				change[2] = 1;
			}
			else {
				this.style.border = "2px solid rgb(13, 18, 24)";
				change[2] = 0;
			}
		});
		streetContentBrInpt.addEventListener("keypress", function(e) {
			NotAllowSymbol(e, 33);
			NotAllowSymbol(e, 35);
			NotAllowSymbol(e, 36);
			NotAllowSymbol(e, 39);
			NotAllowSymbol(e, 44);
			NotAllowSymbol(e, 46);
		});
		streetBrC.appendChild(streetContentBrInpt);

		editInfoGetterRightC.appendChild(streetBrC);

		//IMAGE BRANCH EDIT INFO
		var imageBrC = document.createElement("div");
		imageBrC.id = "imageBrC";
		imageBrC.style.userSelect = "none";

		var imageTitleBrC = document.createElement("div");
		imageTitleBrC.id = "imageTitleBrC";
		imageTitleBrC.innerHTML = "Εικόνα";
		imageBrC.appendChild(imageTitleBrC);

		var imageContentBrInpt = document.createElement("input");
		imageContentBrInpt.id = "imageContentBrInpt";
		imageContentBrInpt.value = branchObj.getImageSrc();
		imageContentBrInpt.addEventListener("change", function() {
			if(this.value != branchObj.getImageSrc()) {
				this.style.border = "2px solid orange";
				change[3] = 1;
			}
			else {
				this.style.border = "2px solid rgb(13, 18, 24)";
				change[3] = 0;
			}
		});
		imageBrC.appendChild(imageContentBrInpt);

		editInfoGetterRightC.appendChild(imageBrC);

		//SEND BRANCH EDITED INFO TO CHECK
		var sendToCheckEditBrBtn = document.createElement("button");
		sendToCheckEditBrBtn.id = "sendToCheckEditBrBtn";
		sendToCheckEditBrBtn.addEventListener("click", function() {
			//WHEN SOMETHING CHANGED
			if(change[0] || change[1] || change[2] || change[3]) {
				alertInfoForCreatNewItemC.style.display = "none";
				alertAddNewInfoC.style.display = "block";
				addNewInfoTitleTextC.innerHTML = "ΕΠΕΞΕΡΓΑΣΙΑ ΤΩΝ ΣΤΟΙΧΕΙΩΝ ΤΟΥ ΚΑΤΑΣΤΗΜΑΤΟΣ";
				addNewInfoTextC.innerHTML = "Είστες σίγουρος για τις αλλαγές των στοιχείων του καταστήματος;<br>Στην συνέχεια θα γίνει αυτόματη ανανέωση της σελίδας.";
				yesAddNewInfoBtn.addEventListener("click", async function() {
					var messageOk = await SendInfoToServer(branchObj.getId(), TranslateBranchStatusTo("english", statusContentBrSlct.value), typeContentBrSlct.value, streetContentBrInpt.value, imageContentBrInpt.value);
					if(messageOk == "1") {
						location.reload();
					}
					else {
						alertInfoForCreatNewItemC.style.display = "table";
						alertInfoForCreatNewItemTextC.innerHTML = "Κάτι πήγε λάθος !<br>Σφάλμα του σέρβερ !";
						alertInfoForCreatNewItemBtn.innerHTML = "Το κατάλαβα";
						alertInfoForCreatNewItemBtn.addEventListener("click", function() {
							alertInfoForCreatNewItemC.style.display = "none";
						});
						alertInfoForCreatNewItemBtn.focus();
					}
				});
				yesAddNewInfoBtn.focus();
				noAddNewInfoBtn.addEventListener("click", function() {
					alertAddNewInfoC.style.display = "none";
				});
			}
			//WHEN NOTHING CHANGED
			else {
				alertInfoForCreatNewItemC.style.display = "table";
				alertInfoForCreatNewItemTextC.innerHTML = "Δεν έχει γίνει καμία αλλαγή !";
				alertInfoForCreatNewItemBtn.innerHTML = "Το κατάλαβα";
				alertInfoForCreatNewItemBtn.addEventListener("click", function() {
					alertInfoForCreatNewItemC.style.display = "none";
				});
				alertInfoForCreatNewItemBtn.focus();
			}
		});
		sendToCheckEditBrBtn.innerHTML = "ΑΛΛΑΓΗ";

		editInfoGetterRightC.appendChild(sendToCheckEditBrBtn);


		//CHECK IF USER IN IS THE SAME THAT CONTROLS THE BRANCH THAT IS CLICKED
		if(userIdIn != branchObj.getAdminControl()) {
			statusContentBrSlct.disabled = true;
			typeContentBrSlct.disabled = true;
			streetContentBrInpt.disabled = true;
			imageContentBrInpt.disabled = true;
			alertInfoForCreatNewItemC.style.display = "table";
			alertInfoForCreatNewItemTextC.innerHTML = "Δεν είστε υπεύθυνος για αυτό το κατάστημα, οπότε δεν έχετε δικαιώματα στην επεξεργασία του!";
			alertInfoForCreatNewItemBtn.innerHTML = "Το κατάλαβα!";
			alertInfoForCreatNewItemBtn.addEventListener("click", function() {
				alertInfoForCreatNewItemC.style.display = "none";
			});
			alertInfoForCreatNewItemBtn.focus();
		}
		else {
			alertInfoForCreatNewItemC.style.display = "none";
		}

		function SendInfoToServer(id, status, type, street, image) {
			return new Promise ((resolve, reject) => {
				$.ajax({
					type: 'POST',
					url: "../Php/sendBranchUpdatesPhp.php",
					data: {id: branchObj.getId(), status: status, type: type, street: street, image: image},
					success: function(data) {
						//alert(data);
						resolve(data);
					}
				});
			});
		}
	}

	//WHEN ADMIN PRESSES BUTTON TO DELETE THIS BRANCH
	this.DeleteThisBranch = async function (branchObj) {
		var alertInfoForCreatNewItemC = document.getElementById("alertInfoForCreatNewItemC");
		var alertInfoForCreatNewItemTextC = document.getElementById("alertInfoForCreatNewItemTextC");
		var alertInfoForCreatNewItemBtn = document.getElementById("alertInfoForCreatNewItemBtn");
		var alertAddNewInfoC = document.getElementById("alertAddNewInfoC");
		var addNewInfoTitleTextC = document.getElementById("addNewInfoTitleTextC");
		var addNewInfoTextC = document.getElementById("addNewInfoTextC");
		var yesAddNewInfoBtn = document.getElementById("yesAddNewInfoBtn");
		var noAddNewInfoBtn = document.getElementById("noAddNewInfoBtn");
		var numberOfEmployees = await CheckIfThereAreEmployeesInThisBranch();
		
		if(numberOfEmployees > 0) {
			CloseAlertMessages();
			alertInfoForCreatNewItemC.style.display = "table";
			alertInfoForCreatNewItemTextC.innerHTML = "Όσο υπάρχουν ενεργοί υπάλληλοι στο συγκεκριμένο κατάστημα, δεν επιτρέπεται η διαγραφή του!";
			alertInfoForCreatNewItemBtn.innerHTML = "Το κατάλαβα";
			alertInfoForCreatNewItemBtn.addEventListener("click", function() {
				alertInfoForCreatNewItemC.style.display = "none";
			});
		}
		else  {
			alertAddNewInfoC.style.display = "table";
			addNewInfoTitleTextC.innerHTML = "ΔΙΑΓΡΑΦΗ ΚΑΤΑΣΤΗΜΑΤΟΣ";
			addNewInfoTextC.innerHTML = "Είστε σίγουρος ότι θέλετε να διαγράψετε το κατάστημα στην τοποθεσία " + branchObj.getLocation() + ";<br> Βεβαιωθείτε, πρώτα, ότι έχετε ενημερώσει τα συνδεδεμένα καταστήματα, αν υπάρχουν!";
			yesAddNewInfoBtn.focus();
			yesAddNewInfoBtn.addEventListener("click", async function() {
				DeleteThisBranch();
			});
			noAddNewInfoBtn.addEventListener("click", function() {
				alertAddNewInfoC.style.display = "none";
			});
		}

		function CheckIfThereAreEmployeesInThisBranch() {
			return new Promise ((resolve, reject) => {
				$.ajax({
					type: 'POST',
					url: "../Php/getCountOfEmployeesInThisBranchPhp.php",
					data: {id: branchObj.getId()},
					success: function(data) {
						//alert(data);
						resolve(data);
					}
				});
			});
		}

		function DeleteThisBranch() {
			$.ajax({
				type: 'POST',
				url: "../Php/deleteBranchPhp.php",
				data: {id: branchObj.getId()},
				success: function(data) {
					//alert(data);
					alertAddNewInfoC.style.display = "none";
					CloseAlertMessages();
					if(data) {
						alertInfoForCreatNewItemC.style.display = "table";
						alertInfoForCreatNewItemTextC.innerHTML = "Η διαγραφή του καταστήματος τελείωσε επιτυχώς.<br> Η σελίδα θα ανανεωθεί αυτόματα.";
						alertInfoForCreatNewItemBtn.innerHTML = "";
						alertInfoForCreatNewItemBtn.addEventListener("click", function() {
							//alertInfoForCreatNewItemC.style.display = "none";
						});

						location.reload();
					}
					else {
						alertInfoForCreatNewItemC.style.display = "table";
						alertInfoForCreatNewItemTextC.innerHTML = "Κάτι πήγε λάθος. Η διαγραφή δεν πραγματοποιήθηκε!<br> Ξαναπροσπαθήστε αργότερα.";
						alertInfoForCreatNewItemBtn.innerHTML = "Το κατάλαβα";
						alertInfoForCreatNewItemBtn.addEventListener("click", function() {
							alertInfoForCreatNewItemC.style.display = "none";
						});
					}
				}
			});
		}
	}

	//WHEN ADMIN PRESSES BUTTON TO EDIT THE CONNECTIONS OF THIS BRANCH
	this.EditTheConnectionsOfThisBranch = async function (branchObj) {
		var branches = await GetAllBranches();
		var buttonsStartingPoint = [];
		var buttonsNow = [];

		branches = ConvertObjectsArrayToBranchObjsArray(branches);
		//REMOVE THIS BRANCH FROM BRANCHES ARRAY
		branches = RemoveObjectFromArray(branchObj, branches);

		CreateViewOfConnectedBranches();

		//GET ALL BRANCHES FROM SERVER FOR GIVING THE OPTION TO THE CHOSEN BRANCH TO CHOOSE ITS CONNECTIONS
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

		//GET CONNECTIONS ID
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

		//CREATE THE VIEW OF ALL THE BRANCHES AND FROM THERE THE USER CAN SEE, WITH WHICH BRANCHES, THIS BRANCH IS CONNECTED AND EDIT THAT
		async function CreateViewOfConnectedBranches() {
			var editWindowC = document.getElementById("editWindowC");
			var editTitleTextC = document.getElementById("editTitleTextC");
			var editInfoGetterLeftC = document.getElementById("editInfoGetterLeftC");
			var editInfoGetterRightC = document.getElementById("editInfoGetterRightC");
			var coverEditC = document.getElementById("coverEditC");
			var branchesConnFromServer = await branchObj.getConnectedBranches();
			branchesConnFromServer = branchesConnFromServer.filter(UniqueArrays);
			var branchesConnAdd = [];
			var branchesConnDelete = [];
			var branchesConnToAddIds = [];

			editWindowC.style.display = "table";
			editTitleTextC.innerHTML = "ΣΥΝΔΕΣΗ ΚΑΤΑΣΤΗΜΑΤΩΝ";
			editInfoGetterLeftC.innerHTML = "";
			editInfoGetterRightC.innerHTML = "";

			coverEditC.style.display = "block";

			//CREATE A HELPER ELEMENT TO GIVE HEIGHT TO THE ELEMENT WITH ID editInfoGetterLeftC, SO THE coverEditC CAN FOLLOW UP
			var helperConnBrC = document.createElement("div");
			editInfoGetterLeftC.appendChild(helperConnBrC);
			helperConnBrC.style.height = "350px";

			var	branchesConnectionsContentC = document.createElement("div");
			branchesConnectionsContentC.id = "branchesConnectionsContentC";

			var allBranchesConnC = document.createElement("div");
			allBranchesConnC.id = "allBranchesConnC";
			branchesConnectionsContentC.appendChild(allBranchesConnC);

			coverEditC.appendChild(branchesConnectionsContentC);
			//TITLES IN FIRST ROW OF BRANCHES CONNECTIONS
			var firstRowOfBrConnectionsContentC = document.createElement("div");
			firstRowOfBrConnectionsContentC.id = "firstRowOfBrConnectionsContentC";

			var titleConnectedBranchesC = document.createElement("div");
			titleConnectedBranchesC.id = "titleConnectedBranchesC";
			var titleConnectedBranchesImg = document.createElement("img");
			titleConnectedBranchesImg.id = "titleConnectedBranchesImg";
			titleConnectedBranchesC.appendChild(titleConnectedBranchesImg);
			firstRowOfBrConnectionsContentC.appendChild(titleConnectedBranchesC);

			var titleNotConnectedBranchesC = document.createElement("div");
			titleNotConnectedBranchesC.id = "titleNotConnectedBranchesC";
			var titleNotConnectedBranchesImg = document.createElement("img");
			titleNotConnectedBranchesImg.id = "titleNotConnectedBranchesImg";
			titleNotConnectedBranchesC.appendChild(titleNotConnectedBranchesImg);
			firstRowOfBrConnectionsContentC.appendChild(titleNotConnectedBranchesC);

			var titleOfBranchesToConnC = document.createElement("div");
			titleOfBranchesToConnC.id = "titleOfBranchesToConnC";
			var updateBranchesConnectedBtn = document.createElement("button");
			updateBranchesConnectedBtn.id = "updateBranchesConnectedBtn";
			updateBranchesConnectedBtn.innerHTML = "Ενημέρωση";
			updateBranchesConnectedBtn.addEventListener("click", async function() {
				PushUpButtons();
				var connectionsIds = await GetIdsOfConnections();
				CreateTheArrayForBranchesConnIds(branchesConnToAddIds, branchesConnAdd, connectionsIds);
				if(branchesConnToAddIds.length == 0) {
					branchesConnToAddIds = 0;
				}
				if(branchesConnAdd.length == 0) {
					branchesConnAdd = 0;
				}
				if(branchesConnDelete.length == 0) {
					branchesConnDelete = 0;
				}
				var dataReturn = await UpdateServerForBranchesConnected(branchesConnToAddIds, branchesConnAdd, branchesConnDelete);
				if(dataReturn) {
					alertInfoForCreatNewItemC.style.display = "table";
					alertInfoForCreatNewItemTextC.innerHTML = "Η ενημέρωση πέτυχε. Παρακαλώ συνεχίστε.";
					alertInfoForCreatNewItemBtn.innerHTML = "Το κατάλαβα";
					alertInfoForCreatNewItemBtn.focus();
					alertInfoForCreatNewItemBtn.addEventListener("click", function() {
						alertInfoForCreatNewItemC.style.display = "none";
					});
					setTimeout(function() {
						alertInfoForCreatNewItemC.style.display = "none";
					}, 2000);

					branchesConnFromServer = await branchObj.getConnectedBranches();
					branchesConnFromServer = branchesConnFromServer.filter(UniqueArrays);
					CheckAndCreateTheViewOfBranchesConn(branchesConnFromServer);
					branchesConnAdd = [];
					branchesConnDelete = [];
					branchesConnToAddIds = [];
				}
				else {
					alertInfoForCreatNewItemC.style.display = "table";
					alertInfoForCreatNewItemTextC.innerHTML = "Κάτι πήγε λάθος. Η ενημέρωση δεν πέτυχε!<br> Ξαναπροσπαθήστε αργότερα.";
					alertInfoForCreatNewItemBtn.innerHTML = "Το κατάλαβα";
					alertInfoForCreatNewItemBtn.focus();
					alertInfoForCreatNewItemBtn.addEventListener("click", function() {
						alertInfoForCreatNewItemC.style.display = "none";
					});
				}
			});
			titleOfBranchesToConnC.appendChild(updateBranchesConnectedBtn);
			var titleTextOfBranchesToConnC = document.createElement("div");
			titleTextOfBranchesToConnC.id = "titleTextOfBranchesToConnC";
			titleTextOfBranchesToConnC.innerHTML = "ΚΑΤΑΣΤΗΜΑΤΑ";
			titleOfBranchesToConnC.appendChild(titleTextOfBranchesToConnC);
			var resetBranchesConnectedBtn = document.createElement("button");
			resetBranchesConnectedBtn.id = "resetBranchesConnectedBtn";
			resetBranchesConnectedBtn.innerHTML = "Επαναφορά";
			resetBranchesConnectedBtn.addEventListener("click", function() {
				ResetBranchesConnected(branchesConnFromServer);
				branchesConnAdd = [];
				branchesConnDelete = [];
				branchesConnToAddIds = [];
			});
			titleOfBranchesToConnC.appendChild(resetBranchesConnectedBtn);

			firstRowOfBrConnectionsContentC.appendChild(titleOfBranchesToConnC);

			allBranchesConnC.appendChild(firstRowOfBrConnectionsContentC);

			for(var i = 0; i < branches.length; i++) {
				var rowForConnBranchC = document.createElement("div");
				rowForConnBranchC.id = "rowForConnBr" + branches[i].getId();
				rowForConnBranchC.className = "rowForConnBranchC";

				var rowConnectForConnBranchC = document.createElement("div");
				rowConnectForConnBranchC.className = "rowConnectForConnBranchC";
				var rowConnectForConnBranchBtn = document.createElement("button");
				rowConnectForConnBranchBtn.className = "rowConnectForConnBranchBtn";
				rowConnectForConnBranchBtn.id = "connectBrBtn" + branches[i].getId();
				rowConnectForConnBranchBtn.value = i;
				rowConnectForConnBranchBtn.addEventListener("click", function() {
					var id = this.id.slice(-4);
					var active = 0;
					if(this.name == "active") {
						active = 1;
					}
					else {
						active = 0;
					}
					AddToBranchesConnected(id, branchesConnAdd, branchesConnDelete, active, this.value);
				});
				rowConnectForConnBranchC.appendChild(rowConnectForConnBranchBtn);
				var rowConnectForConnBranchImg = document.createElement("img");
				rowConnectForConnBranchImg.className = "rowConnectForConnBranchImg";
				rowConnectForConnBranchBtn.appendChild(rowConnectForConnBranchImg);

				rowForConnBranchC.appendChild(rowConnectForConnBranchC);

				var rowNotConnectForConnBranchC = document.createElement("div");
				rowNotConnectForConnBranchC.className = "rowNotConnectForConnBranchC";
				var rowNotConnectForConnBranchBtn = document.createElement("button");
				rowNotConnectForConnBranchBtn.className = "rowNotConnectForConnBranchBtn";
				rowNotConnectForConnBranchBtn.id = "notConnectBrBtn" + branches[i].getId();
				rowNotConnectForConnBranchBtn.value = i;
				rowNotConnectForConnBranchBtn.addEventListener("click", function() {
					var id = this.id.slice(-4);
					var active = 0;
					if(this.name == "active") {
						active = 1;
					}
					else {
						active = 0;
					}
					RemoveBranchConnected(id, branchesConnAdd, branchesConnDelete, active, this.value);
				});
				rowNotConnectForConnBranchC.appendChild(rowNotConnectForConnBranchBtn);
				var rowNotConnectForConnBranchImg = document.createElement("img");
				rowNotConnectForConnBranchImg.className = "rowNotConnectForConnBranchImg";
				rowNotConnectForConnBranchBtn.appendChild(rowNotConnectForConnBranchImg);

				rowForConnBranchC.appendChild(rowNotConnectForConnBranchC);

				var rowBranchForConnBranchC = document.createElement("div");
				rowBranchForConnBranchC.className = "rowBranchForConnBranchC";
				rowBranchForConnBranchC.innerHTML = "#" + branches[i].getId() + " - " + branches[i].getLocation() + " - " + branches[i].getStreet();
				rowForConnBranchC.appendChild(rowBranchForConnBranchC);

				allBranchesConnC.appendChild(rowForConnBranchC);
			}

			//CHECK AND SHOW WHICH BRANCHES ARE CONNECTED TO THIS AND WHICH ISN'T
			CheckAndCreateTheViewOfBranchesConn(branchesConnFromServer);
		}

		function AddToBranchesConnected(id, editArrayOfBranchesConnToAdd, editArrayOfBranchesConnToDelete, active, pos) {
			buttonsNow[pos] = 1;
			editArrayOfBranchesConnToAdd.push(id);
			RemoveItemFromArray(id, editArrayOfBranchesConnToDelete);
			UpdateViewOfButton("rowForConnBr", id, "connect");
			if(!active) {
				BringButtonsDown();
			}
			FindStartingPositionOfBrConnButtons();
		}

		function RemoveBranchConnected(id, editArrayOfBranchesConnToAdd, editArrayOfBranchesConnToDelete, active, pos) {
			buttonsNow[pos] = 0;
			RemoveItemFromArray(id, editArrayOfBranchesConnToAdd);
			editArrayOfBranchesConnToDelete.push(id);
			UpdateViewOfButton("rowForConnBr", id, "disconnect");
			if(!active) {
				BringButtonsDown();
			}
			FindStartingPositionOfBrConnButtons();
		}

		function FindStartingPositionOfBrConnButtons() {
			var wrongPos = 0;
			for(var i = 0; i < buttonsStartingPoint.length; i++) {
				if(buttonsStartingPoint[i] != buttonsNow[i]) {
					wrongPos = 1;
					break;
				}
			}

			if(!wrongPos) {
				PushUpButtons();
			}
		}

		function ResetBranchesConnected(startingArrayBranchConn) {
			CheckAndCreateTheViewOfBranchesConn(startingArrayBranchConn);
			PushUpButtons();
			return startingArrayBranchConn;
		}

		function BringButtonsDown() {
			var updateBranchesConnectedBtn = document.getElementById("updateBranchesConnectedBtn");
			var resetBranchesConnectedBtn = document.getElementById("resetBranchesConnectedBtn");

			updateBranchesConnectedBtn.style.marginTop = "3px";
			updateBranchesConnectedBtn.tabIndex = "1";
			resetBranchesConnectedBtn.style.marginTop = "3px";
			resetBranchesConnectedBtn.tabIndex = "1";
		}

		function PushUpButtons() {
			var updateBranchesConnectedBtn = document.getElementById("updateBranchesConnectedBtn");
			var resetBranchesConnectedBtn = document.getElementById("resetBranchesConnectedBtn");

			updateBranchesConnectedBtn.style.marginTop = "-200px";
			updateBranchesConnectedBtn.tabIndex = "-1";
			resetBranchesConnectedBtn.style.marginTop = "-200px";
			resetBranchesConnectedBtn.tabIndex = "-1";
		}

		function UpdateViewOfButton(firstidOfRow, idOfBranch, command) {
			var idConnectBtn = "connectBrBtn" + idOfBranch;
			var idDisconnectBtn = "notConnectBrBtn" + idOfBranch;
			var connectBtn = document.getElementById(idConnectBtn);
			var disconnectBtn = document.getElementById(idDisconnectBtn);

			if(command == "connect") {
				connectBtn.querySelector(".rowConnectForConnBranchImg").style.content = "url(../Assets/icons8_connection_status_on_50px_3.png)";
				connectBtn.style.border = "1px solid darkgreen";
				connectBtn.name = "active";
				disconnectBtn.querySelector(".rowNotConnectForConnBranchImg").style.content = "url(../Assets/icons8_connection_status_on_50px_1.png)";
				disconnectBtn.style.border = "none";
				disconnectBtn.name = "sleep";
			}
			else if(command == "disconnect") {
				connectBtn.querySelector(".rowConnectForConnBranchImg").style.content = "url(../Assets/icons8_connection_status_on_50px_1.png)";
				connectBtn.style.border = "none";
				connectBtn.name = "sleep";
				disconnectBtn.querySelector(".rowNotConnectForConnBranchImg").style.content = "url(../Assets/icons8_connection_status_on_50px_4.png)";
				disconnectBtn.style.border = "1px solid darkred";
				disconnectBtn.name = "active";
			}
		}

		function CreateTheArrayForBranchesConnIds(idsArr, branchesToConnArr, brConnsIdsArr) {
			for(var i = 0; i < branchesToConnArr.length; i++) {
				newId = CompareIdWithATableAndReturn(8, brConnsIdsArr);
				idsArr.push(newId);
			}

			return idsArr;
		}

		function UpdateServerForBranchesConnected(branchesConnNewIds, newBranchesToConnect, branchesToDlte) {
			return new Promise((resolve, reject) => {
				$.ajax({
					type: 'POST',
					url: "../Php/updateServerForBranchesConnectedPhp.php",
					data: {id: branchObj.getId(), branchesToConnect: newBranchesToConnect, branchesConnIds: branchesConnNewIds, branchesToDelete: branchesToDlte},
					success: function(data) {
						//alert(data);
						resolve(data);
					}
				});
			});
		}

		function StartingPointAfterUpdate(serverUpdatedBrConnArray) {
			PushUpButtons();

			return serverUpdatedBrConnArray;
		}

		function CheckAndCreateTheViewOfBranchesConn(branchesConn) {
			buttonsStartingPoint = [];
			buttonsNow = [];

			for(var i = 0; i < branches.length; i++) {
				var idConnectBtn = "connectBrBtn" + branches[i].getId();
				var idDisconnectBtn = "notConnectBrBtn" + branches[i].getId();
				var connectBtn = document.getElementById(idConnectBtn);
				var connectBtnImg = connectBtn.querySelector(".rowConnectForConnBranchImg"); 
				var disconnectBtn = document.getElementById(idDisconnectBtn);
				var disconnectBtnImg = disconnectBtn.querySelector(".rowNotConnectForConnBranchImg");

				if(branchesConn.length == 0) {
					buttonsStartingPoint.push(0);
					buttonsNow.push(0);
					connectBtnImg.style.content = "url(../Assets/icons8_connection_status_on_50px_1.png)";
					connectBtn.style.border = "none";
					connectBtn.name = "sleep";
					disconnectBtnImg.style.content = "url(../Assets/icons8_connection_status_on_50px_4.png)";
					disconnectBtn.style.border = "1px solid darkred";
					disconnectBtn.name = "active";
				}
				else {
					var found = 0;

					for(var j = 0; j < branchesConn.length; j++) {
						if(branchesConn[j] == branches[i].getId()) {
							found = 1;
							break;
						}
					}

					if(found) {
						buttonsStartingPoint.push(1);
						buttonsNow.push(1);
						connectBtnImg.style.content = "url(../Assets/icons8_connection_status_on_50px_3.png)";
						connectBtn.style.border = "1px solid darkgreen";
						connectBtn.name = "active";
						disconnectBtnImg.style.content = "url(../Assets/icons8_connection_status_on_50px_1.png)";
						disconnectBtn.style.border = "none";
						disconnectBtn.name = "sleep";
					}
					else {
						buttonsStartingPoint.push(0);
						buttonsNow.push(0);
						connectBtnImg.style.content = "url(../Assets/icons8_connection_status_on_50px_1.png)";
						connectBtn.style.border = "none";
						connectBtn.name = "sleep";
						disconnectBtnImg.style.content = "url(../Assets/icons8_connection_status_on_50px_4.png)";
						disconnectBtn.style.border = "1px solid darkred";
						disconnectBtn.name = "active";
					}
				}
			}
			console.log(buttonsStartingPoint);
		}
	}

	this.AddNewBusToServer = async function(branchObj) {
		var busesIds = await GetAllIdsOfBuses();

		var editWindowC = document.getElementById("editWindowC");
		editWindowC.style.display = "block";

		var editTitleTextC = document.getElementById("editTitleTextC");
		editTitleTextC.innerHTML = "ΠΡΟΣΘΗΚΗ ΝΕΟΥ ΛΕΩΦΟΡΕΙΟΥ";

		var editInfoGetterLeftC = document.getElementById("editInfoGetterLeftC");
		editInfoGetterLeftC.innerHTML = "";

		var editInfoGetterRightC = document.getElementById("editInfoGetterRightC");
		editInfoGetterRightC.innerHTML = "";

		//UNIQUE ID OF BUS
		var newIdOfBus = CompareIdWithATableAndReturn(9, busesIds);

		var busNewIdC = document.createElement("div");
		busNewIdC.id = "busNewIdC";
		busNewIdC.style.userSelect = "none";

		var busNewIdTitleC = document.createElement("div");
		busNewIdTitleC.id = "busNewIdTitleC";
		busNewIdTitleC.innerHTML = "Μοναδικός κωδικός";
		busNewIdC.appendChild(busNewIdTitleC);

		var busNewIdInpt = document.createElement("input");
		busNewIdInpt.id = "busNewIdInpt";
		busNewIdInpt.value = newIdOfBus;
		busNewIdInpt.disabled = true;
		busNewIdC.appendChild(busNewIdInpt);

		editInfoGetterLeftC.appendChild(busNewIdC);

		//BRANCH ID THAT BUS WILL CONNECT
		var busBranchConnC = document.createElement("div");
		busBranchConnC.id = "busBranchConnC";
		busBranchConnC.style.userSelect = "none";

		var busBranchConnTitleC = document.createElement("div");
		busBranchConnTitleC.id = "busBranchConnTitleC";
		busBranchConnTitleC.innerHTML = "Κατάστημα σύνδεσης";
		busBranchConnC.appendChild(busBranchConnTitleC);

		var busBranchConnInpt = document.createElement("input");
		busBranchConnInpt.id = "busBranchConnInpt";
		if(branchObj != "NULL") {
			busBranchConnInpt.value = branchObj.getLocation() + " (" + branchObj.getStreet() + ")";
		}
		else {
			busBranchConnInpt.value = "Ελεύθερο";
		}
		busBranchConnInpt.disabled = true;
		busBranchConnC.appendChild(busBranchConnInpt);

		editInfoGetterLeftC.appendChild(busBranchConnC);

		//CHECKBOX TO CHECK THE AVAILABILITY OF THE NEW BUS 
		var checkForAvailabilityC = document.createElement("id");
		checkForAvailabilityC.id = "checkForAvailabilityC";

		var checkBoxForAvailabilityInpt = document.createElement("input");
		checkBoxForAvailabilityInpt.id = "checkBoxForAvailabilityInpt";
		checkBoxForAvailabilityInpt.type = "checkbox";
		checkBoxForAvailabilityInpt.tabIndex = 1;

		checkForAvailabilityC.appendChild(checkBoxForAvailabilityInpt);

		var checkBoxForAvailabilityLabel = document.createElement("label");
		checkBoxForAvailabilityLabel.id = "checkBoxForAvailabilityLabel";
		checkBoxForAvailabilityLabel.for = "checkBoxForAvailabilityInpt";

		var checkBoxForAvailabilityBtn = document.createElement("button");
		checkBoxForAvailabilityBtn.id = "checkBoxForAvailabilityBtn";
		checkBoxForAvailabilityBtn.innerHTML = "Διαθέσιμο για χρήση";
		checkBoxForAvailabilityBtn.addEventListener("click", function() {
			checkBoxForAvailabilityInpt.click();
		});
		checkBoxForAvailabilityBtn.tabIndex = 1;
		checkBoxForAvailabilityLabel.appendChild(checkBoxForAvailabilityBtn);

		checkForAvailabilityC.appendChild(checkBoxForAvailabilityLabel);

		editInfoGetterLeftC.appendChild(checkForAvailabilityC);

		//BUTTON SEND NEW BUS TO SERVER
		var sendNewBusBtn = document.createElement("button");
		sendNewBusBtn.id = "sendNewBusBtn";
		sendNewBusBtn.innerHTML = "ΕΠΙΒΕΒΑΙΩΣΗ";
		sendNewBusBtn.addEventListener("click", function() {
			if(infoBusesTextAr.value != "") {
				CheckIfUserIsSureAboutThisAction();
			}
			else {
				ProblemActionEvent();
			}
		});
		sendNewBusBtn.tabIndex = 3;

		editInfoGetterLeftC.appendChild(sendNewBusBtn);

		//BUS INFO WINDOW
		var infoBusesC = document.createElement("div");
		infoBusesC.id = "infoBusesC";
		var infoBusesTextC = document.createElement("div");
		infoBusesTextC.id = "infoBusesTextC";
		infoBusesTextC.innerHTML = "Πληροφορίες νέου λεωφορείου";
		var infoBusesTextAr = document.createElement("textarea");
		infoBusesTextAr.id = "infoBusesTextAr";
		infoBusesTextAr.placeholder = "Γράψτε εδώ πληροφορίες για το νέο λεωφορείο, όπως μάρκα, χωρητικότητα, χρονολογία και άλλες λεπτομέρειες.";
		infoBusesTextAr.oninput = function () {
			if (this.value.length > 500) {
				this.value = this.value.slice(0, 500);
			}
		}
		infoBusesTextAr.addEventListener("input", function() {
			if(this.value != "") {
				infoBusesTextAr.style.border = "2px solid rgb(118, 118, 118)";
			}
		});
		infoBusesTextAr.tabIndex = 2;

		infoBusesC.appendChild(infoBusesTextC);
		infoBusesC.appendChild(infoBusesTextAr);
		editInfoGetterRightC.appendChild(infoBusesC);

		infoBusesTextAr.focus();

		function CheckIfUserIsSureAboutThisAction() {
			CloseAlertMessages();
			alertAddNewInfoC.style.display = "block";
			addNewInfoTitleTextC.innerHTML = "ΔΗΜΙΟΥΡΓΙΑ ΝΕΟΥ ΛΕΩΦΟΡΕΙΟΥ";
			var status = "";
			if(checkBoxForAvailabilityInpt.checked) {
				status = "ενεργό";
			}
			else {
				status = "ανενεργό";
			}

			if(branchObj != "NULL") {
				addNewInfoTextC.innerHTML = "Ολα τα πεδία είναι έγκυρα.<br>Είστε σίγουρος για την δημιουργία ενός νέου λεωφορείου, για το κατάστημα " + branchObj.getLocation() + " (" + branchObj.getStreet() + "), ως " + status + ";";
			}
			else {
				addNewInfoTextC.innerHTML = "Ολα τα πεδία είναι έγκυρα.<br>Είστε σίγουρος για την δημιουργία ενός νέου λεωφορείου, χωρίς να ανήκει σε κάποιο κατάστημα, ως " + status + ";";
			}

			yesAddNewInfoBtn.addEventListener("click", function() {
				AddNewBusToServer();
			});
			yesAddNewInfoBtn.focus();
			noAddNewInfoBtn.addEventListener("click", function() {
				alertAddNewInfoC.style.display = "none";
			});
		}

		//AFTER USER HAS CONFIRMED THE CREATION OF NEW BUS
		async function AddNewBusToServer() {
			var status = "0";
			var id = "";

			if(checkBoxForAvailabilityInpt.checked) {
				status = "1";
			}

			if(branchObj != "NULL") {
				id = branchObj.getId();
			}
			else {
				id = "NULL";
			}

			var newBus = {
				'id': busNewIdInpt.value,
				'info': infoBusesTextAr.value,
		    	'branchConnected': id,
		    	'availability': status
			};

			newBus = JSON.stringify(newBus);

			var result = await SendNewBusToServer(newBus);

			if(result == "1") {
				alertAddNewInfoC.style.display = "none";
				alertInfoForCreatNewItemC.style.display = "table";
				if(id != "NULL") {
					alertInfoForCreatNewItemTextC.innerHTML = "Η διαδικασία ολοκληρώθηκε επιτυχώς! Το νέο λεωφορείο προστέθηκε στο κατάστημα " + branchObj.getLocation() + " (" + branchObj.getStreet() + ").<br>(Η σελίδα θα ανανεωθεί αυτόματα)";
				}
				else {
					alertInfoForCreatNewItemTextC.innerHTML = "Η διαδικασία ολοκληρώθηκε επιτυχώς! Το νέο λεωφορείο προστέθηκε στα ελεύθερα λεωφορεία.<br>(Η σελίδα θα ανανεωθεί αυτόματα)";
				}
				alertInfoForCreatNewItemBtn.innerHTML = "Το κατάλαβα";
				alertInfoForCreatNewItemBtn.focus();
				alertInfoForCreatNewItemBtn.addEventListener("click", function() {
					alertInfoForCreatNewItemC.style.display = "none";
					location.reload();
				});
				location.reload();
			}
			else {
				alertInfoForCreatNewItemC.style.display = "table";
				alertInfoForCreatNewItemTextC.innerHTML = "Κάτι πήγε λάθος. Ξαναπροσπαθήστε αργότερα.";
				alertInfoForCreatNewItemBtn.innerHTML = "Το κατάλαβα";
				alertInfoForCreatNewItemBtn.focus();
				alertInfoForCreatNewItemBtn.addEventListener("click", function() {
					alertInfoForCreatNewItemC.style.display = "none";
				});
			}
		}

		//SEND NEW BUS TO SERVER
		function SendNewBusToServer(newBus) {
			return new Promise((resolve, reject) => {
				$.ajax({
					type: 'POST',
					url: "../Php/sendNewBusToServerPhp.php",
					data: {bus: newBus},
					success: function(data) {
						//alert(data);
						resolve(data);
					}
				});
			});
		}

		//BEING CALLED WHEN INFO OF BUS IS EMPTY AND USER IS TRYING TO SEND TO THE SERVER NEW BUS
		function ProblemActionEvent() {
			alertInfoForCreatNewItemC.style.display = "table";
			alertInfoForCreatNewItemTextC.innerHTML = "Δεν μπορεί να ολοκληρωθεί η διαδικασία, χωρίς κάποιο στοιχείο για το λεωφορείο!";
			alertInfoForCreatNewItemBtn.innerHTML = "Το κατάλαβα";
			alertInfoForCreatNewItemBtn.focus();
			alertInfoForCreatNewItemBtn.addEventListener("click", function() {
				alertInfoForCreatNewItemC.style.display = "none";
				infoBusesTextAr.style.border = "2px solid rgb(118, 118, 118)";
			});
			infoBusesTextAr.style.border = "4px solid darkred";
		}
	}

	this.DeleteBusFromServer = function(busObj, branchConnectedObj) {
		CloseAlertMessages();
		alertAddNewInfoC.style.display = "block";
		addNewInfoTitleTextC.innerHTML = "ΔΙΑΓΡΑΦΗ ΛΕΩΦΟΡΕΙΟΥ";
		var status = "";
		if(busObj.getAvailability() == "1") {
			status = "ενεργό";
		}
		else {
			status = "ανενεργό";
		}

		if(busObj.getBranchConnected() == null) {
			addNewInfoTextC.innerHTML = "Θέλετε να διαγράψετε το λεωφορείο με κωδικό " + busObj.getId() + ";<br>Δεν ανήκει σε κάποιο κατάστημα και είναι σε κατάσταση, " + status + ".";
		}
		else {
			addNewInfoTextC.innerHTML = "Θέλετε να διαγράψετε το λεωφορείο με κωδικό " + busObj.getId() + ";<br>Βεβαιωθείτε, πρώτα, ότι έχετε ενημερώσει το κατάστημα, στο οποίο ανήκει (" + branchConnectedObj.getLocation() + " - #" + branchConnectedObj.getId() + "), σε κατάσταση " + status + ".";
		}
		yesAddNewInfoBtn.addEventListener("click", function() {
			DlteBusFromServer();
		});
		yesAddNewInfoBtn.focus();
		noAddNewInfoBtn.addEventListener("click", function() {
			alertAddNewInfoC.style.display = "none";
		});

		async function DlteBusFromServer() {
			var result = await DeleteChosenBus();
			if(result == "1") {
				alertInfoForCreatNewItemC.style.display = "table";
				alertInfoForCreatNewItemTextC.innerHTML = "Η διαδικασία ολοκληρώθηκε! Το λεωφορείο με κωδικό " + busObj.getId() + " διαφράφτηκε, επιτυχώς!<br>(Η σελίδα θα ανανεωθεί αυτόματα)";
				alertInfoForCreatNewItemBtn.innerHTML = "Το κατάλαβα";
				alertInfoForCreatNewItemBtn.focus();
				alertInfoForCreatNewItemBtn.addEventListener("click", function() {
					alertInfoForCreatNewItemC.style.display = "none";
					location.reload();
				});
				location.reload();
			}
			else {
				alertInfoForCreatNewItemC.style.display = "table";
				alertInfoForCreatNewItemTextC.innerHTML = "Κάτι πήγε λάθος. Ξαναπροσπαθήστε αργότερα.";
				alertInfoForCreatNewItemBtn.innerHTML = "Το κατάλαβα";
				alertInfoForCreatNewItemBtn.focus();
				alertInfoForCreatNewItemBtn.addEventListener("click", function() {
					alertInfoForCreatNewItemC.style.display = "none";
				});
			}
		}

		function DeleteChosenBus() {
			return new Promise((resolve, reject) => {
				$.ajax({
					type: 'POST',
					url: "../Php/deleteBusFromServerPhp.php",
					data: {busId: busObj.getId()},
					success: function(data) {
						//alert(data);
						resolve(data);
					}
				});
			});
		}
	}

	this.UpdateBusToServer = async function(busObj) {
		var branches = await GetAllBranchesFromServer();
		branches = ConvertObjectsArrayToBranchObjsArray(branches);

		var editWindowC = document.getElementById("editWindowC");
		editWindowC.style.display = "block";

		var editTitleTextC = document.getElementById("editTitleTextC");
		editTitleTextC.innerHTML = "ΕΠΕΞΕΡΓΑΣΙΑ ΣΤΟΙΧΕΙΩΝ ΛΕΩΦΟΡΕΙΟΥ";

		var editInfoGetterLeftC = document.getElementById("editInfoGetterLeftC");
		editInfoGetterLeftC.innerHTML = "";

		var editInfoGetterRightC = document.getElementById("editInfoGetterRightC");
		editInfoGetterRightC.innerHTML = "";

		//ID OF BUS
		var busIdEditC = document.createElement("div");
		busIdEditC.id = "busIdEditC";
		busIdEditC.style.userSelect = "none";

		var busIdEditTitleC = document.createElement("div");
		busIdEditTitleC.id = "busIdEditTitleC";
		busIdEditTitleC.innerHTML = "Μοναδικός κωδικός";
		busIdEditC.appendChild(busIdEditTitleC);

		var busIdEditInpt = document.createElement("input");
		busIdEditInpt.id = "busIdEditInpt";
		busIdEditInpt.value = busObj.getId();
		busIdEditInpt.disabled = true;
		busIdEditC.appendChild(busIdEditInpt);

		editInfoGetterLeftC.appendChild(busIdEditC);

		//BRANCHES OPTIONS THAT BUS CAN CONNECT
		var busEditBranchesOptionsC = document.createElement("div");
		busEditBranchesOptionsC.id = "busEditBranchesOptionsC";
		busEditBranchesOptionsC.style.userSelect = "none";

		var busEditBranchesOptionsTitleC = document.createElement("div");
		busEditBranchesOptionsTitleC.id = "busEditBranchesOptionsTitleC";
		busEditBranchesOptionsTitleC.innerHTML = "Καταστήματα για σύνδεση";
		busEditBranchesOptionsC.appendChild(busEditBranchesOptionsTitleC);

		var busEditBranchesOptionsSlct = document.createElement("select");
		busEditBranchesOptionsSlct.id = "busEditBranchesOptionsSlct";
		var busEditBranchesOption = document.createElement("option");
		busEditBranchesOption.className = "busEditBranchesOption";
		busEditBranchesOption.id = "busEditBranchesOptionNULL";
		busEditBranchesOption.innerHTML = "Ελεύθερο (Χωρίς κατάστημα)";
		busEditBranchesOptionsSlct.appendChild(busEditBranchesOption);
		busEditBranchesOptionsSlct.tabIndex = 1;

		if(busObj.getBranchConnected() == null) {
			busEditBranchesOptionsSlct.value = "Ελεύθερο (Χωρίς κατάστημα)";
		}
		for(var i = 0; i < branches.length; i++) {
			var busEditBranchesOption = document.createElement("option");
			busEditBranchesOption.className = "busEditBranchesOption";
			busEditBranchesOption.id = "busEditBranchesOption" + branches[i].getId();
			busEditBranchesOption.innerHTML = branches[i].getLocation() + " (" + branches[i].getStreet() + ")";
			busEditBranchesOptionsSlct.appendChild(busEditBranchesOption);

			if(busObj.getBranchConnected() == branches[i].getId()) {
				busEditBranchesOptionsSlct.value = branches[i].getLocation() + " (" + branches[i].getStreet() + ")";
			}
		}

		busEditBranchesOptionsC.appendChild(busEditBranchesOptionsSlct);

		editInfoGetterLeftC.appendChild(busEditBranchesOptionsC);

		//CHECKBOX TO CHECK THE AVAILABILITY OF THE EDITED BUS 
		var checkForAvailabilityEditC = document.createElement("id");
		checkForAvailabilityEditC.id = "checkForAvailabilityEditC";

		var checkBoxForAvailabilityEditInpt = document.createElement("input");
		checkBoxForAvailabilityEditInpt.id = "checkBoxForAvailabilityEditInpt";
		checkBoxForAvailabilityEditInpt.type = "checkbox";
		checkBoxForAvailabilityEditInpt.tabIndex = 1;

		checkForAvailabilityEditC.appendChild(checkBoxForAvailabilityEditInpt);

		var checkBoxForAvailabilityEditLabel = document.createElement("label");
		checkBoxForAvailabilityEditLabel.id = "checkBoxForAvailabilityEditLabel";
		checkBoxForAvailabilityEditLabel.for = "checkBoxForAvailabilityEditInpt";

		var checkBoxForAvailabilityEditBtn = document.createElement("button");
		checkBoxForAvailabilityEditBtn.id = "checkBoxForAvailabilityEditBtn";
		checkBoxForAvailabilityEditBtn.innerHTML = "Διαθέσιμο για χρήση";
		if(busObj.getAvailability() == "1") {
			checkBoxForAvailabilityEditInpt.checked = true;
		}
		else {
			checkBoxForAvailabilityEditInpt.checked = false;
		}
		checkBoxForAvailabilityEditBtn.addEventListener("click", function() {
			checkBoxForAvailabilityEditInpt.click();
		});
		checkBoxForAvailabilityEditBtn.tabIndex = 1;
		checkBoxForAvailabilityEditLabel.appendChild(checkBoxForAvailabilityEditBtn);

		checkForAvailabilityEditC.appendChild(checkBoxForAvailabilityEditLabel);

		editInfoGetterLeftC.appendChild(checkForAvailabilityEditC);

		//BUTTON SEND NEW BUS TO SERVER
		var updateBusEditBtn = document.createElement("button");
		updateBusEditBtn.id = "updateBusEditBtn";
		updateBusEditBtn.innerHTML = "ΕΝΗΜΕΡΩΣΗ";
		updateBusEditBtn.addEventListener("click", function() {
			if(infoBusesEditTextAr.value != "") {
				CheckIfUserIsSureAboutThisAction();
			}
			else {
				ProblemActionEvent();
			}
		});
		updateBusEditBtn.tabIndex = 3;

		editInfoGetterLeftC.appendChild(updateBusEditBtn);

		//BUS INFO EDITED WINDOW
		var infoBusesEditC = document.createElement("div");
		infoBusesEditC.id = "infoBusesEditC";
		var infoBusesEditTextC = document.createElement("div");
		infoBusesEditTextC.id = "infoBusesEditTextC";
		infoBusesEditTextC.innerHTML = "Τροποποίηση Πληροφοριών";
		var infoBusesEditTextAr = document.createElement("textarea");
		infoBusesEditTextAr.id = "infoBusesEditTextAr";
		infoBusesEditTextAr.placeholder = "Γράψτε εδώ πληροφορίες για το νέο λεωφορείο, όπως μάρκα, χωρητικότητα, χρονολογία και άλλες λεπτομέρειες.";
		infoBusesEditTextAr.oninput = function () {
			if (this.value.length > 500) {
				this.value = this.value.slice(0, 500);
			}
		}
		infoBusesEditTextAr.addEventListener("input", function() {
			if(this.value != "") {
				infoBusesEditTextAr.style.border = "2px solid rgb(118, 118, 118)";
			}
		});
		infoBusesEditTextAr.innerHTML = busObj.getInfo();
		infoBusesEditTextAr.tabIndex = 2;

		infoBusesEditC.appendChild(infoBusesEditTextC);
		infoBusesEditC.appendChild(infoBusesEditTextAr);
		editInfoGetterRightC.appendChild(infoBusesEditC);

		infoBusesEditTextAr.focus();

		function CheckIfUserIsSureAboutThisAction() {
			CloseAlertMessages();
			alertAddNewInfoC.style.display = "block";
			addNewInfoTitleTextC.innerHTML = "ΕΠΕΞΕΡΓΑΣΙΑ ΣΤΟΙΧΕΙΩΝ ΛΕΩΦΟΡΕΙΟΥ";
			var status = "";
			var availability = "0";

			if(checkBoxForAvailabilityEditInpt.checked) {
				status = "ενεργό";
			}
			else {
				status = "ανενεργό";
			}

			if(checkBoxForAvailabilityEditInpt.checked) {
				availability = "1";
			}

			var branchToConnect = busEditBranchesOptionsSlct.options[busEditBranchesOptionsSlct.selectedIndex].id;
			branchToConnect = branchToConnect.substring(branchToConnect.length - 4);

			var currentBranchObj = "NULL";

			for(var i = 0; i < branches.length; i++) {
				if(branches[i].getId() == branchToConnect) {
					currentBranchObj = branches[i];
					break;
				}
			}

			var newBus = {
				'id': busIdEditInpt.value,
				'info': infoBusesEditTextAr.value,
		    	'branchConnected': branchToConnect,
		    	'availability': availability
			};
			var newBusStringify = JSON.stringify(newBus);
			var newBusObj = ConvertObjectToBusObj(newBus);

			if(branchToConnect != "NULL") {
				addNewInfoTextC.innerHTML = "Ολα τα πεδία είναι έγκυρα.<br>Είστε σίγουρος για την τροποποίηση του επιλεγμένου λεωφορείου, για το κατάστημα " + currentBranchObj.getLocation() + " (" + currentBranchObj.getStreet() + "), ως " + status + ";";
			}
			else {
				addNewInfoTextC.innerHTML = "Ολα τα πεδία είναι έγκυρα.<br>Είστε σίγουρος για την τροποποίηση του επιλεγμένου λεωφορείου, χωρίς να ανήκει σε κάποιο κατάστημα, ως " + status + ";";
			}

			yesAddNewInfoBtn.addEventListener("click", function() {
				UpdateBusFromServer(newBusStringify, newBusObj, currentBranchObj);
			});
			yesAddNewInfoBtn.focus();
			noAddNewInfoBtn.addEventListener("click", function() {
				alertAddNewInfoC.style.display = "none";
			});
		}

		//AFTER USER HAS CONFIRMED THE EDIT OF THE BUS
		async function UpdateBusFromServer(newBusStringify, newBusObj, currentBranchObj) {
			var status = "0";
			var messageStatus = "ανενεργό";
			var id = "";

			if(checkBoxForAvailabilityEditInpt.checked) {
				status = "1";
				messageStatus = "ενεργό";
			}

			if(currentBranchObj != "NULL") {
				id = currentBranchObj.getId();
			}
			else {
				id = "NULL";
			}

			var result = await UpdateEditedBusToServer(newBusStringify);

			if(result == "1") {
				alertAddNewInfoC.style.display = "none";
				alertInfoForCreatNewItemC.style.display = "table";
				if(id != "NULL") {
					alertInfoForCreatNewItemTextC.innerHTML = "Η διαδικασία ολοκληρώθηκε επιτυχώς! Το λεωφορείο ενημερώθηκε στο κατάστημα " + currentBranchObj.getLocation() + " (" + currentBranchObj.getStreet() + "), ως " + messageStatus + ".<br>(Η σελίδα θα ανανεωθεί αυτόματα)";
				}
				else {
					alertInfoForCreatNewItemTextC.innerHTML = "Η διαδικασία ολοκληρώθηκε επιτυχώς! Το λεωφορείο ενημερώθηκε στα ελεύθερα λεωφορεία, ως " + messageStatus + ".<br>(Η σελίδα θα ανανεωθεί αυτόματα)";
				}
				alertInfoForCreatNewItemBtn.innerHTML = "Το κατάλαβα";
				alertInfoForCreatNewItemBtn.focus();
				alertInfoForCreatNewItemBtn.addEventListener("click", function() {
					alertInfoForCreatNewItemC.style.display = "none";
					location.reload();
				});
				location.reload();
			}
			else {
				alertInfoForCreatNewItemC.style.display = "table";
				alertInfoForCreatNewItemTextC.innerHTML = "Κάτι πήγε λάθος. Ξαναπροσπαθήστε αργότερα.";
				alertInfoForCreatNewItemBtn.innerHTML = "Το κατάλαβα";
				alertInfoForCreatNewItemBtn.focus();
				alertInfoForCreatNewItemBtn.addEventListener("click", function() {
					alertInfoForCreatNewItemC.style.display = "none";
				});
			}
		}

		//GET ALL BRANCES FROM SERVER
		function GetAllBranchesFromServer() {
			return new Promise((resolve, reject) => {
				$.ajax({
					type: 'POST',
					url: "../Php/getBranchesPhp.php",
					data: {},
					success: function(data) {
						//alert(data);
						data = JSON.parse(data);
						resolve(data);
					}
				});
			});
		}

		//UPDATE BUS FROM SERVER
		function UpdateEditedBusToServer(newBus) {
			return new Promise((resolve, reject) => {
				$.ajax({
					type: 'POST',
					url: "../Php/updateBusToServerPhp.php",
					data: {bus: newBus},
					success: function(data) {
						//alert(data);
						resolve(data);
					}
				});
			});
		}

		//BEING CALLED WHEN INFO OF BUS IS EMPTY AND USER IS TRYING TO SEND TO THE SERVER EDITED BUS
		function ProblemActionEvent() {
			alertInfoForCreatNewItemC.style.display = "table";
			alertInfoForCreatNewItemTextC.innerHTML = "Δεν μπορεί να ολοκληρωθεί η διαδικασία, χωρίς κάποιο στοιχείο για το λεωφορείο!";
			alertInfoForCreatNewItemBtn.innerHTML = "Το κατάλαβα";
			alertInfoForCreatNewItemBtn.focus();
			alertInfoForCreatNewItemBtn.addEventListener("click", function() {
				alertInfoForCreatNewItemC.style.display = "none";
				infoBusesEditTextAr.style.border = "2px solid rgb(118, 118, 118)";
			});
			infoBusesEditTextAr.style.border = "4px solid darkred";
		}
	}

	this.AddNewRoute = function() {

	}
}