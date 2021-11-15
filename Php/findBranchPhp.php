<?php	

	$servername = "127.0.0.1";
	$user = "root";
	$password = "";
	$db = "bussystemmanagement";

	$conn = mysqli_connect($servername, $user, $password);

	mysqli_set_charset($conn, 'utf8');
	if (!$conn) {
	  	echo "Not Connected To Server";
	}

	if(!mysqli_select_db($conn, $db)) {
		echo "Database Not Selected";
	}

	$branchToFind = $_POST['branch'];
	$branchFound = "";
	$query = "SELECT * FROM branches WHERE Id = '$branchToFind'";

	$result = mysqli_query($conn, $query);
	while (($row = mysqli_fetch_array($result))) {
		$branchFound = array(
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
	}
	
	echo json_encode($branchFound);

	mysqli_close($conn);

?>