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

	$bus = $_POST['bus'];

	$bus = json_decode($bus);

	if($bus->branchConnected == "NULL") {
		$sqlUpdateBus = "UPDATE buses SET Info = '$bus->info', BranchConnected = NULL, Availability = '$bus->availability' WHERE Id = '$bus->id'";
	}
	else {
		$sqlUpdateBus = "UPDATE buses SET Info = '$bus->info', BranchConnected = '$bus->branchConnected', Availability = '$bus->availability' WHERE Id = '$bus->id'";
	}

	if(!mysqli_query($conn, $sqlUpdateBus)) {
		$allOk = 0;
	}

	echo $allOk;

	mysqli_close($conn);

?>