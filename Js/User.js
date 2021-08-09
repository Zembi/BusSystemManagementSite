
function User(username, email, icon, name, password, status, sex) {
	this.username = username;
	this.email = email;
	this.icon = icon;
	this.name = name;
	this.password = password;
	this.status = status;
	this.sex = sex;

	this.getUsername = function() {
		return this.username;
	}

	this.getEmail = function() {
		return this.email;
	}

	this.getIcon = function() {
		return this.icon;
	}

	this.getName = function() {
		return this.name;
	}

	this.getPassword = function() {
		return this.password;
	}

	this.getStatus = function() {
		return this.status;
	}

	this.getSex = function() {
		return this.password;
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
		else if(this.status == "Store Employee") {
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
}