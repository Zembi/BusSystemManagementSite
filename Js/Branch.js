
function Branch(id, location, numOfEmployees, maxPeople) {
	this.id = id;
	this.location = location;
	this.numOfEmployees = numOfEmployees;
	this.maxPeople = maxPeople;

	this.getId = function() {
		return this.id;
	}

	this.getLocation = function() {
		return this.location;
	}

	this.getNumOfEmployees = function() {
		return this.numOfEmployees;
	}

	this.getMaxPeople = function() {
		return this.maxPeople;
	}
}