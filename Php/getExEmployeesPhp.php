<?php

	$servername = "127.0.0.1";
	$user = "root";
	$password = "";
	$db = "bussystemmanagement";

	$counter = 0;

	$conn = mysqli_connect($servername, $user, $password);

	mysqli_set_charset($conn, 'utf8');

	if (!$conn) {
	  	echo "Not Connected To Server";
	}

	if(!mysqli_select_db($conn, $db)) {
		echo "Database Not Selected";
	}

	$type = $_POST['tp'];

	$exEmployees = [];

	$query = "SELECT * FROM exemployees WHERE WayOutOfCompany = '$type'";

	$result = mysqli_query($conn, $query);
	while (($row = mysqli_fetch_array($result))) {
		
		$exEmployee = array(
			'id' => $row['Id'],
			'name' => $row['Name'],
			'email' => $row['Email'],
   			'icon' => $row['Icon'],
			'lastBranchId' => $row['LastBranchId'],
			'lastStatus' => $row['LastStatus'],
			'lastWage' => $row['LastWage'],
			'sex' => $row['Sex'],
			'recruitmentDay' => $row['RecruitmentDay'],
			'endDay' => $row['EndDay'],
			'wayOutOfCompany' => $row['WayOutOfCompany'],
			'afm' => $row['ΑΦΜ'],
			'amka' => $row['ΑΜΚΑ'],
			'reason' => $row['Reason']
		);
		array_push($exEmployees, $exEmployee);
	}

  	echo json_encode($exEmployees);

	mysqli_close($conn);
?>