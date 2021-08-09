
GetUserInfo();

//GET USER THAT IS SIGN IN
async function GetUserInfo() {
	var userObj = [];

	userObj = await GetAdminInfoFromServer();
	userInObject = AdminInfoManage(userObj);
}

//GET ADMIN INFO FROM SERVER
function GetAdminInfoFromServer(userObj) {
	return new Promise((resolve, reject) => {
		$.ajax({
      		type: 'POST',
      		url: "../Php/findUserPhp.php",
      		data: {username: userIn},
      		success: function(data) {
      			userObj = JSON.parse(data);
   				userNameC.children[0].innerHTML = userObj.name;
	    		resolve(userObj);
      		}
		});
	});
}

//CREATE OBJECT USER, FOR ADMIN THAT IS SIGNED IN
function AdminInfoManage(userObj) {
	var user = new User(userObj.username, userObj.email, userObj.icon, userObj.name, userObj.password, userObj.status, userObj.sex);
	return user;
}