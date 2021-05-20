
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
}