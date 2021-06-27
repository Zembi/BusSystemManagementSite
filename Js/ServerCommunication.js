function ServerCommunication() {

	this.UpdateInfoOfEmploye = function(panelOfEmployeeC, username, email, name, branchId, status, wage, recruitmentDay) {
		//CLOSE MENU IF IS OPENED
		var leftC = document.getElementById("leftC");
		var leftFixedC = document.getElementById("leftFixedC");
		var menuSymbolC = document.getElementById("menuSymbolC");
		var menuBtn = document.getElementById("menuBtn");
		var editAlertBeforeEndTaskC = document.getElementById("editAlertBeforeEndTaskC");
		var editAlertTextC = document.getElementById("editAlertTextC");
		var editAlertOkBtn = document.getElementById("editAlertOkBtn");
		var editAlertCancelBtn = document.getElementById("editAlertCancelBtn");

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
		
		//NO WHITE SPACE USERNAME BAR
		function NoWhiteSpaceInUsernameBar() { 
			var key = event.keyCode;
			if (key === 32) {
				event.preventDefault();
			}
		}

		//ALLOW ONLY NUMBERS IN INPUT
		function OnlyNumberKey(evt, symbol) {
			var ASCIICode = (evt.which) ? evt.which : evt.keyCode
			if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)) {
				if(symbol == "dot")	{
					if(ASCIICode != 46) {
						evt.preventDefault();
					}
				}
				else {
					evt.preventDefault();
				}
			}
		}

		//CONVERT DATE FORMAT TO INPUT DATE
		function ConvertFromDate(recruitmentDayDate) {
			var date = new Date(recruitmentDayDate);
			var year = date.getFullYear() + "";
			var month = date.getMonth() + 1 + "";
			var day = date.getDate() + "";

			if(month.length < 2) {
				month = "0" + month;
			}
			
			if(day.length < 2) {
				day = "0" + day;
			}
			return (year + "-" + month + "-" + day);
		}

		function ConvertToDate(recruitmentDayDate) {
			var date = new Date(recruitmentDayDate);
			var year = date.getFullYear() + "";
			var month = date.getMonth() + 1 + "";
			var day = date.getDate() + "";

			if(month.length < 2) {
				month = "0" + month;
			}
			
			if(day.length < 2) {
				day = "0" + day;
			}
			return (month + "/" + day + "/" + year);
		}

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
		usernameEmployeeEditInpt.addEventListener("keypress", NoWhiteSpaceInUsernameBar);
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
		emailEmployeeEditInpt.addEventListener("keypress", NoWhiteSpaceInUsernameBar);
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
		nameEmployeeEditInpt.disabled = "true";
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
		var currentSelected = GetStartingStatusOption("greek");
		if(statusEmployeeEditSelect.value == "Γενικός Διαχειριστής") {
			statusEmployeeEditSelect.disabled = "false";
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
		var branchIdEmployeeEditInpt = document.createElement("input");
		branchIdEmployeeEditInpt.id = "branchIdEmployeeEditInpt";
		branchIdEmployeeEditInpt.type = "number";
		branchIdEmployeeEditInpt.value = branchId;
		if(branchIdEmployeeEditInpt.value.length < 4) {
			branchIdEmployeeEditInpt.disabled = "true";
		}
		else {
			branchIdEmployeeEditInpt.addEventListener("keypress", function() {
				OnlyNumberKey(event, "");
			});
			branchIdEmployeeEditInpt.oninput = function () {
				if (this.value.length > 4) {
					this.value = this.value.slice(0,4); 
				}
			}
		}
		branchIdEmployeeEditC.appendChild(branchIdEmployeeEditTextC);
		branchIdEmployeeEditC.appendChild(branchIdEmployeeEditInpt);
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
		//recruitmentDayEmployeeEditInpt.value = ConvertFromDate(recruitmentDay);
		recruitmentDayEmployeeEditInpt.disabled = "true";
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

		function CreateAsyncEmployee(employeeStr) {
			$.ajax({
				type: 'POST',
				url: "../Php/updateEmployeesEditPhp.php",
				data: {employee: employeeStr, key: username, userThatMakeChanges: userIn},
				success: function(data) {
					alert(data);
				}
			});
		}

		function CallAsyncEmployee() {
			var employee = {
    			'username': usernameEmployeeEditInpt.value,
    			'email': emailEmployeeEditInpt.value,
   				'name': nameEmployeeEditInpt.value,
    			'branchId': branchIdEmployeeEditInpt.value,
    			'status': TranslateStatusTo("english", statusEmployeeEditSelect.value),
    			'wage': wage,
    			'recruitmentDay': ConvertToDate(recruitmentDayEmployeeEditInpt.value)
    		};

			var continueNoError = 0;
			continueNoError += IfElementNotEmpty(usernameEmployeeEditInpt);
			continueNoError += IfElementNotEmpty(emailEmployeeEditInpt);
			continueNoError += IfElementNotEmpty(wageEmployeeEditInpt);
			continueNoError += IfElementNotEmpty(statusEmployeeEditSelect);
			continueNoError += IfElementNotEmpty(branchIdEmployeeEditInpt);
			continueNoError += IfElementNotEmpty(recruitmentDayEmployeeEditInpt);
			if(continueNoError == 6) {
				editAlertBeforeEndTaskC.style.display = "block";
				editAlertCancelBtn.addEventListener("click", function() {EmployeeApproveClickCancelBtn();});
				if(username == usernameEmployeeEditInpt.value && email == emailEmployeeEditInpt.value && name == nameEmployeeEditInpt.value && branchId == branchIdEmployeeEditInpt.value && status == TranslateStatusTo("english", statusEmployeeEditSelect.value) && wage == wageEmployeeEditInpt.value) {
					editAlertTextC.innerHTML = "Δεν έχει γίνει καμία αλλαγή!";
					editAlertOkBtn.style.display = "none";
				}
				else {
					var situationToStayAfterChange = "continue";

					ShowChangesOfEdit();
					editAlertOkBtn.style.display = "block";
					if((userIn == username) && (username != usernameEmployeeEditInpt.value || email != emailEmployeeEditInpt.value || TranslateStatusTo("greek", status) != statusEmployeeEditSelect.value)) {
						editAlertTextC.innerHTML = "Η αλλαγή ενός εκ των βασικών σας στοιχείων (Όνομα χρήστη, Email ή/και Ρόλος), θα οδηγήσει σε αποσύνδεση. Βεβαιωθείτε ότι θυμάστε τα στοιχεία που αλλάξατε. Να ολοκληρωθεί η διαδικασία;";
						situationToStayAfterChange = "exit";
					}
					else {
						editAlertTextC.innerHTML = "Είστε σίγουρος για την ολοκλήρωση της διαδικασίας;";
						situationToStayAfterChange = "continue";
					}
					editAlertOkBtn.addEventListener("click", function() {EmployeeApproveClickOkBtn(employee, situationToStayAfterChange);});
					NewEmployeeInfoApprovedAndAddBack(employee);
				}
			}
		}

		function ShowChangesOfEdit() {
			if(username != usernameEmployeeEditInpt.value) {
				usernameEmployeeEditInpt.style.borderColor = "blue";
			}
			if(email != emailEmployeeEditInpt.value) {
				emailEmployeeEditInpt.style.borderColor = "blue";
			}
			if(name != nameEmployeeEditInpt.value) {
				nameEmployeeEditInpt.style.borderColor = "blue";
			}
			if(wage != wageEmployeeEditInpt.value) {
				wageEmployeeEditInpt.style.borderColor = "blue";
			}
			if(status != TranslateStatusTo("english", statusEmployeeEditSelect.value)) {
				statusEmployeeEditSelect.style.borderColor = "blue";
			}
			if(branchId != branchIdEmployeeEditInpt.value) {
				branchIdEmployeeEditInpt.style.borderColor = "blue";
			}
		}

		function BackToWaitingEditPanel() {
			usernameEmployeeEditInpt.style.borderColor = "rgb(13, 18, 24)";
			emailEmployeeEditInpt.style.borderColor = "rgb(13, 18, 24)";
			nameEmployeeEditInpt.style.borderColor = "rgb(13, 18, 24)";
			wageEmployeeEditInpt.style.borderColor = "rgb(13, 18, 24)";
			statusEmployeeEditSelect.style.borderColor = "rgb(13, 18, 24)";
			branchIdEmployeeEditInpt.style.borderColor = "rgb(13, 18, 24)";
		}

		async function EmployeeApproveClickOkBtn(employee, situation) {
			var employeeStr = JSON.stringify(employee);
			await CreateAsyncEmployee(employeeStr);
			/*if(situation == "exit") {
				document.getElementById("logOutBtn").click();
			}
			else {
				BackToWaitingEditPanel();
			}*/
		}

		function EmployeeApproveClickCancelBtn() {
			editAlertBeforeEndTaskC.style.display = "none";
			usernameEmployeeEditInpt.value = username;
			emailEmployeeEditInpt.value = email;
			nameEmployeeEditInpt.value = name;
			wageEmployeeEditInpt.value = wage;
			statusEmployeeEditSelect.value = currentSelected;
			branchIdEmployeeEditInpt.value = branchId;
			BackToWaitingEditPanel();
		}

		function NewEmployeeInfoApprovedAndAddBack(employeeNewInfo) {
			panelOfEmployeeC.querySelector("#employeeUsernameTextC").innerHTML = employeeNewInfo.username;
			panelOfEmployeeC.querySelector("#employeeEmailTextC").innerHTML = employeeNewInfo.email;
			panelOfEmployeeC.querySelector("#employeeBranchTextC").innerHTML = employeeNewInfo.branchId;
			panelOfEmployeeC.querySelector("#employeeWageTextC").innerHTML = employeeNewInfo.wage;
		}
		//**
	}

	this.CheckIfNewBranchHas = function(panelOfEmployeeC) {
		var branchId = branchId;
		var branchObj = [];

		function CreateAsync() {
			return new Promise ((resolve, reject) => {
				$.ajax({
					type: 'POST',
					url: "../Php/findBranchPhp.php",
					data: {branch: branchId},
					datatype: text,
					success: function(data) {
						branchObj = JSON.parse(data);
						resolve(branchObj);
					}
				});
			});
		}

		async function CallAsync() {
			branchObj = await CreateAsync();
			panelOfEmployeeC.querySelector("#employeeBranchTextC").innerHTML = branchObj.id + " - " + branchObj.location + " - " + branchObj.street;
			panelOfEmployeeC.querySelector("#employeeBranchTextC").title = branchObj.type;
		}

		CallAsync();
	}
}