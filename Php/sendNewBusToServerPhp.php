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

	$bus = $_POST['bus'];
	$bus = json_decode($bus);
	
	if($bus->branchConnected == "NULL") {
		$sqlAddNewBus = "INSERT INTO buses (Id, Info, BranchConnected, Availability) VALUES ('$bus->id', '$bus->info', NULL, '$bus->availability')";
	}
	else {
		$sqlAddNewBus = "INSERT INTO buses (Id, Info, BranchConnected, Availability) VALUES ('$bus->id', '$bus->info', '$bus->branchConnected', '$bus->availability')";
	}

	if(mysqli_query($conn, $sqlAddNewBus)) {
		echo 1;
	}
	else {
		echo 0;
	}

	mysqli_close($conn);

?>