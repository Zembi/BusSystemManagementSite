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

	//DELETE BRANCH FROM BRANCH TABLE
	$sqlDeleteBranch = "DELETE FROM branches WHERE Id = '$id'";

	if(!mysqli_query($conn, $sqlDeleteBranch)) {
		$allOk = 0;
	}
	else {
		
		$sqlDeleteBranchConnections = "DELETE FROM branchesconnections WHERE BranchId = '$id' || ConnectedBranch = '$id'";
		if(!mysqli_query($conn, $sqlDeleteBranchConnections)) {
			$allOk = 0;
		}
	}

	echo $allOk;

	mysqli_close($conn);

?>