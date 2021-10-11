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

	$employeeToFind = $_POST['newEmployee'];
	$keyId = $_POST['key'];
	$importantChange = $_POST['importantChange'];
	$previousBranchId = $_POST['previousBranch'];

	$employeeToFindDecoded = json_decode($employeeToFind);

	$sqlFindExEmployee = "SELECT * FROM exemployees WHERE Email = '$employeeToFindDecoded->email'";
	$result = mysqli_query($conn, $sqlFindExEmployee);

	if(mysqli_num_rows($result) > 0) {
		$errorMessage = 2;
	}
	else {
		//UPDATE employees TABLE SPLIT IT IN TWO DIFFERENT PATHS. ONE WITHOUT BRANCH TO WORK SO IT IS NULL THE BRANCH ID AND THE OTHER ONE TO A NEW BRANCH
		if(empty($employeeToFindDecoded->branchId) && $employeeToFindDecoded->branchId != 0) {
			$sqlUpdateEmployees = "UPDATE employees SET Username = '$employeeToFindDecoded->username', Email = '$employeeToFindDecoded->email', BranchId = NULL, Status = '$employeeToFindDecoded->status', Wage = '$employeeToFindDecoded->wage' WHERE Id = '$keyId'";
		}
		else {
			$sqlUpdateEmployees = "UPDATE employees SET Username = '$employeeToFindDecoded->username', Email = '$employeeToFindDecoded->email', BranchId = '$employeeToFindDecoded->branchId', Status = '$employeeToFindDecoded->status', Wage = '$employeeToFindDecoded->wage' WHERE Id = '$keyId'";
		}

		if(mysqli_query($conn, $sqlUpdateEmployees)) {
			//echo "IN  ";
			$errorMessage = 0;

			//FIND IF EMPLOYEE BEING CHANGED FROM BRANCH HE IS WORKING
			if($importantChange) {
				$sqlUpdateToNullBranchManager = "UPDATE branches SET Manager = NULL, Status = 'Problem' WHERE Id = '$previousBranchId'";
				mysqli_query($conn, $sqlUpdateToNullBranchManager);
			}

			if(!empty($employeeToFindDecoded->branchId)) {
				//UPDATE branches TABLE IF IS BEING ADDED A NEW EMPLOYEE MANAGER
				if($employeeToFindDecoded->status == "Employee Manager") {
					$sqlUpdateBranchesManager = "UPDATE branches SET Manager = '$employeeToFindDecoded->id' WHERE Id = '$employeeToFindDecoded->branchId'";
					mysqli_query($conn, $sqlUpdateBranchesManager);
				}
			}

			//UPDATE usersonline TABLE IF A USER IS ONLINE(BY ACCIDENT CAUSE WHEN UPDATES HAPPEN, EVEYRONE IN THE SYSTEM EXCEPTS FROM THE ADMINS, WILL HAVE TO LOG OFF) WHILE HIS STATUS IS BEING CHANGED, UPDATE SQL COLUMNS)
			$sqlAddUserToOnline = "UPDATE usersonline SET Status = '$employeeToFindDecoded->status' WHERE Id = '$keyId'";
			mysqli_query($conn, $sqlAddUserToOnline);
		}
	}

	echo json_encode($errorMessage);

	mysqli_close($conn);

?>