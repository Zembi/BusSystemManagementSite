
//STARTING ACTIONS IN ADMIN SITE
ServerStart();

async function ServerStart() {

//	if(new Date() == )

	var btnListener = new ButtonListener("ADMIN");
	btnListener.AddEventsToButtons();
	userObj = new Array();

	sessionStorage.setItem("Load", "Off");
	CheckAdminBeforeLoad();
	userObj = await GetAdminInfoFromServer();
	AdminInfoManage(userObj);
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

function GetAdminInfoFromServer(userObj) {
	return new Promise((resolve, reject) => {
		$.ajax({
      		type: 'POST',
      		url: "../Php/findUserPhp.php",
      		data: {username: userIn},
      		success: function(data) {
      			userObj = JSON.parse(data);
   				userNameC.children[0].innerHTML = userObj.name;
	    		resolve(userObj);
      		}
		});
	});
}

function AdminInfoManage(userObj) {
	userInObject = new User(userObj.username, userObj.email, userObj.icon, userObj.name, userObj.password, userObj.status);
}

function CheckIfSystemIsDownForThisUser() {
	var userNameCC = document.getElementById("userNameC").childNodes[1];
	if(userNameCC.innerHTML == "" || userNameCC.innerHTML == null) {
		document.getElementById("logOutBtn").click();
	}
}