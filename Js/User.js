
function User(id, password) {
	this.id = id;
	this.password = password;

	this.getId = function() {
		return this.id;
	}

	this.getPassword = function() {
		return this.password;
	}
}