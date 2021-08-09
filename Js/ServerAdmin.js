
//STARTING ACTIONS IN ADMIN SITE
ServerStart();

async function ServerStart() {
	document.body.style.zoom = 0.9;

	var btnListener = new ButtonListener("ADMIN");
	btnListener.AddEventsToButtons();

	sessionStorage.setItem("Load", "Off");
	CheckAdminBeforeLoad();

	//EVENTS WHEN USER CLOSES WINDOW
	/*window.addEventListener("unload", function(event) {
    	document.getElementById("logOutBtn").click();
	});*/
}

//GET THE TIME THAT THE NEXT UPDATE WILL HAPPEN
function InformTheWebAboutUpdate() {
	$.ajax({
		type: 'POST',
		url: "../Php/makeSureNoUpdateIsOnPhp.php",
		data: {userInStatusObject: userInObject.getStatus()},
		success: function(data) {
      		alert(data);
		}
	});
}

//MAKE SURE RIGHT WINDOW IS SAVED BEFORE RELOAD
function CheckAdminBeforeLoad() {
	var action = window.location.hash;
	action = action.substring(1);

	sessionStorage.setItem('lastOpenedAction', "none");

	if(sessionStorage.getItem('action') == null || action == "") {
		sessionStorage.setItem('action', "Home");
	}
	var menuScrnA = new MenuScreenAdmin(sessionStorage.getItem('action'));
	menuScrnA.ChooseFromActionId();
}

//CHECK IF THERE IS UPDATE WHILE USER IS SIGNED IN, IN THE SYSTEM
function CheckIfSystemIsDownForThisUser() {
	var userNameCC = document.getElementById("userNameC").childNodes[1];
	if(userNameCC.innerHTML == "" || userNameCC.innerHTML == null) {
		document.getElementById("logOutBtn").click();
	}
}

//UPDATE AND NOTIFICATIONS CHECKS
ServerUpdateAndNotifications();

function ServerUpdateAndNotifications() {
	NotificationsCheck();
	setTimeout(function (){
		NotificationsCheck();
	}, 15000);
}

function NotificationsCheck() {

}