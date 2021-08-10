
//STARTING ACTIONS IN ADMIN SITE
ServerStart();

//ASYNC FUNCTION, SO WHEN IT TRIES TO COMMUNICATE WITH THE SERVER, FIRST GET THE RESULT AND THEN FOLLOW THE ROW
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

	//UPDATE AND NOTIFICATIONS CHECKS
	NotificationsCheck("Receive");
}

//GET THE TIME THAT THE NEXT UPDATE WILL HAPPEN
/*function InformTheWebAboutUpdate() {
	$.ajax({
		type: 'POST',
		url: "../Php/makeSureNoUpdateIsOnPhp.php",
		data: {userInStatusObject: userInObject.getStatus()},
		success: function(data) {
      		alert(data);
		}
	});
}*/

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

//REDUCTION FUNCTION, SO IT CAN BEING CALLED CONTINUOUSLY
function ServerUpdateAndNotifications() {
	setTimeout(function (){
		NotificationsCheck("Receive");
	}, 5000);
}

/*
function callme(){
//This promise will resolve when the network call succeeds
//Feel free to make a REST fetch using promises and assign it to networkPromise
var networkPromise = fetch('https://jsonplaceholder.typicode.com/todos/1');


//This promise will resolve when 2 seconds have passed
var timeOutPromise = new Promise(function(resolve, reject) {
  // 2 Second delay
  setTimeout(resolve, 2000, 'Timeout Done');
});

Promise.all(
[networkPromise, timeOutPromise]).then(function(values) {
  console.log("Atleast 2 secs + TTL (Network/server)");
  //Repeat
  callme();
});
}
callme();*/

//BEING CALLED EVERY 5 SECS, UPDATE THE NOTIFICATIONS NUMBER
async function NotificationsCheck(type) {
	var notifsIdsArray = await IdsNotif(type, userIn);
	var numberOfRequestsTextC = document.getElementById("numberOfRequestsTextC");
	var requestsBtnImg = document.getElementById("requestsBtnImg");
	var alertNotifInfoC = document.getElementById("alertNotifInfoC");

	if(numberOfRequestsTextC.innerHTML != notifsIdsArray.length) {
		if(numberOfRequestsTextC.innerHTML != "-") {
			alertNotifInfoC.style.display = "table";
			alertNotifInfoC.style.marginTop = "54px";
			alertNotifInfoC.addEventListener("dblclick", function() {
				this.style.display = "none";
				this.style.marginTop = "0px";
				this.style.animation = "none";
			});

			requestsBtnImg.style.animation = "2s linear 0s infinite alternate triggerBellWhenNotificationsChange";
			
			if(sessionStorage.getItem('lastOpenedAction') == "Requests") {
				alertNotifInfoC.innerHTML = "Εντοπίσθηκε αλλαγή στις ειδοποιήσεις!<br>Κάντε ανανέωση της σελίδας ή ξαναμπείτε στα εισερχόμενα.";
			}
			else {
				alertNotifInfoC.innerHTML = "Εντοπίσθηκε αλλαγή στις ειδοποιήσεις!<br>Πηγαίνετε στις ειδοποιήσεις, για να το δείτε.";
				/*setTimeout(function (){
					alertNotifInfoC.style.marginTop = "0";
				}, 2000);*/
			}
		}
	}

	numberOfRequestsTextC.innerHTML = notifsIdsArray.length;

	//REDUCTION FUNCTION
	ServerUpdateAndNotifications();
}

//GET ALL RECEIVED NOTIFICATIONS THAT MATCH USER THAT HAS BEEN SIGNED IN
function IdsNotif(typeNotif, userIn) {
	return new Promise ((resolve, reject) => {
		$.ajax({
			type: 'POST',
			url: "../Php/getIdsOfNotificationsPhp.php",
			data: {type: typeNotif, user: userIn},
			success: function(data) {
				var notifObj = JSON.parse(data);
				resolve(notifObj);
			}
		});
	});
}