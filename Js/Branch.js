
function Branch(id, type, location, manager, store, conveniences, status) {
	this.id = id;
	this.type = type;
	this.location = location;
	this.manager = manager;
	this.managerObject;
	this.employees;
	this.buses;
	this.store = store;
	this.conveniences = conveniences;
	this.status = status;

	this.getId = function() {
		return this.id;
	}

	this.getType = function() {
		return this.type
	}

	this.getLocation = function() {
		return this.location;
	}

	this.getManager = function() {
		return this.manager;
	}

	this.findManagerInfo = async function() {
		var user = await ConfigFirebaseUser(this.manager, "find");
		return user;
	}

	this.getEmployees = function() {
		return this.employees;
	}

	this.getBuses = function() {
		return this.buses;
	}

	this.getStore = function() {
		return this.store;
	}

	this.getConveniences = function() {
		return this.conveniences;
	}

	this.getStatus = function() {
		return this.status;
	}
}