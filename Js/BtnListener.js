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

		if(leftC.offsetWidth != 0) {
			leftC.style.width = 0;
		}
		else {
			leftC.style.width = "250px";
			if($('#menuC').is(':empty')) {
				this.CreateMenu; 
			}
		}
	}

	CreateMenu() {
		var menuC = document.getElementById("menuC");
	}
}