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

	$approveReply = $_POST['approve'];
	$notifId = $_POST['id'];
	$notifType = $_POST['type'];
	$notifText = $_POST['text'];
	$sender = $_POST['sender'];
	$receiver = $_POST['receiver'];
	$answer = $_POST['answer'];
	$date = $_POST['date'];
	
	if($approveReply == "true") {
		$sqlAddNewNotification = "INSERT INTO notifications (Id, Type, TextArea, Sender, Receiver, Answer, DateTimeSend) VALUES ($notifId, '$notifType', '$notifText', '$sender', '$receiver', '$answer', '$date')";
	}
	else {
		$sqlAddNewNotification = "INSERT INTO notifications (Id, Type, TextArea, Sender, Receiver, Answer, DateTimeSend) VALUES ($notifId, '$notifType', '$notifText', '$sender', '$receiver', NULL, '$date')";
	}

	if(mysqli_query($conn, $sqlAddNewNotification)) {
		echo 1;
	}
	else {
		echo 0;
	}

	mysqli_close($conn);

?>