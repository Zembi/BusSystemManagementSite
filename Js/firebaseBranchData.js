
ConfigFirebaseBranch();

//FIREBASE CONNECTION WITH REALTIME DATABASE FOR BRANCHES
function ConfigFirebaseBranch() {
	var branchPath = "BusSystem/Branch";

	//INITIALIZE FIREBASE
	const config = {
		apiKey: "AIzaSyDwlt1YdlNVNvDsAQDMzfjF-iHpLlHP6LY",
    	authDomain: "bussystemdata-f2082.firebaseapp.com",
    	databaseURL: "https://bussystemdata-f2082-default-rtdb.europe-west1.firebasedatabase.app",
    	projectId: "bussystemdata-f2082",
    	storageBucket: "bussystemdata-f2082.appspot.com",
    	messagingSenderId: "444999008633",
    	appId: "1:444999008633:web:6910f92bc2ae7d124b6fa8",
   	 	measurementId: "G-FZW6QH68H5"
	};

	firebaseCoreProcess(config);

	if(sessionStorage.getItem("userStatus") == "admin") {
		if(firebaseBranchTypeCall == "init") {
			AdminBranchData(branchPath);
		}
		else if(firebaseBranchTypeCall == "newBtn") {
			AdminSetNewBranch(branchPath);
		}
	}
	else if(sessionStorage.getItem("userStatus") == "employee") {
	}
}

//WHEN ADMIN STARTS
function AdminBranchData(branchPath) {
	var dbRefObject = firebase.database().ref().child(branchPath);
	dbRefObject.on("value", function(snapshot) {
		AdminUseDataToCreateBranchManScreen(snapshot);
	});
}

function AdminUseDataToCreateBranchManScreen(snapshot) {
	var counter = 0;
	snapshot.forEach(function(childSnapshot) {
		counter++;
	});
	branchesHeaderCountC.innerHTML = counter;
}

//WHEN ADMIN WANTS TO ADD NEW BRANCH
function AdminSetNewBranch(branchPath) {
	var dbRefObject = firebase.database().ref().child(branchPath);
	var loc =  "Κατερίνη";
	dbRefObject.once("value", function(snapshot) {
		var id = produceUniqueId();
		snapshot.forEach(function(childSnapshot) {
			alert(childSnapshot.key)
			finalId = id.produceUniqueId();
			if(!childSnapshot.hasChild('finalId')) {
				dbRefObject.set({
					[finalId] : {location : [loc]}
				});
			}
		});
	});
}