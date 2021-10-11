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

	$employeesUsers = [];

	//FIND EMPLOYEES WITH PASSWORDS
	$queryEmpl = "SELECT * FROM employees INNER JOIN users ON Id = IdOfUser ORDER BY `BranchId`, `Wage`";

	$resultEmpl = mysqli_query($conn, $queryEmpl);
	while (($rowE = mysqli_fetch_array($resultEmpl))) {
		
		$employeeUser = array(
			'id' => $rowE['Id'],
			'username' => $rowE['Username'],
			'email' => $rowE['Email'],
			'name' => $rowE['Name'],
   			'icon' => $rowE['Icon'],
			'branchId' => $rowE['BranchId'],
			'status' => $rowE['Status'],
			'sex' => $rowE['Sex'],
			'wage' => $rowE['Wage'],
			'recruitmentDay' => $rowE['RecruitmentDay'],
			'AFM' => $rowE['ΑΦΜ'],
			'AMKA' => $rowE['ΑΜΚΑ'],
			'password' => $rowE['Password']
		);
		array_push($employeesUsers, $employeeUser);
	}

	//FIND EMPLOYEES WITHOUT PASSWORDS
	$queryEmpl = "SELECT * FROM employees WHERE Status <> 'Admin' AND Status <> 'Employee Manager' AND Status <> 'Agency Employee' AND Status <> 'Store Employee' ORDER BY `BranchId`, `Wage`";

	$resultEmpl = mysqli_query($conn, $queryEmpl);
	while (($rowE = mysqli_fetch_array($resultEmpl))) {
		$password = null;
		
		$employeeUser = array(
			'id' => $rowE['Id'],
			'username' => $rowE['Username'],
			'email' => $rowE['Email'],
			'name' => $rowE['Name'],
   			'icon' => $rowE['Icon'],
			'branchId' => $rowE['BranchId'],
			'status' => $rowE['Status'],
			'sex' => $rowE['Sex'],
			'wage' => $rowE['Wage'],
			'recruitmentDay' => $rowE['RecruitmentDay'],
			'AFM' => $rowE['ΑΦΜ'],
			'AMKA' => $rowE['ΑΜΚΑ'],
			'password' => $password
		);
		array_push($employeesUsers, $employeeUser);
	}

  	echo json_encode($employeesUsers, JSON_UNESCAPED_UNICODE);

	mysqli_close($conn);
?>