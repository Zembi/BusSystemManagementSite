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

	$busId = $_POST['busId'];

	//DELETE BRANCH FROM BRANCH TABLE
	$sqlDeleteBranch = "DELETE FROM buses WHERE Id = '$busId'";

	if(!mysqli_query($conn, $sqlDeleteBranch)) {
		$allOk = 0;
	}

	echo $allOk;

	mysqli_close($conn);

?>