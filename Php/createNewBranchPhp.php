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

	$newBranch = $_POST['newBranch'];
	$adminControl = $_POST['user'];
	
	$newBranchDecoded = json_decode($newBranch);

	$idsConnArray = $newBranchDecoded->idsOfConnections;
	$branchConnArray = $newBranchDecoded->connectBranches;

	if(empty($newBranchDecoded->managerUsername)) {
		$sqlInsertNewBranch = "INSERT INTO branches (Id, Type, Street, Location, Image, Manager, StoreId, Status, AdminControl) 
							VALUES ('$newBranchDecoded->id', '$newBranchDecoded->type', '$newBranchDecoded->street', '$newBranchDecoded->location', 
							'$newBranchDecoded->image', NULL, '$newBranchDecoded->storeId', '$newBranchDecoded->status', '$adminControl')";
	}
	else {
		$sqlInsertNewBranch = "INSERT INTO branches (Id, Type, Street, Location, Image, Manager, StoreId, Status, AdminControl) 
							VALUES ('$newBranchDecoded->id', '$newBranchDecoded->type', '$newBranchDecoded->street', '$newBranchDecoded->location', 
							'$newBranchDecoded->image', '$newBranchDecoded->managerId', '$newBranchDecoded->storeId', '$newBranchDecoded->status', '$adminControl')";
	}

	if(mysqli_query($conn, $sqlInsertNewBranch)) {
		
		$sqlUpdateEmployees = "UPDATE employees SET BranchId = '$newBranchDecoded->id' WHERE BranchId IS NULL AND Username = '$newBranchDecoded->managerUsername'";
		mysqli_query($conn, $sqlUpdateEmployees);

		$e = 0;
		$c = 0;

		foreach($branchConnArray as $branch) {
			$idConn =  $idsConnArray[$c];
			$sqlInsertBranchConnections = "INSERT INTO branchesconnections (Id, BranchId, ConnectedBranch) VALUES ('$idConn', '$newBranchDecoded->id', '$branch')";
				$c++;

			if(mysqli_query($conn, $sqlInsertBranchConnections)) {
				$e++;
			}
		}

		if($e == count($branchConnArray)) {
			echo 1;
		}
		else {
			echo 0;
		}

	}
	else {
		echo 0;
	}

	mysqli_close($conn);
?>