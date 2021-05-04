//FIREBASE CONNECTION WITH REALTIME DATABASE
ConfigFirebase();

function ConfigFirebase() {
	var firstObj = "User/";
	var id = "User/Id/";

	//INITIALIZE FIREBASE
	const config = {
		apiKey: "AIzaSyDwlt1YdlNVNvDsAQDMzfjF-iHpLlHP6LY",
  		authDomain: "bussystemdata-f2082.firebaseapp.com",
 		databaseURL: "https://bussystemdata-f2082-default-rtdb.europe-west1.firebasedatabase.app",
  		projectId: "bussystemdata-f2082",
 		storageBucket: "bussystemdata-f2082.appspot.com",
  		messagingSenderId: "444999008633",
  		appId: "1:444999008633:web:77aab1f2ddc1746a4b6fa8",
  		measurementId: "G-YF4MPREFCD"
	};

	if (!firebase.apps.length) {
   		firebase.initializeApp(config);
	}
	else {
	   	firebase.app(); // IF ALREADY INITIALIZED, USE THIS ONE
	}

	var dbRefObject = firebase.database().ref(id);
	dbRefObject.on('value', (snapshot) => {
  		console.log(snapshot.val());
	});
}