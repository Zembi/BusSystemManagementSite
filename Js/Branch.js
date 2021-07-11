
function Branch(id, type, street, location, imageSrc, manager, store, status) {
	this.id = id;
	this.type = type;
	this.street = street;
	this.location = location;
	this.imageSrc = imageSrc;
	this.manager = manager;
	this.managerObject;
	this.employees;
	this.buses;
	this.store = store;
	this.status = status;

	this.getId = function() {
		return this.id;
	}

	this.getType = function() {
		return this.type;
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

	this.getManager = function() {
		return this.manager;
	}

	this.findUserInfo = function(userToFind) {
		return new Promise((resolve, reject) => {
			var userPhp = new Array();
			$.ajax({
      			type: 'POST',
      			url: "../Php/findUserPhp.php",
      			data: {username: userToFind},
      			success: function(data) {
      				userPhp = JSON.parse(data);
      				userObj = new User(userPhp.username, userPhp.email, userPhp.icon, userPhp.name, userPhp.password, userPhp.status, userPhp.sex);
	    			resolve(userObj);
      			}
			});
		});
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

	this.getStatus = function() {
		return this.status;
	}
}