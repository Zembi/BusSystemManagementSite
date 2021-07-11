//
function ProduceUniqueId(digits) {
	var freshId = 0;
	var helperId = 0;

	if(digits > 1) {
		helperId = Math.pow(10, (digits - 1));
	
		freshId = Math.floor(helperId + Math.random() * (9 * helperId));
	}
	else {
		freshId = "Digits lower than 2"; 
	}

	return freshId
}

function CompareIdWithATableAndReturn(idDigits, table) {
	var error = 0;
	var id = ProduceUniqueId(idDigits);

	while(error) {
		for(var i = 0; i < table.length; i++) {
			if(table[i].getId() == id) {
				error = 1;
				var id = ProduceUniqueId(idDigits);
				break;
			}
		}
	}

	return id;
}