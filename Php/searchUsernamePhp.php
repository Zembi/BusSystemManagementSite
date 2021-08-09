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

	$found = 0;
	$searchKey = $_POST['key'];

	$sqlSearchForUsername = "SELECT * FROM employees WHERE Username = '$searchKey'";
	$result = mysqli_query($conn, $sqlSearchForUsername);

	if(mysqli_num_rows($result) > 0) {
		$found = 1;
	}

	echo $found;

	mysqli_close($conn);

?>