function ServerCommunication() {

	this.UpdateInfoOfEmployee = function(panelOfEmployeeC, username, email, name, branchId, status, sex, wage, recruitmentDay) {
		//CLOSE MENU IF IS OPENED
		var leftC = document.getElementById("leftC");
		var leftFixedC = document.getElementById("leftFixedC");
		var menuSymbolC = document.getElementById("menuSymbolC");
		var menuBtn = document.getElementById("menuBtn");
		var coverPageHelperC = document.getElementById("coverPageHelperC");
		var alertInfoForCreatNewBranchC = document.getElementById("alertInfoForCreatNewBranchC");
		var alertInfoForCreatNewBranchTextC = document.getElementById("alertInfoForCreatNewBranchTextC");
		var alertInfoForCreatNewBranchBtn = document.getElementById("alertInfoForCreatNewBranchBtn");
		var alertAddNewInfoC = document.getElementById("alertAddNewInfoC");
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

		var statusArrayTranslate = ["Γενικός Διαχειριστής", "Υπεύθυνος Διαχείρισης", "Υπάλληλος Πρακτορείου", "Υπεύθυνος Αποθήκης"];
		var statusArray = ["Admin", "Employee Manager", "Agency Employee", "Store Manager"];
		var statusNow = -10;
		
		//CREATE THE OPTIONS MENU FOR STATUS
		function CreateStatusOptions(select) {
			var options = [];
			for(var i = 0; i < statusArrayTranslate.length; i++) {
				if((statusArray[i] != "Admin" && status != "Admin") || (status == "Admin")) {
					options[i] = document.createElement("option");
					options[i].className = "optionsForStatus";
					options[i].innerHTML = statusArrayTranslate[i];
					if(statusArray[i] == status) {
						options[i].selected = "selected";
						statusNow = i;	
					}
					select.appendChild(options[i]);
				}
			}
		}

		function GetStartingStatusOption(language) {
			if(language == "greek") {
				return statusArrayTranslate[statusNow];
			}
			else {
				return statusArray[statusNow];
			}
		}

		//TRANSLATE STATUS
		function TranslateStatusTo(language, statusOption) {
			var p = 0;
			if(language == "greek") {
				for(var i = 0; i < statusArray.length; i++) {
					if(statusOption == statusArrayTranslate[i]) {
						p = i;
					}
				}
				return statusArrayTranslate[p];
			}
			else if(language == "english") { 
				for(var i = 0; i < statusArrayTranslate.length; i++) {
					if(statusOption == statusArrayTranslate[i]) {
						p = i;
					}
				}
				return statusArray[p];
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
		var usernameEmployeeEditTextC = document.createElement("div");
		usernameEmployeeEditTextC.id = "usernameEmployeeEditTextC";
		usernameEmployeeEditTextC.innerHTML = "Όνομα χρήστη";
		var usernameEmployeeEditInpt = document.createElement("input");
		usernameEmployeeEditInpt.id = "usernameEmployeeEditInpt";
		usernameEmployeeEditInpt.addEventListener("keypress", NoWhiteSpace);
		usernameEmployeeEditInpt.oninput = function () {
			if (this.value.length > 25) {
				this.value = this.value.slice(0, 25); 
			}
		}
		usernameEmployeeEditInpt.value = username;
		usernameEmployeeEditC.appendChild(usernameEmployeeEditTextC);
		usernameEmployeeEditC.appendChild(usernameEmployeeEditInpt);
		editInfoGetterLeftC.appendChild(usernameEmployeeEditC);

		//EMPLOYEE EMAIL EDIT WINDOW
		var emailEmployeeEditC = document.createElement("div");
		emailEmployeeEditC.id = "emailEmployeeEditC";
		var emailEmployeeEditTextC = document.createElement("div");
		emailEmployeeEditTextC.id = "emailEmployeeEditTextC";
		emailEmployeeEditTextC.innerHTML = "Email";
		var emailEmployeeEditInpt = document.createElement("input");
		emailEmployeeEditInpt.id = "emailEmployeeEditInpt";
		emailEmployeeEditInpt.oninput = function () {
			if (this.value.length > 35) {
				this.value = this.value.slice(0, 35); 
			}
		}
		emailEmployeeEditInpt.addEventListener("keypress", NoWhiteSpace);
		emailEmployeeEditInpt.value = email;
		emailEmployeeEditC.appendChild(emailEmployeeEditTextC);
		emailEmployeeEditC.appendChild(emailEmployeeEditInpt);
		editInfoGetterLeftC.appendChild(emailEmployeeEditC);

		//EMPLOYEE NAME EDIT WINDOW
		var nameEmployeeEditC = document.createElement("div");
		nameEmployeeEditC.id = "nameEmployeeEditC";
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
		var wageEmployeeEditTextC = document.createElement("div");
		wageEmployeeEditTextC.id = "wageEmployeeEditTextC";
		wageEmployeeEditTextC.innerHTML = "Μισθός (€)";
		var wageEmployeeEditInpt = document.createElement("input");
		wageEmployeeEditInpt.id = "wageEmployeeEditInpt";
		wageEmployeeEditInpt.type = "number";
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
		editInfoGetterLeftC.appendChild(wageEmployeeEditC);

		//EMPLOYEE STATUS EDIT WINDOW
		var statusEmployeeEditC = document.createElement("div");
		statusEmployeeEditC.id = "statusEmployeeEditC";
		var statusEmployeeEditTextC = document.createElement("div");
		statusEmployeeEditTextC.id = "statusEmployeeEditTextC";
		statusEmployeeEditTextC.innerHTML = "Ρόλος";
		var statusEmployeeEditSelect = document.createElement("select");
		statusEmployeeEditSelect.id = "statusEmployeeEditSelect";
		CreateStatusOptions(statusEmployeeEditSelect);
		if(branchId != 0) {
			statusEmployeeEditSelect.addEventListener("change", function() {
				UpdateBranchAvailable();
			});
		}
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
		var branchIdEmployeeEditTextC = document.createElement("div");
		branchIdEmployeeEditTextC.id = "branchIdEmployeeEditTextC";
		branchIdEmployeeEditTextC.innerHTML = "Κωδικός καταστήματος";
		var branchIdEmployeeEditSlct = document.createElement("select");
		branchIdEmployeeEditSlct.id = "branchIdEmployeeEditSlct";
		branchIdEmployeeEditSlct.type = "number";
		var currentBranchSelected = "";
		if(branchId == 0) {
			branchIdEmployeeEditSlct.disabled = true;

			branchIdEmployeeEditSlct.innerHTML = "";
			var adminOption = document.createElement("option");
			adminOption.className = "optionsForBranch";
			adminOption.innerHTML = branchId;
			branchIdEmployeeEditSlct.appendChild(adminOption);
		}
		else {
			branchIdEmployeeEditSlct.disabled = false;
			UpdateBranchAvailable();
		}

		branchIdEmployeeEditC.appendChild(branchIdEmployeeEditTextC);
		branchIdEmployeeEditC.appendChild(branchIdEmployeeEditSlct);
		editInfoGetterRightC.appendChild(branchIdEmployeeEditC);

		//EMPLOYEE RECRUITMENTDAY EDIT WINDOW
		var recruitmentDayEmployeeEditC = document.createElement("div");
		recruitmentDayEmployeeEditC.id = "recruitmentDayEmployeeEditC";
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
		function IfElementNotEmpty(element) {
			if(element.value == "") {
				element.style.borderColor = "red";
				element.style.borderWidth = "3px";
				element.placeholder = "Το πεδίο είναι κενό!";
				return 0;
			}
			else {
				element.style.borderColor = "rgb(22, 36, 53)";
				element.style.borderWidth = "2px";
				element.placeholder = "";
				return 1;
			}
		}

		//WHEN ADMIN CHANGE STATUS OF EMPLOYEE, SHOWS AVAILABLE BRANCHES TO WORK
		function UpdateBranchAvailable() {
			var employee = {
    			'username': usernameEmployeeEditInpt.value,
    			'email': emailEmployeeEditInpt.value,
   				'name': nameEmployeeEditInpt.value,
    			'wage': wage,
    			'status': TranslateStatusTo("english", statusEmployeeEditSelect.value),
    			'branchId': branchIdEmployeeEditSlct.value
    		};

			$.ajax({
				type: 'POST',
				url: "../Php/updateEmployeeBranchesAvailablePhp.php",
				data: {key: username, statusSearch: employee.status},
				success: function(data) {
					//CREATE OPTIONS FOR BRANCH IDS AVAILABLE FOR EACH STATUS
					branchIdEmployeeEditSlct.innerHTML = "";
					var availableBranchesArray = JSON.parse(data);
					var idsOfAvailBranArray = [];
					var locOfAvailBranArray = [];
					var streetOfAvailBranArray = [];
					for(var i = 0; i < availableBranchesArray.length; i++) {
						idsOfAvailBranArray.push(availableBranchesArray[i].id);
						locOfAvailBranArray.push(availableBranchesArray[i].location);
						streetOfAvailBranArray.push(availableBranchesArray[i].street);
					}
					if(branchId == null) {
						idsOfAvailBranArray.push(branchId);
					}
					for(var i = 0; i < idsOfAvailBranArray.length; i++) {
						var option = document.createElement("option");
						option.className = "optionsForBranch";
						option.innerHTML = "#" + idsOfAvailBranArray[i] + " - " + locOfAvailBranArray[i] + " - " + streetOfAvailBranArray[i];
						branchIdEmployeeEditSlct.appendChild(option);
						if(branchId == idsOfAvailBranArray[i]) {
							option.selected = "selected";
							option.innerHTML += " (τωρινό)"
						}
						else {
							option.style.color = "green";
						}

						if(idsOfAvailBranArray[i] == null) {
							option.innerHTML = "Δεν έχει ορισθεί κατάστημα";
							option.disabled = "disabled";
							option.style.display = "none";
						}
					}
					currentBranchSelected = branchIdEmployeeEditSlct.options[branchIdEmployeeEditSlct.selectedIndex].text;
				}
			});
		}

		function CallAsyncEmployee() {
			var employee = {
    			'username': usernameEmployeeEditInpt.value,
    			'email': emailEmployeeEditInpt.value,
   				'name': nameEmployeeEditInpt.value,
    			'wage': wage,
    			'status': TranslateStatusTo("english", statusEmployeeEditSelect.value),
    			'branchId': branchIdEmployeeEditSlct.value
    		};

			var continueNoError = 0;
			continueNoError += IfElementNotEmpty(usernameEmployeeEditInpt);
			continueNoError += IfElementNotEmpty(emailEmployeeEditInpt);
			continueNoError += IfElementNotEmpty(wageEmployeeEditInpt);
			continueNoError += IfElementNotEmpty(statusEmployeeEditSelect);
			continueNoError += IfElementNotEmpty(branchIdEmployeeEditSlct);

			if(continueNoError == 5) {
				if(username == usernameEmployeeEditInpt.value && email == emailEmployeeEditInpt.value && wage == wageEmployeeEditInpt.value && status == TranslateStatusTo("english", statusEmployeeEditSelect.value) && branchIdEmployeeEditSlct.value.includes(branchId)) {
					alertInfoForCreatNewBranchC.style.display = "table";
					alertInfoForCreatNewBranchTextC.innerHTML = "Δεν έχει γίνει καμία αλλαγή!";
					alertInfoForCreatNewBranchBtn.innerHTML = "Το κατάλαβα";
					alertInfoForCreatNewBranchBtn.addEventListener("click", function() {
						alertInfoForCreatNewBranchC.style.display = "none";
					});
				}
				else {
					var situationToStayAfterChange = "continue";

					alertAddNewInfoC.style.display = "block";
					alertInfoForCreatNewBranchC.style.display = "none";

					ShowChangesOfEdit();
					if((userIn == username) && (username != usernameEmployeeEditInpt.value || email != emailEmployeeEditInpt.value || TranslateStatusTo("greek", status) != statusEmployeeEditSelect.value)) {
						addNewInfoTextC.innerHTML = "Η αλλαγή ενός εκ των βασικών σας στοιχείων (Όνομα χρήστη ή/και Email), θα οδηγήσει σε αποσύνδεση. Βεβαιωθείτε ότι θυμάστε τα στοιχεία που αλλάξατε. Να ολοκληρωθεί η διαδικασία;";
						situationToStayAfterChange = "exit";
					}
					else {
						addNewInfoTextC.innerHTML = "Η αλλαγή των προσωπικών στοιχείων ενός υπαλλήλου, μπορούν να προκαλέσουν προβλήματα στην λειτουργία των καταστημάτων.<br>Βεβαιωθείτε πρώτα, ότι έχετε ενημερώσει τον υπάλληλο και τον μάνατζερ του καταστήματος. <br>Θέλετε να ολοκληρώσετε την διαδικασία; (τα αλλαγμένα πεδία φαίνονται με πράσινο)<br>Η σελίδα θα ανανεωθεί αυτόματα αφού ολοκληρωθεί η διαδικασία.";
						situationToStayAfterChange = "continue";
					}
					yesAddNewInfoBtn.addEventListener("click", function() {EmployeeApproveClickOkBtn(employee, situationToStayAfterChange);});
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
			var messagesArray = await CreateAsyncEmployee(employee);

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

		function CreateAsyncEmployee(employee) {
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
			branchIdEmployeeEditSlct.value = currentBranchSelected;
			BackToWaitingEditPanel();
		}
		//**
	}
}