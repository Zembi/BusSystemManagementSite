//WAGE DOTS AND COMMAS
function RoundDecimal(num, dec) {
	return (Math.round(num * 100) / 100).toFixed(dec)
}

//NO WHITE SPACE USERNAME BAR
function NoWhiteSpace() { 
	var key = event.keyCode;
	if (key === 32) {
		event.preventDefault();
	}
}

//PREVENT ANY SYMBOL YOU WANT FROM AN INPUT
function NotAllowSymbol(evt, symbolCode) {
	var ASCIICode = (evt.which) ? evt.which : evt.keyCodel;
	
	if(ASCIICode == symbolCode) {
		evt.preventDefault();
	}
}

//USERNAME INPUT PREVENTS INPUT
function UsernameInputPreventSymbols() {
	NoWhiteSpace();
	NotAllowSymbol(event, 34);
	NotAllowSymbol(event, 35);
	NotAllowSymbol(event, 36);
	NotAllowSymbol(event, 37);
	NotAllowSymbol(event, 39);
	NotAllowSymbol(event, 40);
	NotAllowSymbol(event, 41);
	NotAllowSymbol(event, 42);
	NotAllowSymbol(event, 46);
	NotAllowSymbol(event, 47);
	NotAllowSymbol(event, 58);
	NotAllowSymbol(event, 59);
	NotAllowSymbol(event, 60);
	NotAllowSymbol(event, 61);
	NotAllowSymbol(event, 62);
	NotAllowSymbol(event, 91);
	NotAllowSymbol(event, 92);
	NotAllowSymbol(event, 93);
	NotAllowSymbol(event, 96);
	NotAllowSymbol(event, 123);
	NotAllowSymbol(event, 125);
}

//ALLOW ONLY NUMBERS IN INPUT
function OnlyNumberKey(evt, symbol) {
	var ASCIICode = (evt.which) ? evt.which : evt.keyCode;
	
	if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)) {
		if(symbol == "dot")	{
			if(ASCIICode != 46) {
				evt.preventDefault();
			}
		}
		else {
			evt.preventDefault();
		}
	}
}

//CONVERT DATE FORMAT TO INPUT DATE
function ConvertFromDate(givenDate) {
	var date = new Date(givenDate);
	var year = date.getFullYear() + "";
	var month = date.getMonth() + 1 + "";
	var day = date.getDate() + "";

	if(month.length < 2) {
		month = "0" + month;
	}
			
	if(day.length < 2) {
		day = "0" + day;
	}

	return (year + "-" + month + "-" + day);
}

//CONVERT INPUT STRING TO DATE
function ConvertToDate(givenDate) {
	var date = new Date(givenDate);
	var year = date.getFullYear() + "";
	var month = date.getMonth() + 1 + "";
	var day = date.getDate() + "";

	if(month.length < 2) {
		month = "0" + month;
	}
		
	if(day.length < 2) {
		day = "0" + day;
	}

	return (month + "/" + day + "/" + year);
}

//CONVERT DATE TO TIME
function ConvertToTime(givenDate) {
	var hours = givenDate.getHours();
	var minutes = givenDate.getMinutes();
	var seconds = givenDate.getSeconds();
	var time = "";

	if(hours < 10) {
		hours = "0" + hours;
	}

	if(minutes < 10) {
		minutes = "0" + minutes;
	}

	if(seconds < 10) {
		seconds = "0" + seconds;
	}

	alert(seconds.length);

	time = hours + ":" + minutes + ":" + seconds;

	return time;
}

//CONVERT DATETIME TO DATETIME WITH NO SECONDS
function ConvertDateTimeToNotShowSeconds(givenDateTime) {
	var date = new Date(givenDateTime);
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var givenDateTimeNoSecs = "";

	if(hours < 10) {
		hours = "0" + hours;
	}

	if(minutes < 10) {
		minutes = "0" + minutes;
	}
	
	givenDateTimeNoSecs = ConvertToDate(date) + " " + hours + ":" + minutes;

	return givenDateTimeNoSecs;
}

//VALIDATE EMAIL FUNCTION
function ValidateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

//TRANSLATE BRANCH STATUS
function TranslateBranchStatusTo(language, statusOption) {
	var statusBranchArTransl = ["Ενεργό", "Υπό-επισκευή", "Υπό-κατασκευή", "Μη ενεργό"];
	var statusBranchAr = ["Active", "Under_R", "Under_C", "Problem"];
	
	var p = 0;
	if(language == "greek") {
		for(var i = 0; i < statusBranchAr.length; i++) {
			if(statusOption == statusBranchArTransl[i]) {
				p = i;
			}
		}
		return statusBranchArTransl[p];
	}
	else if(language == "english") { 
		for(var i = 0; i < statusBranchArTransl.length; i++) {
			if(statusOption == statusBranchArTransl[i]) {
				p = i;
			}
		}
		return statusBranchAr[p];
	}
}

//TRANSLATE STATUS VALUE
function TranslateStatusTo(language, statusOption) {
	var arrayGr = ["Γενικός Διαχειριστής", "Υπεύθυνος Διαχείρισης", "Υπάλληλος Πρακτορείου", "Υπεύθυνος Αποθήκης", "Οδηγός", "Φύλακας", "Καθαριστής"];
	var arrayEng = ["Admin", "Employee Manager", "Agency Employee", "Store Employee", "Driver", "Security", "Cleaner"];
	var c = -1;

	if(language == "greek") {
		for(var i = 0; i < arrayEng.length; i++) {
			if(statusOption == arrayEng[i]) {
				c = i;
			}
		}
		return arrayGr[c];
	}
	else if(language == "english") { 
		for(var i = 0; i < arrayGr.length; i++) {
			if(statusOption == arrayGr[i]) {
				c = i;
			}
		}
		return arrayEng[c];
	}
}

//TRANSLATE PLURAL STATUS VALUE
function TranslatePluralStatusTo(language, statusOption) {
	var arrayGr = ["Γενικοί Διαχειριστές", "Υπεύθυνοι Διαχείρισης", "Υπάλληλοι Πρακτορείου", "Υπεύθυνοι Αποθήκης", "Οδηγοί", "Φύλακες", "Καθαριστές"];
	var arrayEng = ["Admin", "Employee Manager", "Agency Employee", "Store Employee", "Driver", "Security", "Cleaner"];
	var c = -1;

	if(language == "greek") {
		for(var i = 0; i < arrayEng.length; i++) {
			if(statusOption == arrayEng[i]) {
				c = i;
			}
		}
		return arrayGr[c];
	}
	else if(language == "english") { 
		for(var i = 0; i < arrayGr.length; i++) {
			if(statusOption == arrayGr[i]) {
				c = i;
			}
		}
		return arrayEng[c];
	}
}

//TRANSLATE SEX VALUE
function TranslateSexTo(language, sexOption) {
	var arrayGr = ["Άνδρας", "Γυναίκα"];
	var arrayEng = ["Male", "Female"];
	var c = 0;

	if(language == "greek") {
		for(var i = 0; i < arrayEng.length; i++) {
			if(sexOption == arrayEng[i]) {
				c = i;
			}
		}
		return arrayGr[c];
	}
	else if(language == "english") { 
		for(var i = 0; i < arrayGr.length; i++) {
			if(sexOption == arrayGr[i]) {
				c = i;
			}
		}
		return arrayEng[c];
	}
}

//TRANSFORM BRANCH VALUE TO NUMBER
function TransformBranchTo(type, branchOption) {
	var result = 0;

	if(type == "number") {
		if(branchOption == "#0") {
			result = 0;
		}
		else {
			result = branchOption.slice(1, 5);
		}
	}
	else if(type == "string") { 
		if(branchOption == "0") {
			result = "#0";
		}
		else {
			result = "#" + branchOption;
		}
	}

	return result;
}

//TRANSLATE WAY OUT OF COMPANY VALUE
function TranslateWayOutOfCompanyTo(language, wayOutOfCompOption) {
	var arrayGr = ["Απόλυση", "Παραίτηση"];
	var arrayEng = ["Discharge", "Resign"];
	var c = 0;

	if(language == "greek") {
		for(var i = 0; i < arrayEng.length; i++) {
			if(wayOutOfCompOption == arrayEng[i]) {
				c = i;
			}
		}
		return arrayGr[c];
	}
	else if(language == "english") { 
		for(var i = 0; i < arrayGr.length; i++) {
			if(wayOutOfCompOption == arrayGr[i]) {
				c = i;
			}
		}
		return arrayEng[c];
	}
}