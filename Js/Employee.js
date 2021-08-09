
function Employee(username, email, name, icon,  branchId, status, sex, wage, recruitmentDay, afm, amka) {
	this.username = username;
	this.email = email;
	this.name = name;
	this.icon = icon;
	this.branchId = branchId;
	this.branchObj = [];
	this.status = status;
	this.sex = sex;
	//MAKE NUMBER HAVE ALWAYS 2 DECIMALS
	this.wage = RoundDecimal(wage, 2);
	this.recruitmentDay = recruitmentDay;
	this.afm = afm;
	this.amka = amka;
	this.lock;

	this.getUsername = function() {
		return this.username;
	}

	this.getEmail = function() {
		return this.email;
	}

	this.getName = function() {
		return this.name;
	}

	this.getIcon = function() {
		return this.icon;
	}

	this.getBranchId = function() {
		return this.branchId;
	}

	this.getStatus = function() {
		return this.status;
	}

	this.getSex = function() {
		return this.sex;
	}

	this.getWage = function() {
		return this.wage;
	}

	this.getRecruitmentDay = function() {
		return this.recruitmentDay;
	}

	this.getAFM = function() {
		return this.afm;
	}

	this.getAMKA = function() {
		return this.amka;
	}

	this.getUserImageSrc = function() {
		var imgSrc = "";

		if(this.icon == "male1") {
			imgSrc = "icons8_male_no1_40px.png";
		}
		else if(this.icon == "male2") {
			imgSrc = "icons8_male_no2_40px.png";
		}
		else if(this.icon == "male3") {
			imgSrc = "icons8_male_no3_40px.png";
		}
		else if(this.icon == "male4") {
			imgSrc = "icons8_male_no4_40px.png";
		}
		else if(this.icon == "male5") {
			imgSrc = "icons8_male_no5_40px.png";
		}
		else if(this.icon == "female1") {
			imgSrc = "icons8_female_no1_40px.png";
		}
		else if(this.icon == "female2") {
			imgSrc = "icons8_female_no2_40px.png";
		}
		else if(this.icon == "female3") {
			imgSrc = "icons8_female_no3_40px.png";
		}
		else if(this.icon == "female4") {
			imgSrc = "icons8_female_no4_40px.png";
		}
		else if(this.icon == "female5") {
			imgSrc = "icons8_female_no5_40px.png";
		}
		else {
			imgSrc = "none";
		}

		return imgSrc; 
	}

	this.createId = function(mainHover, parentElmnt, flashThisElement) {
		//MAIN INFO ID
		var userIdC = document.createElement("div");
		userIdC.id = "userIdC";

		var statusIdC = document.createElement("div");
		statusIdC.id = "statusIdC";
		statusIdC.innerHTML = TranslateStatusTo("greek", this.status);
		userIdC.appendChild(statusIdC);

		var imgIdC = document.createElement("div");
		imgIdC.id = "imgIdC";

		var imgIdImg = document.createElement("img");
		imgIdImg.id = "imgIdImg";
		imgIdImg.style.content = "url(../Assets/PersonType/" + this.getUserImageSrc() + ")";
		imgIdC.appendChild(imgIdImg);
		userIdC.appendChild(imgIdC);

		var usernameIdC = document.createElement("div");
		usernameIdC.id = "usernameIdC";
		usernameIdC.innerHTML = this.username;
		userIdC.appendChild(usernameIdC);

		var nameIdC = document.createElement("div");
		nameIdC.id = "nameIdC";
		nameIdC.innerHTML = this.name;
		userIdC.appendChild(nameIdC);
		
		var emailIdC = document.createElement("div");
		emailIdC.id = "emailIdC";
		emailIdC.innerHTML = this.email;
		userIdC.appendChild(emailIdC);

		parentElmnt.innerHTML = "";
		parentElmnt.appendChild(userIdC);

		if(mainHover == "username") {
			usernameIdC.style.color = "rgb(230, 215, 0)";
		}
		else if(mainHover == "email") {
			emailIdC.style.color = "rgb(230, 215, 0)";
		}
		else if(mainHover == "name") {
			nameIdC.style.color = "rgb(230, 215, 0)";
		}

		//CHECK FOR ANIMATION TO TRIGGER
		if(flashThisElement != "") {
			flashThisElement.style.animation = "flash 6s linear infinite";
		}
	}

	//FUNCTION RETURNING THE TIME, THE EMPLOYEE IS WORKING FOR THE COMPANY
	this.getDateDifferenceFromWhenEmployeeHired = function(type) {
		var dateStart = new Date();
		var dateNow = new Date(this.recruitmentDay);
		var time = (dateNow.getTime() - dateStart.getTime()) / 1000;

		var year  = Math.abs(Math.round((time / (60 * 60 * 24) / 365.25)));
		var month = Math.abs(Math.round(time / (60 * 60 * 24 * 7 * 4)));
		var days = Math.abs(Math.round(time / (3600 * 24)));

		if(type == "years") {
			if(year == 0) {
				if(month == 0) {
					return days;
				}
				else {
					return month;
				}
			}
			else {
				return year;
			}
		}
		else if(type == "months") {
			if(month == 0) {
				return days;
			}
			else {
				return month;
			}
		}
		else if(type == "days") {
			return days;
		}
	}

	//FUNCTION RETURN THE BRANCH THAT EMPLOYEE IS CURRENTLY WORKING OR NOT
	this.GetBranchThatWork = function(panelOfEmployeeC) {
		var branchId = this.getBranchId();
		var branchObj = [];

		if(branchId != null) {
			function CreateAsync() {
				return new Promise ((resolve, reject) => {
					$.ajax({
						type: 'POST',
						url: "../Php/findBranchPhp.php",
						data: {branch: branchId},
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
		else {
			panelOfEmployeeC.querySelector("#employeeBranchTextC").innerHTML = "Δεν ανήκει σε κάποιο κατάστημα";
			panelOfEmployeeC.style.background = "rgb(255, 215, 0, 0.0)";
			//ADD * TO HEADER EMPLOYEES WITHOUT BRANCHES
			var headerHelp = panelOfEmployeeC.querySelector("#employeeStatusC").innerHTML;
			panelOfEmployeeC.querySelector("#employeeStatusC").innerHTML = "* " + headerHelp + " *";
			panelOfEmployeeC.querySelector("#employeeBranchTextC").style.color = "rgb(255, 215, 0)";
			panelOfEmployeeC.querySelector("#employeeBranchTextC").title = "στην αναμονή";
		}
	}

	//CREATE THE PANEL OF THE EMPLOYEE WITH ALL HIS/HER INFO AND ADD IT TO THE PARENT ELEMENT SLIDE VIEW
	this.CreatePanelShowViewOfEmployee = function(parentElmnt, id) {
		var serverCommun = new ServerCommunication();
		var username = this.getUsername();
		var email = this.getEmail();
		var name = this.getName();
		var icon = this.getIcon();
		var branchId = this.getBranchId();
		var status = this.getStatus();
		var sex = this.getSex();
		var wage = this.getWage();
		var recruitmentDay = this.getRecruitmentDay();
		var afm = this.getAFM();
		var amka = this.getAMKA();

		var alertInfoForCreatNewItemC = document.getElementById("alertInfoForCreatNewItemC");
		var alertInfoForCreatNewItemTextC = document.getElementById("alertInfoForCreatNewItemTextC");
		var alertInfoForCreatNewItemBtn = document.getElementById("alertInfoForCreatNewItemBtn");
		var alertAddNewInfoC = document.getElementById("alertAddNewInfoC");
		var addNewInfoTitleTextC = document.getElementById("addNewInfoTitleTextC");
		var addNewInfoTextC = document.getElementById("addNewInfoTextC");
		var yesAddNewInfoBtn = document.getElementById("yesAddNewInfoBtn");
		var noAddNewInfoBtn = document.getElementById("noAddNewInfoBtn");

		var panelOfEmployeeC = document.createElement("div");
		panelOfEmployeeC.id = this.username + " ++++ " + id;
		panelOfEmployeeC.className = "panelOfEmployeeC";
		panelOfEmployeeC.style.left = (panelOfEmployeeC.offsetWidth * id) + "px";

		var employeeEditInfoC = document.createElement("div");
		employeeEditInfoC.id = "employeeEditInfoC";
		var employeeEditInfoBtn = document.createElement("button");
		employeeEditInfoBtn.id = "employeeEditInfoBtn";
		employeeEditInfoBtn.addEventListener("click", function() {
			serverCommun.UpdateInfoOfEmployee(panelOfEmployeeC, username, email, name, branchId, status, sex, wage, recruitmentDay);
		});
		var employeeEditInfoImg = document.createElement("img");
		employeeEditInfoImg.id = "employeeEditInfoImg";
		employeeEditInfoBtn.appendChild(employeeEditInfoImg);
		employeeEditInfoC.appendChild(employeeEditInfoBtn);
		panelOfEmployeeC.appendChild(employeeEditInfoC);

		var employeeAskInfoC = document.createElement("div");
		employeeAskInfoC.id = "employeeAskInfoC";
		var employeeAskInfoBtn = document.createElement("button");
		employeeAskInfoBtn.id = "employeeAskInfoBtn";
		employeeAskInfoBtn.addEventListener("click", function() {
			alertInfoForCreatNewItemC.style.display = "table";
			if(panelOfEmployeeC.id.includes(userInObject.getUsername())) {
				alertInfoForCreatNewItemTextC.innerHTML = "Δεν μπορείτε να απολυθείτε ή να παραιτηθείτε, μέσα από τον δικό σας λογαριασμό.<br>Κάποιος άλλος Admin, μπορεί να εκτελέσει αυτές τις ενέργειες, για εσάς.";	
			}
			else {
				alertInfoForCreatNewItemTextC.innerHTML = "Κάνοντας διπλό κλικ, πάνω στην καρτέλα του κάθε υπαλλήλου, μπορείτε να δείτε το μενού με βασικές ενέργειες.";
			}
			alertInfoForCreatNewItemBtn.focus();
			alertInfoForCreatNewItemBtn.innerHTML = "Το κατάλαβα";
			alertInfoForCreatNewItemBtn.addEventListener("click", function() {
				alertInfoForCreatNewItemC.style.display = "none";
			});
		});
		var employeeAskInfoImg = document.createElement("img");
		employeeAskInfoImg.id = "employeeAskInfoImg";
		employeeAskInfoBtn.appendChild(employeeAskInfoImg);
		employeeAskInfoC.appendChild(employeeAskInfoBtn);
		panelOfEmployeeC.appendChild(employeeAskInfoC);

		var employeeStatusC = document.createElement("div");
		employeeStatusC.id = "employeeStatusC";
		employeeStatusC.innerHTML = TranslateStatusTo("greek", status);
		panelOfEmployeeC.appendChild(employeeStatusC);

		var employeeLockUnclockBtn = document.createElement("button");
		employeeLockUnclockBtn.id = "employeeLockUnclockBtn";
		employeeLockUnclockBtn.tabIndex = "-1";
		var employeeLockUnclockImg = document.createElement("img");
		employeeLockUnclockImg.id = "employeeLockUnclockImg";
		employeeLockUnclockBtn.appendChild(employeeLockUnclockImg);
		panelOfEmployeeC.appendChild(employeeLockUnclockBtn);

		var employeeUpColumnC = document.createElement("div");
		employeeUpColumnC.id = "employeeUpColumnC";

		var employeeLeftInfoC = document.createElement("div");
		employeeLeftInfoC.id = "employeeLeftInfoC";

		var employeeNameC = document.createElement("div");
		employeeNameC.id = "employeeNameC";
		var employeeNameTitleC = document.createElement("div");
		employeeNameTitleC.id = "employeeNameTitleC";
		employeeNameTitleC.innerHTML = "Ονοματεπώνυμο";
		employeeNameC.appendChild(employeeNameTitleC);
		var employeeNameTextC = document.createElement("div");
		employeeNameTextC.id = "employeeNameTextC";
		employeeNameTextC.innerHTML = this.getName();
		employeeNameC.appendChild(employeeNameTextC);
		employeeLeftInfoC.appendChild(employeeNameC);	

		var employeeUsernameC = document.createElement("div");
		employeeUsernameC.id = "employeeUsernameC";
		var employeeUsernameTitleC = document.createElement("div");
		employeeUsernameTitleC.id = "employeeUsernameTitleC";
		employeeUsernameTitleC.innerHTML = "Όνομα χρήστη";
		employeeUsernameC.appendChild(employeeUsernameTitleC);
		var employeeUsernameTextC = document.createElement("div");
		employeeUsernameTextC.id = "employeeUsernameTextC";
		employeeUsernameTextC.innerHTML = this.getUsername();
		employeeUsernameC.appendChild(employeeUsernameTextC);
		employeeLeftInfoC.appendChild(employeeUsernameC);
		employeeUpColumnC.appendChild(employeeLeftInfoC);

		var employeeRightInfoC = document.createElement("div");
		employeeRightInfoC.id = "employeeRightInfoC";

		var pictureOfEmployeeC = document.createElement("div");
		pictureOfEmployeeC.id = "pictureOfEmployeeC";
		var pictureOfEmployeeTextC = document.createElement("div");
		pictureOfEmployeeTextC.id = "pictureOfEmployeeTextC";
		pictureOfEmployeeTextC.innerHTML = "Εικόνα";
		var pictureOfEmployeeImg = document.createElement("img");
		pictureOfEmployeeImg.id = "pictureOfEmployeeImg";
		pictureOfEmployeeImg.style.content = "url(../Assets/PersonType/" + this.getUserImageSrc() + ")";
		pictureOfEmployeeC.appendChild(pictureOfEmployeeTextC);
		pictureOfEmployeeC.appendChild(pictureOfEmployeeImg);
		employeeRightInfoC.appendChild(pictureOfEmployeeC);
		employeeUpColumnC.appendChild(employeeRightInfoC);
		panelOfEmployeeC.appendChild(employeeUpColumnC);

		var employeeEmailC = document.createElement("div");
		employeeEmailC.id = "employeeEmailC";
		var employeeEmailTitleC = document.createElement("div");
		employeeEmailTitleC.id = "employeeEmailTitleC";
		employeeEmailTitleC.innerHTML = "Email";
		employeeEmailC.appendChild(employeeEmailTitleC);
		var employeeEmailTextC = document.createElement("div");
		employeeEmailTextC.id = "employeeEmailTextC";
		employeeEmailTextC.innerHTML = this.getEmail();
		employeeEmailC.appendChild(employeeEmailTextC);
		panelOfEmployeeC.appendChild(employeeEmailC);

		var employeeBranchC = document.createElement("div");
		employeeBranchC.id = "employeeBranchC";
		var employeeBranchTitleC = document.createElement("div");
		employeeBranchTitleC.id = "employeeBranchTitleC";
		employeeBranchTitleC.innerHTML = "Κατάστημα";
		employeeBranchC.appendChild(employeeBranchTitleC);
		var employeeBranchTextC = document.createElement("div");
		employeeBranchTextC.id = "employeeBranchTextC";
		employeeBranchC.appendChild(employeeBranchTextC);
		panelOfEmployeeC.appendChild(employeeBranchC);
		
		var employeeWageC = document.createElement("div");
		employeeWageC.id = "employeeWageC";
		var employeeWageTitleC = document.createElement("div");
		employeeWageTitleC.id = "employeeWageTitleC";
		employeeWageTitleC.innerHTML = "Μισθός";
		employeeWageC.appendChild(employeeWageTitleC);
		var employeeWageTextC = document.createElement("div");
		employeeWageTextC.id = "employeeWageTextC";
		var wage = this.getWage();
		employeeWageTextC.innerHTML = wage + " €";
		employeeWageC.appendChild(employeeWageTextC);
		panelOfEmployeeC.appendChild(employeeWageC);

		var employeeRecruitmentDayC = document.createElement("div");
		employeeRecruitmentDayC.id = "employeeRecruitmentDayC";
		var employeeRecruitmentDayTitleC = document.createElement("div");
		employeeRecruitmentDayTitleC.id = "employeeRecruitmentDayTitleC";
		employeeRecruitmentDayTitleC.innerHTML = "Ημερομηνία πρόσληψης";
		employeeRecruitmentDayC.appendChild(employeeRecruitmentDayTitleC);
		var employeeRecruitmentDayTextC = document.createElement("div");
		employeeRecruitmentDayTextC.id = "employeeRecruitmentDayTextC";
		employeeRecruitmentDayC.appendChild(employeeRecruitmentDayTextC);
		panelOfEmployeeC.appendChild(employeeRecruitmentDayC);
		var date = new Date(this.getRecruitmentDay());
		let year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
		let month = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
		let day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
		var newDate = `${day}  ${month}  ${year}`;
		var days = this.getDateDifferenceFromWhenEmployeeHired("days");
		employeeRecruitmentDayTextC.innerHTML = newDate;
		employeeRecruitmentDayTextC.title = "" + days + " ημέρες";

		var employeeAFMC = document.createElement("div");
		employeeAFMC.id = "employeeAFMC";
		var employeeAFMTitleC = document.createElement("div");
		employeeAFMTitleC.id = "employeeAFMTitleC";
		employeeAFMTitleC.innerHTML = "ΑΦΜ";
		employeeAFMC.appendChild(employeeAFMTitleC);
		var employeeAFMTextC = document.createElement("div");
		employeeAFMTextC.id = "employeeAFMTextC";
		employeeAFMTextC.innerHTML = afm;
		employeeAFMC.appendChild(employeeAFMTextC);
		panelOfEmployeeC.appendChild(employeeAFMC);

		var employeeAMKAC = document.createElement("div");
		employeeAMKAC.id = "employeeAMKAC";
		var employeeAMKATitleC = document.createElement("div");
		employeeAMKATitleC.id = "employeeAMKATitleC";
		employeeAMKATitleC.innerHTML = "ΑΜΚΑ";
		employeeAMKAC.appendChild(employeeAMKATitleC);
		var employeeAMKATextC = document.createElement("div");
		employeeAMKATextC.id = "employeeAMKATextC";
		employeeAMKATextC.innerHTML = amka;
		employeeAMKAC.appendChild(employeeAMKATextC);
		panelOfEmployeeC.appendChild(employeeAMKAC);

		parentElmnt.appendChild(panelOfEmployeeC);

		panelOfEmployeeC.addEventListener("mouseover", function() {
			for(var i = 0; i < idOfPanels.length; i++) {
				if(idOfPanels[i] == id) {
					var idOfEmployeeC = "no" + (i + 1) + "EmployeeC";
					document.getElementById(idOfEmployeeC).style.border = "11px solid red";
				}
			}
		});
		panelOfEmployeeC.addEventListener("mouseout", function() {
			for(var i = 0; i < idOfPanels.length; i++) {
				if(idOfPanels[i] == id) {
					var idOfEmployeeC = "no" + (i + 1) + "EmployeeC";
					document.getElementById(idOfEmployeeC).style.border = "11px solid rgb(255, 215, 0)";
				}
			}
		});

		this.HideOrShowInfoLock(panelOfEmployeeC);

		if(this.getBranchId() != 0) {
			this.GetBranchThatWork(panelOfEmployeeC);
		}
		else {
			if(this.getSex() == "Male") {
				employeeBranchTextC.innerHTML = this.getBranchId() + " - Διαχειριστής";
			}
			else {
				employeeBranchTextC.innerHTML = this.getBranchId() + " - Διαχειρίστρια";
			}
			employeeBranchTextC.title = "Διαχειριστική γραμμή";
		}
		var dblCounter = 0;

		//DOUBLE CLICK CONTAINER CREATE EVENT OPTIONS AS DISCHARGE AND RESIGN
		panelOfEmployeeC.title = "Διπλό κλικ για περισσότερες ενέργειες";
		panelOfEmployeeC.addEventListener("dblclick", function() {
			var allGood = 1;

			if(dblCounter == 0 && !panelOfEmployeeC.id.includes(userInObject.getUsername())) {
				//CREATE GENERAL CONTAINER
				var dischOrResignOptionC = document.createElement("div");
				dischOrResignOptionC.id = "dischOrResignOptionC";

				var closeDOrROptionBtn = document.createElement("button");
				closeDOrROptionBtn.id = "closeDOrROptionBtn";
				closeDOrROptionBtn.innerHTML = "X";
				closeDOrROptionBtn.addEventListener("click", function() {
					panelOfEmployeeC.querySelector("#dischOrResignOptionC").remove();
		
					dblCounter = 0;
				});
				closeDOrROptionBtn.addEventListener("mouseover", function() {
					showButtonFunctionC.style.display = "table";
					showButtonFunctionC.innerHTML = "Κλείσιμο";
				});
				closeDOrROptionBtn.addEventListener("mouseout", function() {
					showButtonFunctionC.style.display = "none";
					showButtonFunctionC.innerHTML = "";
				});

				var reasonToActC = document.createElement("div");
				reasonToActC.id = "reasonToActC";

				var reasonToActTitleC = document.createElement("div");
				reasonToActTitleC.id = "reasonToActTitleC";
				if(sex == "Male") {
					reasonToActTitleC.innerHTML = "Αιτιολογία για την αποδεύσμευση του <br>" + name;
				}
				else {
					reasonToActTitleC.innerHTML = "Αιτιολογία για την αποδεύσμευση της <br>" + name;
				}

				var reasonToActTxtAr = document.createElement("textarea");
				reasonToActTxtAr.id = "reasonToActTxtAr";
				reasonToActTxtAr.oninput = function () {
					if (this.value.length > 500) {
						this.value = this.value.slice(0, 500); 
					}
				}
				reasonToActTxtAr.placeholder = "Γράψτε εδώ ....";

				reasonToActC.appendChild(reasonToActTitleC);
				reasonToActC.appendChild(reasonToActTxtAr);

				var showButtonFunctionC = document.createElement("div");
				showButtonFunctionC.id = "showButtonFunctionC";

				var dischOrResignOptionCenterC = document.createElement("div");
				dischOrResignOptionCenterC.id = "dischOrResignOptionCenterC";

				//CREATE DISCHARGE CONTAINER
				var dischargeEmployeesC = document.createElement("div");
				dischargeEmployeesC.id = "dischargeEmployeesC";
				dischargeEmployeesC.className = "employeesMenuC";

				var dischargeEmployeeBtn = document.createElement("button");
				dischargeEmployeeBtn.id = "dischargeEmployeeBtn";
				dischargeEmployeeBtn.addEventListener("mouseover", function() {
					showButtonFunctionC.style.display = "table";
					showButtonFunctionC.innerHTML = "Απόλυση";
				});
				dischargeEmployeeBtn.addEventListener("mouseout", function() {
					showButtonFunctionC.style.display = "none";
					showButtonFunctionC.innerHTML = "";
				});
				//DISCHARGE BUTTON ACTIONS
				dischargeEmployeeBtn.addEventListener("click", function() {
					if(IfElmntNotEmpty(reasonToActTxtAr)) {
						alertInfoForCreatNewItemC.style.display = "none";
						alertAddNewInfoC.style.display = "block";
						addNewInfoTitleTextC.innerHTML = "ΑΠΟΛΥΣΗ ΥΠΑΛΛΗΛΟΥ";
						if(branchId == null) {
							addNewInfoTextC.innerHTML = "Η αποδεύσμευση ενός υπαλλήλου μπορεί να προκαλέσει προβλήματα στην λειτουργία του καταστήματος. Ωστόσο, ο συγκεκριμένος υπάλληλος δεν δουλεύει, προς το παρόν, σε κάποιο κατάστημα.<br>Βεβαιωθείτε, ότι έχετε επικοινωνήσει και ενημερώσει, τον υπάλληλο.<br>Είστε σίγουρος, για την απόλυση του υπαλλήλου || " + name + " || ;<br>(Η σελίδα θα ανανεωθεί αυτομάτα, στην συνέχεια της διαδικασίας)";
						}
						else {
							addNewInfoTextC.innerHTML = "Η αποδεύσμευση ενός υπαλλήλου μπορεί να προκαλέσει προβλήματα στην λειτουργία του καταστήματος #" + branchId + ".<br>Βεβαιωθείτε, ότι έχετε επικοινωνήσει και ενημερώσει, τον υπάλληλο, τον υπεύθυνο του καταστήματος #" + branchId + ", καθώς και τον μάνατζερ.<br>Είστε σίγουρος, για την απόλυση του υπαλλήλου || " + name + " || ;<br>(Η σελίδα θα ανανεωθεί αυτομάτα, στην συνέχεια της διαδικασίας)";
						}

						//CLEAR YES BUTTON EVENTS FIRST, EVERYTIME DISCHARGE BUTTON IS OPENING
						var oldYesAddNewInfoBtn = document.getElementById("yesAddNewInfoBtn");
						var newYesAddNewInfoBtn = oldYesAddNewInfoBtn.cloneNode(true);
						oldYesAddNewInfoBtn.parentNode.replaceChild(newYesAddNewInfoBtn, oldYesAddNewInfoBtn);
						newYesAddNewInfoBtn.addEventListener("click", function() {
							var endDay = ConvertFromDate(new Date());

							var exEmpl = {
								'username' : username,
								'name' : name,
								'email' : email,
								'icon' : icon,
								'lastBranchId' : branchId,
								'lastStatus' : status,
								'lastWage' : wage,
								'sex' : sex,
								'recruitmentDay' : recruitmentDay,
								'endDay' : endDay,
								'wayOutOfCompany' : "Discharge",
								'afm' : afm,
								'amka' : amka,
								'reason' : reasonToActTxtAr.value
							};
							exEmpl = JSON.stringify(exEmpl);

							$.ajax({
								type: 'POST',
								url: "../Php/dischargeOrResignEmployeePhp.php",
								data: {exEmployee: exEmpl},
								success: function(data) {
									//alert(data);
									//EVERYTHING OKAY
									if(data == "0") {
										location.reload();
									}
									//SOMETHING WRONG
									else {
										alertAddNewInfoC.style.display = "none";
										alertInfoForCreatNewItemC.style.display = "table";
										alertInfoForCreatNewItemTextC.innerHTML = "Κάτι πήγε λάθος, κατά την διαδικασία της αποδεύσμευσης του υπαλλήλου || " + name + " ||<br>Επαναλάβετε αργότερα, καθώς το σύστημα αντιμετωπίζει κάποιο πρόβλημα !";
										alertInfoForCreatNewItemBtn.innerHTML = "Το κατάλαβα";
										alertInfoForCreatNewItemBtn.focus();
									}
								}
							});
						});
						newYesAddNewInfoBtn.focus();
						noAddNewInfoBtn.addEventListener("click", function() {
							alertAddNewInfoC.style.display = "none";

						});
					}
				});

				var menuEmployeeTextC1 = document.createElement("div");
				menuEmployeeTextC1.className = "menuEmployeeTextC";
				dischargeEmployeeBtn.appendChild(menuEmployeeTextC1);

				var img1 = document.createElement("img");
				dischargeEmployeeBtn.appendChild(img1);

				dischargeEmployeesC.appendChild(dischargeEmployeeBtn);

				//CREATE RESIGN CONTAINER
				var resignationEmployeesC = document.createElement("div");
				resignationEmployeesC.id = "resignationEmployeesC";
				resignationEmployeesC.className = "employeesMenuC";

				var resignationEmployeeBtn = document.createElement("button");
				resignationEmployeeBtn.id = "resignationEmployeeBtn";
				resignationEmployeeBtn.addEventListener("mouseover", function() {
					showButtonFunctionC.style.display = "table";
					showButtonFunctionC.innerHTML = "Παραίτηση";
				});
				resignationEmployeeBtn.addEventListener("mouseout", function() {
					showButtonFunctionC.style.display = "none";
					showButtonFunctionC.innerHTML = "";
				});
				//RESIGN BUTTON ACTIONS
				resignationEmployeeBtn.addEventListener("click", function() {
					if(IfElmntNotEmpty(reasonToActTxtAr)) {
						alertInfoForCreatNewItemC.style.display = "none";
						alertAddNewInfoC.style.display = "block";
						addNewInfoTitleTextC.innerHTML = "ΠΑΡΑΙΤΗΣΗ ΥΠΑΛΛΗΛΟΥ";
						if(branchId == null) {
							addNewInfoTextC.innerHTML = "Η αποδεύσμευση ενός υπαλλήλου μπορεί να προκαλέσει προβλήματα στην λειτουργία του καταστήματος. Ωστόσο, ο συγκεκριμένος υπάλληλος δεν δουλεύει, προς το παρόν, σε κάποιο κατάστημα. <br>Βεβαιωθείτε, ότι έχετε επικοινωνήσει και ενημερώσει, τον υπάλληλο.<br>Είστε σίγουρος, για την αποδεύσμευση του υπαλλήλου || " + name + " ||, έπειτα από αίτημα παραίτησης ;<br>(Η σελίδα θα ανανεωθεί αυτομάτα, στην συνέχεια της διαδικασίας)";
						}
						else {
							addNewInfoTextC.innerHTML = "Η αποδεύσμευση ενός υπαλλήλου μπορεί να προκαλέσει προβλήματα στην λειτουργία του καταστήματος #" + branchId + ".<br>Βεβαιωθείτε, ότι έχετε επικοινωνήσει και ενημερώσει, τον υπάλληλο, τον υπεύθυνο του καταστήματος #" + branchId + ", καθώς και τον μάνατζερ.<br>Είστε σίγουρος, για την αποδεύσμευση του υπαλλήλου || " + name + " ||, έπειτα από αίτημα παραίτησης ;<br>(Η σελίδα θα ανανεωθεί αυτομάτα, στην συνέχεια της διαδικασίας)";
						}

						//CLEAR YES BUTTON EVENTS FIRST, EVERYTIME RESIGN BUTTON IS OPENING
						var oldYesAddNewInfoBtn = document.getElementById("yesAddNewInfoBtn");
						var newYesAddNewInfoBtn = oldYesAddNewInfoBtn.cloneNode(true);
						oldYesAddNewInfoBtn.parentNode.replaceChild(newYesAddNewInfoBtn, oldYesAddNewInfoBtn);
						newYesAddNewInfoBtn.addEventListener("click", function() {
							var endDay = ConvertFromDate(new Date());

							var exEmpl = {
								'name' : name,
								'email' : email,
								'icon' : icon,
								'lastBranchId' : branchId,
								'lastStatus' : status,
								'lastWage' : wage,
								'sex' : sex,
								'recruitmentDay' : recruitmentDay,
								'endDay' : endDay,
								'wayOutOfCompany' : "Resign",
								'afm' : afm,
								'amka' : amka,
								'reason' : reasonToActTxtAr.value
							};
							
							exEmpl = JSON.stringify(exEmpl);

							$.ajax({
								type: 'POST',
								url: "../Php/dischargeOrResignEmployeePhp.php",
								data: {exEmployee: exEmpl},
								success: function(data) {
									//alert(data);
									//EVERYTHING OKAY
									if(data == "0") {
										location.reload();
									}
									//SOMETHING WRONG
									else {
										alertAddNewInfoC.style.display = "none";
										alertInfoForCreatNewItemC.style.display = "table";
										alertInfoForCreatNewItemTextC.innerHTML = "Κάτι πήγε λάθος, κατά την διαδικασία της αποδεύσμευσης του υπαλλήλου || " + name + " ||<br>Επαναλάβετε αργότερα, καθώς το σύστημα αντιμετωπίζει κάποιο πρόβλημα !";
										alertInfoForCreatNewItemBtn.innerHTML = "Το κατάλαβα";
										alertInfoForCreatNewItemBtn.focus();
									}
								}
							});
						});
						newYesAddNewInfoBtn.focus();
						noAddNewInfoBtn.addEventListener("click", function() {
							alertAddNewInfoC.style.display = "none";
						});
					}
				});

				var menuEmployeeTextC2 = document.createElement("div");
				menuEmployeeTextC2.className = "menuEmployeeTextC";
				resignationEmployeeBtn.appendChild(menuEmployeeTextC2);

				var img2 = document.createElement("img");
				resignationEmployeeBtn.appendChild(img2);

				resignationEmployeesC.appendChild(resignationEmployeeBtn);

				//ADD MAIN CONTAINERS TO GENERAL CONTAINER
				dischOrResignOptionCenterC.appendChild(dischargeEmployeesC);
				dischOrResignOptionCenterC.appendChild(resignationEmployeesC);
				dischOrResignOptionC.appendChild(closeDOrROptionBtn);
				dischOrResignOptionC.appendChild(reasonToActC);
				dischOrResignOptionC.appendChild(showButtonFunctionC);
				dischOrResignOptionC.appendChild(dischOrResignOptionCenterC);
				panelOfEmployeeC.appendChild(dischOrResignOptionC);
				
				dblCounter = 1;
			}
		});

		function IfElmntNotEmpty(element) {
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
	}

	//CURRENT LOCK STATUS OF EMPLOYEE
	this.HideOrShowInfoLock = function(parentElement) {
		var employeeLockUnclockBtn = parentElement.querySelector("#employeeLockUnclockBtn");
		var employeeLockUnclockImg = parentElement.querySelector("#employeeLockUnclockImg");
		var employeeNameTextC = parentElement.querySelector("#employeeNameTextC");
		var employeeUsernameTextC = parentElement.querySelector("#employeeUsernameTextC");
		var employeeEmailTextC = parentElement.querySelector("#employeeEmailTextC");
		var employeeWageTextC = parentElement.querySelector("#employeeWageTextC");
		var employeeRecruitmentDayTextC = parentElement.querySelector("#employeeRecruitmentDayTextC");
		var employeeAFMTextC = parentElement.querySelector("#employeeAFMTextC");
		var employeeAMKATextC = parentElement.querySelector("#employeeAMKATextC");

		if(sessionStorage.getItem("lockCheck") === null) {
			this.lock = "unlocked";
			sessionStorage.setItem("lockCheck", "unlocked");
		}
		else {
			this.lock = sessionStorage.getItem("lockCheck");
		}

		var statusLock = sessionStorage.getItem("lockCheck");

		employeeLockUnclockBtn.addEventListener("click", function() {ChangeLockStatus(statusLock);});

		CheckStatusLock(this.lock);

		function ChangeLockStatus() {
			if(statusLock == "locked") {
				statusLock = "unlocked";
			}
			else {
				statusLock = "locked";
			}
			CheckStatusLock(statusLock);
		}

		function CheckStatusLock(lock) {
			if(lock == "locked") {
				HideInfo();
			}
			else {
				ShowInfo();
			}
		}

		function HideInfo() {
			employeeLockUnclockBtn.title = "Ξεκλείδωμα προσωπικών στοιχείων υπαλλήλου";
			employeeLockUnclockImg.style.content = "url(../Assets/icons8_lock_50px.png)";
			employeeLockUnclockBtn.addEventListener("mouseover", function() {
				employeeLockUnclockImg.style.content = "url(../Assets/icons8_lock_50px_2.png)";
			});
			employeeLockUnclockBtn.addEventListener("mouseout", function() {
				employeeLockUnclockImg.style.content = "url(../Assets/icons8_lock_50px.png)";
			});
			employeeNameTextC.style.background = "rgb(13, 18, 24)";
			employeeNameTextC.style.color = "rgb(13, 18, 24)";
			employeeNameTextC.style.userSelect = "none";
			employeeEmailTextC.style.background = "rgb(13, 18, 24)";
			employeeEmailTextC.style.color = "rgb(13, 18, 24)";
			employeeEmailTextC.style.userSelect = "none";
			employeeWageTextC.style.background = "rgb(13, 18, 24)";
			employeeWageTextC.style.color = "rgb(13, 18, 24)";
			employeeWageTextC.style.userSelect = "none";
			/*employeeRecruitmentDayTextC.style.background = "rgb(13, 18, 24)";
			employeeRecruitmentDayTextC.style.color = "rgb(13, 18, 24)";
			employeeRecruitmentDayTextC.style.userSelect = "none";*/
			employeeAFMTextC.style.background = "rgb(13, 18, 24)";
			employeeAFMTextC.style.color = "rgb(13, 18, 24)";
			employeeAFMTextC.style.userSelect = "none";
			employeeAMKATextC.style.background = "rgb(13, 18, 24)";
			employeeAMKATextC.style.color = "rgb(13, 18, 24)";
			employeeAMKATextC.style.userSelect = "none";
		}

		function ShowInfo() {
			employeeLockUnclockBtn.title = "Κλείδωμα προσωπικών στοιχείων υπαλλήλου";
			employeeLockUnclockImg.style.content = "url(../Assets/icons8_unlock_50px.png)";
			employeeLockUnclockBtn.addEventListener("mouseover", function() {
				employeeLockUnclockImg.style.content = "url(../Assets/icons8_unlock_50px_2.png)";
			});
			employeeLockUnclockBtn.addEventListener("mouseout", function() {
				employeeLockUnclockImg.style.content = "url(../Assets/icons8_unlock_50px.png)";
			});
			employeeNameTextC.style.background = "transparent";
			employeeNameTextC.style.color = "white";
			employeeNameTextC.style.userSelect = "text";
			employeeEmailTextC.style.background = "transparent";
			employeeEmailTextC.style.color = "white";
			employeeEmailTextC.style.userSelect = "text";
			employeeWageTextC.style.background = "transparent";
			employeeWageTextC.style.color = "white";
			employeeWageTextC.style.userSelect = "text";
			/*employeeRecruitmentDayTextC.style.background = "transparent";
			employeeRecruitmentDayTextC.style.color = "white";
			employeeRecruitmentDayTextC.style.userSelect = "text";*/
			employeeAFMTextC.style.background = "transparent";
			employeeAFMTextC.style.color = "white";
			employeeAFMTextC.style.userSelect = "text";
			employeeAMKATextC.style.background = "transparent";
			employeeAMKATextC.style.color = "white";
			employeeAMKATextC.style.userSelect = "text";
		}
	}
}