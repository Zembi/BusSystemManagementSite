//STARTING ACTIONS IN ADMIN SITE
ServerStart();

function ServerStart() {
	CheckAdminBeforeLoad();
	AdminInfo();
	var btnListener = new ButtonListener("ADMIN");
	btnListener.AddEventsToButtons();
}

function CheckAdminBeforeLoad() {
	var action = window.location.hash;
	action = action.substring(1);

	if(sessionStorage.getItem('action') == null || action == "") {
		sessionStorage.setItem('action', "Home");
	}
	var menuScrnA = new MenuScreenAdmin(sessionStorage.getItem('action'));
	menuScrnA.ChooseFromActionId();
}

function AdminInfo() {
	ConfigFirebaseUserLogIn();
}