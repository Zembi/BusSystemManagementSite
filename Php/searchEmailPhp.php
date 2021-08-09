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

	$sqlSearchForEmail = "SELECT * FROM employees WHERE Email = '$searchKey'";
	$result = mysqli_query($conn, $sqlSearchForEmail);

	if(mysqli_num_rows($result) > 0) {
		$found = 1;
	}
	else {
		$sqlSearchFromExEmployeeEmail = "SELECT * FROM exemployees WHERE Email = '$searchKey'";
		$result = mysqli_query($conn, $sqlSearchFromExEmployeeEmail);

		if(mysqli_num_rows($result) > 0) {
			$found = 2;
		}
	}

	echo $found;

	mysqli_close($conn);

?>