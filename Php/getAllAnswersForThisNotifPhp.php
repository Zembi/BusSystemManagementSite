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
	$notifAnswers = [];

	$queryNotifAnswers = "SELECT * FROM notifications WHERE Id = '$notifId'";
	$resultNotifAnswers = mysqli_query($conn, $queryNotifAnswers);

	while (($row = mysqli_fetch_array($resultNotifAnswers))) {
		$answers = $row['Answer'];
		$answerSlices = explode(",", $answers);
		
		foreach ($answerSlices as $value) {
			array_push($notifAnswers, $value);
		}
	}

  	echo json_encode($notifAnswers);

	mysqli_close($conn);
?>