
class ButtonListener {

	#type;
	#menuBtn;
	#branchesBtn;
	#employeesBtn;

	constructor(type) {
		this.#type = type;
	}

	get type() {
		return this.#type;
	}

	AddEventsToButtons() {
		
		if(this.#type == "ADMIN") {
			//IF CLASS IS BEING CALLED FROM ADMIN SITE
			this.#menuBtn = document.getElementById("menuBtn");
			this.#menuBtn.addEventListener("click", this.#MenuButtonListener);
			this.#branchesBtn = document.getElementById("branchesBtn");
			this.#branchesBtn.addEventListener("click", this.#BranchesButtonListenerAdmin);
			this.#employeesBtn = document.getElementById("employeesBtn");
			this.#employeesBtn.addEventListener("click", this.#EmployeesButtonListenerAdmin);
		}
		else if(this.#type == "EMPLOYEE") {
			//IF CLASS IS BEING CALLED FROM EMPLOYEE SITE
		}
	}

	//MENU BUTTON EVENTS
	#MenuButtonListener() {
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
		var typeUser = this.Type;

		$(function(){
      		$("#showPanelC").load('Branches.html',{'type':typeUser}, 
      			function(response, status, xhr) {
					if(status == "error") {
    					alert("Error: " + xhr.status + " " + xhr.statusText);
  					}
  				})
      	});
	}

	//BRANCHES BUTTON ADMIN EVENTS
	#EmployeesButtonListenerAdmin() {
		$(function(){
      		$("#showPanelC").load("Branches.html?requiredid=VALUE_TO_PASS"); 
    	});
	}
}