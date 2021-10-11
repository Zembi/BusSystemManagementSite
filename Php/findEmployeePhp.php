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

	$idToFind = $_POST['id'];
	
	//FIND EMPLOYEES WITH PASSWORDS
	$queryEmpl = "SELECT * FROM employees INNER JOIN users ON Id = IdOfUser WHERE Id = '$idToFind'";

	$resultEmpl = mysqli_query($conn, $queryEmpl);
	while (($row = mysqli_fetch_array($resultEmpl))) {
		$employeeFound = array(
			'id' => $row['Id'],
			'username' => $row['Username'],
			'email' => $row['Email'],
			'name' => $row['Name'],
			'icon' => $row['Icon'],
			'branchId' => $row['BranchId'],
			'status' => $row['Status'],
			'wage' => $row['Wage'],
			'sex' => $row['Sex'],
			'recruitmentDay' => $row['RecruitmentDay'],
			'afm' => $row['ΑΦΜ'],
			'amka' => $row['ΑΜΚΑ'],
			'password' => $row['Password']
		);
	}

	//FIND EMPLOYEES WITHOUT PASSWORDS
	$queryEmpl = "SELECT * FROM employees WHERE Status <> 'Admin' AND Status <> 'Employee Manager' AND Status <> 'Agency Employee' AND Status <> 'Store Employee' AND Id = '$idToFind'";

	$resultEmpl = mysqli_query($conn, $queryEmpl);
	while (($row = mysqli_fetch_array($resultEmpl))) {
		$password = null;
		
		$employeeFound = array(
			'id' => $row['Id'],
			'username' => $row['Username'],
			'email' => $row['Email'],
			'name' => $row['Name'],
   			'icon' => $row['Icon'],
			'branchId' => $row['BranchId'],
			'status' => $row['Status'],
			'sex' => $row['Sex'],
			'wage' => $row['Wage'],
			'recruitmentDay' => $row['RecruitmentDay'],
			'AFM' => $row['ΑΦΜ'],
			'AMKA' => $row['ΑΜΚΑ'],
			'password' => $password
		);
	}

   	echo json_encode($employeeFound, JSON_UNESCAPED_UNICODE);

	mysqli_close($conn);

?>