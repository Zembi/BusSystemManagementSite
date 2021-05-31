
//STARTING ACTIONS IN ADMIN SITE
ServerStart();

async function ServerStart() {
	userObj = new Array();

	sessionStorage.setItem("Load", "Off");
	CheckAdminBeforeLoad();
	userObj = await GetAdminInfoFromServer();
	AdminInfoManage(userObj);
	var btnListener = new ButtonListener("ADMIN");
	btnListener.AddEventsToButtons();
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