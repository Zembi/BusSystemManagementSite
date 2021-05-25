
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

	this.getIcon = function() {
		return this.icon;
	}

	this.createId = function(parentElmnt) {
		//MAIN INFO ID
		var userIdC = document.createElement("div");
		userIdC.id = "userIdC";

		var statusIdC = document.createElement("div");
		statusIdC.id = "statusIdC";
		statusIdC.innerHTML = this.status;
		statusIdC = statusIdC;
		statusIdC.innerHTML = statusIdC.innerHTML.replaceAll("_", " ");
		userIdC.appendChild(statusIdC);

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
	}
}