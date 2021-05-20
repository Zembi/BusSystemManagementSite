
//STARTING ACTIONS IN ADMIN SITE
ServerStart();

function ServerStart() {
	sessionStorage.setItem("Load", "Off");
	CheckAdminBeforeLoad();
	AdminInfo();
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

async function AdminInfo() {
	await ConfigFirebaseUser(null, null);
	usernameC.children[0].innerHTML = userIn.getUsername();
}