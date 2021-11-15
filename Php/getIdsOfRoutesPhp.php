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

	$routesIds = [];

	$queryRoutesIds = "SELECT Id FROM routes";
	$resultRoutesIds = mysqli_query($conn, $queryRoutesIds);
		
	while (($row = mysqli_fetch_array($resultRoutesIds))) {
		array_push($routesIds, $row['Id']);
	}
	
	echo json_encode($routesIds);

	mysqli_close($conn);
?>