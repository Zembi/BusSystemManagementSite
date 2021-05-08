
function firebaseCoreProcess(config) {

	if (!firebase.apps.length) {
   		firebase.initializeApp(config);
	}
	else {
	   	firebase.app(); // IF ALREADY INITIALIZED, USE THIS ONE
	}
}