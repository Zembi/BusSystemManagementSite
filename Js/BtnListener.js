
class ButtonListener {

	constructor(type) {
		this.type = type;
		this.homeBtn = document.getElementById("homeBtn");
		this.menuBtn = document.getElementById("menuBtn");
		this.branchesBtn = document.getElementById("branchesBtn");
		this.employeesBtn = document.getElementById("employeesBtn");
		this.routesBtn = document.getElementById("routesBtn");
		this.busesBtn = document.getElementById("busesBtn");
		this.logOutBtn = document.getElementById("logOutBtn");
		this.centerScreenBtn = document.getElementById("centerScreenBtn");
		this.requestsBtn = document.getElementById("requestsBtn");
	}

	AddEventsToButtons() {
		
		if(this.type == "ADMIN") {
			//IF CLASS IS BEING CALLED FROM ADMIN SITE
			homeBtn.addEventListener("click", this.HomeButtonListener);
			menuBtn.addEventListener("click", this.MenuButtonListener);
			branchesBtn.addEventListener("click", this.BranchesButtonListenerAdmin);
			employeesBtn.addEventListener("click", this.EmployeesButtonListenerAdmin);
			routesBtn.addEventListener("click", this.RoutesButtonListenerAdmin);
			busesBtn.addEventListener("click", this.BusesButtonListenerAdmin);
			logOutBtn.addEventListener("click", this.LogOutButtonListenerAdmin);
			centerScreenBtn.addEventListener("click", this.CenterScreenButtonListenerAdmin);
			requestsBtn.addEventListener("click", this.RequestsButtonListenerAdmin);
		}
		else if(type == "EMPLOYEE") {
			//IF CLASS IS BEING CALLED FROM EMPLOYEE SITE
		}
	}

	//MENU BUTTON EVENTS
	MenuButtonListener() {
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
				this.style.background = "rgb(13, 18, 24, 0.8)";
				this.style.border = "none";
			});
			centerScreenBtn.style.display = "inline-block";
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
			centerScreenBtn.style.display = "none";
		}
	}

	//HOME BUTTON ADMIN EVENTS
	HomeButtonListener() {
		var menuScrnA = new MenuScreenAdmin(homeBtn.name);
		menuScrnA.ChooseFromActionId();
	}

	//BRANCHES BUTTON ADMIN EVENTS
	BranchesButtonListenerAdmin() {
		var menuScrnA = new MenuScreenAdmin(branchesBtn.name);
		menuScrnA.ChooseFromActionId();
	}

	//EMPLOYEES BUTTON ADMIN EVENTS
	EmployeesButtonListenerAdmin() {
		var menuScrnA = new MenuScreenAdmin(employeesBtn.name);
		menuScrnA.ChooseFromActionId();
	}
	
	//ROUTES BUTTON ADMIN EVENTS
	RoutesButtonListenerAdmin() {
		var menuScrnA = new MenuScreenAdmin(routesBtn.name);
		menuScrnA.ChooseFromActionId();
	}

	//BUSES BUTTON ADMIN EVENTS
	BusesButtonListenerAdmin() {
		var menuScrnA = new MenuScreenAdmin(busesBtn.name);
		menuScrnA.ChooseFromActionId();
	}
	
	//LOGOUT BUTTON ADMIN EVENTS
	LogOutButtonListenerAdmin() {
		sessionStorage.setItem("userStatus", "null");
		window.location.href = "../Index";
	}

	//CENTER SCREEN BUTTON ADMIN EVENTS
	CenterScreenButtonListenerAdmin() {
		if(leftFixedC.offsetWidth != 0) {
		}
		else {
			var contentInfoC = document.getElementById("contentInfoC");
			contentInfoC.scrollIntoView({block: 'end', inline: 'center'});
		}
	}

	//REQUESTS BUTTON ADMIN EVENTS
	RequestsButtonListenerAdmin() {
		var menuScrnA = new MenuScreenAdmin(requestsBtn.name);
		menuScrnA.ChooseFromActionId();
	}
}