<?php

	$servername = "127.0.0.1";
	$user = "root";
	$password = "";
	$db = "bussystemmanagement";

	$counter = 0;

	$conn = mysqli_connect($servername, $user, $password);

	mysqli_set_charset($conn, 'utf8');

	if (!$conn) {
	  	echo "Not Connected To Server";
	}

	if(!mysqli_select_db($conn, $db)) {
		echo "Database Not Selected";
	}

	$branchId = $_POST['brId'];
	$employees = [];

	//FIND EMPLOYEES WITH PASSWORDS
	$queryEmployees = "SELECT * FROM employees INNER JOIN users ON Id = IdOfUser WHERE BranchId = '$branchId'";
	$resultEmployees = mysqli_query($conn, $queryEmployees);

	while (($row = mysqli_fetch_array($resultEmployees))) {
		$employee = array(
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
			'password' => $row['Password']
		);

		array_push($employees, $employee);
	}

	//FIND EMPLOYEES WITHOUT PASSWORDS
	$queryEmpl = "SELECT * FROM employees WHERE Status <> 'Admin' AND Status <> 'Employee Manager' AND Status <> 'Agency Employee' AND Status <> 'Store Employee' AND BranchId = '$branchId'";

	$resultEmpl = mysqli_query($conn, $queryEmpl);
	while (($row = mysqli_fetch_array($resultEmpl))) {
		$password = null;
		
		$employee = array(
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
		array_push($employees, $employee);
	}

  	echo json_encode($employees);

	mysqli_close($conn);
?>