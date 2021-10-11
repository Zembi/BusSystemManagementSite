<!DOCTYPE php>

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
	<link href='https://fonts.googleapis.com/css?family=Roboto Slab' rel='stylesheet'>

	<!--CSS FILES BEEN USED-->
	<link rel="stylesheet" href="../Css/adminIndexCss.css">
	<link rel="stylesheet" href="../Css/globalUserIdCss.css">

	<meta name="viewport" content="width=device-width, initial-scale=1">
	 
	<meta name="theme-color" content="rgb(190, 214, 148)">

	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>

	<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">

	<!-- The core Firebase JS SDK is always required and must be listed first -->
	<script src="https://www.gstatic.com/firebasejs/8.4.1/firebase-app.js"></script>
	<script src="https://www.gstatic.com/firebasejs/8.4.1/firebase-auth.js"></script>

	<!--****** TODO: Add SDKs for Firebase products that you want to use
  		https://firebase.google.com/docs/web/setup#available-libraries 
	<script src="/__/firebase/8.4.1/firebase-analytics.js"></script>-->

	<!--****** Initialize Firebase 
	<script src="/__/firebase/init.js"></script>-->

	<title>Υπ.Ελ.Δ</title>

</head>
<body>
	
	<!--CHECK SESSION FOR USER LOGGEDIN-->
	<?php 

	session_start();
	$checkScreenNow = "Admin";
	include("../Php/startSessionPhp.php");

 	?>

	<div id="backgroundC">
		<div id="hiddenInfoForSecretIdsC">-</div>
		<div id="coverPageHelperC"></div>
		<div id="alertInfoForCreatNewItemC">
			<div id="alertInfoForCreatNewItemTextC"></div>
			<button id="alertInfoForCreatNewItemBtn"></button>
		</div>
		<div id="editWindowC">
			<div id="centerEditWindowC">
				<div id="exitEditBtn">X</div>
				<div id="editTitleC"><div id="editTitleTextC"></div></div>
				<div id="editInfoGetterC">
					<div id="editInfoGetterLeftC"></div>
					<div id="editInfoGetterRightC"></div>
				</div>
				<div id="coverEditC"></div>
			</div>
			<div id="downContainerOfEditC"></div>
		</div>
		<div id="alertAddNewInfoC">
			<div id="centerAddNewInfoWindowC">
				<div id="importantSymbolAddNewInfoC">!</div>
				<div id="addNewInfoTitleC"><div id="addNewInfoTitleTextC"></div></div>
				<div id="addNewInfoGetterC">
					<div id="addNewInfoTextC"></div>
					<div id="addNewInfoActionBtnC">
						<button id="yesAddNewInfoBtn">ΝΑΙ</button>
						<button id="noAddNewInfoBtn">ΟΧΙ</button>
					</div>
				</div>
				<button id="deleteInfoBtn">ΔΙΑΓΡΑΦΗ</button>
			</div>
		</div>
		<div id="leftC">
			<div id="leftFixedC">
				<div id="menuSymbolC">
					<button id="homeBtn" name="Home">
						<img id="menuImg">
						<div id="homeShowC">Αρχική</div>
					</button>
				</div>
				<div id="menuBtnC">
					<button id="menuBtn"><img></button>
				</div>
				<div id="menuC">
					<button class="menuBtns" id="branchesBtn" name="Branches">
						<img class="menuBtnImg">
						<div class="menuBtnTxtC">
							<div>Καταστήματα</div>
						</div>
					</button>
					<button class="menuBtns" id="employeesBtn" name="Employees">
						<img class="menuBtnImg">
						<div class="menuBtnTxtC">
							<div>Υπάλληλοι</div>
						</div>
					</button>
					<button class="menuBtns" id="routesBtn" name="Routes">
						<img class="menuBtnImg">
						<div class="menuBtnTxtC">
							<div>Δρομολόγια</div>
						</div>
					</button>
					<button class="menuBtns" id="busesBtn" name="Buses">
						<img class="menuBtnImg">
						<div class="menuBtnTxtC">
							<div>Λεωφορεία</div>
						</div>
					</button>
				</div>
				<div id="menuDownImgC"></div>
			</div>
		</div>
		<div id="rightC">
			<div id="headerC">
				<div id="headerHeadC">
					<h1>Δρομολόγια Λεωφορείων - Υπ.Ελ.Δ</h1>
				</div>
			</div>

			<div id="downHeaderC">
				<div id="firstLineContentC">
					<img id="headerImg">
					<div id="profileInfoC">
						<div id="profileLine1">
							<div id="userNameC">
								<div></div>
							</div>
							<img id="adminImg" title="Γενικός Διαχειριστής">
						</div>
						<div id="profileLine2">
							<button id="logOutBtn">
								<div>Έξοδος</div>
							</button>
						</div>
					</div>
				</div>
			
				<div id="contentC">
					<div id="contentCenterC">
						<div id="contentInfoC">
							<div id="pathC">
								<img title="Γενικός Διαχειριστής">
								<div id="pathTextC">
									<div>Something wrong...</div>
								</div>
							</div>
							<button id="centerScreenBtn" title="Κεντρική θέαση">
								<img>
							</button>
							<button id="notifcationSendBtn">Νέα Ειδοποίηση</button>
							<button id="requestsBtn" name="Requests">
								<img id="requestsBtnImg">
								<div id="numberOfRequestsC">
									<div id="numberOfRequestsTextC">-</div>
								</div>
							</button>
						</div>
						<div id="alertNotifInfoC"></div>
						<div id="showPanelC">
						
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	
	<?php
	include("../Php/adminGlobalPhp.php")
	?>

</body>
</html>