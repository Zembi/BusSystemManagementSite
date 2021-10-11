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

	$msg = 0;
	$employee = $_POST['employeeHireObj'];
	$branchId = NULL;
	$employee = json_decode($employee);

	if($employee->branchId == "nothing") {
		$sqlAddNewEmployee = "INSERT INTO employees (Id, Username, Email, Name, Icon, BranchId, Status, Wage, Sex, RecruitmentDay, ΑΦΜ, ΑΜΚΑ) VALUES ('$employee->id', '$employee->username', '$employee->email', '$employee->name', '$employee->icon', NULL, '$employee->status', '$employee->wage', '$employee->sex', '$employee->recruitmentDay', '$employee->afm', '$employee->amka') ";
	}
	else {
		$sqlAddNewEmployee = "INSERT INTO employees (Id, Username, Email, Name, Icon, BranchId, Status, Wage, Sex, RecruitmentDay, ΑΦΜ, ΑΜΚΑ) VALUES ('$employee->id', '$employee->username', '$employee->email', '$employee->name', '$employee->icon', '$employee->branchId', '$employee->status', '$employee->wage', '$employee->sex', '$employee->recruitmentDay', '$employee->afm', '$employee->amka') ";
	}

	if(mysqli_query($conn, $sqlAddNewEmployee)) {
		$msg = 1;
	}
	else {
		$msg = 0;
	}

	if($employee->status == "Employee Manager") {
		$sqlAddNewManagerToBranch = "UPDATE branches SET Manager = '$employee->id' WHERE Id = '$employee->branchId'";
		mysqli_query($conn, $sqlAddNewManagerToBranch);
	}

	if($employee->status == "Admin" || $employee->status == "Employee Manager" || $employee->status == "Agency Employee" || $employee->status == "Store Employee") {
		$sqlAddNewUser = "INSERT INTO users (IdOfUser, Password) VALUES ('$employee->id', '$employee->password') ";
		mysqli_query($conn, $sqlAddNewUser);
	}

	echo $msg;

	mysqli_close($conn);

?>