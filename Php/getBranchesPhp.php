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

	$branches = [];

	$query = "SELECT * FROM branches ORDER BY `Status`, `Id`";
	$result = mysqli_query($conn, $query);
	while (($row = mysqli_fetch_array($result))) {
		$branch = array(
			'id' => $row['Id'],
			'type' => $row['Type'],
			'street' => $row['Street'],
   			'location' => $row['Location'],
			'image' => $row['Image'],
			'manager' => $row['Manager'],
			'storeId' => $row['StoreId'],
			'status' => $row['Status'],
			'adminControl' => $row['AdminControl']
		);
		array_push($branches, $branch);
	}
  	echo json_encode($branches);

	mysqli_close($conn);
?>