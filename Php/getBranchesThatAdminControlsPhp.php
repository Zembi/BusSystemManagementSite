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

	$admin = $_POST['id'];
	$branches = [];

	$query = "SELECT * FROM branches WHERE AdminControl = '$admin'";

	$result = mysqli_query($conn, $query);
	while (($row = mysqli_fetch_array($result))) {
		$branch = array(
			'id' => $row['Id'],
			'type' => $row['Type'],
			'street' => $row['Street'],
   			'location' => $row['Location'],
			'manager' => $row['Manager'],
			'status' => $row['Status']
		);
		array_push($branches, $branch);
	}

	echo json_encode($branches);

	mysqli_close($conn);
?>