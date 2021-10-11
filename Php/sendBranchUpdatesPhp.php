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

	$allOk = 0;

	$id = $_POST['id'];
	$status = $_POST['status'];
	$type = $_POST['type'];
	$street = $_POST['street'];
	$image = $_POST['image'];

	//UPDATE branches TABLE
	$sqlUpdateBranch = "UPDATE branches SET Type = '$type', Street = '$street', Image = '$image', Status = '$status' WHERE Id = '$id'";

	if(mysqli_query($conn, $sqlUpdateBranch)) {
		$allOk = 1;
	}

	echo $allOk;

	mysqli_close($conn);

?>