
//INITIALIZE STYLING VARIABLES
var liveInfoTitleC = document.getElementById("liveInfoTitleC");
var liveInfoContentC = document.getElementById("liveInfoContentC");
var infoAboutTitleC = document.getElementById("infoAboutTitleC");
var infoAboutContentC = document.getElementById("infoAboutContentC");

//INITIALIZE GLOBAL VARIABLES

//STARTING ACTIONS IN ADMIN HOME SITE
HomeStartScreen();

function HomeStartScreen() {
	StartingValuesOfElements();
	CreateTheLiveContent();
	CreateTheInfoContent();
}


//*(1)STARTING VALUES OF ALREADY EXISTING ELEMENTS
function StartingValuesOfElements() {
	liveInfoTitleC.innerHTML = "LIVE ΕΝΗΜΕΡΩΣΗ";
	infoAboutTitleC.innerHTML = "ΟΔΗΓΙΕΣ";
}


//*(2)CREATE THE LIVE INFO CONTENT ABOUT ROUTES
function CreateTheLiveContent() {

}


//*(3)CREATE THE INFO CONTENT ABOUT ADMIN
function CreateTheInfoContent() {
	PrototypeOfEachInfoPar("Εισαγωγή", 1, "Η σελίδα Admin, εχει ως σκοπό την εξυπερήτηση σημαντικών ενεργειών, για τα καταστήματα και τους υπαλλήλους, καθώς παρέχει ένα μέσω οργάνωσης και επικοινωνίας, όλων των καταστημάτων.");
	PrototypeOfEachInfoPar("LIVE ΕΝΗΜΕΡΩΣΗ", 2, "Εδώ υπάρχει άμεση ενημέρωση για τα δρομολόγια που είναι ενεργά αυτήν την στιγμή.");
	PrototypeOfEachInfoPar("Επικοινωνία", 3, "Σημαντικό κομμάτι, σε μια επιχείρηση τέτοιου τύπου(franchise), είναι η επικοινωνία μεταξύ των υπαλλήλων, αλλά και των υπεύθυνων, όλων των καταστημάτων. Για αυτό, πάνω δεξία υπάρχει η επιλογή της σύνταξης ενός νέου μηνύματος, καθώς και η άμεση ενημέρωση για τα εισερχόμενα και εξερχόμενα μηνύματα.");
	PrototypeOfEachInfoPar("Συγχρονισμός", 4, "Για να υπάρξει συχγρονισμός των αλλαγών, όταν τροποποιείται κάποιο στοιχείο, πρέπει να έχει προηγηθεί ενημέρωση του υπεύθυνου, του καταστήματος που σχετίζεται και επιβεβαίωση της ενέργειας απο αυτόν. Η αμέλεια, ενός τέτοιου σημαντικού παράγοντα, μπορεί να προκαλέσει πρόβλημα τόσο στην πλατφόρμα, όσο και στην λειτουργία ενός καταστήματος!");

}

//(3)->PROTOTYPE OF EACH PARAGRAPH
function PrototypeOfEachInfoPar(nameTitle, position, contentText) {
	var newContainerOfInfo = document.createElement("div");
	newContainerOfInfo.className = "newContainerOfInfo";

	var upperLine = document.createElement("div");
	upperLine.className = "upperLineOfInfo";
	newContainerOfInfo.appendChild(upperLine);

	var title = document.createElement("div");
	title.className = "titleOfInfo";
	title.innerHTML = nameTitle;
	newContainerOfInfo.appendChild(title);

	var content = document.createElement("div");
	content.className = "contentOfInfo";
	content.innerHTML = contentText;
	newContainerOfInfo.appendChild(content);


	var downLine = document.createElement("div");
	downLine.className = "downLineOfInfo";
	newContainerOfInfo.appendChild(downLine);

	infoAboutContentC.appendChild(newContainerOfInfo);

	if(position == "1") {
		newContainerOfInfo.style.marginTop = "10px";
	}
}