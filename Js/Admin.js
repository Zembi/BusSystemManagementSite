
class Admin{

	constructor() {
		this.username;
		this.email;
		this.password;
		this.name;
	}

	setUsername(username) {
		this.username = username;
	}

	getUsername() {
		return this.username;
	}

	setEmail(email) {
		this.email = email;
	}

	getEmail() {
		return this.email;
	}

	setPassword(password) {
		this.password = password;
	}

	getPassword() {
		return this.password;
	}

	setName(name) {
		this.name = name;
	}

	getName() {
		return this.name;
	}
}

var adminU = new Admin();