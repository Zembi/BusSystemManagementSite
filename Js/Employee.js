
function Employee(username, email, name, icon,  branchId, status, sex, wage, recruitmentDay) {
	this.username = username;
	this.email = email;
	this.name = name;
	this.icon = icon;
	this.branchId = branchId;
	this.branchObj = [];
	this.status = status;
	this.sex = sex;
	this.wage = wage;
	this.recruitmentDay = recruitmentDay;
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

	this.giveStatusTranslate = function() {
		var translateStatus = "";

		if(this.status == "Admin") {
			translateStatus = "Γενικός Διαχειριστής";
		}
		else if(this.status == "Employee Manager") {
			translateStatus = "Υπεύθυνος Διαχείρισης";
		}
		else if(this.status == "Agency Employee") {
			translateStatus = "Υπάλληλος Πρακτορείου";
		}
		else if(this.status == "Store Manager") {
			translateStatus = "Υπεύθυνος Αποθήκης";
		}

		return translateStatus;
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
		statusIdC.innerHTML = this.giveStatusTranslate();
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

	this.CreateSlideShowView = function(parentElmnt, id) {
		var serverCommun = new ServerCommunication();
		var username = this.getUsername();
		var email = this.getEmail();
		var name = this.getName();
		var branchId = this.getBranchId();
		var status = this.getStatus();
		var sex = this.getSex();
		var wage = this.getWage();
		var recruitmentDay = this.getRecruitmentDay();

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

		var employeeStatusC = document.createElement("div");
		employeeStatusC.id = "employeeStatusC";
		employeeStatusC.innerHTML = this.giveStatusTranslate();
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
		var wage = parseInt(this.getWage());
		employeeWageTextC.innerHTML = numberWithCommas((wage).toFixed(2)) + " €";
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
			employeeBranchTextC.innerHTML = this.getBranchId() + " - " + "Περιφέρεια Μακεδονίας";
			employeeBranchTextC.title = "Διαχειριστική γραμμή"
		}
	}

	this.HideOrShowInfoLock = function(parentElement) {
		var employeeLockUnclockBtn = parentElement.querySelector("#employeeLockUnclockBtn");
		var employeeLockUnclockImg = parentElement.querySelector("#employeeLockUnclockImg");
		var employeeNameTextC = parentElement.querySelector("#employeeNameTextC");
		var employeeUsernameTextC = parentElement.querySelector("#employeeUsernameTextC");
		var employeeEmailTextC = parentElement.querySelector("#employeeEmailTextC");
		var employeeWageTextC = parentElement.querySelector("#employeeWageTextC");
		var employeeRecruitmentDayTextC = parentElement.querySelector("#employeeRecruitmentDayTextC");

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
			employeeLockUnclockBtn.title = "Ξεκλείδωμα";
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
			employeeRecruitmentDayTextC.style.background = "rgb(13, 18, 24)";
			employeeRecruitmentDayTextC.style.color = "rgb(13, 18, 24)";
			employeeRecruitmentDayTextC.style.userSelect = "none";
		}

		function ShowInfo() {
			employeeLockUnclockBtn.title = "Κλείδωμα";
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
			employeeRecruitmentDayTextC.style.background = "transparent";
			employeeRecruitmentDayTextC.style.color = "white";
			employeeRecruitmentDayTextC.style.userSelect = "text";
		}
	}
}