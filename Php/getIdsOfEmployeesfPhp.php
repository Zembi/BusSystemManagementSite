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

	$employeesIds = [];

	$queryEmployees = "SELECT Id FROM employees";
	$resultEmployees = mysqli_query($conn, $queryEmployees);
		
	while (($row = mysqli_fetch_array($resultEmployees))) {
		array_push($employeesIds, $row['Id']);
	}

	$queryExEmployees = "SELECT Id FROM exemployees";
	$resultExEmployees = mysqli_query($conn, $queryExEmployees);
		
	while (($row = mysqli_fetch_array($resultExEmployees))) {
		array_push($employeesIds, $row['Id']);
	}

	echo json_encode($employeesIds);

	mysqli_close($conn);
?>