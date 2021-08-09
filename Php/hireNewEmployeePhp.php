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

	$employee = $_POST['employeeHireObj'];
	$employee = json_decode($employee);

	$sqlAddNewEmployee = "INSERT INTO employees (Username, Email, Name, Icon, BranchId, Status, Wage, Sex, RecruitmentDay, ΑΦΜ, ΑΜΚΑ) 
							VALUES ('$employee->username', '$employee->email', '$employee->name', '$employee->icon', 
							'$employee->branchId', '$employee->status', '$employee->wage', '$employee->sex', '$employee->recruitmentDay',
							'$employee->afm', '$employee->amka') ";
	if(mysqli_query($conn, $sqlAddNewEmployee)) {
		echo 1;
	}
	else {
		echo 0;
	}

	if($employee->status == "Employee Manager") {
		$sqlAddNewManagerToBranch = "UPDATE branches SET Manager = '$employee->username' WHERE Id = '$employee->branchId'";
		mysqli_query($conn, $sqlAddNewManagerToBranch);
	}

	if($employee->status == "Employee Manager" || $employee->status == "Employee Manager" || $employee->status == "Agency Employee" || $employee->status == "Store Employee") {
		$sqlAddNewUser = "INSERT INTO users (Username, Email, Icon, Name, Password, Status, Sex) 
							VALUES ('$employee->username', '$employee->email', '$employee->icon', '$employee->name', '$employee->password', '$employee->status', '$employee->sex') ";
		mysqli_query($conn, $sqlAddNewUser);
	}

	mysqli_close($conn);

?>