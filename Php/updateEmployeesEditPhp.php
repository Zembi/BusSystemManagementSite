<?php	

	$servername = "127.0.0.1";
	$user = "root";
	$password = "";
	$db = "bussystemmanagement";

	$conn = mysqli_connect($servername, $user, $password);

	mysqli_set_charset($conn, 'utf8');
	if (!$conn) {
	  	echo "Not Connected To Server";
	}

	if(!mysqli_select_db($conn, $db)) {
		echo "Database Not Selected";
	}

	$messagesArray = [0, 0];
	$usernameToFind = $_POST['employee'];

	$key = $_POST['key'];
	$usernameToFindDecoded = json_decode($usernameToFind);

	echo $key;
	$sqlCheckIfUserIsOnline = "SELECT 1 FROM usersonline WHERE Username = '$key'";

	//IF USER IS ONLINE DELETE FROM ONLINE TABLE AND INSERT THE NEW DATA
	if(mysqli_query($conn, $sqlCheckIfUserIsOnline)) {
		$sqlDeleteIfUserIsOnline = "DELETE FROM usersonline WHERE Username = '$key'";
		mysqli_query($conn, $sqlDeleteIfUserIsOnline);

		$sqlAddUserToOnline = "INSERT INTO usersonline (Username, Status) VALUES ('$usernameToFindDecoded->username', '$usernameToFindDecoded->status')";
		mysqli_query($conn, $sqlAddUserToOnline);
	}

	$sqlUpdateEmployees = "UPDATE employees SET Username = '$usernameToFindDecoded->username', Email = '$usernameToFindDecoded->email', BranchId = '$usernameToFindDecoded->branchId', Status = '$usernameToFindDecoded->status', Wage = '$usernameToFindDecoded->wage', RecruitmentDay = '$usernameToFindDecoded->recruitmentDay' WHERE Username = '$key'";

	$sqlUpdateUsers = "UPDATE users SET Username = '$usernameToFindDecoded->username', Email = '$usernameToFindDecoded->email', BranchId = '$usernameToFindDecoded->branchId', Status = '$usernameToFindDecoded->status' WHERE Username = '$key'";

	if(!mysqli_query($conn, $sqlUpdateEmployees)) {		
		$messagesArray[0] = 0;
	}
	else {
		$messagesArray[0] = 1;
	}

	if(!mysqli_query($conn, $sqlUpdateUsers)) {		
		$messagesArray[1] = 0;
	}
	else {
		$messagesArray[1] = 1;
	}

	echo json_encode($messagesArray);

	mysqli_close($conn);

?>