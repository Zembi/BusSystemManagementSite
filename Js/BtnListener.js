
class ButtonListener {

	#type;
	#menuBtn;
	#branchesBtn;
	#employeesBtn;
	#routesBtn;
	#busesBtn;
	#requestsBtn;

	constructor(type) {
		this.#type = type;
	}

	get getType() {
		return this.#type;
	}

	get getMenuBtn() {
		return this.#menuBtn;
	}

	set setMenuBtn(lang) {
    	this.#menuBtn = lang;
	}

	get getBranchesBtn() {
		return this.#branchesBtn;
	}

	set setBranchesBtn(lang) {
    	this.#branchesBtn = lang;
	}

	get getEmployeesBtn() {
		return this.#employeesBtn;
	}

	set setEmployeesBtn(lang) {
    	this.#employeesBtn = lang;
	}

	get getRoutesBtn() {
		return this.#routesBtn;
	}

	set setRoutesBtn(lang) {
    	this.#routesBtn = lang;
	}

	get getBusesBtn() {
		return this.#busesBtn;
	}

	set setBusesBtn(lang) {
    	this.#busesBtn = lang;
	}

	get getRequestsBtn() {
		return this.#requestsBtn;
	}

	set setRequestsBtn(lang) {
    	this.#requestsBtn = lang;
	}

	AddEventsToButtons() {
		
		if(this.#type == "ADMIN") {
			//IF CLASS IS BEING CALLED FROM ADMIN SITE
			this.#menuBtn = document.getElementById("menuBtn");
			this.#menuBtn.addEventListener("click", this.#MenuButtonListener);
			this.setBranchesBtn = document.getElementById("branchesBtn");
			this.#branchesBtn.addEventListener("click", this.#BranchesButtonListenerAdmin);
			this.setEmployeesBtn = document.getElementById("employeesBtn");
			this.#employeesBtn.addEventListener("click", this.#EmployeesButtonListenerAdmin);
			this.setRoutesBtn = document.getElementById("routesBtn");
			this.#routesBtn.addEventListener("click", this.#RoutesButtonListenerAdmin);
			this.setBusesBtn = document.getElementById("busesBtn");
			this.#busesBtn.addEventListener("click", this.#BusesButtonListenerAdmin);
			this.setRequestsBtn = document.getElementById("requestsBtn");
			this.#requestsBtn.addEventListener("click", this.#RequestsButtonListenerAdmin);
		}
		else if(this.#type == "EMPLOYEE") {
			//IF CLASS IS BEING CALLED FROM EMPLOYEE SITE
		}
	}

	//MENU BUTTON EVENTS
	#MenuButtonListener() {
		alert(this.getMenuBtn);

		var leftC = document.getElementById("leftC");
		var leftFixedC = document.getElementById("leftFixedC");
		var menuSymbolC = document.getElementById("menuSymbolC");


		if(leftFixedC.offsetWidth != 0) {
			leftC.style.width = 0;
			rightC.style.width = "calc(100% - " + leftC.style.width + ")";
			leftFixedC.style.width = leftC.style.width;
			menuSymbolC.style.boxShadow = "none";
			this.style.background = "transparent";
			this.style.borderRadius = "0 4px 4px 0";
			this.style.border = "none";
			this.addEventListener("mouseover", function() {
				this.style.background = "rgb(255, 215, 0)";
				this.style.border = "none";
			});
			this.addEventListener("mouseout", function() {
				this.style.background = "transparent";
				this.style.border = "none";
			});
		}
		else {
			leftC.style.width = "240px";
			rightC.style.width = "calc(100% - " + leftC.style.width + ")";
			leftFixedC.style.width = leftC.style.width;
			menuSymbolC.style.boxShadow = "2px 0px 2px black";
			this.style.borderRadius = "0 0 4px 4px";
			this.style.background = "rgb(13, 18, 24)";
			this.style.border = "2px solid rgb(13, 18, 24)";
			this.addEventListener("mouseover", function() {
				this.style.background = "rgb(255, 215, 0)";
				this.style.border = "2px solid rgb(10, 24, 41)";
			});
			this.addEventListener("mouseout", function() {
				this.style.background = "rgb(13, 18, 24)";
				this.style.border = "2px solid rgb(13, 18, 24)";
			});
		}
	}

	//BRANCHES BUTTON ADMIN EVENTS
	#BranchesButtonListenerAdmin() {
		alert(this.getBranchesBtn);
		var m = new MenuScreenAdmin(this.getBranchesBtn);
		m.ChooseFromActionId();
	}

	//EMPLOYEES BUTTON ADMIN EVENTS
	#EmployeesButtonListenerAdmin() {
		var m = new MenuScreenAdmin(this.getEmployeesBtn);
		m.ChooseFromActionId();
	}
	
	//ROUTES BUTTON ADMIN EVENTS
	#RoutesButtonListenerAdmin() {
		var m = new MenuScreenAdmin(this.getRoutesBtn);
		m.ChooseFromActionId();
	}

	//BUSES BUTTON ADMIN EVENTS
	#BusesButtonListenerAdmin() {
		var m = new MenuScreenAdmin(this.getBusesBtn);
		m.ChooseFromActionId();
	}

	//REQUESTS BUTTON ADMIN EVENTS
	#RequestsButtonListenerAdmin() {
		var m = new MenuScreenAdmin(this.getRequestsBtn);
		m.ChooseFromActionId();
	}
}