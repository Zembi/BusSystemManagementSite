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

	$idToFind = $_POST['id'];
	$query = "SELECT * FROM users WHERE IdOfUser = '$idToFind'";

	$result = mysqli_query($conn, $query);
	while (($row = mysqli_fetch_array($result))) {
		$userFound = array(
			'id' => $row['IdOfUser'],
			'password' => $row['Password']
		);
		
   		echo json_encode($userFound, JSON_UNESCAPED_UNICODE);
	}

	mysqli_close($conn);

?>