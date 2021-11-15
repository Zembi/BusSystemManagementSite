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

	$branchId = $_POST['id'];
	$buses = [];

	if($branchId == "NULL") {
		$query = "SELECT * FROM buses WHERE BranchConnected IS NULL ORDER BY `Availability` DESC";
	}
	else {
		$query = "SELECT * FROM buses WHERE BranchConnected = '$branchId' ORDER BY `Availability` DESC";
	}

	$result = mysqli_query($conn, $query);
	while (($row = mysqli_fetch_array($result))) {
		$bus = array(
			'id' => $row['Id'],
			'info' => $row['Info'],
			'branchConnected' => $row['BranchConnected'],
			'availability' => $row['Availability']
		);
		array_push($buses, $bus);
	}
  	echo json_encode($buses);

	mysqli_close($conn);
?>