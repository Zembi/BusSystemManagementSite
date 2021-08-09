function ServerCommunication() {

	//OPENING WINDOW FOR EDITING INFO OF EMPLOYEE, CHECK FOR ERRORS AND COMMUNICATE WITH THE SERVER TO SEND THE CHANGED INFO
	this.UpdateInfoOfEmployee = function(panelOfEmployeeC, username, email, name, branchId, status, sex, wage, recruitmentDay) {
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

		var sex = this.sex;
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
		usernameEmployeeEditInpt.value = username;
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
		emailEmployeeEditInpt.value = email;
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
		nameEmployeeEditInpt.value = name;
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
		wageEmployeeEditInpt.value = wage;
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
		if(branchId == 0) {
			branchIdEmployeeEditSlct.disabled = true;

			branchIdEmployeeEditSlct.innerHTML = "";
			var adminOption = document.createElement("option");
			adminOption.className = "optionsForBranch";
			adminOption.innerHTML = TransformBranchTo("string", branchId);
			branchIdEmployeeEditSlct.appendChild(adminOption);
		}
		else {
			branchIdEmployeeEditSlct.disabled = false;
			this.UpdateBranchAvailable(username, TranslateStatusTo("english", statusEmployeeEditSelect.value), branchId, branchIdEmployeeEditSlct);;
		}
		if(branchId != 0) {
			statusEmployeeEditSelect.addEventListener("change", function() {
				var serverCommun = new ServerCommunication();
				serverCommun.UpdateBranchAvailable(username, TranslateStatusTo("english", statusEmployeeEditSelect.value), branchId, branchIdEmployeeEditSlct);
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
		recruitmentDayEmployeeEditInpt.value = recruitmentDay;
		recruitmentDayEmployeeEditInpt.value = ConvertFromDate(recruitmentDay);
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

		function CallAsyncEmployee() {
			var employee = {
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
				if(username == usernameEmployeeEditInpt.value && email == emailEmployeeEditInpt.value && wage == wageEmployeeEditInpt.value && status == TranslateStatusTo("english", statusEmployeeEditSelect.value) && branchIdEmployeeEditSlct.value.includes(branchId)) {
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
					if((userIn == username) && (username != usernameEmployeeEditInpt.value || email != emailEmployeeEditInpt.value || TranslateStatusTo("greek", status) != statusEmployeeEditSelect.value)) {
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
					jQuery('#yesAddNewInfoBtn').one("click", function() {EmployeeApproveClickOkBtn(employee, situationToStayAfterChange);});
					noAddNewInfoBtn.addEventListener("click", function() {EmployeeClickCancelBtn();});
				}
			}
		}

		function ShowChangesOfEdit() {
			if(username != usernameEmployeeEditInpt.value) {
				usernameEmployeeEditInpt.style.borderColor = "green";
			}

			if(email != emailEmployeeEditInpt.value) {
				emailEmployeeEditInpt.style.borderColor = "green";
			}

			if(name != nameEmployeeEditInpt.value) {
				nameEmployeeEditInpt.style.borderColor = "green";
			}

			if(wage != wageEmployeeEditInpt.value) {
				wageEmployeeEditInpt.style.borderColor = "green";
			}

			if(status != TranslateStatusTo("english", statusEmployeeEditSelect.value)) {
				statusEmployeeEditSelect.style.borderColor = "green";
			}

			if(branchId == null) {
				if(branchIdEmployeeEditSlct.value.includes("#")) {
					branchIdEmployeeEditSlct.style.borderColor = "green";
				}
			}
			else {
				if(!branchIdEmployeeEditSlct.value.includes(branchId)) {
					branchIdEmployeeEditSlct.style.borderColor = "green";
				}
			}
		}

		function BackToWaitingEditPanel() {
			usernameEmployeeEditInpt.style.borderColor = "rgb(13, 18, 24)";
			emailEmployeeEditInpt.style.borderColor = "rgb(13, 18, 24)";
			nameEmployeeEditInpt.style.borderColor = "rgb(13, 18, 24)";
			wageEmployeeEditInpt.style.borderColor = "rgb(13, 18, 24)";
			statusEmployeeEditSelect.style.borderColor = "rgb(13, 18, 24)";
			branchIdEmployeeEditSlct.style.borderColor = "rgb(13, 18, 24)";
		}

		async function EmployeeApproveClickOkBtn(employee, situation) {
			var errorMessages = 0;
			errorMessages = await CreateAsyncEmployee(employee);

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
							if(allEmployees[i].username == usernameEmployeeEditInpt.value && usernameEmployeeEditInpt.value != username) {
								errorUsername = 1;
								break;
							}
						}

						for(var i = 0; i < allEmployees.length; i++) {
							if(allEmployees[i].email == emailEmployeeEditInpt.value && emailEmployeeEditInpt.value != email) {
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
							alertInfoForCreatNewItemC.style.display = "none";
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

		function CreateAsyncEmployee(employee, e) {
			if(!employee.branchId.includes("#")) {
				employee.branchId = "";
			}
			else {
				employee.branchId = employee.branchId .substring(1, 5);
				if((employee.status != status || employee.branchId != branchId) && status == "Employee Manager") {
    				impChange = 1;
    			}
			}

			var employeeStr = JSON.stringify(employee);

			return new Promise ((resolve, reject) => {
				$.ajax({
					type: 'POST',
					url: "../Php/updateEmployeesEditPhp.php",
					data: {employee: employeeStr, key: username, userThatMakeChanges: userIn, importantChange: impChange, previousBranch: branchId},
					success: function(data) {
						//alert(data);
						resolve(data);
					}
				});
			});
		}

		function EmployeeClickCancelBtn() {
			alertAddNewInfoC.style.display = "none";
			usernameEmployeeEditInpt.value = username;
			emailEmployeeEditInpt.value = email;
			nameEmployeeEditInpt.value = name;
			wageEmployeeEditInpt.value = wage;
			statusEmployeeEditSelect.value = currentStatusSelected;
			if(branchId == 0) {
				branchIdEmployeeEditSlct.disabled = true;

				branchIdEmployeeEditSlct.innerHTML = "";
				var adminOption = document.createElement("option");
				adminOption.className = "optionsForBranch";
				adminOption.innerHTML = TransformBranchTo("string", branchId);
				branchIdEmployeeEditSlct.appendChild(adminOption);
			}
			else {
				branchIdEmployeeEditSlct.disabled = false;
				var serverCommun = new ServerCommunication();
				serverCommun.UpdateBranchAvailable(username, TranslateStatusTo("english", statusEmployeeEditSelect.value), branchId, branchIdEmployeeEditSlct);
			}
			BackToWaitingEditPanel();
		}
		//**
	}

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
				addNewInfoTextC.innerHTML = "Ολα τα πεδία είναι έγκυρα. Είστε σίγουρος ότι θέλετε να προσλάβετε πρώην υπάλληλο.";

				yesAddNewInfoBtn.addEventListener("click", function() {
					HireNewEmployee();
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
		function HireNewEmployee() {
			var newExEmployee = {
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

	//WHEN ADMIN CHANGE STATUS OF EMPLOYEE, SHOWS AVAILABLE BRANCHES TO WORK
	this.UpdateBranchAvailable = function (usernameKey, status, branchId, branchIdEditSelect) {
		$.ajax({
			type: 'POST',
			url: "../Php/getBranchesAvailableForEmployeePhp.php",
			data: {key: usernameKey, statusSearch: status},
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
						if(usernameKey != "") {
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
						option.disabled = "disabled";
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
				//currentBranchSelected = branchIdEditSelect.options[branchIdEditSelect.selectedIndex].text;
			}
		});
	}
}