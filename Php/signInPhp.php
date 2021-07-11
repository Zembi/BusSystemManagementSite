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
		
	$usernameInput = $_POST['singInUsernameInput'];
	$emailInput = $_POST['singInEmailInput'];
	$passwdInput = $_POST['singInPasswordInput'];
	$partNowOpened = $_POST['partNow'];
	$errorC = 0;
	$good = 0;
	$query1 = "";

	if($partNowOpened == 1) {
		if(!empty($usernameInput)) {
			$query1 = "SELECT * FROM users WHERE Username = '$usernameInput'";
		}
		else {
			$errorC++;
		}
	}
	else {
		if(!empty($emailInput)) {
			$query1 = "SELECT * FROM users WHERE Email = '$emailInput'";
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
		$result = mysqli_query($conn, $query1);
		while (($row = mysqli_fetch_array($result))) {
			if($passwdInput == $row['Password']) {
				$username = $row['Username'];
				$status = $row['Status'];
				$query2 = "INSERT INTO usersonline (Username, Status) VALUES ('$username', '$status')";
				mysqli_query($conn, $query2);
					
				session_start();

				$_SESSION['user'] = $username;
				$_SESSION['userStatus'] = $status;

				$good = 1;
			}
		}
	}
   	echo $good;

	mysqli_close($conn);
?>