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

	$busIdToFind = $_POST['id'];
	$busFound = "";
	
	$query = "SELECT * FROM buses WHERE Id = '$busIdToFind'";

	$result = mysqli_query($conn, $query);
	while (($row = mysqli_fetch_array($result))) {
		$busFound = array(
			'id' => $row['Id'],
			'info' => $row['Info'],
			'branchConnected' => $row['BranchConnected'],
   			'availability' => $row['Availability']
		);
	}
	
	echo json_encode($busFound);

	mysqli_close($conn);

?>