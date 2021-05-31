<?php

	if(isset($_SESSION['userStatus'])) {
		if($checkScreenNow == "LogIn") {
			if($_SESSION['userStatus'] == "Admin") {
				header("Location: ../Admin");
			}
			else if($_SESSION['userStatus'] == "Employee") {
				header("Location: ../Employee");
			}
		}
		else if($checkScreenNow == "Admin") {
			if($_SESSION['userStatus'] == "null") {
				header("Location: ../Index");
			}
			else if($_SESSION['userStatus'] == "Employee") {
				header("Location: ../Employee");
			}
		}
		else if($checkScreenNow == "Employee") {
			if($_SESSION['userStatus'] == "null") {
				header("Location: ../Index");
			}
			else if($_SESSION['userStatus'] == "Admin") {
				header("Location: ../Admin");
			}
		}
	}
	else {
		$_SESSION['userStatus'] = "null";
		header("Location: ../Index");
	}
?>