
//HERE WILL BE STORED ALL RECEIVED NOTIFICATIONS
var receivedNotifications = [];
//HERE WILL BE STORED ALL SENT NOTIFICATIONS
var sentNotifications = [];

//STATUS THAT USER IS IN (RECEIVER SCREEN OR SENDER SCREEN)
var statusScreenNow = "null";
//STATUS THAT USER WAS IN (RECEIVER SCREEN OR SENDER SCREEN)
var nextToBeStatus = "Receive";
//OPEN NOTIFICATION THAT IS OPEN RIGHT NOW
var elemntOpen = null;
//PREVIOUS OPEN NOTIFICATION
var previousElemntOpen = null;

var intervalOnlineEmpl = "";

CheckIfOkToContinueToNotificationsScreen();
//document.getElementById("notifcationSendBtn").click();

//CHECK FIRST IF EVERYTHING IS ALRIGHT AND THEN CONTINUE
//MAKE SURE USERNAME OF USER THAT SIGNED IN, HAS BEEN PARSED TO THE OBJECT employeeIn
function CheckIfOkToContinueToNotificationsScreen() {
	if(jQuery.isEmptyObject(employeeIn)) {
		alertInfoForCreatNewItemC.style.display = "table";
		alertInfoForCreatNewItemTextC.innerHTML = "Κάτι πήγε λάθος!<br>Παρακαλώ, κάντε ανανέωση της σελίδας!";
		alertInfoForCreatNewItemBtn.innerHTML = "Ανανέωση σελίδας";
		alertInfoForCreatNewItemBtn.addEventListener("click", function() {
			alertInfoForCreatNewItemC.style.display = "none";
			location.reload();
		});
	}
	else {
		CreateMainViewOfRequests();
		ServerNotifications();
	}
}

//CREATE THE VIEW OF REQUEST'S BASIC ELEMENTS
function CreateMainViewOfRequests() {
	var requestsMainC = document.getElementById("requestsMainC");
	requestsMainC.innerHTML = "";

	var showFullMessageC = document.createElement("div");
	showFullMessageC.id = "showFullMessageC";
	requestsMainC.appendChild(showFullMessageC);

	var requestsShowAllMsgsC = document.createElement("div");
	requestsShowAllMsgsC.id = "requestsShowAllMsgsC";
	requestsMainC.appendChild(requestsShowAllMsgsC);

	var menuBtnsRequestC = document.createElement("div");
	menuBtnsRequestC.id = "menuBtnsRequestC";
	requestsShowAllMsgsC.appendChild(menuBtnsRequestC);

	var receivedNotifBtn = document.createElement("button");
	receivedNotifBtn.id = "receivedNotifBtn";
	receivedNotifBtn.innerHTML = "Εισερχόμενα";
	menuBtnsRequestC.appendChild(receivedNotifBtn);

	var receivedMsgCounterC = document.createElement("div");
	receivedMsgCounterC.id = "receivedMsgCounterC";
	receivedNotifBtn.appendChild(receivedMsgCounterC);

	var sentNotifBtn = document.createElement("button");
	sentNotifBtn.id = "sentNotifBtn";
	sentNotifBtn.innerHTML = "Απεσταλμένα";
	menuBtnsRequestC.appendChild(sentNotifBtn);

	var sentMsgCounterC = document.createElement("div");
	sentMsgCounterC.id = "sentMsgCounterC";
	sentNotifBtn.appendChild(sentMsgCounterC);

	var notifcationsPlaceC = document.createElement("div");
	notifcationsPlaceC.id = "notifcationsPlaceC";
	requestsShowAllMsgsC.appendChild(notifcationsPlaceC);

	CreateThePrototypeViewOfNotificationOpen();
}

//CREATE THE NOTIFICATION OPEN SCREEN PROTOTYPE
function CreateThePrototypeViewOfNotificationOpen() {
	var showFullMessageC = document.getElementById("showFullMessageC");
	showFullMessageC.innerHTML = "";

	var fullMessageC = document.createElement("div");
	fullMessageC.id = "fullMessageC";
	showFullMessageC.appendChild(fullMessageC);

	var fullMsgLineC = document.createElement("div");
	fullMsgLineC.id = "fullMsgLineC";
	fullMessageC.appendChild(fullMsgLineC);

	var exitFullMsgBtn = document.createElement("button");
	exitFullMsgBtn.id = "exitFullMsgBtn";
	exitFullMsgBtn.innerHTML = "X";
	fullMsgLineC.appendChild(exitFullMsgBtn);

	//EXIT FROM FULL MESSAGE
	exitFullMsgBtn.addEventListener("click", function() {
		ExitFromFullMessage();
	});

	var senderMsgC = document.createElement("div");
	senderMsgC.id = "senderMsgC";
	fullMessageC.appendChild(senderMsgC);

	var typeMsgC = document.createElement("div");
	typeMsgC.id = "typeMsgC";
	fullMessageC.appendChild(typeMsgC);

	var onlyMsgC = document.createElement("div");
	onlyMsgC.id = "onlyMsgC";
	fullMessageC.appendChild(onlyMsgC);

	var dateMsgC = document.createElement("div");
	dateMsgC.id = "dateMsgC";
	fullMessageC.appendChild(dateMsgC);

	var answerReceiveC = document.createElement("div");
	answerReceiveC.id = "answerReceiveC";
	fullMessageC.appendChild(answerReceiveC);

	var answersBtnsC = document.createElement("div");
	answersBtnsC.id = "answersBtnsC";
	answerReceiveC.appendChild(answersBtnsC);

	var answerPositiveBtn = document.createElement("button");
	answerPositiveBtn.id = "answerPositiveBtn";
	answersBtnsC.appendChild(answerPositiveBtn);

	var answerPositiveImg = document.createElement("img");
	answerPositiveImg.id = "answerPositiveImg";
	answerPositiveBtn.appendChild(answerPositiveImg);

	var answerNegativeBtn = document.createElement("button");
	answerNegativeBtn.id = "answerNegativeBtn";
	answersBtnsC.appendChild(answerNegativeBtn);

	var answerNegativeImg = document.createElement("img");
	answerNegativeImg.id = "answerNegativeImg";
	answerNegativeBtn.appendChild(answerNegativeImg);

	var aboutAnswerInfoC = document.createElement("button");
	aboutAnswerInfoC.id = "aboutAnswerInfoC";
	aboutAnswerInfoC.innerHTML = "Ο αποστολέας ζητάει απάντηση στο μήνυμα του. Παρακαλώ, απαντήστε όταν είστε έτοιμος.";
	answerReceiveC.appendChild(aboutAnswerInfoC);

	var answerSendC = document.createElement("div");
	answerSendC.id = "answerSendC";
	fullMessageC.appendChild(answerSendC);

	var answerOfSummaryC = document.createElement("div");
	answerOfSummaryC.id = "answerOfSummaryC";
	answerSendC.appendChild(answerOfSummaryC);

	var answerOfSummaryImg = document.createElement("img");
	answerOfSummaryImg.id = "answerOfSummaryImg";
	answerOfSummaryC.appendChild(answerOfSummaryImg);

	var aboutInformAnswerInfoBtn = document.createElement("button");
	aboutInformAnswerInfoBtn.id = "aboutInformAnswerInfoBtn";
	answerOfSummaryC.appendChild(aboutInformAnswerInfoBtn);

	var aboutInformAnswerInfoBtnImg = document.createElement("img");
	aboutInformAnswerInfoBtnImg.id = "aboutInformAnswerInfoBtnImg";
	aboutInformAnswerInfoBtn.appendChild(aboutInformAnswerInfoBtnImg);
}

//START OF SERVER AND ACTIONS FOR NOTIFICATIONS
async function ServerNotifications() {
	receivedNotifications = await ReceivedNotif("Receiver");
	sentNotifications = await SentNotif("Sender");

	//NOTIFICATION ALERT STOP
	alertNotifInfoC.style.display = "table";
	alertNotifInfoC.innerHTML = "";

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
		ExitFromFullMessage();
		ReloadScreenOfNotifications();
	}
}

//FUNCTION TO RELOAD SAME SCREEN AFTER A CHANGE
function ReloadScreenOfNotifications() {
	if(nextToBeStatus == "Receive") {
		ScreenReceivedNotifications();
	}
	else if(nextToBeStatus == "Send") {
		ScreenSentNotifications();
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
}

//(1)->GET ALL RECEIVED NOTIFICATIONS THAT MATCH USER THAT HAS BEEN SIGNED IN
function ReceivedNotif(type) {
	return new Promise ((resolve, reject) => {
		$.ajax({
			type: 'POST',
			url: "../Php/getNotificationsPhp.php",
			data: {typeOfGet: type, userId: userIdIn},
			success: function(data) {
				//alert(data);
				var notifObj = JSON.parse(data);
				resolve(notifObj);
				//console.log(notifObj);
			}
		});
	});
}

//(1)->GET ALL RECEIVED NOTIFICATIONS THAT MATCH USER THAT HAS BEEN SIGNED IN
function SentNotif(type) {
	return new Promise ((resolve, reject) => {
		$.ajax({
			type: 'POST',
			url: "../Php/getNotificationsPhp.php",
			data: {typeOfGet: type, userId: userIdIn},
			success: function(data) {
				//alert(data);
				var notifObj = JSON.parse(data);
				resolve(notifObj);
				//console.log(notifObj);
			}
		});
	});
}


//*(2)CONTENT FOR RECEIVER NOTIFICATIONS
async function ScreenReceivedNotifications() {
	var receivedMsgCounterC = document.getElementById("receivedMsgCounterC");
	var alertNotifInfoC = document.getElementById("alertNotifInfoC");
	var requestsBtnImg = document.getElementById("requestsBtnImg");
	var notifcationsPlaceC = document.getElementById("notifcationsPlaceC");
	notifcationsPlaceC.innerHTML = "";
	alertNotifInfoC.style.display = "none";
	alertNotifInfoC.style.marginTop = "0px";
	alertNotifInfoC.style.animation = "none";
	requestsBtnImg.style.animation = "none";

	receivedNotifications = await ReceivedNotif("Receiver");

	statusScreenNow = "Receive";
	//WHEN RECEIVED SCREEN IS OPEN
	AddEventsToReceivedAndSentBtns(statusScreenNow);

	receivedMsgCounterC.innerHTML = "(" + receivedNotifications.length + ")";

	var senderNotifAr = [];

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
		contentRecC.id = "contentRecC" + receivedNotifications[i].id;

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
		senderAndMsgRecBtn.id = receivedNotifications[i].id;
		senderAndMsgRecBtn.className = "senderAndMsgRecBtn";
		senderAndMsgRecC.appendChild(senderAndMsgRecBtn);

		var senderRecC = document.createElement("div");
		senderRecC.className = "senderRecC";
		senderRecC.innerHTML = "Από: " + receivedNotifications[i].sender.username;
		//senderNotifAr[i] = "Από: " + receivedNotifications[i].sender;
		senderRecC.title = receivedNotifications[i].sender;
		senderAndMsgRecBtn.appendChild(senderRecC);

		senderAndMsgRecBtn.addEventListener("click", function() {
			var notif = receivedNotifications[this.name];
			ExitFromFullMessage();
			CreateThePrototypeViewOfNotificationOpen();
			OpenNotification("Receive", notif.id, notif.sender.username, notif.type, notif.textArea, notif.dateTimeSend, notif.answer, notif.status, document.getElementById("contentRecC" + this.id), notif.receiverPos, this.name);
		});

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

		//ADD EVENTS TO OPEN NOTIFICATIONS BUTTONS
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

//(2)(4)->SEND NOTIFICATIONS INFO TO SCREEN WHEN NOTIF BUTTON IS PRESSED
async function OpenNotification(requestType, id, sender, type, message, dateTime, answer, status, elmnt, receiverPos, notifElementId) {
	var senderMsgC = document.getElementById("senderMsgC");
	var typeMsgC = document.getElementById("typeMsgC");
	var onlyMsgC = document.getElementById("onlyMsgC");
	var dateMsgC = document.getElementById("dateMsgC");
	var answerReceiveC = document.getElementById("answerReceiveC");
	var answersBtnsC = document.getElementById("answersBtnsC");
	var answerPositiveBtn = document.getElementById("answerPositiveBtn");
	//answerPositiveBtn.className = id;
	var answersUniqueBtn = document.getElementsByClassName(id)[0];
	var answerNegativeBtn = document.getElementById("answerNegativeBtn");
	var answerSendC = document.getElementById("answerSendC");
	var answerOfSummaryC = document.getElementById("answerOfSummaryC");
	senderMsgC.innerHTML = "";

	//SPECIFIC ACTIONS DEPENDING ON THE TYPE OOF REQUEST THAT IS OPENED
	//SHOWS ONLY WHEN USER IS THE SENDER OF THE REQUEST THAT ALLOWS ANSWERS
	answerSendC.style.display = "none";
	//SHOWS ONLY WHEN USER IS THE RECEIVER OF THE REQUEST AND NEEDS TO SEND AN ANSWER
	answerReceiveC.style.display = "none";

	var showFullMessageC = document.getElementById("showFullMessageC");
	showFullMessageC.style.display = "table";
	showFullMessageC.style.width = "40%";

	var requestsShowAllMsgsC = document.getElementById("requestsShowAllMsgsC");
	requestsShowAllMsgsC.style.display = "block";
	requestsShowAllMsgsC.style.width = "60%";

	var numberLimit = 75;
	senderMsgC.title = sender;

	//IF RECEIVERS CONTAINER OVERFLOWS, HIDE THE REST OF THE USERNAMES AND SHOW ELLIPSIS
	if(requestType == "Send") {
		var spanStart = document.createElement("span");
		spanStart.innerHTML = "Προς: ";
		senderMsgC.appendChild(spanStart);

		var receiversArr = ConvertStringToArray(sender, ",");

		for(var i = 0; i < receiversArr.length; i++) {
			var span = document.createElement("span");
			span.id = receiversArr[i];
			
			var stringLength = GetStringLengthOfAllChildElements(senderMsgC);
			if(stringLength <= numberLimit) {
				if((stringLength + receiversArr[i].length) <= numberLimit) {
					var spanStop = document.createElement("span");

					if(i != (receiversArr.length - 1)) {
						span.innerHTML = receiversArr[i] + ", ";
					}
					else {
						span.innerHTML = receiversArr[i];
					}
				}
				else {
					spanStop.innerHTML = "...";
					var c = numberLimit - stringLength;
					var helper = receiversArr[i].substring(0, c);
					span.innerHTML = helper;
				}
				senderMsgC.appendChild(span);
				senderMsgC.appendChild(spanStop);
			}
		}
	}
	else {
		var spanStart = document.createElement("span");
		spanStart.innerHTML = "Από: " + sender;
		senderMsgC.appendChild(spanStart);

		var stringLength = GetStringLengthOfAllChildElements(senderMsgC);

		if(stringLength >= numberLimit) {
			var helper = spanStart.innerHTML.substring(0, numberLimit);
			helper += "...";
			spanStart.innerHTML = helper;
		}
	}

	typeMsgC.innerHTML = type;
	onlyMsgC.innerHTML = message;
	dateMsgC.innerHTML = dateTime;

	CreateTheStylingOfOpenNotifButton(elmnt);
	await SendOpenStatusEmployee(id);

	//STOP CALLING CONTINUOUSLY, THE FUNCTION THAT IS IN THE VARIABLE intervalOnlineEmpl
	clearInterval(intervalOnlineEmpl);
	//SERVER ACTIONS DEPENDING OF REQUEST TYPE
	if(requestType == "Send") {
		if(answer != null) {
			TimeUpdateAnswer(id, receiversArr);
			intervalOnlineEmpl = setInterval(async function() {
				if(sessionStorage.getItem('action') == "Requests") {
					TimeUpdateAnswer(id, receiversArr);
				}
				else {
					clearInterval(intervalOnlineEmpl);
				}
			}, 6000);
		}
	}
	else {
		if(answer != null) {
			answerReceiveC.style.display = "block";

			var answerArr = ConvertStringToArray(answer, ",");

			var answerOfThisEmployee = answerArr[receiverPos];

			var PositiveAnswer = "";
			var NegativeAnswer = "";

			if(answerOfThisEmployee == "1") {
				answerPositiveBtn.style.background = "rgb(55, 117, 41)";

				//POSITIVE BUTTON
				PositiveAnswer = Debounce(function() {
					alertInfoForCreatNewItemC.style.display = "table";
					alertInfoForCreatNewItemTextC.innerHTML = "Έχετε ήδη ορίσει θετική απάντηση!";
					alertInfoForCreatNewItemBtn.innerHTML = "Το κατάλαβα";
					alertInfoForCreatNewItemBtn.focus();
					alertInfoForCreatNewItemBtn.addEventListener("click", function() {
						alertInfoForCreatNewItemC.style.display = "none";
					});
				}, 250);

				//NEGATIVE BUTTON
				NegativeAnswer = Debounce(function() {
					AnswerActionToMessage(id, -1);
					answerArr[receiverPos] = "-1";
					receivedNotifications[notifElementId].answer = answerArr.toString();
				}, 250);
			}
			else if(answerOfThisEmployee == "-1") {
				answerNegativeBtn.style.background = "rgb(140, 43, 43)";

				//POSITIVE BUTTON
				PositiveAnswer = Debounce(function() {
					AnswerActionToMessage(id, 1);
					answerArr[receiverPos] = "1";
					receivedNotifications[notifElementId].answer = answerArr.toString();
				}, 250);

				//NEGATIVE BUTTON
				NegativeAnswer = Debounce(function() {
					alertInfoForCreatNewItemC.style.display = "table";
					alertInfoForCreatNewItemTextC.innerHTML = "Έχετε ήδη ορίσει αρνητική απάντηση!";
					alertInfoForCreatNewItemBtn.innerHTML = "Το κατάλαβα";
					alertInfoForCreatNewItemBtn.focus();
					alertInfoForCreatNewItemBtn.addEventListener("click", function() {
						alertInfoForCreatNewItemC.style.display = "none";
					});
				}, 250);
			}

			//GIVE EVENTS TO TRIGGER WHEN POSITIVE AND NEGATIVE BUTTON IS BEING PRESSED

			answerPositiveBtn.addEventListener('click', PositiveAnswer);

			answerNegativeBtn.addEventListener('click', NegativeAnswer);
		}
	}
}

//(2)->CREATE THE OPEN NOTIFICATION BUTTONS COLORS AND BACKGROUNDS
function CreateTheStylingOfOpenNotifButton(elmntToOpen) {
	elemntOpen = elmntToOpen;

	elemntOpen.style.background = "rgb(114, 162, 179)";
	elemntOpen.addEventListener("mouseover", function() {
		this.style.background = "rgb(114, 162, 179)";
	});
	elemntOpen.addEventListener("mouseout", function() {
		this.style.background = "rgb(114, 162, 179)";
	});
	if(previousElemntOpen != elemntOpen && previousElemntOpen != null ) {
		previousElemntOpen.style.background = "rgb(58, 65, 89)";
		previousElemntOpen.addEventListener("mouseover", function() {
			this.style.background = "rgb(58, 65, 89)";
		});
		previousElemntOpen.addEventListener("mouseout", function() {
			this.style.background = "rgb(58, 65, 89)";
		});
	}

	previousElemntOpen = elemntOpen;
}

//(2)->FUNCTION TO UPDATE SERVER FOR THE ANSWER(POSITIVE OR NEGATIVE) OF THE RECEIVER
async function AnswerActionToMessage(idOfNotif, msg) {
	var alertInfoForCreatNewItemC = document.getElementById("alertInfoForCreatNewItemC");
	var alertInfoForCreatNewItemTextC = document.getElementById("alertInfoForCreatNewItemTextC");
	var alertInfoForCreatNewItemBtn = document.getElementById("alertInfoForCreatNewItemBtn");

	var result = 0;

	ExitFromFullMessage();

	if(msg == 1) {
		result = await PositiveAnswerToServer(idOfNotif, msg);
	}
	else if(msg == -1) {
		result = await NegativeAnswerToServer(idOfNotif, msg);
	}

	if(result) {
		alertInfoForCreatNewItemC.style.display = "table";
		alertInfoForCreatNewItemTextC.innerHTML = "Η απάντηση σας έγινε κατανοητή.<br>Ο αποστολέας, σας ευχαριστεί, για την απάντηση σας.";
		alertInfoForCreatNewItemBtn.innerHTML = "Το κατάλαβα";
		alertInfoForCreatNewItemBtn.focus();
		alertInfoForCreatNewItemBtn.addEventListener("click", function() {
			alertInfoForCreatNewItemC.style.display = "none";
		});
	}
	else {
		alertInfoForCreatNewItemC.style.display = "table";
		alertInfoForCreatNewItemTextC.innerHTML = "Η αποστολή της απάντησής σας δεν πραγματοποιήθηκε!<br>Ξαναπροσπαθήστε αργότερα, καθώς μπορεί να έχει διαγραφτεί το μήνυμα, από τον αποστολέα του!";
		alertInfoForCreatNewItemBtn.innerHTML = "Το κατάλαβα";
		alertInfoForCreatNewItemBtn.focus();
		alertInfoForCreatNewItemBtn.addEventListener("click", function() {
			alertInfoForCreatNewItemC.style.display = "none";
		});
	}
}

//(2)->POSITIVE ANSWER SENT TO SERVER
function PositiveAnswerToServer(idOfNotif, answerOfNotif) {
	return new Promise ((resolve, reject) => {	
		$.ajax({
			type: 'POST',
			url: "../Php/sendAnswerNotifPhp.php",
			data: {id: idOfNotif, answer: answerOfNotif, receiverId: userIdIn},
			success: function(data) {
				//alert(data);
				resolve(data);
			}
		});
	});
}

//(2)->NEGATIVE ANSWER SENT TO SERVER
function NegativeAnswerToServer(idOfNotif, answerOfNotif) {
	return new Promise ((resolve, reject) => {	
		$.ajax({
			type: 'POST',
			url: "../Php/sendAnswerNotifPhp.php",
			data: {id: idOfNotif, answer: answerOfNotif, receiverId: userIdIn},
			success: function(data) {
				//alert(data);
				resolve(data);
			}
		});
	});
}


//*(3)EXIT FROM FULL MESSAGE
function ExitFromFullMessage() {
	var showFullMessageC = document.getElementById("showFullMessageC");
	showFullMessageC.style.display = "none";
	showFullMessageC.innerHTML = "";
	showFullMessageC.style.width = "0%";

	var requestsShowAllMsgsC = document.getElementById("requestsShowAllMsgsC");
	requestsShowAllMsgsC.style.display = "block";
	requestsShowAllMsgsC.style.width = "100%";

	if(elemntOpen != null) {
		elemntOpen.style.background = "rgb(58, 65, 89)";
		elemntOpen.addEventListener("mouseover", function() {
			this.style.background = "rgb(58, 65, 89)";
		});
		elemntOpen.addEventListener("mouseout", function() {
			this.style.background = "rgb(58, 65, 89)";
		});
	}

	clearInterval(intervalOnlineEmpl);
}


//*(4)CONTENT FOR SENDER NOTIFICATIONS
async function ScreenSentNotifications() {
	var sentMsgCounterC = document.getElementById("sentMsgCounterC");
	var alertNotifInfoC = document.getElementById("alertNotifInfoC");
	var requestsBtnImg = document.getElementById("requestsBtnImg");
	var notifcationsPlaceC = document.getElementById("notifcationsPlaceC");
	notifcationsPlaceC.innerHTML = "";
	alertNotifInfoC.style.display = "none";
	alertNotifInfoC.style.marginTop = "0px";
	alertNotifInfoC.style.animation = "none";
	requestsBtnImg.style.animation = "none";

	sentNotifications = await SentNotif("Sender");

	statusScreenNow = "Send";
	//WHEN SENT SCREEN IS OPEN
	AddEventsToReceivedAndSentBtns(statusScreenNow);

	sentMsgCounterC.innerHTML = "(" + sentNotifications.length + ")";

	var globalReceiversMessageArray = [];

	//CREATE THE NOTIFICATIONS CONTAINER FOR SENT SCREEN
	for(var i = 0; i < sentNotifications.length; i++) {
		var receiversArray = sentNotifications[i].receivers.slice();
		var receiversStatusArray = sentNotifications[i].status.slice();

		var oustideSendNotifC = document.createElement("div");
		oustideSendNotifC.className = "oustideSendNotifC";
		oustideSendNotifC.id = sentNotifications[i].id;

		var titleTypeSendC = document.createElement("div");
		titleTypeSendC.className = "titleTypeSendC";
		var titleTextTypeSendC = document.createElement("div");
		titleTextTypeSendC.className = "titleTextTypeSendC";
		titleTextTypeSendC.innerHTML = sentNotifications[i].type;
		titleTypeSendC.appendChild(titleTextTypeSendC);
		if(sentNotifications[i].answer != null) {
			var titleTextTypeSendImg = document.createElement("img");
			titleTextTypeSendImg.className = "titleTextTypeSendImg";
			titleTextTypeSendImg.style.content = "url(../Assets/icons8_stack_exchange_answer_50px_1.png)";
			titleTypeSendC.appendChild(titleTextTypeSendImg);
		}

		var contentSendC = document.createElement("div");
		contentSendC.className = "contentSendC";
		contentSendC.id = "contentSendC" + sentNotifications[i].id;
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
		receiversAndMsgSendBtn.id = sentNotifications[i].id;
		receiversAndMsgSendBtn.className = "receiversAndMsgSendBtn";
		receiversAndMsgSendC.appendChild(receiversAndMsgSendBtn);

		var receiversSendC = document.createElement("div");
		receiversSendC.className = "receiversSendC";
		receiversAndMsgSendBtn.appendChild(receiversSendC);
		var startMsg = "Προς: ";
		var msg = "";
		var finalMsg = "";
		for(var j = 0; j < receiversArray.length; j++) {
			if(j == (receiversArray.length - 1)) {
				msg += receiversArray[j].username;
			}
			else {
				msg += receiversArray[j].username + ", ";
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
		globalReceiversMessageArray[i] = finalMsg;
		receiversAndMsgSendBtn.addEventListener("click", function() {
			var notif = sentNotifications[this.name];
			ExitFromFullMessage();
			CreateThePrototypeViewOfNotificationOpen();
			OpenNotification("Send", notif.id, globalReceiversMessageArray[this.name], notif.type, notif.textArea, notif.dateTimeSend, notif.answer,10,  document.getElementById("contentSendC" + this.id), "", this.name);
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

		oustideSendNotifC.appendChild(titleTypeSendC);

		contentSendC.appendChild(numberDeleteSendC);
		contentSendC.appendChild(typeSendImgC);
		contentSendC.appendChild(receiversAndMsgSendC);
		oustideSendNotifC.appendChild(contentSendC);

		notifcationsPlaceC.appendChild(oustideSendNotifC);
	}
}

//(4)->MAKE SURE THAT SENDER WANTS TO DELETE NOTIFICATION
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
		ExitFromFullMessage();
		AsyncDeleteNotif(idToDelete);
	});
	noAddNewInfoBtn.addEventListener("click", function() {
		alertAddNewInfoC.style.display = "none";
	});
	noAddNewInfoBtn.focus();
}

//(4)->ASYNC CALL AFTER APPROVED TO DELETE NOTIFICATION
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

//(4)->DELETE NOTIFICATIO
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

//(4)->UPDATE ANSWERS TO SEE IF EVERYTHING CHANGE
async function TimeUpdateAnswer(idOfNotif, receiversArr) {
	var alertInfoForCreatNewItemC = document.getElementById("alertInfoForCreatNewItemC");
	var alertInfoForCreatNewItemTextC = document.getElementById("alertInfoForCreatNewItemTextC");
	var alertInfoForCreatNewItemBtn = document.getElementById("alertInfoForCreatNewItemBtn");

	var answersArray = await GetAllAnswers(idOfNotif);
	var positiveArray = [];
	var positiveAnswers = "";
	var iddleArray = [];
	var iddleAnswers = "";
	var negativeArray = [];
	var negativeAnswers = "";

	for(var i = 0; i < answersArray.length; i++) {
		if(answersArray[i] == 1) {
			document.getElementById(receiversArr[i]).style.color = "green";
			document.getElementById(receiversArr[i]).title = "Θετικό";
			positiveArray.push(receiversArr[i]);
		}
		else if(answersArray[i] == -1) {
			document.getElementById(receiversArr[i]).style.color = "red";
			document.getElementById(receiversArr[i]).title = "Αρνητικό";
			negativeArray.push(receiversArr[i]);
		}
		else {
			document.getElementById(receiversArr[i]).style.color = "rgb(221, 182, 143)";
			document.getElementById(receiversArr[i]).title = "Αναμένεται";
			iddleArray.push(receiversArr[i]);
		}
	}
	
	//POSITIVE ANSWERS STRING
	positiveAnswers = positiveArray.toString();

	//IDDLE ANSWERS STRING
	iddleAnswers = iddleArray.toString();

	//NEGATIVE ANSWERS STRING
	negativeAnswers = negativeArray.toString();

	//IF THERE ARE PEOPLE WHO GIVE POSITIVE, IDDLE OR NEGATIVE ANSWERS, INFORM SENDER AND SHOW WHO THEY ARE 
	if(positiveArray.length == answersArray.length) {
		document.getElementById("answerSendC").style.display = "block";
		document.getElementById("answerOfSummaryImg").style.content = "url(../Assets/icons8_queue_50px_5.png)";
		document.getElementById("answerOfSummaryImg").style.animation = "positiveAlertAnimation 1s linear infinite";
		document.getElementById("answerOfSummaryImg").title = "Όλοι οι παραλήπτες, συμφωνούν με το μήνυμα σας!";

		aboutInformAnswerInfoBtn.addEventListener("click", function() {
			alertInfoForCreatNewItemC.style.display = "table";
			alertInfoForCreatNewItemTextC.innerHTML = "Το πράσινο στοιχείο, δείχνει ότι, όλοι οι παραλήπτες συμφωνούν με το μήνυμα σας.";
			alertInfoForCreatNewItemBtn.innerHTML = "Το κατάλαβα";
			alertInfoForCreatNewItemBtn.addEventListener("click", function() {
				alertInfoForCreatNewItemC.style.display = "none";
			});
			alertInfoForCreatNewItemBtn.focus();
		});
	}
	else if(iddleArray.length == answersArray.length) {
		document.getElementById("answerSendC").style.display = "block";
		document.getElementById("answerOfSummaryImg").style.content = "url(../Assets/icons8_queue_50px.png)";
		document.getElementById("answerOfSummaryImg").style.animation = "iddleAlertAnimation 1s linear infinite";
		document.getElementById("answerOfSummaryImg").title = "Kανένας παραλήπτης, δεν έχει απαντήσει ακόμα, στο μήνυμα σας!";

		aboutInformAnswerInfoBtn.addEventListener("click", function() {
			alertInfoForCreatNewItemC.style.display = "table";
			alertInfoForCreatNewItemTextC.innerHTML = "Το πορτοκαλί στοιχείο, δείχνει ότι, κανένας παραλήπτης δεν έχει απαντήσει στο μήνυμα σας.<br>Προτείνεται, να μην διαγράψετε το μήνυμα σας, μέχρις ότου δεχθείτε μια απάντηση, από ολους τους παραλήπτες! (Έτσι ώστε να βεβαιωθείτε, ότι όλοι το έχουν δει)";
			alertInfoForCreatNewItemBtn.innerHTML = "Το κατάλαβα";
			alertInfoForCreatNewItemBtn.addEventListener("click", function() {
				alertInfoForCreatNewItemC.style.display = "none";
			});
			alertInfoForCreatNewItemBtn.focus();
		});
	}
	else if(negativeArray.length != 0) {
		document.getElementById("answerSendC").style.display = "block";
		document.getElementById("answerOfSummaryImg").style.content = "url(../Assets/icons8_exclamation_mark_60px.png)";
		document.getElementById("answerOfSummaryImg").style.animation = "negativeAlertAnimation 1s linear infinite";

		if(negativeArray.length == 1) {
			document.getElementById("answerOfSummaryImg").title = "Αρνητική απάντηση από τον υπάλληλο " + negativeAnswers;
		}
		else {
			if(answersArray.length == negativeArray.length) {
				document.getElementById("answerOfSummaryImg").title = "Αρνητική απάντηση από όλους τους υπαλλήλους";
			}
			else {
				document.getElementById("answerOfSummaryImg").title = "Αρνητική απάντηση από τους υπάλληλους " + negativeAnswers;
			}
		}

		aboutInformAnswerInfoBtn.addEventListener("click", function() {
			alertInfoForCreatNewItemC.style.display = "table";
			alertInfoForCreatNewItemTextC.innerHTML = "Το κόκκινο στοιχείο, δείχνει ότι, υπάρχει αρνητική απάντηση, στο μήνυμα σας.<br>Οι εξής χρήστες έχουν αρνητική απάντηση: " + negativeAnswers + ".";
			alertInfoForCreatNewItemBtn.innerHTML = "Το κατάλαβα";
			alertInfoForCreatNewItemBtn.addEventListener("click", function() {
				alertInfoForCreatNewItemC.style.display = "none";
			});
			alertInfoForCreatNewItemBtn.focus();
		});
	}
	else {
		document.getElementById("answerSendC").style.display = "none";
		document.getElementById("answerOfSummaryImg").title = "";
	}

	var currentDate = new Date();
	var extraH = "";
	var extraM = "";
	var extraS = "";
	if(currentDate.getHours() < 10) {
		extraH = 0;
	}
	if(currentDate.getMinutes() < 10) {
		extraM = 0;
	}
	if(currentDate.getSeconds() < 10) {
		extraS = 0;
	}

	var dateTime = "Τελευταία ενημέρωση: " + currentDate.getDate() + "/" + (currentDate.getMonth() + 1) + "/" + currentDate.getFullYear() + "  -  " 
					+ extraH + currentDate.getHours() + ":" + extraM + currentDate.getMinutes() + ":" + extraS + currentDate.getSeconds();
	return dateTime;
}

//(4)->FIND THE ANSWERS OF RECEIVERS AND INFORM THE SENDER ABOUT THEIR ANSWERS
function GetAllAnswers(idOfNotif) {
	return new Promise ((resolve, reject) => {
		$.ajax({
			type: 'POST',
			url: "../Php/getAllAnswersForThisNotifPhp.php",
			data: {id: idOfNotif},
			success: function(data) {
				//alert(data);
				var notifAnswersObj = JSON.parse(data);
				resolve(notifAnswersObj);
				//console.log(notifAnswersObj);
			}
		});
	});
}


//(2)(4)->GIVE IMG, TO NOTIFICATION IMG DIV, ACCORDING OF THE TYPE OF THE NOTIFICATION
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
		element.style.content = "url(../Assets/icons8_close_window_50px_1.png)";
	}
	else if(type == "Προσθήκη καταστήματος") {
		element.style.content = "url(../Assets/icons8_merge_git_50px.png)";
	}
	else if(type == "Επεξεργασία στοιχείων καταστημάτων") {
		element.style.content = "url(../Assets/icons8_edit_50px.png)";
	}
	else if(type == "Διαγραφή καταστήματος") {
		element.style.content = "url(../Assets/icons8_close_window_50px_1.png)";
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

//(2)(4)->SEND USER'S NEW STATUS FOR NOTIFICATION
function SendOpenStatusEmployee(notifId) {
	return new Promise ((resolve, reject) => {
		$.ajax({
			type: 'POST',
			url: "../Php/sendOpenStatusNotificationPhp.php",
			data: {id: notifId, user: userIdIn},
			success: function(data) {
				resolve();
			}
		});
	});
}