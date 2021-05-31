<script type="text/javascript">
	var userStatus = "<?php echo $_SESSION['userStatus']?>";

	//LOGOUT BUTTON ADMIN EVENTS
	$( "#logOutBtn" ).click(async function() {
		await sendToExitSite();
		window.location.href = "../Index";
	});

	function sendToExitSite() {
		return new Promise((resolve, reject) => {
			sessionStorage.setItem("Load", "Off");
			$.ajax({
      			type: 'POST',
      			url: "../Php/exitSitePhp.php",
      			success: function(data) {
	    			resolve();
      			}
			});
		});
	}
</script>