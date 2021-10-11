
function Bus(id, model, maxCapacity, ltrPerKm) {
	this.id = id;
	this.model = model;
	this.maxCapacity = maxCapacity;
	this.ltrPerKm = ltrPerKm;

	this.getId = function() {
		return this.id;
	}

	this.getModel = function() {
		return this.model;
	}

	this.getMaxCapacity = function() {
		return this.maxCapacity;
	}
	
	this.getLtrPerKm = function() {
		return this.ltrPerKm;
	}
}
