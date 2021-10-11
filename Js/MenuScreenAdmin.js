
//CLASS THAT IS MANAGING THE MENU ACTIONS
class MenuScreenAdmin {

	constructor(actionID) {
		this.actionId = actionID;
		this.openedBtn = document.getElementsByName(this.actionId)[0];
	}

	//CHOOSE OPTION OF MENU DEPENDS OF SESSION STORAGE VARIABLES
	ChooseFromActionId() {
		if(sessionStorage.getItem("Load") != "On") {
			var menuItems = document.getElementsByClassName("menuBtns");
			var requestBtnItem = document.getElementsByName("Requests")[0];

			if((this.actionId == "Home") && (sessionStorage.getItem('lastOpenedAction') != this.actionId)){
				sessionStorage.setItem('action', this.actionId);
				this.ChosenButtonListener(this.actionId);
				this.URLChangeMenuButtonContent(this.actionId);
				this.PathChangeMenu("Αρχική");
			}
			else if((this.actionId == requestBtnItem.name) && (sessionStorage.getItem('lastOpenedAction') != this.actionId)) {
				sessionStorage.setItem('action', this.actionId);
				this.ChosenButtonListener(requestBtnItem.name);
				this.URLChangeMenuButtonContent(requestBtnItem.name);
				this.PathChangeMenu("Ειδοποιήσεις");
			}
			else {
				for(var i = 0; i < menuItems.length; i++) {
					if((this.actionId == menuItems[i].name) && (sessionStorage.getItem('lastOpenedAction') != this.actionId)) {
						sessionStorage.setItem('action', this.actionId);
						this.ChosenButtonListener(menuItems[i].name);
						this.URLChangeMenuButtonContent(menuItems[i].name);
						this.PathChangeMenu(menuItems[i].getElementsByTagName("DIV")[0].getElementsByTagName("DIV")[0].innerHTML);
					}
				}
			}
		}
	}

	//CHOSEN ACTION LOAD HTML FILE
	ChosenButtonListener(chosenBtnName) {
		//FILE CALL
		var file = chosenBtnName + ".html";

		$(function(){
      		$("#showPanelC").load(file, 
      			function(response, status, xhr) {
					if(status == "error") {
    					alert("Error: " + xhr.status + " " + xhr.statusText);
  					}
  				})
      	});

      	sessionStorage.setItem('lastOpenedAction', this.actionId);
	}

	//CHANGE THE LAST CHARS OF URL !NOT THE URL (PAGE IS STILL THE SAME)
	URLChangeMenuButtonContent(chosenBtnName) {
		if(chosenBtnName == "Home") {
			window.location = "#";
		}
		else {
			window.location = "#" + chosenBtnName;
		}
	}

	//PATH RIGHT NOW (/ 'USERNAME' / 'MENU OPTION' /) IN HORIZONTAL MENU
	PathChangeMenu(pathLast) {
		//PATH CHANGE
		var pathTextC = document.getElementById("pathTextC").getElementsByTagName("DIV")[0];

      	pathTextC.innerHTML = "/" + userUsernameIn + "/" + pathLast;
	}
}