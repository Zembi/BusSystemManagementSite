<?php

	$servername = "127.0.0.1";
	$user = "root";
	$password = "";
	$db = "bussystemmanagement";

	session_start();
	$username = $_SESSION['user'];
	$_SESSION['userStatus'] = "null";

	$conn = mysqli_connect($servername, $user, $password);

	mysqli_set_charset($conn, 'utf8');

	if (!$conn) {
	  	echo "Not Connected To Server";
	}

	if(!mysqli_select_db($conn, $db)) {
		echo "Database Not Selected";
	}

	$query = "DELETE FROM usersonline WHERE Username='$username'";
	mysqli_query($conn, $query);


	mysqli_close($conn);
?>