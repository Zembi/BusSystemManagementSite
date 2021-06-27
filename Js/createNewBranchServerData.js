
var otherBranchesConnectedSlct = document.getElementById("otherBranchesConnectedSlct");

StartCreationOfBranch()

async function StartCreationOfBranch() {
	var branchesArray = [];

	branchesArray = await branchesArrayGetAllBranches();
	alert(branchesArray);
}

function GetAllBranches() {
	var array = [];
	return new Promise((resolve, reject) => {
		$.ajax({
			type: 'POST',
			url: "../Php/getBranchesPhp.php",
			data: {},
			success: function(data) {
				//alert(data);
				array = JSON.parse(data);
				resolve(array);
			}
		});
	});
}