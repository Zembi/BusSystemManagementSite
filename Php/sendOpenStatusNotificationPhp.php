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

	$id = $_POST['id'];
	$userIn = $_POST['user'];

	$queryHelper = "SELECT Receiver FROM notifications WHERE Id = '$id'";
	
	$resultHelper = mysqli_query($conn, $queryHelper);
	while (($row = mysqli_fetch_array($resultHelper))) {
		$receivers = $row['Receiver'];
		$receiverSlices = explode("#", $receivers);

		foreach ($receiverSlices as $value) {
			$receiverUsername = explode("$", $value);

			if($receiverUsername[0] == $userIn) {
				$newReceivers = $receivers;
				$newStatus = $userIn."$1";
				$newReceivers = str_replace($value, $newStatus, $newReceivers);

				$sqlUpdateNotifications = "UPDATE notifications SET Receiver = '$newReceivers' WHERE Id = '$id'";
				mysqli_query($conn, $sqlUpdateNotifications);
				break;
			}
		}
	}

	mysqli_close($conn);

?>