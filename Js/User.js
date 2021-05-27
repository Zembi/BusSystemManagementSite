
function User(username, email, password, name, status, icon) {
	this.username = username;
	this.email = email;
	this.password = password;
	this.name = name;
	this.status = status;
	this.icon = icon;

	this.getUsername = function() {
		return this.username;
	}

	this.getEmail = function() {
		return this.email;
	}

	this.getPassword = function() {
		return this.password;
	}

	this.getName = function() {
		return this.name;
	}

	this.getStatus = function() {
		return this.status;
	}

	this.giveStatusTranslate = function() {
		var translateStatus = "";

		if(this.status == "Admin") {
			translateStatus = "Γενικός Διαχειριστής";
		}
		else if(this.status == "Employee_Manager") {
			translateStatus = "Υπεύθυνος Διαχείρισης";
		}
		else if(this.status == "Agency_Employee") {
			translateStatus = "Υπάλληλος Πρακτορείου";
		}
		else if(this.status == "Store_Employee") {
			translateStatus = "Υπεύθυνος Αποθήκης";
		}

		return translateStatus;
	}

	this.getIcon = function() {
		return this.icon;
	}

	this.getUserImageSrc = function() {
		var imgSrc = "";

		if(this.icon == "male1") {
			imgSrc = "url(../Assets/PersonType/icons8_male_no1_40px.png)";
		}
		else if(this.icon == "male2") {
			imgSrc = "url(../Assets/PersonType/icons8_male_no2_40px.png)";
		}
		else if(this.icon == "male3") {
			imgSrc = "url(../Assets/PersonType/icons8_male_no3_40px.png)";
		}
		else if(this.icon == "male4") {
			imgSrc = "url(../Assets/PersonType/icons8_male_no4_40px.png)";
		}
		else if(this.icon == "male5") {
			imgSrc = "url(../Assets/PersonType/icons8_male_no5_40px.png)";
		}
		else if(this.icon == "female1") {
			imgSrc = "url(../Assets/PersonType/icons8_female_no1_40px.png)";
		}
		else if(this.icon == "female2") {
			imgSrc = "url(../Assets/PersonType/icons8_female_no2_40px.png)";
		}
		else if(this.icon == "female3") {
			imgSrc = "url(../Assets/PersonType/icons8_female_no3_40px.png)";
		}
		else if(this.icon == "female4") {
			imgSrc = "url(../Assets/PersonType/icons8_female_no4_40px.png)";
		}
		else if(this.icon == "female5") {
			imgSrc = "url(../Assets/PersonType/icons8_female_no5_40px.png)";
		}
		else {
			imgSrc = "none";
		}

		return imgSrc; 
	}

	this.createId = function(mainHover, parentElmnt) {
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
		imgIdImg.style.content = this.getUserImageSrc();
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
			usernameIdC.style.color = "rgb(255, 215, 0)";
		}
		else if(mainHover == "email") {
			emailIdC.style.color = "rgb(255, 215, 0)";
		}
		else if(mainHover == "name") {
			nameIdC.style.color = "rgb(255, 215, 0)";
		}
	}
}