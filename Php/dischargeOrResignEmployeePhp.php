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

	$errorC = 0;

	$exEmployee = $_POST['exEmployee'];
	$exEmployeeDecoded = json_decode($exEmployee);

	//DELETE EX-EMPLOYEE FROM EMPLOYEES TABLE
	$sqlDischargeOrResignEmployee = "DELETE FROM employees WHERE ΑΦΜ = '$exEmployeeDecoded->afm'";

	if(!mysqli_query($conn, $sqlDischargeOrResignEmployee)) {
		$errorC = 1;
	}
	else {
		//UPDATE NOTIFICATIONS (DELETE EMPLOYEE FROM NOTIFICATIONS)
		//IF EX EMPLOYEE IS A RECEIVER AT NOTIFICATION
		$queryHelper = "SELECT Id, Sender, Receiver FROM notifications";
		$resultHelper = mysqli_query($conn, $queryHelper);
		while (($row = mysqli_fetch_array($resultHelper))) {
				$id = $row['Id'];
				$sender = $row['Sender'];
				$receivers = $row['Receiver'];

				//CUT IN SLICES STRING OF RECEIVERS
				$receiverSlices = explode("#", $receivers);

				foreach ($receiverSlices as $value) {
					$receiverUsername = explode("$", $value);

					if($receiverUsername[0] == $exEmployeeDecoded->username) {
						$newReceivers = $receivers;
						$status = "$".substr($value, -1);

						$newReceivers = str_replace($exEmployeeDecoded->username.$status."#", "", $newReceivers);

						$sqlUpdateNotifications = "UPDATE notifications SET Receiver = '$newReceivers' WHERE Id = '$id'";
						mysqli_query($conn, $sqlUpdateNotifications);
						
						break;
					}
				}
				//UPDATE RECEIVERS WITHOUT THE EXEMPLOYEE
				$receiverSlices = explode("#", $receivers);
		}
		//IF EX EMPLOYEE IS A SENDER AT NOTIFICATION
		$sqlDeleteNotifications = "DELETE from notifications WHERE Sender = '$exEmployeeDecoded->username'";
		mysqli_query($conn, $sqlDeleteNotifications);

		if($exEmployeeDecoded->lastBranchId != null) {
			//ADD EMPLOYEE TO EX-EMPLOYEE TABLE
			$sqlAddExEmployee = "INSERT INTO exemployees (Name, Email, Icon, LastBranchId, LastStatus, LastWage, Sex, RecruitmentDay, EndDay, WayOutOfCompany, ΑΦΜ, ΑΜΚΑ, Reason) VALUES  ('$exEmployeeDecoded->name', '$exEmployeeDecoded->email', '$exEmployeeDecoded->icon', '$exEmployeeDecoded->lastBranchId', '$exEmployeeDecoded->lastStatus', '$exEmployeeDecoded->lastWage', '$exEmployeeDecoded->sex', '$exEmployeeDecoded->recruitmentDay', '$exEmployeeDecoded->endDay', '$exEmployeeDecoded->wayOutOfCompany', '$exEmployeeDecoded->afm', '$exEmployeeDecoded->amka', '$exEmployeeDecoded->reason')";
		}
		else {
			$sqlAddExEmployee = "INSERT INTO exemployees (Name, Email, Icon, LastBranchId, LastStatus, LastWage, Sex, RecruitmentDay, EndDay, WayOutOfCompany, ΑΦΜ, ΑΜΚΑ, Reason) VALUES  ('$exEmployeeDecoded->name', '$exEmployeeDecoded->email', '$exEmployeeDecoded->icon', NULL, '$exEmployeeDecoded->lastStatus', '$exEmployeeDecoded->lastWage', '$exEmployeeDecoded->sex', '$exEmployeeDecoded->recruitmentDay', '$exEmployeeDecoded->endDay', '$exEmployeeDecoded->wayOutOfCompany', '$exEmployeeDecoded->afm', '$exEmployeeDecoded->amka', '$exEmployeeDecoded->reason')";
		}

		if(!mysqli_query($conn, $sqlAddExEmployee)) {
			$errorC = 1;
		}
		else {
			if($exEmployeeDecoded->lastStatus == "Employee Manager") {
				$sqlUpdateBranch = "UPDATE branches SET Manager = NULL, Status = 'Problem' WHERE Id = '$exEmployeeDecoded->lastBranchId'";
				mysqli_query($conn, $sqlUpdateBranch);
			}

			if($exEmployeeDecoded->lastStatus == "Admin" || $exEmployeeDecoded->lastStatus == "Employee Manager" || $exEmployeeDecoded->lastStatus == "Agency Employee" || $exEmployeeDecoded->lastStatus == "Store Employee") {
				$sqlsqlDischargeOrResignUser = "DELETE FROM users WHERE Email = '$exEmployeeDecoded->email'";
				mysqli_query($conn, $sqlsqlDischargeOrResignUser);
			}
		}
	}

	echo $errorC;

	mysqli_close($conn);

?>