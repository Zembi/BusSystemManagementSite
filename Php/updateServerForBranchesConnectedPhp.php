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
	$deleteOk = 1;
	$addOk = 1;

	$id = $_POST['id'];
	$branchesToConnect = $_POST['branchesToConnect'];
	$branchesConnIds = $_POST['branchesConnIds'];
	$branchesToDelete = $_POST['branchesToDelete'];

	if(!($branchesToDelete == "0")) {
		foreach($branchesToDelete as $brConnDelete) {
			$queryToDelete = "DELETE FROM branchesconnections WHERE (BranchId = '$brConnDelete' AND ConnectedBranch = '$id') OR (BranchId = '$id' AND ConnectedBranch = '$brConnDelete')";
			if(mysqli_query($conn, $queryToDelete)) {
				$deleteOk = 1;
			}
			else {
				$deleteOk = 0;
			}
		}
	}

	if(!($branchesToConnect == "0")) {
		$c = 0;
		foreach($branchesToConnect as $brConnAdd) {
			$idOfBrConn = $branchesConnIds[$c];

			$queryToAdd = "INSERT INTO branchesconnections (Id, BranchId, ConnectedBranch) VALUES ('$idOfBrConn', '$id', '$brConnAdd')";
			if(mysqli_query($conn, $queryToAdd)) {
				$addOk = 1;
			}
			else {
				$addOk = 0;
			}

			$c++;
		}
	}

	if($deleteOk && $addOk) {
		$allOk = 1;
	}
	else {
		$allOk = 0;
	}
	
	echo $allOk;

	mysqli_close($conn);

?>