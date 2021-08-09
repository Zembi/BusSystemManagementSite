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
	$users = [];

	$queryEmployees = "SELECT Username FROM employees WHERE BranchId = '$branchId'";

	$resultEmployees = mysqli_query($conn, $queryEmployees);
	while (($rowE = mysqli_fetch_array($resultEmployees))) {
		$emplUsername = $rowE['Username'];
		$queryUsers = "SELECT * FROM users WHERE Username = '$emplUsername'";
		$resultUsers = mysqli_query($conn, $queryUsers);
		while (($rowU = mysqli_fetch_array($resultUsers))) {

			$user = array(
				'username' => $rowU['Username'],
				'email' => $rowU['Email'],
	   			'icon' => $rowU['Icon'],
				'name' => $rowU['Name'],
				'status' => $rowU['Status'],
				'sex' => $rowU['Sex'],
			);

			array_push($users, $user);
		}
	}

  	echo json_encode($users);

	mysqli_close($conn);
?>