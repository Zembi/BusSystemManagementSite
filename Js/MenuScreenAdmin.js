
class MenuScreenAdmin {

	constructor(actionID) {
		this.actionId = actionID;
		this.openedBtn = document.getElementsByName(this.actionId)[0];
	}

	ChooseFromActionId() {
		var menuItems = document.getElementsByClassName("menuBtns");
		var requestBtnItem = document.getElementsByName("Requests")[0];

		if(this.actionId == "Home"){
			sessionStorage.setItem('action', this.actionId);
			this.ChosenButtonListener(this.actionId);
			this.URLChangeMenuButtonContent(this.actionId);
			this.PathChangeMenu("Αρχική");
		}
		else if(this.actionId == requestBtnItem.name) {
			sessionStorage.setItem('action', this.actionId);
			this.ChosenButtonListener(requestBtnItem.name);
			this.URLChangeMenuButtonContent(requestBtnItem.name);
			this.PathChangeMenu("Ειδοποιήσεις");
		}
		else {
			for(var i = 0; i < menuItems.length; i++) {
				if(this.actionId == menuItems[i].name) {
					sessionStorage.setItem('action', this.actionId);
					this.ChosenButtonListener(menuItems[i].name);
					this.URLChangeMenuButtonContent(menuItems[i].name);
					this.PathChangeMenu(menuItems[i].getElementsByTagName("DIV")[0].getElementsByTagName("DIV")[0].innerHTML);
					//this.OpenedButton();
				}
			}
		}
	}

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
	}

	URLChangeMenuButtonContent(chosenBtnName) {
		if(chosenBtnName == "Home") {
			window.location = "#";
		}
		else {
			window.location = "#" + chosenBtnName;
		}
	}

	PathChangeMenu(pathLast) {
		//PATH CHANGE
      	var pathTextC = document.getElementById("pathTextC").getElementsByTagName("DIV")[0];

		if(this.actionId)
      	pathTextC.innerHTML = "/" + pathLast;
	}

	OpenedButton() {
		var style = getComputedStyle(this.openedBtn);
	}
}