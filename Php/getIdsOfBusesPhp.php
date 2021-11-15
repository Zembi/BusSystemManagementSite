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

	$busesIds = [];

	$queryBusesIds = "SELECT Id FROM buses";
	$resultBusesIds = mysqli_query($conn, $queryBusesIds);
		
	while (($row = mysqli_fetch_array($resultBusesIds))) {
		array_push($busesIds, $row['Id']);
	}
	
	echo json_encode($busesIds);

	mysqli_close($conn);
?>