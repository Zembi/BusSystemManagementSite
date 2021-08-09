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

	$notifId = $_POST['id'];
	$notifType = $_POST['type'];
	$notifText = $_POST['text'];
	$sender = $_POST['sender'];
	$receiver = $_POST['receiver'];
	$date = $_POST['date'];

	$sqlAddNewNotification = "INSERT INTO notifications (Id, Type, TextArea, Sender, Receiver, DateTimeSend) VALUES ($notifId, '$notifType', '$notifText', '$sender', '$receiver', '$date')";

	if(mysqli_query($conn, $sqlAddNewNotification)) {
		echo 1;
	}
	else {
		echo 0;
	}

	mysqli_close($conn);

?>