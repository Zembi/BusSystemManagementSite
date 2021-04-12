
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
		var menuSymbolC = document.getElementById("menuSymbolC");


		if(leftC.offsetWidth != 0) {
			leftC.style.width = 0;
			menuSymbolC.style.boxShadow = "none";
			this.style.right = "-" + this.offsetWidth + "px";
			this.addEventListener("mouseover", function() {
				this.style.right = "-" + this.offsetWidth + "px";
				this.style.border = "2px solid rgb(10, 24, 41)";
			});
			this.addEventListener("mouseout", function() {
				this.style.right = "-" + this.offsetWidth + "px";
				this.style.border = "2px solid white";
			});
		}
		else {
			leftC.style.width = "240px";
			menuSymbolC.style.boxShadow = "2px 0px 2px black";
			this.style.right = "-25px";
			this.addEventListener("mouseover", function() {
				this.style.right = "-" + this.offsetWidth + "px";
				this.style.border = "2px solid rgb(10, 24, 41)";
			});
			this.addEventListener("mouseout", function() {
				this.style.right = "-25px";
				this.style.border = "2px solid white";
			});
		}
	}

	CreateMenu() {
		var menuC = document.getElementById("menuC");
	}
}