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

	$type = $_POST['typeOfGet'];
	$user = $_POST['user'];

	$notifs = [];

	if($type == "Receiver") {
		$queryHelper = "SELECT * FROM notifications WHERE Sender <> '$user' ORDER BY `DateTimeSend` DESC";
		
		$resultHelper = mysqli_query($conn, $queryHelper);
		while (($row = mysqli_fetch_array($resultHelper))) {
			$receivers = $row['Receiver'];
			$receiverSlices = explode("#", $receivers);

			$count = 0;
			foreach ($receiverSlices as $value) {
				$receiverUsername = explode("$", $value);

				if($receiverUsername[0] == $user) {
					$notifFound = array(
						'id' => $row['Id'],
						'type' => $row['Type'],
						'textArea' => $row['TextArea'],
			   			'sender' => $row['Sender'],
			   			'status' => $receiverUsername[1],
			   			'answer' => $row['Answer'],
						'dateTimeSend' => $row['DateTimeSend']
					);
					array_push($notifs, $notifFound);
					break;
				}
				$count++;
			}
		}
	}
	else if($type == "Sender") {
		$query = "SELECT * FROM notifications WHERE Sender = '$user' ORDER BY `DateTimeSend` DESC";
		
		$result = mysqli_query($conn, $query);
		while (($row = mysqli_fetch_array($result))) {
			$notifFound = array(
				'id' => $row['Id'],
				'type' => $row['Type'],
				'textArea' => $row['TextArea'],
	   			'sender' => $row['Sender'],
	   			'receiver' => $row['Receiver'],
	   			'answer' => $row['Answer'],
				'dateTimeSend' => $row['DateTimeSend']
			);
			array_push($notifs, $notifFound);
		}
	}
	
	echo json_encode($notifs);

	mysqli_close($conn);

?>