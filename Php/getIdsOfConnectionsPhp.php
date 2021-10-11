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

	$branchesConnectionsIds = [];

	$queryBranchesConns = "SELECT Id FROM branchesconnections";
	$resultBranchesConns = mysqli_query($conn, $queryBranchesConns);
		
	while (($row = mysqli_fetch_array($resultBranchesConns))) {
		array_push($branchesConnectionsIds, $row['Id']);
	}
	
	echo json_encode($branchesConnectionsIds);

	mysqli_close($conn);
?>