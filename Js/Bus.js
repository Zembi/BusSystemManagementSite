
function Bus(id, info, branchConnected, availability) {
	this.id = id;
	this.info = info;
	this.branchConnected = branchConnected;
	this.availability = availability;

	this.getId = function() {
		return this.id;
	}

	this.getInfo = function() {
		return this.info;
	}

	this.getBranchConnected = function() {
		return this.branchConnected;
	}
	
	this.getAvailability = function() {
		return this.availability;
	}

	this.findBranchConnectedObject = function() {
		var branchId = this.getBranchConnected();
		return new Promise ((resolve, reject) => {
			$.ajax({
				type: 'POST',
				url: "../Php/findBranchPhp.php",
				data: {branch: branchId},
				success: function(data) {
					//alert(data);
					data = JSON.parse(data);
					resolve(data);
				}
			});
		});
	}
}
