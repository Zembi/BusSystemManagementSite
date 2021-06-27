<!DOCTYPE html>
<html>
<head>
	
	<!--JQUERY LIBRARIES-->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
	<!--ANGULARJS LIBRARIES-->
	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular.min.js"></script>

	<!--FONT-FAMILIES USED-->
	<link href='https://fonts.googleapis.com/css?family=Arbutus' rel='stylesheet'>
	<link href='https://fonts.googleapis.com/css?family=Amiko' rel='stylesheet'>
	<link href='https://fonts.googleapis.com/css?family=Advent Pro' rel='stylesheet'>
	<link href='https://fonts.googleapis.com/css?family=Architects Daughter' rel='stylesheet'>
	<link href='https://fonts.googleapis.com/css?family=Archivo' rel='stylesheet'>
	<link href='https://fonts.googleapis.com/css?family=Flamenco' rel='stylesheet'>

	<meta name="theme-color" content="rgb(190, 214, 148)">

	<!--CSS FILES BEEN USED-->
	<link rel="stylesheet" href="../Css/logInIndexCss.css">

	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>

	<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">

	<!-- The core Firebase JS SDK is always required and must be listed first -->
	<script src="https://www.gstatic.com/firebasejs/8.4.1/firebase-app.js"></script>
	<script src="https://www.gstatic.com/firebasejs/8.4.1/firebase-auth.js"></script>

	<title>Υπ.Ελ.Δ - Είσοδος</title>

</head>
<body>
	
	<!--CHECK SESSION FOR USER LOGGEDIN-->
	<?php 

	session_start();
	$checkScreenNow = "LogIn";
	include("../Php/startSessionPhp.php");

 	?>
 	
	<div id="mainC">
		<div id="allUpperElementsC">
			<div id="upC">
				<button id="headerBtn" onclick="" tabindex="-1">
					<div id="imageC">
						<img id="headerImg">
					</div>
				</button>
			</div>
			<div id="midC">
				<div id="signInC">
					<div id="signInHeaderC">Είσοδος</div>
					<div id="usernameAndEmailC">
						<div id="usernameC">
							<div id="usernameHeaderC">Όνομα χρήστη</div>
							<button id="useEmailToSignInBtn">
								<div>Χρήση email</div>
							</button>
							<input id="usernameInput" autocomplete="on" maxlength="25" spellcheck="false">
						</div>
						<div id="emailC">
							<div id="emailHeaderC">Email</div>
							<button id="useUsernameToSignInBtn">
								<div>Χρήση ονόματος χρήστη</div>
							</button>
							<input id="emailInput" autocomplete="on" maxlength="35" spellcheck="false">
						</div>
					</div>
					<div id="passwordC">
						<div id="passwordHeaderC">Κωδικός</div>
						<input id="passwordInput" type="password" autocomplete="on" maxlength="25" spellcheck="false">
						<button id="showMePasswdImageBtn" tabindex="-1" title="Click&See">
							<img id="showMePasswdImg">
						</button>
					</div>
					<button id="signInBtn">Είσοδος</button>
					<div id="lineInSignInC"></div>
					<div id="textInLineSignInC">Καλώς ήρθατε</div>
				</div>
			</div>
		</div>

		<div id="footerC">
			<div id="columnFooterWithInfoC">
				<button id="termsAndCondsFooterBtn" onclick="">
					<div>Όροι και προυποθέσεις</div>
				</button>
				<button id="helpFooterBtn">
					<div>Βοήθεια</div>
				</button>
			</div>
			<div id="lastFooterInfoC"><span>©</span> 2021 - BusSystemManagement.com</div>
		</div>
	</div>

	<script type="text/javascript" src="../Js/logInSupportCssAndActions.js"></script>

</body>
</html>