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

	$availableBranchIdArray = [];

	$IdKey = $_POST['key'];
	$statusToSearch = $_POST['statusSearch'];

	if($statusToSearch == "Employee Manager") {
		if($IdKey != "") {
			$sqlGetAllBranches = "SELECT * FROM branches WHERE Manager IS NULL OR Manager = '$IdKey'";
		}
		else {
			$sqlGetAllBranches = "SELECT * FROM branches WHERE Manager IS NULL";
		}
	}
	else {
		$sqlGetAllBranches = "SELECT * FROM branches WHERE Manager IS NOT NULL";
	}

	$resultBranchId = mysqli_query($conn, $sqlGetAllBranches);

	while(($row = mysqli_fetch_array($resultBranchId))) {
		$branchFound = array(
			'id' => $row['Id'],
			'type' => $row['Type'],
			'street' => $row['Street'],
   			'location' => $row['Location'],
   			'image' => $row['Image'],
			'manager' => $row['Manager'],
			'storeId' => $row['StoreId'],
			'status' => $row['Status'],
			'adminControl' => $row['AdminControl']
		);

		array_push($availableBranchIdArray, $branchFound);
	}

	echo json_encode($availableBranchIdArray);

	mysqli_close($conn);

?>