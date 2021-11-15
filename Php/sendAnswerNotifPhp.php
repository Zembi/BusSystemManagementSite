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

	$idNotif = $_POST['id'];
	$answerOfEmployee = $_POST['answer'];
	$employeeInId = $_POST['receiverId'];

	$queryHelper = "SELECT Receiver, Answer FROM notifications WHERE Id = '$idNotif'";
	
	$resultHelper = mysqli_query($conn, $queryHelper);
	while (($row = mysqli_fetch_array($resultHelper))) {
		$receivers = $row['Receiver'];
		$answer = $row['Answer'];
		$receiverSlices = explode("#", $receivers);
		$removeLastElement = array_pop($receiverSlices);

		$counter = 0;
		foreach ($receiverSlices as $value) {
			$receiverId = explode("$", $value);

			if($receiverId[0] == $employeeInId) {
				break;
			}

			$counter++;
		}

		$answerArr = explode(",", $answer);
		$answerArr[$counter] = $answerOfEmployee;

		$answerString = implode("," ,$answerArr);

		$sqlUpdateNotifications = "UPDATE notifications SET Answer = '$answerString' WHERE Id = '$idNotif'";
		if(!mysqli_query($conn, $sqlUpdateNotifications)) {
			$allOk = 0;
		}
	}

	echo $allOk;

	mysqli_close($conn);

?>