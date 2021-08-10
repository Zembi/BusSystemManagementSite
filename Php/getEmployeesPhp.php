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

	$users = [];

	$query = "SELECT * FROM employees  ORDER BY `BranchId`, `Wage`";

	$result = mysqli_query($conn, $query);
	while (($row = mysqli_fetch_array($result))) {
		$recruitmentDay = $row['RecruitmentDay'];
		//$formatedRecruitmentDay = date("d/m/Y", strtotime($recruitmentDay));  
		
		$user = array(
			'username' => $row['Username'],
			'email' => $row['Email'],
			'name' => $row['Name'],
   			'icon' => $row['Icon'],
			'branchId' => $row['BranchId'],
			'status' => $row['Status'],
			'sex' => $row['Sex'],
			'wage' => $row['Wage'],
			'recruitmentDay' => $row['RecruitmentDay'],
			'AFM' => $row['ΑΦΜ'],
			'AMKA' => $row['ΑΜΚΑ']
		);
		array_push($users, $user);
	}

	//echo $row['Wage'];
  	echo json_encode($users);

	mysqli_close($conn);
?>