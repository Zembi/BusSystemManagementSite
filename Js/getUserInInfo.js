
GetUserInfo();

//GET USER THAT IS SIGN IN
async function GetUserInfo() {
	var employee = [];

	employee = await GetAdminInfoFromServer();
	
	//CREATE OBJECT USER, FOR ADMIN THAT IS SIGNED IN
	employeeIn = new Employee(employee.id, employee.username, employee.email, employee.name, employee.icon, employee.branchId, employee.status, employee.sex, employee.wage, employee.recruitmentDay, employee.afm, employee.amka);
}

//GET ADMIN INFO FROM SERVER
function GetAdminInfoFromServer() {
	return new Promise((resolve, reject) => {
		$.ajax({
      		type: 'POST',
      		url: "../Php/findEmployeePhp.php",
      		data: {id: userIdIn},
      		success: function(data) {
      			employee = JSON.parse(data);
   				userNameC.children[0].innerHTML = employee.name;
	    		resolve(employee);
      		}
		});
	});
}