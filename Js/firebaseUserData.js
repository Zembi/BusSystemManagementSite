
//FIREBASE CONNECTION WITH REALTIME DATABASE FOR LOGIN
function ConfigFirebaseUserLogIn() {
	var userPath = "BusSystemUser/User";

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

	if((sessionStorage.getItem("userStatus") == null) || (sessionStorage.getItem("userStatus") == "null")) {
		if(partNowOpened == 1) {
			UsernameLogIn(userPath);
		}
		else if(partNowOpened == 2) {
			EmailLogIn(userPath);
		}
	}
	else if(sessionStorage.getItem("userStatus") == "admin") {
		AdminMainDataLoad(userPath);
	}
}

function UsernameLogIn(userPath) {
	var dbRefObject = firebase.database().ref().child(userPath);
	dbRefObject.once("value").then(function(snapshot) {
		snapshot.forEach(function(childSnapshot) {
			if(usernameInput.value == childSnapshot.key) {
				if(passwordInput.value == childSnapshot.val().Password) {
					if(childSnapshot.val().Status == "Admin") {
						sessionStorage.setItem("userStatus", "admin");
						sessionStorage.setItem("user", childSnapshot.key);
						window.location.href = "../Admin";
					}
					else if(childSnapshot.val().Status == "Employee") {
						sessionStorage.setItem("userStatus", "employee");
						sessionStorage.setItem("user", childSnapshot.key);
						window.location.href = "../Employee";
					}
				}
			}
		});
	});
}

function EmailLogIn(userPath) {
	var dbRefObject = firebase.database().ref().child(userPath);
	dbRefObject.once("value").then(function(snapshot) {
		snapshot.forEach(function(childSnapshot) {
			if(emailInput.value == childSnapshot.val().Email) {
				if(passwordInput.value == childSnapshot.val().Password) {
					if(childSnapshot.val().Status == "Admin") {
						sessionStorage.setItem("userStatus", "admin");
						sessionStorage.setItem("user", childSnapshot.key);
						window.location.href = "../Admin";
					}
					else if(childSnapshot.val().Status == "Employee") {
						sessionStorage.setItem("userStatus", "employee");
						sessionStorage.setItem("user", childSnapshot.key);
						window.location.href = "../Employee";
					}
				}
			}
		});
	});
}

function AdminMainDataLoad(userPath) {
	var dbRefObject = firebase.database().ref().child(userPath);
	dbRefObject.once("value").then(function(snapshot) {
		snapshot.forEach(function(childSnapshot) {
			if(sessionStorage.getItem("user") == childSnapshot.key) {
				sessionStorage.setItem("userInUsername", childSnapshot.key)
				adminU.setUsername(childSnapshot.key);
				adminU.setName(childSnapshot.val().Name);
				adminU.setName(childSnapshot.val().Email);
				adminU.setStatus(childSnapshot.val().Status);
			}
		});
	});
}