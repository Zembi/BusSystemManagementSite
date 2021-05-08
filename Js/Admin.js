
function Admin() {
	this.username;
	this.email;
	this.password;
	this.name;

	this.getUsername = function() {
		return this.username;
	}

	this.setUsername = function(username) {
		this.username = username;
	}

	this.getEmail = function() {
		return this.email;
	}

	this.setEmail = function(email) {
		this.email = email;
	}

	this.getPassword = function() {
		return this.password;
	}

	this.setPassword = function(password) {
		this.password = password;
	}

	this.getName = function() {
		return this.name;
	}

	this.setName = function(name) {
		this.name = name;
	}
}

var adminU = new Admin();