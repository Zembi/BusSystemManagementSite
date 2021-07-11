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
	$importantChange = $_POST['importantChange'];
	$previousBranchId = $_POST['previousBranch'];
	$usernameToFindDecoded = json_decode($usernameToFind);

	//UPDATE usersonline TABLE IF A USER IS ONLINE(BY ACCIDENT CAUSE WHEN UPDATES HAPPEN< EVEYRONE IN THE SYSTEM EXCEPTS FROM THE ADMINS, WILL LOG OFF) WHILE HIS STATUS IS BEING CHANGED, UPDATE SQL COLUMNS
	$sqlAddUserToOnline = "UPDATE usersonline SET Username = '$usernameToFindDecoded->username', Status = '$usernameToFindDecoded->status' WHERE Username = '$key'";
	mysqli_query($conn, $sqlAddUserToOnline);

	//FIND IF EMPLOYEE BEING CHANGED FROM BRANCH HE IS WORKING
	if($importantChange) {
		$sqlUpdateToNullBranchManager = "UPDATE branches SET Manager = NULL WHERE Id = '$previousBranchId'";
		mysqli_query($conn, $sqlUpdateToNullBranchManager);
		echo $usernameToFindDecoded->branchId;
	}

	//UPDATE employees TABLE SPLIT IT IN TWO DIFFERENT PATHS. ONE WITHOUT BRANCH TO WORK SO IT IS NULL THE BRANCH ID AND THE OTHER ONE TO A NEW BRANCH
	if(empty($usernameToFindDecoded->branchId)) {
		$sqlUpdateEmployees = "UPDATE employees SET Username = '$usernameToFindDecoded->username', Email = '$usernameToFindDecoded->email', BranchId = NULL, Status = '$usernameToFindDecoded->status', Wage = '$usernameToFindDecoded->wage' WHERE Username = '$key'";
	}
	else {
		$sqlUpdateEmployees = "UPDATE employees SET Username = '$usernameToFindDecoded->username', Email = '$usernameToFindDecoded->email', BranchId = '$usernameToFindDecoded->branchId', Status = '$usernameToFindDecoded->status', Wage = '$usernameToFindDecoded->wage' WHERE Username = '$key'";

		//UPDATE branches TABLE IF IS BEING ADDED A NEW EMPLOYEE MANAGER
		if($usernameToFindDecoded->status == "Employee Manager") {
			$sqlUpdateBranches = "UPDATE branches SET Manager = '$usernameToFindDecoded->username' WHERE Id = '$usernameToFindDecoded->branchId'";
			mysqli_query($conn, $sqlUpdateBranches);
		}
	}

	//UPDATE users TABLE (STATUS OF EMPLOYEE)
	$sqlUpdateUsers = "UPDATE users SET Username = '$usernameToFindDecoded->username', Email = '$usernameToFindDecoded->email', Status = '$usernameToFindDecoded->status' WHERE Username = '$key'";

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