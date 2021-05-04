
class MenuScreenAdmin {

	constructor(actionID) {
		this.actionId = actionID;
		this.openedBtn = document.getElementsByName(this.actionId)[0];
	}

	ChooseFromActionId() {
		var menuItems = document.getElementsByClassName("menuBtns");

		if(this.actionId == "Home"){
			sessionStorage.setItem('action', this.actionId);
			this.ChosenButtonListener(this.actionId);
			this.URLChangeMenuButtonContent(this.actionId);
		}
		else {
			for(var i = 0; i < menuItems.length; i++) {
				if(this.actionId == menuItems[i].name) {
					sessionStorage.setItem('action', this.actionId);
					this.ChosenButtonListener(menuItems[i].name);
					this.URLChangeMenuButtonContent(menuItems[i].name);
					this.OpenedButton();
				}
			}
		}
	}

	ChosenButtonListener(chosenBtnName) {
		var file = chosenBtnName + ".html";

		$(function(){
      		$("#showPanelC").load(file, 
      			function(response, status, xhr) {
					if(status == "error") {
    					alert("Error: " + xhr.status + " " + xhr.statusText);
  					}
  				})
      	});
	}

	URLChangeMenuButtonContent(chosenBtnName) {
		if(chosenBtnName == "Home") {
			window.location = "#";
		}
		else {
			window.location = "#" + chosenBtnName;
		}
	}

	OpenedButton() {
		var style = getComputedStyle(this.openedBtn);
	}
}