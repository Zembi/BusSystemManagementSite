
class ButtonListener {

	#menuBtn;

	constructor() {

	}

	AddEventsToButtons() {
		this.#menuBtn = document.getElementById("menuBtn");
		this.#menuBtn.addEventListener("click", this.MenuButtonListener);
	}

//MENU BUTTON EVENTS
	MenuButtonListener() {
		var leftC = document.getElementById("leftC");
		var leftFixedC = document.getElementById("leftFixedC");
		var menuSymbolC = document.getElementById("menuSymbolC");


		if(leftFixedC.offsetWidth != 0) {
			leftC.style.width = 0;
			leftFixedC.style.width = leftC.style.width;
			menuSymbolC.style.boxShadow = "none";
			this.style.borderRadius = "0 4px 4px 0";
			this.addEventListener("mouseover", function() {
				this.style.border = "2px solid rgb(10, 24, 41)";
			});
			this.addEventListener("mouseout", function() {
				this.style.border = "2px solid rgb(13, 18, 24)";
			});
		}
		else {
			leftC.style.width = "240px";
			leftFixedC.style.width = leftC.style.width;
			menuSymbolC.style.boxShadow = "2px 0px 2px black";
			this.style.borderRadius = "0 0 4px 4px";
			this.addEventListener("mouseover", function() {
				this.style.border = "2px solid rgb(10, 24, 41)";
			});
			this.addEventListener("mouseout", function() {
				this.style.border = "2px solid rgb(13, 18, 24)";
			});
		}
	}

	CreateMenu() {
		var menuC = document.getElementById("menuC");
	}
}