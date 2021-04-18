
class MenuScreenAdmin {
	
	#actionId;
	#menuItems;

	constructor(actionId) {
		this.#actionId = actionId;
		alert(this.#actionId);
	}

	#GetMenuItems() {
		var menuItems = document.getElementsByClassName("menuBtns");

		return menuItems;
	}

	ChooseFromActionId() {
		var menuItems = this.#GetMenuItems();
		alert("here " + this.#actionId);

		for(var i = 0; i < menuItems.length; i++) {
			if(this.#actionId == menuItems[i].id) {
				this.#ChosenButtonListener(menuItems[i].name);
			}
		}
	}

	#ChosenButtonListener(chosenBtnName) {
		var data = chosenBtnName;
		var file = data + ".html";
		$(function(){
      		$("#showPanelC").load(file, 
      			function(response, status, xhr) {
					if(status == "error") {
    					alert("Error: " + xhr.status + " " + xhr.statusText);
  					}
  				})
      	});

      	window.location = "#" + data;
	}
}