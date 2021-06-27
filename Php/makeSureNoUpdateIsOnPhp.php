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

	$sqlFindUpdate = "SELECT * FROM updates WHERE Activity = 'Α'";
	$result = mysqli_query($conn, $sqlFindUpdate);
	while (($row = mysqli_fetch_array($result))) {
		$update = array(
			'username' => $row['Username'],
			'email' => $row['Email'],
			'name' => $row['Name'],
   			'icon' => $row['Icon'],
	}
	
	mysqli_close($conn);

?>