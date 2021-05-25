
//FIREBASE CONNECTION WITH REALTIME DATABASE FOR LOGIN
async function ConfigFirebaseUser(id, action) {
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

	if(id == null) {
		if((sessionStorage.getItem("userStatus") == null) || (sessionStorage.getItem("userStatus") == "null")) {
			if(partNowOpened == 1) {
				await UsernameLogIn(userPath);
			}
			else if(partNowOpened == 2) {
				await EmailLogIn(userPath);
			}
		}
		else if(sessionStorage.getItem("userStatus") == "admin") {
			await UserDataLoad(userPath);
		}
		else if(sessionStorage.getItem("userStatus") == "employee") {
			await UserDataLoad(userPath);
		}
	}
	else {
		if(id != "none") {
			if(action == "find") {
				var user = await FindUserFromData(id, userPath);
				return user;
			}
			else if(action == "send") {
				//await SendUserDataToDB(id, userPath);
			}
		}
		else  {
		}
	}
}

function UsernameLogIn(userPath) {
	var dbRefObject = firebase.database().ref().child(userPath);

	return new Promise ((resolve, reject) => {
		dbRefObject.once("value").then(function(snapshot) {
			snapshot.forEach(function(childSnapshot) {
				if(usernameInput.value == childSnapshot.key) {
					if(passwordInput.value == childSnapshot.val().Password) {
						if(childSnapshot.val().Status == "Admin") {
							sessionStorage.setItem("userStatus", "admin");
							sessionStorage.setItem("user", childSnapshot.key);
							window.location.href = "../Admin";
							resolve();
						}
						else if(childSnapshot.val().Status == "Employee") {
							sessionStorage.setItem("userStatus", "employee");
							sessionStorage.setItem("user", childSnapshot.key);
							window.location.href = "../Employee";
							resolve();
						}
					}
				}
			});
		});
	});
}

function EmailLogIn(userPath) {
	var dbRefObject = firebase.database().ref().child(userPath);
	
	return new Promise ((resolve, reject) => {
		dbRefObject.once("value").then(function(snapshot) {
			snapshot.forEach(function(childSnapshot) {
				if(emailInput.value == childSnapshot.val().Email) {
					if(passwordInput.value == childSnapshot.val().Password) {
						if(childSnapshot.val().Status == "Admin") {
							sessionStorage.setItem("userStatus", "admin");
							sessionStorage.setItem("user", childSnapshot.key);
							window.location.href = "../Admin";
							resolve();
						}
						else if(childSnapshot.val().Status == "Employee") {
							sessionStorage.setItem("userStatus", "employee");
							sessionStorage.setItem("user", childSnapshot.key);
							window.location.href = "../Employee";
							resolve();
						}
					}
				}
			});
		});
	});
}

function UserDataLoad(userPath) {
	var dbRefObject = firebase.database().ref().child(userPath);
	
	return new Promise ((resolve, reject) => {
		dbRefObject.once("value").then(function(snapshot) {
			snapshot.forEach(function(childSnapshot) {
				if(sessionStorage.getItem("user") == childSnapshot.key) {
					userIn = new User(childSnapshot.key, childSnapshot.val().Email, childSnapshot.val().Password, 
										childSnapshot.val().Name, childSnapshot.val().Status, childSnapshot.val().Icon);
					resolve();
				}
			});
		});
	});
}

function FindUserFromData(id, userPath) {
	var dbRefObject = firebase.database().ref().child(userPath);
	
	return new Promise ((resolve, reject) => {
		dbRefObject.once("value").then(function(snapshot) {
			snapshot.forEach(function(childSnapshot) {
				//alert(id);
				if(id == childSnapshot.key) {
					var user = new User(childSnapshot.key, childSnapshot.val().Email, childSnapshot.val().Password, 
										childSnapshot.val().Name, childSnapshot.val().Status, childSnapshot.val().Icon);
					resolve(user);
				}
			});
		});
	});
}

function SendUserDataToDB(id, userPath) {
	var dbRefObject = firebase.database().ref().child(userPath);
	
	return new Promise ((resolve, reject) => {
		resolve();
	});
}