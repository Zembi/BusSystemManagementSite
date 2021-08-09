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

	$errorMessage = 1;

	$usernameToFind = $_POST['employee'];
	$key = $_POST['key'];
	$importantChange = $_POST['importantChange'];
	$previousBranchId = $_POST['previousBranch'];

	$usernameToFindDecoded = json_decode($usernameToFind);

	$sqlFindExEmployee = "SELECT * FROM exemployees WHERE Email = '$usernameToFindDecoded->email'";
	$result = mysqli_query($conn, $sqlFindExEmployee);

	if(mysqli_num_rows($result) > 0) {
		$errorMessage = 2;
	}
	else {
		//UPDATE employees TABLE SPLIT IT IN TWO DIFFERENT PATHS. ONE WITHOUT BRANCH TO WORK SO IT IS NULL THE BRANCH ID AND THE OTHER ONE TO A NEW BRANCH
		if(empty($usernameToFindDecoded->branchId) && $usernameToFindDecoded->branchId != 0) {
			$sqlUpdateEmployees = "UPDATE employees SET Username = '$usernameToFindDecoded->username', Email = '$usernameToFindDecoded->email', BranchId = NULL, Status = '$usernameToFindDecoded->status', Wage = '$usernameToFindDecoded->wage' WHERE Username = '$key'";
		}
		else {
			$sqlUpdateEmployees = "UPDATE employees SET Username = '$usernameToFindDecoded->username', Email = '$usernameToFindDecoded->email', BranchId = '$usernameToFindDecoded->branchId', Status = '$usernameToFindDecoded->status', Wage = '$usernameToFindDecoded->wage' WHERE Username = '$key'";
		}

		if(mysqli_query($conn, $sqlUpdateEmployees)) {
			//echo "IN  ";
			$errorMessage = 0;

			//FIND IF EMPLOYEE BEING CHANGED FROM BRANCH HE IS WORKING
			if($importantChange) {
				$sqlUpdateToNullBranchManager = "UPDATE branches SET Manager = NULL, Status = 'Problem' WHERE Id = '$previousBranchId'";
				mysqli_query($conn, $sqlUpdateToNullBranchManager);
			}

			if(!empty($usernameToFindDecoded->branchId)) {
				//UPDATE branches TABLE IF IS BEING ADDED A NEW EMPLOYEE MANAGER
				if($usernameToFindDecoded->status == "Employee Manager") {
					$sqlUpdateBranchesManager = "UPDATE branches SET Manager = '$usernameToFindDecoded->username' WHERE Id = '$usernameToFindDecoded->branchId'";
					mysqli_query($conn, $sqlUpdateBranchesManager);
				}
			}

			/*
			//UPDATE usersonline TABLE IF A USER IS ONLINE(BY ACCIDENT CAUSE WHEN UPDATES HAPPEN< EVEYRONE IN THE SYSTEM EXCEPTS FROM THE ADMINS, WILL LOG OFF) WHILE HIS STATUS IS BEING CHANGED, UPDATE SQL COLUMNS
			$sqlAddUserToOnline = "UPDATE usersonline SET Username = '$usernameToFindDecoded->username', Status = '$usernameToFindDecoded->status' WHERE Username = '$key'";
			mysqli_query($conn, $sqlAddUserToOnline);
			*/
		
			//UPDATE users TABLE (STATUS OF EMPLOYEE)
			$sqlUpdateUsers = "UPDATE users SET Username = '$usernameToFindDecoded->username', Email = '$usernameToFindDecoded->email', Status = '$usernameToFindDecoded->status' WHERE Username = '$key'";
			mysqli_query($conn, $sqlUpdateUsers);
		}

		//UPDATE ADMIN CONTROL FROM BRANCHES WHEN AN ADMIN CHANGE USERNAME 
		if($usernameToFindDecoded->status == "Admin") {
			$sqlUpdateBranchesAdminControl = "UPDATE branches SET AdminControl = '$usernameToFindDecoded->username' WHERE AdminControl = '$key'";
			mysqli_query($conn, $sqlUpdateBranchesAdminControl);
		}

		//UPDATE NOTIFICATIONS IF USERNAME CHANGED
		if($key != $usernameToFindDecoded->username) {
			$queryHelper = "SELECT Id, Sender, Receiver FROM notifications";
		
			$resultHelper = mysqli_query($conn, $queryHelper);
			while (($row = mysqli_fetch_array($resultHelper))) {
				$id = $row['Id'];
				$receivers = $row['Receiver'];

				//UPDATE RECEIVER
				//CUT IN SLICES STRING OF RECEIVERS (ARRAY)
				$receiverSlices = explode("#", $receivers);

				foreach ($receiverSlices as $value) {
					//SEPARATE EACH USERNAME FROM ITS STATUS (ARRAY)
					$receiverUsername = explode("$", $value);

					if($receiverUsername[0] == $key) {
						$newReceivers = $receivers;
						$newReceivers = str_replace($key, $usernameToFindDecoded->username, $newReceivers);

						$sqlUpdateNotifications = "UPDATE notifications SET Receiver = '$newReceivers' WHERE Id = '$id'";
						mysqli_query($conn, $sqlUpdateNotifications);
						
						break;
					}
				}

				//UPDATE SENDER
				$sender = $row['Sender'];

				$sqlUpdateNotifications = "UPDATE notifications SET Sender = '$usernameToFindDecoded->username' WHERE Sender = '$key'";
				mysqli_query($conn, $sqlUpdateNotifications);
			}
		}
	}

	echo json_encode($errorMessage);

	mysqli_close($conn);

?>