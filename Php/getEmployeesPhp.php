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

	$employees = [];

	$queryEmpl = "SELECT * FROM employees ORDER BY `BranchId`, `Wage`";

	$resultEmpl = mysqli_query($conn, $queryEmpl);
	while (($rowE = mysqli_fetch_array($resultEmpl))) {
		//$formatedRecruitmentDay = date("d/m/Y", strtotime($recruitmentDay));
		
		$employee = array(
			'id' => $rowE['Id'],
			'username' => $rowE['Username'],
			'email' => $rowE['Email'],
			'name' => $rowE['Name'],
   			'icon' => $rowE['Icon'],
			'branchId' => $rowE['BranchId'],
			'status' => $rowE['Status'],
			'sex' => $rowE['Sex'],
			'wage' => $rowE['Wage'],
			'recruitmentDay' => $rowE['RecruitmentDay'],
			'AFM' => $rowE['ΑΦΜ'],
			'AMKA' => $rowE['ΑΜΚΑ']
		);
		array_push($employees, $employee);
	}

	//echo $rowE['Wage'];
  	echo json_encode($employees);

	mysqli_close($conn);
?>