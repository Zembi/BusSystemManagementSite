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

	$notifIds = [];

	$query = "SELECT Id FROM notifications";

	$result = mysqli_query($conn, $query);
	while (($row = mysqli_fetch_array($result))) {
		array_push($notifIds, $row['Id']);
	}

	echo json_encode($notifIds);

	mysqli_close($conn);
?>