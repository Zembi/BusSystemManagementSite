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
			if(statusOption == statusBranchAr[i]) {
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

//CHOOSE ICON, DEPENDING FROM THE STATUS OF THE BRANCH
function StatusChooseIcon(container, branch) {
	if(branch.getStatus() == "Active") {
		container.style.backgroundImage = "url(../Assets/icons8_ok_30px.png)";
		container.title = "Ενεργά";
	}
	else if(branch.getStatus() == "Under_R") {
		container.style.backgroundImage = "url(../Assets/icons8_construction_carpenter_ruler_30px.png)";
		container.title = "Υπό-επισκευή";
	}
	else if(branch.getStatus() == "Under_C") {
		container.style.backgroundImage = "url(../Assets/icons8_construction_30px.png)";
		container.title = "Υπο-κατασκευή";
	}
	else if(branch.getStatus() == "Problem") {
		container.style.backgroundImage = "url(../Assets/icons8_high_priority_30px_2.png)";
		container.title = "Μη ενεργά";
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
	var result = "0";

	if(type == "number") {
		if(branchOption == "#0") {
			result = "0";
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

//CONVERT A STRING TO AN ARRAY
function ConvertStringToArray(string, separator) {
	string = string.replace(/\s/g, '');

	var stringArr = string.split(separator);

    //FOR DEBUGGING
    /*for(var i = 0; i < stringArr.length; i++) {
		console.log(stringArr[i]);
    }*/

    return stringArr;
}

//GET STRING LENGTH OF CHILD ELEMENTS
function GetStringLengthOfAllChildElements(parent) {
	var nodesOfSenders = parent.childNodes;
	var fullLength = 0;

	for(var i = 0; i < nodesOfSenders.length; i++) {
		fullLength += nodesOfSenders[i].innerHTML.length;
	}

	return fullLength;
}

//CONVERT A SIMPLE OBJECT TO AN EMPLOYEE OBJECT AND RERURN IT
function ConvertObjectToEmployeeObj(item) {
	return new Employee(item.id, item.username, item.email, item.name, item.icon, item.branchId, item.status, item.sex, item.wage, item.recruitmentDay, item.afm, item.amka, item.password);
}

//CONVERT AN OBJECT ARRAY TO AN EMPLOYEE OBJECT AND RERURN IT
function ConvertObjectsArrayToEmployeeObjsArray(itemsArray) {
	var employeesArray = [];

	for(var i = 0; i < itemsArray.length; i++) {
		employeesArray.push(ConvertObjectToEmployeeObj(itemsArray[i]));
	}
	
	return employeesArray;
}

//CONVERT A SIMPLE OBJECT TO A BRANCH OBJECT AND RERURN IT
function ConvertObjectToBranchObj(item) {
	return new Branch(item.id, item.type, item.street, item.location, item.image, item.manager, item.storeId, item.status, item.adminControl);
}

//CONVERT AN OBJECT ARRAY TO A BRANCH OBJECT AND RERURN IT
function ConvertObjectsArrayToBranchObjsArray(itemsArray) {
	var branchesArray = [];

	for(var i = 0; i < itemsArray.length; i++) {
		branchesArray.push(ConvertObjectToBranchObj(itemsArray[i]));
	}
	
	return branchesArray;
}

//CONVERT A SIMPLE OBJECT TO A BUS OBJECT AND RERURN IT
function ConvertObjectToBusObj(item) {
	return new Bus(item.id, item.info, item.branchConnected, item.availability);
}

//CONVERT AN OBJECT ARRAY TO A BUS OBJECT AND RERURN IT
function ConvertObjectsArrayToBusObjsArray(itemsArray) {
	var busesArray = [];

	for(var i = 0; i < itemsArray.length; i++) {
		busesArray.push(ConvertObjectToBusObj(itemsArray[i]));
	}
	
	return busesArray;
}

//CONVERT A SIMPLE OBJECT TO A ROUTE OBJECT AND RERURN IT
function ConvertObjectToRouteObj(item) {
	return new Route(item.id, item.start, item.end, item.day, item.date, item.hourStart, item.hourArrival, item.duration, item.stations, item.busId, item.active);
}

//CONVERT AN OBJECT ARRAY TO A ROUTE OBJECT AND RERURN IT
function ConvertObjectsArrayToRouteObjsArray(itemsArray) {
	var routesArray = [];

	for(var i = 0; i < itemsArray.length; i++) {
		routesArray.push(ConvertObjectToBusObj(itemsArray[i]));
	}
	
	return routesArray;
}

//CLOSE MESSAGE ALERTS WHEN THIS FUNCTION IS BEING CALLED
function CloseAlertMessages() {
	var alertInfoForCreatNewItemC = document.getElementById("alertInfoForCreatNewItemC");
	alertInfoForCreatNewItemC.style.display = "none";
}

//GIVE ARTICLE TO A WORD, DEPENDING ON ITS ENDING
function WordEndingGiveArticles(word, type) {
	var ending = word.slice(-1);
	var article = "";
	var finalWord = "";

	if(ending = "η") {
		if(type = 0) {
			article = "της ";
		}
		else {
			article = "στην ";
		}
	}

	finalWord = article + word;

	return finalWord;
}

//COMPARE IF TWO OBJECTS ARE EQUAL
function CompareTwoObjectS(object1, object2) {
	var equal = 0;

	if(JSON.stringify(object1) === JSON.stringify(object2)) {
		equal = 1;
	}

	return equal;
}

//COMPARE AN ITEM WITH EMPLOYEE'S ID, THAT THERE IS, IN AN ARRAY OF EMPLOYEES AND RETURN ITS INDEX IN THE ARRAY
function CompareIdForUsernameAndReturnIndexOfObject(employees, id) {
	var c = 0;

	for(var i = 0; i < employees.length; i++) {
		if(employees[i].id === id) {
			c = i;
			break;
		}
	}

	return c;
}

//REMOVE SPECIFIC OBJECT FROM ARRAY
function RemoveObjectFromArray(object, array) {
	for(var i = 0; i < array.length; i++) {
		if(JSON.stringify(object) === JSON.stringify(array[i])) {
			array.splice(i, 1);
		}
	}

	return array;
}

//REMOVE SPECIFIC ITEM FROM ARRAY
function RemoveItemFromArray(item, array) {
	for(var i = 0; i < array.length; i++) {
		if(item == array[i]) {
			array.splice(i, 1);
		}
	}

	return array;
}

//REMOVE SPECIFIC ITEM FROM ARRAY
function RemoveItemFromArray(item, array) {
	for(var i = 0; i < array.length; i++) {
		if(item == array[i]) {
			array.splice(i, 1);
		}
	}

	return array;
}

//ADD SPECIFIC ITEM TO ARRAY
function AddItemToAnArray(item, array) {
	if(!array.includes(item)) {
		array.push(item);
	}

	return array;
}

//MAKE ARRAYS HAVE UNIQUE VALUES
function UniqueArrays(value, index, self) {
	return self.indexOf(value) === index;
}

//FUNCTION THAT PREVENTS CLICK, TO BE TRIGGERED, MORE THAN ONCE
function Debounce(func, wait, immediate) {
	var timeout;
	return (function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if(!immediate) {
				func.apply(context, args);
			}
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if(callNow) {
			func.apply(context, args);
		}
	});
};

//FIND SPECIFIC ITEM FROM ARRAY WITH OBJECTS
function FindSpecificItemFromArrayObj(array, key) {
	return (array.map(function(item) {
		return item[key];
	}));
}

//CONVERT THE DATE VALUE OF THE OBJECT Date TO A STRING, THAT INPUT datetime UNDERSTANDS, AS VALUE
function ConvertDateToStringForInputDateTime(dateObj) {
	var year = dateObj.getFullYear() + "";
	var month = dateObj.getMonth() + 1 + "";
	var day = dateObj.getDate() + "";
	var hours = dateObj.getHours();
	var minutes = dateObj.getMinutes();

	if(month.length < 2) {
		month = "0" + month;
	}
			
	if(day.length < 2) {
		day = "0" + day;
	}

	hours = "" + hours;
	if(hours.length < 2) {
		hours = "0" + hours;
	}

	minutes = "" + minutes;
	if(minutes.length < 2) {
		minutes = "0" + minutes;
	}

	return (year + "-" + month + "-" + day + "T" + hours + ":" + minutes);
}

//CONVERT DAY NUMBER TO STRING
function ConvertDayNumToString(number) {
	var dayStr = "";

	if(number == 0) {
		dayStr = "Κυριακή";
	}
	else if(number == 1) {
		dayStr = "Δευτέρα";
	}
	else if(number == 2) {
		dayStr = "Τρίτη";
	}
	else if(number == 3) {
		dayStr = "Τετάρτη";
	}
	else if(number == 4) {
		dayStr = "Πέμπτη";
	}
	else if(number == 5) {
		dayStr = "Παρασκευή";
	}
	else if(number == 6) {
		dayStr = "Σάββατο";
	}

	return dayStr;
}

//ADD ZEROS IF NEEDED TO TIME
function AddZerosToTime(value) {
	value = value + "";
	
	if(value.length < 2) {
		value = "0" + value;
	}

	return value;
}
