
var prototypeBranchViewC;
var topPartC;
var midPartC;
var midRightPartC;
var bottomPartC;

FindThisBranch();

function FindThisBranch() {
	prototypeBranchViewC = document.getElementsByClassName("prototypeBranchViewC")[countBranch];
	topPartC = prototypeBranchViewC.children[0];
	midPartC = prototypeBranchViewC.children[1];
	midRightPartC = prototypeBranchViewC.children[1].children[1];
	bottomPartC = prototypeBranchViewC.children[2];
	AddInfoTop();
	AddInfoMiddle();
	AddInfoBottom();

	countBranch++;
}

function AddInfoTop() {
	var id = prototypeBranchViewC.parentElement.id.match(/\d+/)[0];
	
	//#typeBrViewC
	topPartC.children[0].innerHTML = branchArray[countBranch].getType();
	//#statusBrViewC
	StatusChooseIcon();
	//#uniqueIdBrViewC
	topPartC.children[2].innerHTML = "#" + branchArray[countBranch].getId();
	//#editBrViewBtn
	topPartC.children[3].addEventListener("click", function() {EditInfoOfThisBranch(id, document.getElementsByClassName("prototypeBranchViewC")[id]);});
}

function StatusChooseIcon() {
	if(branchArray[countBranch].getStatus() == "Active") {
		topPartC.children[1].style.backgroundImage = "url(../Assets/icons8_ok_30px.png)";
		topPartC.children[1].title = "Ενεργά";
	}
	else if(branchArray[countBranch].getStatus() == "Under_R") {
		topPartC.children[1].style.backgroundImage = "url(../Assets/icons8_construction_carpenter_ruler_30px.png)";
		topPartC.children[1].title = "Υπό-επισκευή";
	}
	else if(branchArray[countBranch].getStatus() == "Under_C") {
		topPartC.children[1].style.backgroundImage = "url(../Assets/icons8_construction_30px.png)";
		topPartC.children[1].title = "Υπο-κατασκευή";
	}
	else if(branchArray[countBranch].getStatus() == "Problem") {
		topPartC.children[1].style.backgroundImage = "url(../Assets/icons8_high_priority_30px_2.png)";
		topPartC.children[1].title = "Μη ενεργά";
	}
}

function EditInfoOfThisBranch(id, element) {
	var topC = element.children[0];
	var midC = element.children[1];
	var bottomUpDownC = element.children[2];

	//WAITING TO OPEN
	if(!branchSituationArray[id]) {
	}
}

async function AddInfoMiddle() {
	var id = prototypeBranchViewC.parentElement.id.match(/\d+/)[0];

	//#imageBranchC
	midPartC.children[0].children[0].style.content = "url(../Assets/BranchesImages/" + branchArray[id].getImageSrc() + ")";
	//#locationBranchC
	midRightPartC.children[0].children[1].innerHTML = branchArray[id].getLocation();
	//#streetBranchC
	midRightPartC.children[0].children[2].innerHTML = "(" + branchArray[id].getStreet() + ")";
	//#hiddenInfoManagerC
	var hiddenInfoManagerC = document.getElementsByClassName("hiddenInfoManagerC")[id];
	//#managerNameC
	var manager = await FindUser(branchArray[id].getManager());
	manager.createId("name", hiddenInfoManagerC, midRightPartC.children[1]);
	midRightPartC.children[1].children[1].innerHTML = manager.getName();
	ManagerChooseIcon(manager);
}

async function ManagerChooseIcon(manager) {
	var id = prototypeBranchViewC.parentElement.id.match(/\d+/)[0];
	midRightPartC.children[1].children[0].style.content = "url(../Assets/PersonType/" + manager.getUserImageSrc() + ")";
}

async function FindUser(userToFind) {
	var id = prototypeBranchViewC.parentElement.id.match(/\d+/)[0];
	return (await branchArray[id].findUserInfo(userToFind));
}

function AddInfoBottom() {
	var id = prototypeBranchViewC.parentElement.id.match(/\d+/)[0];
	//#branchInfoBtn
	bottomPartC.children[0].children[0].innerHTML = "Πληροφορίες για το κατάστημα: " + branchArray[id].getLocation();
	bottomPartC.children[0].children[0].addEventListener("click", function() {OpenBranchInfo(id, document.getElementsByClassName("prototypeBranchViewC")[id]);});
}

function OpenBranchInfo(id, element) {
	var topC = element.children[0];
	var midC = element.children[1];
	var bottomUpDownC = element.children[2];

	//WAITING TO OPEN
	if(!branchSituationArray[id]) {
		bottomUpDownC.children[0].style.top = "-" + midC.offsetHeight + "px";
		bottomUpDownC.children[0].style.height = midC.offsetHeight + bottomUpDownC.offsetHeight + "px";
		bottomUpDownC.children[0].children[0].style.borderRadius = "2px";
	}
	//WAITING TO CLOSE
	else {
		bottomUpDownC.children[0].style.top = "10px";
		bottomUpDownC.children[0].children[0].style.borderRadius = "2px 2p 0px 0px";
	}

	//DISABLE BUTTONS WHEN BRANCH INFO IS ON MOVE
	bottomUpDownC.children[0].children[0].disabled = true;
	bottomUpDownC.children[0].children[0].style.opacity = "0.3";
	bottomUpDownC.children[0].children[0].style.cursor = "auto";
	topC.children[3].disabled = true;
	topC.children[3].style.opacity = "0.3";
	topC.children[3].style.cursor = "auto";
	setTimeout(function() {
		bottomUpDownC.children[0].children[0].disabled = false;
		bottomUpDownC.children[0].children[0].focus();
		bottomUpDownC.children[0].children[0].style.opacity = "1";
		bottomUpDownC.children[0].children[0].style.cursor = "pointer";
		topC.children[3].disabled = false;
		topC.children[3].style.opacity = "1";
	topC.children[3].style.cursor = "pointer";
	}, 1000);

	console.log(id + "    " + branchSituationArray[id])

	if(branchSituationArray[id]) {
		branchSituationArray[id] = 0;
	}
	else {
		branchSituationArray[id] = 1;
	}
}