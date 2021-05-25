
var prototypeBranchViewC;
var topBarC;
var midRightPartC;
var parentOfProto;

FindThisBranch();

function FindThisBranch() {
	prototypeBranchViewC = document.getElementsByClassName("prototypeBranchViewC")[countBranch];
	//parentOfProto = prototypeBranchViewC.parentElement;
	topBarC = prototypeBranchViewC.children[0];
	midRightPartC = prototypeBranchViewC.children[1].children[1];
	AddInfoTop();
	AddInfoMiddle();

	countBranch++;
}

function AddInfoTop() {
	//#typeBrViewC
	topBarC.children[0].innerHTML = branchArray[countBranch].getType();
	//#statusBrViewC
	StatusChooseIcon();
	//#uniqueIdBrViewC
	topBarC.children[2].innerHTML = "#" + branchArray[countBranch].getId();
	//#editBrViewBtn
	topBarC.children[3].addEventListener("click", EditInfoOfThisBranch);
}

function StatusChooseIcon() {
	if(branchArray[countBranch].getStatus() == "Active") {
		topBarC.children[1].style.backgroundImage = "url(../Assets/icons8_ok_30px.png)";
		topBarC.children[1].title = "Ενεργά";
	}
	else if(branchArray[countBranch].getStatus() == "Under_R") {
		topBarC.children[1].style.backgroundImage = "url(../Assets/icons8_construction_carpenter_ruler_30px.png)";
		topBarC.children[1].title = "Υπό-επισκευή";
	}
	else if(branchArray[countBranch].getStatus() == "Under_C") {
		topBarC.children[1].style.backgroundImage = "url(../Assets/icons8_construction_30px.png)";
		topBarC.children[1].title = "Υπο-κατασκευή";
	}
	else if(branchArray[countBranch].getStatus() == "Problem") {
		topBarC.children[1].style.backgroundImage = "url(../Assets/icons8_high_priority_30px_2.png)";
		topBarC.children[1].title = "Μη ενεργά";
	}
}

function EditInfoOfThisBranch() {

}

async function AddInfoMiddle() {
	//#locationBranchC
	midRightPartC.children[0].children[1].innerHTML = branchArray[countBranch].getLocation();
	//#streetBranchC
	midRightPartC.children[0].children[2].innerHTML = "(" + branchArray[countBranch].getStreet() + ")";
	//#managerNameC
	ManagerChooseIcon();
	midRightPartC.children[1].children[1].innerHTML = branchArray[countBranch].getManager();
	//#hiddenInfoManagerC
	var hiddenInfoManagerC = document.getElementsByClassName("hiddenInfoManagerC")[countBranch];
	var user = await FindUser(branchArray[countBranch].getManager());
	user.createId(hiddenInfoManagerC);
}

async function ManagerChooseIcon() {
	userManager = await branchArray[countBranch].findManagerInfo();
	PickImgForManager(userManager.getIcon());
}

async function FindUser(userToFind) {
	return(await branchArray[countBranch].findUserInfo(userToFind));
}

function PickImgForManager(info) {
	if(info == "male1") {
		midRightPartC.children[1].children[0].style.content = "url(../Assets/PersonType/icons8_male_no1_40px.png)";
	}
	else if(info == "male2") {
		midRightPartC.children[1].children[0].style.content = "url(../Assets/PersonType/icons8_male_no2_40px.png)";
	}
	else if(info == "male3") {
		midRightPartC.children[1].children[0].style.content = "url(../Assets/PersonType/icons8_male_no3_40px.png)";
	}
	else if(info == "male4") {
		midRightPartC.children[1].children[0].style.content = "url(../Assets/PersonType/icons8_male_no4_40px.png)";
	}
	else if(info == "male5") {
		midRightPartC.children[1].children[0].style.content = "url(../Assets/PersonType/icons8_male_no5_40px.png)";
	}
	else if(info == "female1") {
		midRightPartC.children[1].children[0].style.content = "url(../Assets/PersonType/icons8_female_no1_40px.png)";
	}
	else if(info == "female2") {
		midRightPartC.children[1].children[0].style.content = "url(../Assets/PersonType/icons8_female_no2_40px.png)";
	}
	else if(info == "female3") {
		midRightPartC.children[1].children[0].style.content = "url(../Assets/PersonType/icons8_female_no3_40px.png)";
	}
	else if(info == "female4") {
		midRightPartC.children[1].children[0].style.content = "url(../Assets/PersonType/icons8_female_no4_40px.png)";
	}
	else if(info == "female5") {
		midRightPartC.children[1].children[0].style.content = "url(../Assets/PersonType/icons8_female_no5_40px.png)";
	}

}