
//INITIALIZE VARIABLES FOR STYLING 
var branchesHeaderCountC = document.getElementById("branchesHeaderCountC");
var newBranchBtn = document.getElementById("newBranchBtn");
var firebaseTypeCall = "init";

newBranchBtn.addEventListener("click", NewBranchBtnListener);

function NewBranchBtnListener() {
	firebaseTypeCall = "newBtn";
	ConfigFirebaseBranch();
}