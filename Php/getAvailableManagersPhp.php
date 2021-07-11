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

	$employees = [];

	$query = "SELECT * FROM employees WHERE BranchId IS NULL";
	$result = mysqli_query($conn, $query);
	while (($row = mysqli_fetch_array($result))) {
		$employee = array(
			'username' => $row['Username'],
			'email' => $row['Email'],
			'name' => $row['Name'],
   			'icon' => $row['Icon'],
			'branchId' => $row['BranchId'],
			'status' => $row['Status'],
			'sex' => $row['Sex'],
			'wage' => $row['Wage'],
			'recruitmentDay' => $row['RecruitmentDay']
		);
		array_push($employees, $employee);
	}
  	echo json_encode($employees);

	mysqli_close($conn);
?>