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
		
	$userTryToSignIn = $_POST['userTryToSignIn'];
	$userTryToSignIn = json_decode($userTryToSignIn);

	$usernameInput = $userTryToSignIn->username;
	$emailInput = $userTryToSignIn->email;
	$passwdInput = $userTryToSignIn->password;
	$partNowOpened = $userTryToSignIn->partNow;

	$userInData = "";
	$errorC = 0;
	$good = 0;
	$queryEmployees = "";

	if($partNowOpened == 1) {
		if(!empty($usernameInput)) {
			$queryEmployees = "SELECT * FROM employees WHERE Username = '$usernameInput'";
		}
		else {
			$errorC++;
		}
	}
	else {
		if(!empty($emailInput)) {
			$queryEmployees = "SELECT * FROM employees WHERE Email = '$emailInput'";
		}
		else {
			$errorC++;
		}
	}

	if(!empty($passwdInput)) {

	}
	else {
		$errorC++;
	}

	//$passwdMDInput = md5($passwdInput);

	//echo 'Now: '.$passwdInput."<br>";

	if($errorC == 0) {
		$resultEmployees = mysqli_query($conn, $queryEmployees);
		while (($rowEmployee = mysqli_fetch_array($resultEmployees))) {
			$idOfEmployee = $rowEmployee['Id'];
			$username = $rowEmployee['Username'];
			$status = $rowEmployee['Status'];

			$queryUsers = "SELECT Password FROM users WHERE IdOfUser = '$idOfEmployee'";
			$resultUsers = mysqli_query($conn, $queryUsers);

			while (($rowUser = mysqli_fetch_array($resultUsers))) {
				$password = $rowUser['Password'];

				if($passwdInput == $password) {
					$queryUsersOnline = "INSERT INTO usersonline (Id, Status) VALUES ('$idOfEmployee', '$status')";
					mysqli_query($conn, $queryUsersOnline);
						
					session_start();

					$_SESSION['userId'] = $idOfEmployee;
					$_SESSION['userUsername'] = $username;
					$_SESSION['userStatus'] = $status;

					$good = 1;
				}
			}
		}
	}
	
	echo $good;

	mysqli_close($conn);
?>