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
	
	$newBranchDecoded = json_decode($newBranch);
	if(empty($newBranchDecoded->manager)) {
		$sqlInsertNewBranch = "INSERT INTO branches (Id, Type, Street, Location, Image, Manager, StoreId, Status) 
							VALUES ('$newBranchDecoded->id', '$newBranchDecoded->type', '$newBranchDecoded->street', '$newBranchDecoded->location', 
							'$newBranchDecoded->image', NULL, '$newBranchDecoded->storeId', '$newBranchDecoded->status')";
	}
	else {
		$sqlInsertNewBranch = "INSERT INTO branches (Id, Type, Street, Location, Image, Manager, StoreId, Status) 
							VALUES ('$newBranchDecoded->id', '$newBranchDecoded->type', '$newBranchDecoded->street', '$newBranchDecoded->location', 
							'$newBranchDecoded->image', '$newBranchDecoded->manager', '$newBranchDecoded->storeId', '$newBranchDecoded->status')";
	}

	if(mysqli_query($conn, $sqlInsertNewBranch)) {
		
		$sqlUpdateEmployees = "UPDATE employees SET BranchId = '$newBranchDecoded->id' WHERE BranchId IS NULL AND Username = '$newBranchDecoded->manager'";
		if(mysqli_query($conn, $sqlUpdateEmployees)) {

			$sqlInsertBranchConnections = "INSERT INTO branchesconnections (BranchId, ConnectedBranches) VALUES ('$newBranchDecoded->id', '$newBranchDecoded->connectBranches')";
			if(mysqli_query($conn, $sqlInsertBranchConnections)) {
				echo 1;
			}
			else {
				echo 0;
			}
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