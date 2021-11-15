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
	$userId = $_POST['userId'];

	$notifs = [];

	if($type == "Receiver") {
		$queryHelper = "SELECT * FROM notifications WHERE Sender <> '$userId' ORDER BY `DateTimeSend` DESC";
		
		$resultHelper = mysqli_query($conn, $queryHelper);
		while (($row = mysqli_fetch_array($resultHelper))) {
			$receivers = $row['Receiver'];
			$receiverSlices = explode("#", $receivers);

			$count = 0;
			foreach ($receiverSlices as $value) {
				$receiverId = explode("$", $value);

				if($receiverId[0] == $userId) {
					$sender = $row['Sender'];


					$queryFindEmployee = "SELECT * FROM employees WHERE Id = '$sender'";
					$resultFindEmployee = mysqli_query($conn, $queryFindEmployee);

					while (($rowFindEmpl = mysqli_fetch_array($resultFindEmployee))) {
						$employeeSender = array(
							'id' => $rowFindEmpl['Id'],
							'username' => $rowFindEmpl['Username'],
							'email' => $rowFindEmpl['Email'],
							'name' => $rowFindEmpl['Name'],
				   			'icon' => $rowFindEmpl['Icon'],
							'branchId' => $rowFindEmpl['BranchId'],
							'status' => $rowFindEmpl['Status'],
							'sex' => $rowFindEmpl['Sex'],
							'wage' => $rowFindEmpl['Wage'],
							'recruitmentDay' => $rowFindEmpl['RecruitmentDay'],
							'AFM' => $rowFindEmpl['ΑΦΜ'],
							'AMKA' => $rowFindEmpl['ΑΜΚΑ']
						);
					}

					$notifFound = array(
						'id' => $row['Id'],
						'type' => $row['Type'],
						'textArea' => $row['TextArea'],
			   			'sender' => $employeeSender,
						'receiverPos' => $count,
			   			'status' => $receiverId[1],
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
		$queryHelper = "SELECT * FROM notifications WHERE Sender = '$userId' ORDER BY `DateTimeSend` DESC";
		
		$resultHelper = mysqli_query($conn, $queryHelper);
		while (($row = mysqli_fetch_array($resultHelper))) {
			$receivers = $row['Receiver'];
			$receiverSlices = explode("#", $receivers);
			$removeLastElement = array_pop($receiverSlices);

			$employeeReceivers = [];
			$employeeReceiversStatus = [];
			foreach ($receiverSlices as $value) {
				$receiver = explode("$", $value);
				$receiverId = $receiver[0];
				$receiverStatus = $receiver[1];
				array_push($employeeReceiversStatus, $receiverStatus);

				$queryFindEmployee = "SELECT * FROM employees WHERE Id = '$receiverId'";
				$resultFindEmployee = mysqli_query($conn, $queryFindEmployee);

				while (($rowFindEmpl = mysqli_fetch_array($resultFindEmployee))) {
					$employeeReceiver = array(
						'id' => $rowFindEmpl['Id'],
						'username' => $rowFindEmpl['Username'],
						'email' => $rowFindEmpl['Email'],
						'name' => $rowFindEmpl['Name'],
				   		'icon' => $rowFindEmpl['Icon'],
						'branchId' => $rowFindEmpl['BranchId'],
						'status' => $rowFindEmpl['Status'],
						'sex' => $rowFindEmpl['Sex'],
						'wage' => $rowFindEmpl['Wage'],
						'recruitmentDay' => $rowFindEmpl['RecruitmentDay'],
						'AFM' => $rowFindEmpl['ΑΦΜ'],
						'AMKA' => $rowFindEmpl['ΑΜΚΑ']
					);
					array_push($employeeReceivers, $employeeReceiver);
				}
			}

			$notifFound = array(
				'id' => $row['Id'],
				'type' => $row['Type'],
				'textArea' => $row['TextArea'],
				'receivers' => $employeeReceivers,
				'status' => $employeeReceiversStatus,
				'answer' => $row['Answer'],
				'dateTimeSend' => $row['DateTimeSend']
			);
			array_push($notifs, $notifFound);
		}
	}
	
	echo json_encode($notifs);

	mysqli_close($conn);

?>