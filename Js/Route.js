
function Route(id, start, end, day, date, hourStart, hourArrival, duration, stations, busId, active) {
	this.id = id;
	this.start = start;
	this.startBranchObj;
	this.end = end;
	this.endBranchObj;
	this.day = day;
	this.date = date;
	this.hourStart = hourStart;
	this.hourArrival = hourArrival;
	this.duration = duration;
	this.stations = stations;
	this.busId = busId;
	this.busObj;
	this.active = active;

	this.main = async function() {
		this.startBranchObj = await this.findStartBranchObj();
		this.endBranchObj = await this.findEndBranchObj();
		this.busObj = await this.findBusObj();

		console.log(this);
	}

	this.getId = function() {
		return this.id;
	}

	this.getStart = function() {
		return this.start;
	}

	this.findStartBranchObj = function() {
		var chosenBranchId = this.getStart();
		return new Promise((resolve, reject) => {
			var branchPhp;
			$.ajax({
				type: 'POST',
				url: "../Php/findBranchPhp.php",
				data: {branch: chosenBranchId},
				success: function(data) {
					branchPhp = JSON.parse(data);
					if(!jQuery.isEmptyObject(branchPhp)) {
						var branchObj = ConvertObjectToBranchObj(branchPhp);
		    			resolve(branchObj);
					}
					else {
						resolve(null);
					}
				}
			});
		});
	}

	this.getStartBranchObj = function() {
		return this.startBranchObj;
	}

	this.getEnd = function() {
		return this.end;
	}

	this.findEndBranchObj = function() {
		var chosenBranchId = this.getEnd();
		return new Promise((resolve, reject) => {
			var branchPhp;
			$.ajax({
				type: 'POST',
				url: "../Php/findBranchPhp.php",
				data: {branch: chosenBranchId},
				success: function(data) {
					branchPhp = JSON.parse(data);
					if(!jQuery.isEmptyObject(branchPhp)) {
						var branchObj = ConvertObjectToBranchObj(branchPhp);
		    			resolve(branchObj);
					}
					else {
						resolve(null);
					}
				}
			});
		});
	}

	this.getEndBranchObj = function() {
		return this.endBranchObj;
	}

	this.getDay = function() {
		return this.day;
	}

	this.getDate = function() {
		return this.date;
	}

	this.getHourStart = function() {
		return this.hourStart;
	}

	this.getHourArrival = function() {
		return this.hourArrival;
	}

	this.getDuration = function() {
		return this.duration;
	}

	this.getStations = function() {
		return this.stations;
	}

	this.getBusId = function() {
		return this.busId;
	}

	this.findBusObj = function() {
		var chosenBusId = this.getBusId();
		return new Promise((resolve, reject) => {
			var busPhp;
			$.ajax({
				type: 'POST',
				url: "../Php/findBusPhp.php",
				data: {id: chosenBusId},
				success: function(data) {
					busPhp = JSON.parse(data);
					if(!jQuery.isEmptyObject(busPhp)) {
						var busObj = ConvertObjectToBusObj(busPhp);
		    			resolve(busObj);
					}
					else {
						resolve(null);
					}
				}
			});
		});
	}

	this.getBusObj = function() {
		return this.busObj;
	}

	this.getActive = function() {
		return this.active;
	}

	this.createFullRowForView = function(container) {
		//FULL ROW
		var rowRouteC = document.createElement("div");
		rowRouteC.id = this.id + "rowRouteC";
		rowRouteC.className = "rowRouteC";

		//DELETE CONTAINER
		var deleteRouteC = document.createElement("div");
		deleteRouteC.id = this.id + "deleteRouteC";
		deleteRouteC.className = "deleteRouteC";

			var deleteRouteInpt = document.createElement("input");
			deleteRouteInpt.id = this.id + "deleteRouteInpt";
			deleteRouteInpt.className = "deleteRouteInpt";
			deleteRouteInpt.type = "checkbox";
			deleteRouteC.appendChild(deleteRouteInpt);

		rowRouteC.appendChild(deleteRouteC);

		//EDIT CONTAINER
		var editRouteC = document.createElement("div");
		editRouteC.id = this.id + "editRouteC";
		editRouteC.className = "editRouteC";

			var editRouteInpt = document.createElement("input");
			editRouteInpt.id = this.id + "editRouteInpt";
			editRouteInpt.className = "editRouteInpt";
			editRouteInpt.type = "checkbox";
			editRouteC.appendChild(editRouteInpt);

		rowRouteC.appendChild(editRouteC);

		//DAY WILL BE AS A TITLE
		/*DAY CONTAINER
		var dayRouteC = document.createElement("div");
		dayRouteC.id = this.id + "dayRouteC";
		dayRouteC.className = "dayRouteC";

		rowRouteC.appendChild(dayRouteC);*/

		/*DATE CONTAINER
		var dateRouteC = document.createElement("div");
		dateRouteC.id = this.id + "dateRouteC";
		dateRouteC.className = "dateRouteC";

			var dateRouteInpt = document.createElement("input");
			dateRouteInpt.id = this.id + "dateRouteInpt";
			dateRouteInpt.className = "dateRouteInpt";
			dateRouteC.appendChild(dateRouteInpt);

		rowRouteC.appendChild(dateRouteC);
		*/
		
		//HOURSTART CONTAINER
		var hourStartRouteC = document.createElement("div");
		hourStartRouteC.id = this.id + "hourStartRouteC";
		hourStartRouteC.className = "hourStartRouteC";

			var hourStartRouteHoursInpt = document.createElement("input");
			hourStartRouteHoursInpt.id = this.id + "hourStartRouteHoursInpt";
			hourStartRouteHoursInpt.className = "hourStartRouteHoursInpt";
			hourStartRouteC.appendChild(hourStartRouteHoursInpt);

			var hourStartRouteMinutesInpt = document.createElement("input");
			hourStartRouteMinutesInpt.id = this.id + "hourStartRouteMinutesInpt";
			hourStartRouteMinutesInpt.className = "hourStartRouteMinutesInpt";
			hourStartRouteC.appendChild(hourStartRouteMinutesInpt);

		rowRouteC.appendChild(hourStartRouteC);
		
		//HOURARRIVAL CONTAINER
		var hourArrivalRouteC = document.createElement("div");
		hourArrivalRouteC.id = this.id + "hourArrivalRouteC";
		hourArrivalRouteC.className = "hourArrivalRouteC";

			var hourEndRouteHoursInpt = document.createElement("input");
			hourEndRouteHoursInpt.id = this.id + "hourEndRouteHoursInpt";
			hourEndRouteHoursInpt.className = "hourEndRouteHoursInpt";
			hourEndRouteC.appendChild(hourEndRouteHoursInpt);

			var hourEndRouteMinutesInpt = document.createElement("input");
			hourEndRouteMinutesInpt.id = this.id + "hourEndRouteMinutesInpt";
			hourEndRouteMinutesInpt.className = "hourEndRouteMinutesInpt";
			hourEndRouteC.appendChild(hourEndRouteMinutesInpt);

		rowRouteC.appendChild(hourArrivalRouteC);
		
		//DURATION CONTAINER
		var durationRouteC = document.createElement("div");
		durationRouteC.id = this.id + "durationRouteC";
		durationRouteC.className = "durationRouteC";

			var durationRouteHoursInpt = document.createElement("input");
			durationRouteHoursInpt.id = this.id + "durationRouteHoursInpt";
			durationRouteHoursInpt.className = "durationRouteHoursInpt";
			durationRouteC.appendChild(durationRouteHoursInpt);

			var durationRouteMinutesInpt = document.createElement("input");
			durationRouteMinutesInpt.id = this.id + "durationRouteMinutesInpt";
			durationRouteMinutesInpt.className = "durationRouteMinutesInpt";
			durationRouteC.appendChild(durationRouteMinutesInpt);

		rowRouteC.appendChild(durationRouteC);
		
		//STATIONS CONTAINER
		var stationsRouteC = document.createElement("div");
		stationsRouteC.id = this.id + "stationsRouteC";
		stationsRouteC.className = "stationsRouteC";

		rowRouteC.appendChild(stationsRouteC);
		
		//BUSID CONTAINER
		var busIdRouteC = document.createElement("div");
		busIdRouteC.id = this.id + "busIdRouteC";
		busIdRouteC.className = "busIdRouteC";

		rowRouteC.appendChild(busIdRouteC);
		
		//ACTIVE CONTAINER
		var activeRouteC = document.createElement("div");
		activeRouteC.id = this.id + "activeRouteC";
		activeRouteC.className = "activeRouteC";

		rowRouteC.appendChild(activeRouteC);


		container.appendChild(rowRouteC);
	}
}