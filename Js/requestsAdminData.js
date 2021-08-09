
//HERE WILL BE STORED ALL RECEIVED NOTIFICATIONS
var receivedNotifications = [];
//HERE WILL BE STORED ALL SENT NOTIFICATIONS
var sentNotifications = [];

//STATUS THAT USER IS IN (RECEIVER SCREEN OR SENDER SCREEN)
var statusScreenNow = "null";
//STATUS THAT USER WAS IN (RECEIVER SCREEN OR SENDER SCREEN)
var nextToBeStatus = "Receive";

CheckIfOkToContinueToNotificationsScreen();

//CHECK FIRST IF EVERYTHING IS ALRIGHT AND THEN CONTINUE
//MAKE SURE USERNAME OF USER THAT SIGNED IN, HAS BEEN PARSED TO THE OBJECT userInObject
function CheckIfOkToContinueToNotificationsScreen() {
	if(jQuery.isEmptyObject(userInObject)) {
		alertInfoForCreatNewItemC.style.display = "table";
		alertInfoForCreatNewItemTextC.innerHTML = "Κάτι πήγε λάθος!<br>Παρακαλώ, κάντε ανανέωση της σελίδας!";
		alertInfoForCreatNewItemBtn.innerHTML = "Ανανέωση σελίδας";
		alertInfoForCreatNewItemBtn.addEventListener("click", function() {
			alertInfoForCreatNewItemC.style.display = "none";
			location.reload();
		});
	}
	else {
		ServerNotifications();
	}
}

//START OF SERVER AND ACTIONS FOR NOTIFICATIONS
async function ServerNotifications() {
	receivedNotifications = await ReceivedNotif("Receiver", userInObject.getUsername());
	sentNotifications = await SentNotif("Sender", userInObject.getUsername());

	StartNotificationsScreen();
	receivedNotifBtn.addEventListener("click", function() {
		nextToBeStatus = "Receive";
		CheckScreenNowAndLoadIfNecessary();
	});
	sentNotifBtn.addEventListener("click", function() {
		nextToBeStatus = "Send";
		CheckScreenNowAndLoadIfNecessary();
	});
}

//CHECK SCREEN SO DONT LOAD AGAIN AND AGAIN THE SAME SCREEN
function CheckScreenNowAndLoadIfNecessary() {
	if(nextToBeStatus != statusScreenNow) {
		if(nextToBeStatus == "Receive") {
			ScreenReceivedNotifcations();
		}
		else if(nextToBeStatus == "Send") {
			ScreenSentNotifcations();
		}
	}
}

//FUNCTION TO RELOAD SAME SCREEN AFTER A CHANGE
function ReloadScreenOfNotifications() {
	if(nextToBeStatus == "Receive") {
		ScreenReceivedNotifcations();
	}
	else if(nextToBeStatus == "Send") {
		ScreenSentNotifcations();
	}
}


//*(1)INIALITZE DEFAULT ACTIONS OF REQUESTS VIEW
function StartNotificationsScreen() {
	var receivedMsgCounterC = document.getElementById("receivedMsgCounterC");
	var sentMsgCounterC = document.getElementById("sentMsgCounterC");

	receivedMsgCounterC.innerHTML = "(" + receivedNotifications.length + ")";
	sentMsgCounterC.innerHTML = "(" + sentNotifications.length + ")";

	//DEFAULT SCREEN
	CheckScreenNowAndLoadIfNecessary();

	//EXIT FROM FULL MESSAGE
	var exitFullMsgBtn = document.getElementById("exitFullMsgBtn");
	exitFullMsgBtn.addEventListener("click", function() {
		ExitFromFullMessage();
	});
}

//(1)->GET ALL RECEIVED NOTIFICATIONS THAT MATCH USER THAT HAS BEEN SIGNED IN
function ReceivedNotif(type, userIn) {
	return new Promise ((resolve, reject) => {
		$.ajax({
			type: 'POST',
			url: "../Php/getNotificationsPhp.php",
			data: {typeOfGet: type, user: userIn},
			success: function(data) {
				var notifObj = JSON.parse(data);
				resolve(notifObj);
				//resolve(data);
			}
		});
	});
}

//(1)->GET ALL RECEIVED NOTIFICATIONS THAT MATCH USER THAT HAS BEEN SIGNED IN
function SentNotif(type, userIn) {
	return new Promise ((resolve, reject) => {
		$.ajax({
			type: 'POST',
			url: "../Php/getNotificationsPhp.php",
			data: {typeOfGet: type, user: userIn},
			success: function(data) {
				var notifObj = JSON.parse(data);
				resolve(notifObj);
				//resolve(data);
			}
		});
	});
}


//*(2)CONTENT FOR RECEIVER NOTIFICATIONS
async function ScreenReceivedNotifcations() {
	var receivedMsgCounterC = document.getElementById("receivedMsgCounterC");
	var notifcationsPlaceC = document.getElementById("notifcationsPlaceC");
	notifcationsPlaceC.innerHTML = "";

	receivedNotifications = await ReceivedNotif("Receiver", userInObject.getUsername());

	statusScreenNow = "Receive";
	//WHEN RECEIVED SCREEN IS OPEN
	AddEventsToReceivedAndSentBtns(statusScreenNow);

	receivedMsgCounterC.innerHTML = "(" + receivedNotifications.length + ")";

	//CREATE THE NOTIFICATIONS CONTAINER FOR RECEIVED SCREEN
	for(var i = 0; i < receivedNotifications.length; i++) {
		var oustideRecNotifC = document.createElement("div");
		oustideRecNotifC.className = "oustideRecNotifC";
		oustideRecNotifC.id = receivedNotifications[i].id;

		var titleTextTypeRecC = document.createElement("div");
		titleTextTypeRecC.className = "titleTextTypeRecC";
		titleTextTypeRecC.innerHTML = receivedNotifications[i].type;

		var contentRecC = document.createElement("div");
		contentRecC.className = "contentRecC";

		var numberRecC = document.createElement("numberRecC");
		numberRecC.className = "numberRecC";
		numberRecC.innerHTML = i + 1;

		var typeRecImgC = document.createElement("div");
		typeRecImgC.className = "typeRecImgC";

		var typeRecImg = document.createElement("img");
		typeRecImg.className = "typeRecImg";
		GiveElementPic(receivedNotifications[i].type, typeRecImg);
		typeRecImgC.appendChild(typeRecImg);

		var senderAndMsgRecC = document.createElement("div");
		senderAndMsgRecC.className = "senderAndMsgRecC";

		var senderAndMsgRecBtn = document.createElement("button");
		senderAndMsgRecBtn.name = i;
		senderAndMsgRecBtn.id = receivedNotifications[i].id + "senderAndMsgRecBtn";
		senderAndMsgRecBtn.className = "senderAndMsgRecBtn";
		senderAndMsgRecC.appendChild(senderAndMsgRecBtn);
		senderAndMsgRecBtn.addEventListener("click", function() {
			var notif = receivedNotifications[this.name];
			OpenNotification(notif.id, senderNotifAr[this.name], notif.type, notif.textArea, notif.dateTimeSend, notif.status);
		});

		var senderRecC = document.createElement("div");
		senderRecC.className = "senderRecC";
		senderRecC.innerHTML = "Από: " + receivedNotifications[i].sender;
		var senderNotifAr = [];
		senderNotifAr[i] = senderRecC.innerHTML;
		senderRecC.title = receivedNotifications[i].sender;
		senderAndMsgRecBtn.appendChild(senderRecC);

		var messageRecC = document.createElement("div");
		messageRecC.className = "messageRecC";
		messageRecC.innerHTML = receivedNotifications[i].textArea;
		messageRecC.title = "Κάνε κλίκ για να δείς ολόκληρο το κείμενο";
		senderAndMsgRecBtn.appendChild(messageRecC);

		var dateRecC = document.createElement("div");
		dateRecC.className = "dateRecC";
		dateRecC.innerHTML = ConvertToDate(receivedNotifications[i].dateTimeSend);
		senderAndMsgRecBtn.appendChild(dateRecC);

		oustideRecNotifC.appendChild(titleTextTypeRecC);

		contentRecC.appendChild(numberRecC);
		contentRecC.appendChild(typeRecImgC);
		contentRecC.appendChild(senderAndMsgRecC);
		oustideRecNotifC.appendChild(contentRecC);

		notifcationsPlaceC.appendChild(oustideRecNotifC);

		//ADD EVENTS
		if(receivedNotifications[i].status == 0) {
			contentRecC.style.background = "rgb(33, 39, 47)";
			contentRecC.addEventListener("mouseover", function() {
				this.style.background = "rgb(111, 143, 171, 0.2)";
			});
			contentRecC.addEventListener("mouseout", function() {
				this.style.background = "rgb(33, 39, 47)";
			});
		}
		else {
			contentRecC.style.background = "rgb(58, 65, 89)";
			contentRecC.addEventListener("mouseover", function() {
			});
			contentRecC.addEventListener("mouseout", function() {
			});
		}
	}
}

//(2)->SEND NOTIFICATIONS INFO TO SCREEN WHEN NOTIF BUTTON IS PRESSED
async function OpenNotification(id, sender, type, message, dateTime, status) {
	var senderMsgC = document.getElementById("senderMsgC");
	var typeMsgC = document.getElementById("typeMsgC");
	var onlyMsgC = document.getElementById("onlyMsgC");
	var dateMsgC = document.getElementById("dateMsgC");

	var showFullMessageC = document.getElementById("showFullMessageC");
	showFullMessageC.style.display = "table";
	showFullMessageC.style.width = "40%";

	var requestsShowAllMsgsC = document.getElementById("requestsShowAllMsgsC");
	requestsShowAllMsgsC.style.display = "block";
	requestsShowAllMsgsC.style.width = "60%";

	senderMsgC.innerHTML = sender;
	typeMsgC.innerHTML = type;
	onlyMsgC.innerHTML = message;
	dateMsgC.innerHTML = dateTime;

	if(status == 0) {
		await SendOpenStatusUser(id, userInObject.getUsername());
		CheckScreenNowAndLoadIfNecessary();
	}
}

//*(3)EXIT FROM FULL MESSAGE
function ExitFromFullMessage() {
	var showFullMessageC = document.getElementById("showFullMessageC");
	showFullMessageC.style.display = "none";
	showFullMessageC.style.width = "0%";

	var requestsShowAllMsgsC = document.getElementById("requestsShowAllMsgsC");
	requestsShowAllMsgsC.style.display = "block";
	requestsShowAllMsgsC.style.width = "100%";
}


//*(3)CONTENT FOR SENDER NOTIFICATIONS
async function ScreenSentNotifcations() {
	var sentMsgCounterC = document.getElementById("sentMsgCounterC");
	var notifcationsPlaceC = document.getElementById("notifcationsPlaceC");
	notifcationsPlaceC.innerHTML = "";
	//alert("kkfk");

	sentNotifications = await SentNotif("Sender", userInObject.getUsername());

	statusScreenNow = "Send";
	//WHEN SENT SCREEN IS OPEN
	AddEventsToReceivedAndSentBtns(statusScreenNow);

	sentMsgCounterC.innerHTML = "(" + sentNotifications.length + ")";

	var globalReceiversMessageArray = [];

	//CREATE THE NOTIFICATIONS CONTAINER FOR SENT SCREEN
	for(var i = 0; i < sentNotifications.length; i++) {
		var receiversArray = [];
		var receiversUsernameArray = [];
		var allReceiversSymbol = sentNotifications[i].receiver;

		var c = 0;
		while(allReceiversSymbol != "") {
			receiversArray[c] = allReceiversSymbol.substr(0, allReceiversSymbol.indexOf('#'));
			receiversUsernameArray[c] = allReceiversSymbol.substr(0, allReceiversSymbol.indexOf('$'));
			allReceiversSymbol = allReceiversSymbol.split(receiversArray[c] + "#").pop();
			c++;
		}

		var oustideSendNotifC = document.createElement("div");
		oustideSendNotifC.className = "oustideSendNotifC";
		oustideSendNotifC.id = sentNotifications[i].id;

		var titleTextTypeSendC = document.createElement("div");
		titleTextTypeSendC.className = "titleTextTypeSendC";
		titleTextTypeSendC.innerHTML = sentNotifications[i].type;

		var contentSendC = document.createElement("div");
		contentSendC.className = "contentSendC";
		contentSendC.style.background = "rgb(58, 65, 89)";

		var numberDeleteSendC = document.createElement("div");
		numberDeleteSendC.className = "numberDeleteSendC";

		var numberSendC = document.createElement("div");
		numberSendC.className = "numberSendC";
		numberSendC.innerHTML = i + 1;
		numberDeleteSendC.appendChild(numberSendC);

		var deleteSendBtn = document.createElement("button");
		deleteSendBtn.className = "deleteSendBtn";
		deleteSendBtn.tabIndex = -1;
		deleteSendBtn.id = sentNotifications[i].id;
		deleteSendBtn.addEventListener("click", function() {
			MakeSureToDeleteNotification(this.id);
		});
		numberDeleteSendC.appendChild(deleteSendBtn);

		var deleteSendBtnImg = document.createElement("img");
		deleteSendBtnImg.className = "deleteSendBtnImg";
		deleteSendBtn.appendChild(deleteSendBtnImg);

		var typeSendImgC = document.createElement("div");
		typeSendImgC.className = "typeSendImgC";

		var typeSendImg = document.createElement("img");
		typeSendImg.className = "typeSendImg";
		GiveElementPic(sentNotifications[i].type, typeSendImg);
		typeSendImgC.appendChild(typeSendImg);

		var receiversAndMsgSendC = document.createElement("div");
		receiversAndMsgSendC.className = "receiversAndMsgSendC";

		var receiversAndMsgSendBtn = document.createElement("button");
		receiversAndMsgSendBtn.name = i;
		receiversAndMsgSendBtn.id = sentNotifications[i].id + "receiversAndMsgSendBtn";
		receiversAndMsgSendBtn.className = "receiversAndMsgSendBtn";
		receiversAndMsgSendC.appendChild(receiversAndMsgSendBtn);

		var receiversSendC = document.createElement("div");
		receiversSendC.className = "receiversSendC";
		receiversAndMsgSendBtn.appendChild(receiversSendC);
		var startMsg = "Προς: ";
		var msg = "";
		var finalMsg = "";
		for(var j = 0; j < receiversUsernameArray.length; j++) {
			if(j == (receiversUsernameArray.length - 1)) {
				msg += receiversUsernameArray[j];
			}
			else {
				msg += receiversUsernameArray[j] + ", ";
			}
		}
		receiversSendC.innerHTML = startMsg + msg;
		receiversSendC.title = msg;
		var helper = receiversSendC.innerHTML;
		if(parseInt(helper.length) >= 100) {
			finalMsg = helper.substring(0, 100);
			finalMsg = finalMsg + "...";
		}
		else {
			finalMsg = msg;
		}
		globalReceiversMessageArray[i] = startMsg + finalMsg;
		receiversAndMsgSendBtn.addEventListener("click", function() {
			var notif = sentNotifications[this.name];
			OpenNotification(notif.id, globalReceiversMessageArray[this.name], notif.type, notif.textArea, notif.dateTimeSend, "");
		});

		var messageSendC = document.createElement("div");
		messageSendC.className = "messageSendC";
		messageSendC.innerHTML = sentNotifications[i].textArea;
		messageSendC.title = "Κάνε κλίκ για να δείς ολόκληρο το κείμενο";
		receiversAndMsgSendBtn.appendChild(messageSendC);

		var dateSendC = document.createElement("div");
		dateSendC.className = "dateSendC";
		dateSendC.innerHTML = ConvertToDate(sentNotifications[i].dateTimeSend);
		receiversAndMsgSendBtn.appendChild(dateSendC);

		oustideSendNotifC.appendChild(titleTextTypeSendC);

		contentSendC.appendChild(numberDeleteSendC);
		contentSendC.appendChild(typeSendImgC);
		contentSendC.appendChild(receiversAndMsgSendC);
		oustideSendNotifC.appendChild(contentSendC);

		notifcationsPlaceC.appendChild(oustideSendNotifC);
	}
}

//(3)->MAKE SURE THAT SENDER WANTS TO DELETE NOTIFICATION
function MakeSureToDeleteNotification(idToDelete) {
	var alertAddNewInfoC = document.getElementById("alertAddNewInfoC");
	var addNewInfoTitleTextC = document.getElementById("addNewInfoTitleTextC");
	var addNewInfoTextC = document.getElementById("addNewInfoTextC");
	var yesAddNewInfoBtn = document.getElementById("yesAddNewInfoBtn");
	var noAddNewInfoBtn = document.getElementById("noAddNewInfoBtn");

	alertAddNewInfoC.style.display = "block";
	addNewInfoTitleTextC.innerHTML = "ΔΙΑΓΡΑΦΗ ΕΙΔΟΠΟΙΗΣΗΣ";
	addNewInfoTextC.innerHTML = "Είστε σίγουρος ότι θέλετε να διαγράψετε αυτήν την ειδοποίηση;<br>Προτείνεται, η διαγραφή μιας ειδοποίησης, μετά το πέρας της μιας εβδομάδας, από την μέρα αποστολής.";
	$("#yesAddNewInfoBtn").unbind().click(function() {
		AsyncDeleteNotif(idToDelete);
	});
	noAddNewInfoBtn.addEventListener("click", function() {
		alertAddNewInfoC.style.display = "none";
	});
	noAddNewInfoBtn.focus();
}

//(3)->ASYNC CALL AFTER APPROVED TO DELETE NOTIFICATION
async function AsyncDeleteNotif(idToDelete) {
	var result = await DeleteNotification(idToDelete);

	alertAddNewInfoC.style.display = "none";
	if(result == "1") {
		ReloadScreenOfNotifications();
	}
	else {
		var alertInfoForCreatNewItemC = document.getElementById("alertInfoForCreatNewItemC");
		var alertInfoForCreatNewItemTextC = document.getElementById("alertInfoForCreatNewItemTextC");
		var alertInfoForCreatNewItemBtn = document.getElementById("alertInfoForCreatNewItemBtn");

		alertInfoForCreatNewItemC.style.display = "table";
		alertInfoForCreatNewItemTextC.innerHTML = "Κάτι πήγε λάθος!Ανανεώστε την σελίδα και αν συνεχίσει να υπάρχει το πρόβλημα, ξαναπροσπαθήστε αργότερα";
		alertInfoForCreatNewItemBtn.innerHTML = "Ανανέωση σελίδας";
		alertInfoForCreatNewItemBtn.addEventListener("click", function() {
			alertInfoForCreatNewItemC.style.display = "none";
			location.reload();
		});
		alertInfoForCreatNewItemBtn.focus();
	}
}

//(3)->DELETE NOTIFICATION
function DeleteNotification(idToDelete) {
	return new Promise ((resolve, reject) => {	
		$.ajax({
			type: 'POST',
			url: "../Php/deleteNotificationPhp.php",
			data: {id: idToDelete},
			success: function(data) {
				resolve(data);
			}
		});
	});
}

//(2)(3)->GIVE IMG, TO NOTIFICATION IMG DIV, ACCORDING OF THE TYPE OF THE NOTIFICATION
function GiveElementPic(type, element) {
	if(type == "Γενική ενημέρωση συστήματος") {
		element.style.content = "url(../Assets/icons8_update_left_rotation_50px.png)";
	}
	else if(type == "Πληροφόρηση") {
		element.style.content = "url(../Assets/icons8_information_50px.png)";
	}
	else if(type == "Κρίσιμη πληροφόρηση") {
		element.style.content = "url(../Assets/icons8_alert_50px.png)";
	}
	else if(type == "Αίτημα") {
		element.style.content = "url(../Assets/icons8_request_service_50px_1.png)";
	}
	else if(type == "Πρόσληψη νέου υπαλλήλου") {
		element.style.content = "url(../Assets/icons8_send_job_list_50px_3.png)";
	}
	else if(type == "Πρόσληψη πρώην υπαλλήλου") {
		element.style.content = "url(../Assets/icons8_send_job_list_50px_3.png)";
	}
	else if(type == "Επεξεργασία στοιχείων υπαλλήλου") {
		element.style.content = "url(../Assets/icons8_edit_50px.png)";
	}
	else if(type == "Αποδέσμευση υπαλλήλου") {
		element.style.content = "url(../Assets/icons8_close_window_50px.png)";
	}
	else if(type == "Προσθήκη καταστήματος") {
		element.style.content = "url(../Assets/icons8_merge_git_50px.png)";
	}
	else if(type == "Επεξεργασία στοιχείων καταστημάτων") {
		element.style.content = "url(../Assets/icons8_edit_50px.png)";
	}
	else if(type == "Διαγραφή καταστήματος") {
		element.style.content = "url(../Assets/icons8_close_window_50px.png)";
	}
	else if(type == "Δημιουργία νέου δρομολογίου") {
		element.style.content = "url(../Assets/icons8_gps_50px.png)";
	}
	else if(type == "Επεξεργασία δρομολογίου") {
		element.style.content = "url(../Assets/icons8_edit_50px.png)";
	}
}

//ADD DEFAULT AND EVENTS AT THE TWO MAIN BUTTONS
function AddEventsToReceivedAndSentBtns(statusNow) {
	if(statusNow == "Receive") {
		receivedNotifBtn.style.background = "rgb(13, 18, 24)";
		receivedNotifBtn.style.color = "rgb(255, 215, 0)";
		receivedNotifBtn.style.border = "1px solid rgb(255, 215, 0)";
		receivedNotifBtn.addEventListener("mouseover", function() {
			this.style.background = "rgb(255, 215, 0)";
			this.style.color = "white";
			this.style.border = "1px solid white";
		});
		receivedNotifBtn.addEventListener("mouseout", function() {
			this.style.background = "rgb(13, 18, 24)";
			this.style.color = "rgb(255, 215, 0)";
			this.style.border = "1px solid rgb(255, 215, 0)";
		});
		receivedNotifBtn.addEventListener("click", function() {
			this.style.background = "white";
			this.style.color = "rgb(255, 215, 0)";
			this.style.border = "1px solid rgb(255, 215, 0)";
		});
		receivedNotifBtn.addEventListener("focus", function() {
			this.style.background = "white";
			this.style.color = "rgb(255, 215, 0)";
			this.style.border = "1px solid rgb(255, 215, 0)";
		});
		receivedNotifBtn.addEventListener("focusout", function() {
			this.style.background = "rgb(13, 18, 24)";
			this.style.color = "rgb(255, 215, 0)";
			this.style.border = "1px solid rgb(255, 215, 0)";
		});

		sentNotifBtn.style.background = "rgb(13, 18, 24)";
		sentNotifBtn.style.color = "white";
		sentNotifBtn.style.border = "1px solid white";
		sentNotifBtn.addEventListener("mouseover", function() {
			this.style.background = "rgb(255, 215, 0)";
			this.style.color = "rgb(13, 18, 24)";
			this.style.border = "1px solid rgb(13, 18, 24)";
		});
		sentNotifBtn.addEventListener("mouseout", function() {
			this.style.background = "rgb(13, 18, 24)";
			this.style.color = "white";
			this.style.border = "1px solid white";
		});
		sentNotifBtn.addEventListener("click", function() {
			this.style.background = "white";
			this.style.color = "rgb(255, 215, 0)";
			this.style.border = "1px solid rgb(255, 215, 0)";
		});
		sentNotifBtn.addEventListener("focus", function() {
			this.style.background = "white";
			this.style.color = "rgb(255, 215, 0)";
			this.style.border = "1px solid rgb(255, 215, 0)";
		});
		sentNotifBtn.addEventListener("focusout", function() {
			this.style.background = "rgb(13, 18, 24)";
			this.style.color = "white";
			this.style.border = "1px solid white";
		});
	}
	else if(statusNow == "Send") {
		receivedNotifBtn.style.background = "rgb(13, 18, 24)";
		receivedNotifBtn.style.color = "white";
		receivedNotifBtn.style.border = "1px solid white";
		receivedNotifBtn.addEventListener("mouseover", function() {
			this.style.background = "rgb(255, 215, 0)";
			this.style.color = "rgb(13, 18, 24)";
			this.style.border = "1px solid rgb(13, 18, 24)";
		});
		receivedNotifBtn.addEventListener("mouseout", function() {
			this.style.background = "rgb(13, 18, 24)";
			this.style.color = "white";
			this.style.border = "1px solid white";
		});
		receivedNotifBtn.addEventListener("click", function() {
			this.style.background = "white";
			this.style.color = "rgb(255, 215, 0)";
			this.style.border = "1px solid rgb(255, 215, 0)";
		});
		receivedNotifBtn.addEventListener("focus", function() {
			this.style.background = "white";
			this.style.color = "rgb(255, 215, 0)";
			this.style.border = "1px solid rgb(255, 215, 0)";
		});
		receivedNotifBtn.addEventListener("focusout", function() {
			this.style.background = "rgb(13, 18, 24)";
			this.style.color = "white";
			this.style.border = "1px solid white";
		});

		sentNotifBtn.style.background = "rgb(13, 18, 24)";
		sentNotifBtn.style.color = "rgb(255, 215, 0)";
		sentNotifBtn.style.border = "1px solid rgb(255, 215, 0)";
		sentNotifBtn.addEventListener("mouseover", function() {
			this.style.background = "rgb(255, 215, 0)";
			this.style.color = "white";
			this.style.border = "1px solid white";
		});
		sentNotifBtn.addEventListener("mouseout", function() {
			this.style.background = "rgb(13, 18, 24)";
			this.style.color = "rgb(255, 215, 0)";
			this.style.border = "1px solid rgb(255, 215, 0)";
		});
		sentNotifBtn.addEventListener("click", function() {
			this.style.background = "white";
			this.style.color = "rgb(255, 215, 0)";
			this.style.border = "1px solid rgb(255, 215, 0)";
		});
		sentNotifBtn.addEventListener("focus", function() {
			this.style.background = "white";
			this.style.color = "rgb(255, 215, 0)";
			this.style.border = "1px solid rgb(255, 215, 0)";
		});
		sentNotifBtn.addEventListener("focusout", function() {
			this.style.background = "rgb(13, 18, 24)";
			this.style.color = "rgb(255, 215, 0)";
			this.style.border = "1px solid rgb(255, 215, 0)";
		});
	}
}

//(2)(3)->SEND USER'S NEW STATUS FOR NOTIFICATION
function SendOpenStatusUser(notifId, userIn) {
	return new Promise ((resolve, reject) => {
		$.ajax({
			type: 'POST',
			url: "../Php/sendOpenStatusNotificationPhp.php",
			data: {id: notifId, user: userIn},
			success: function(data) {
				resolve();
			}
		});
	});
}