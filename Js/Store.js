
function Store(id, packsMax, packsToSend, packsDelivered, street, location, size, imageSrc, status) {
	this.id = id;
	this.packsMax = packsMax;
	this.packsToSend = packsToSend;
	this.packsDelivered = packsDelivered;
	this.street = street;
	this.location = location;
	this.imageSrc = imageSrc;
	this.employees;
	this.status = status;

	this.getId = function() {
		return this.id;
	}

	this.getPacksMax = function() {
		return this.packsMax;
	}

	this.getPacksToSend = function() {
		return this.packsToSend;
	}

	this.addPackToSendPacks = function() {
		if(this.packsToSend < this.packsMax) {
			this.packsToSend++;
			return "success";
		}
		else {
			return "fail";
		}
	}

	this.getPacksDelivered = function() {
		return this.packsDelivered;
	}

	this.addPackDelivered = function() {
		if(this.packsDelivered < this.packsMax) {
			this.packsDelivered++;
			return "success";
		}
		else {
			return "fail";
		}
	}

	this.getStreet = function() {
		return this.street;
	}

	this.getLocation = function() {
		return this.location;
	}

	this.getImageSrc = function() {
		return this.imageSrc;
	}

	this.getEmployees = function() {
		return this.employees;
	}

	this.getStatus = function() {
		return this.status;
	}
}