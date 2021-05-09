
function Branch(id, location, manager, employees, buses, store, conveniences, status) {
	this.id = id;
	this.location = location;
	this.manager = manager;
	this.employees = employees;
	this.buses = buses;
	this.store = store;
	this.conveniences = conveniences;
	this.status = status;

	this.getId = function() {
		return this.id;
	}

	this.getLocation = function() {
		return this.location;
	}

	this.getManager = function() {
		return this.manager;
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