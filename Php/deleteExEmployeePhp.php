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

	$allOk = 1;

	$id = $_POST['id'];

	//DELETE NOTIFICATION FROM NOTIFICATIONS TABLE
	$sqlDeleteNotifications = "DELETE FROM exemployees WHERE Id = '$id'";

	if(!mysqli_query($conn, $sqlDeleteNotifications)) {
		$allOk = 0;
	}

	echo $allOk;

	mysqli_close($conn);

?>