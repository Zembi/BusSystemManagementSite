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

	$branchesConnected = [];

	$id = $_POST['id'];

	$sqlGetConnectedBranches = "SELECT * FROM branchesconnections WHERE BranchId = '$id' OR ConnectedBranch = '$id'";
	$resultBranchConnections = mysqli_query($conn, $sqlGetConnectedBranches);

	while(($row = mysqli_fetch_array($resultBranchConnections))) {
			$idOne = $row['BranchId'];
			$idTwo = $row['ConnectedBranch'];

			if($idOne == $id) {
				array_push($branchesConnected, $idTwo);
			}
			else {
				if($idTwo == $id) {
					array_push($branchesConnected, $idOne);
				}
			}
	}

	echo json_encode($branchesConnected);

	mysqli_close($conn);

?>