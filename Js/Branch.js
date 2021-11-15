
function Branch(id, type, street, location, imageSrc, manager, store, status, adminControl) {
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
	this.adminControl = adminControl;

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

	this.findEmployeeInfo = function(employeeToFind) {
		return new Promise((resolve, reject) => {
			var employeePhp = new Array();
			$.ajax({
      			type: 'POST',
      			url: "../Php/findEmployeePhp.php",
      			data: {id: employeeToFind},
      			success: function(data) {
      				employeePhp = JSON.parse(data);
      				var employeeObj = ConvertObjectToEmployeeObj(employeePhp);
	    			resolve(employeeObj);
      			}
			});
		});
	}

	this.getEmployees = function() {
		return this.employees;
	}

	this.getStore = function() {
		return this.store;
	}

	this.getStatus = function() {
		return this.status;
	}

	this.getAdminControl = function() {
		return this.adminControl;
	}

	this.getAdminControlEmployeeObj = function() {
		var adminCntrl = this.getAdminControl();
		return new Promise((resolve, reject) => {
			var employeePhp = new Array();
			$.ajax({
      			type: 'POST',
      			url: "../Php/findEmployeePhp.php",
      			data: {id: adminCntrl},
      			success: function(data) {
      				console.log("done");
      				employeePhp = JSON.parse(data);
	    			resolve(employeePhp);
      			}
			});
		});
	}

	this.getConnectedBranches = function() {
		var array = [];
		return new Promise((resolve, reject) => {
			$.ajax({
				type: 'POST',
				url: "../Php/getConnectedBranchesPhp.php",
				data: {id: id},
				success: function(data) {
					//alert(data);
					array = JSON.parse(data);
					resolve(array);
				}
			});
		});
	}

	this.getObjConnectedBranches = function() {
		var array = [];
		return new Promise((resolve, reject) => {
			$.ajax({
				type: 'POST',
				url: "../Php/getObjConnectedBranchesPhp.php",
				data: {id: id},
				success: function(data) {
					//alert(data);
					array = JSON.parse(data);
					array = ConvertObjectsArrayToBranchObjsArray(array);
					resolve(array);
				}
			});
		});
	}

	this.getBuses = function() {
		var array = [];
		return new Promise((resolve, reject) => {
			$.ajax({
				type: 'POST',
				url: "../Php/getBusesConnectedToThisBranchPhp.php",
				data: {id: id},
				success: function(data) {
					//alert(data);
					array = JSON.parse(data);
					resolve(array);
				}
			});
		});
	}

	this.getAvailableBuses = function() {
		var array = [];
		return new Promise((resolve, reject) => {
			$.ajax({
				type: 'POST',
				url: "../Php/getAvailableBusesConnectedToThisBranchPhp.php",
				data: {id: id},
				success: function(data) {
					//alert(data);
					array = JSON.parse(data);
					resolve(array);
				}
			});
		});
	}

	this.getNonAvailableBuses = function() {
		var array = [];
		return new Promise((resolve, reject) => {
			$.ajax({
				type: 'POST',
				url: "../Php/getNonAvailableBusesConnectedToThisBranchPhp.php",
				data: {id: id},
				success: function(data) {
					//alert(data);
					array = JSON.parse(data);
					resolve(array);
				}
			});
		});
	}
}