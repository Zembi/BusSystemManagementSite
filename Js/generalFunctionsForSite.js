//WAGE DOTS AND COMMAS
function numberWithCommas(x) {
	var parts = x.toString().split(".");
	parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g,".");
	return (parts.join(","));
}

//NO WHITE SPACE USERNAME BAR
function NoWhiteSpace() { 
	var key = event.keyCode;
	if (key === 32) {
		event.preventDefault();
	}
}

//ALLOW ONLY NUMBERS IN INPUT
function OnlyNumberKey(evt, symbol) {
	var ASCIICode = (evt.which) ? evt.which : evt.keyCode
	
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
function ConvertFromDate(recruitmentDayDate) {
	var date = new Date(recruitmentDayDate);
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

function ConvertToDate(recruitmentDayDate) {
	var date = new Date(recruitmentDayDate);
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