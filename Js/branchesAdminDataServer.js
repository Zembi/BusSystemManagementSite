
//INITIALIZE VARIABLES FOR STYLING 
var listOfBranchesBtn = document.getElementById("listOfBranchesBtn");
var newBranchBtn = document.getElementById("newBranchBtn");
var currentAction = "Start";
var lastAction = "none";

listOfBranchesBtn.addEventListener("click", StartBranchScreen);
newBranchBtn.addEventListener("click", NewBranchBtnListener);

ServerBranch();

function ServerBranch() {
  StartBranchScreen();
}

function StartBranchScreen() {

  if((sessionStorage.getItem("Load") != "On") && (lastAction != "Start")) {
    ChangeScreen("ShowBranches");
    currentAction = "Start";
    listOfBranchesBtn.style.display = "none";
    newBranchBtn.style.display = "block";
  }
  lastAction = currentAction;
}

function NewBranchBtnListener() {

  if((sessionStorage.getItem("Load") != "On") && (lastAction != "NewBranch")) {
    ChangeScreen("CreateNewBranch");
    currentAction = "NewBranch";
    listOfBranchesBtn.style.display = "block";
    newBranchBtn.style.display = "none";
  }
  lastAction = currentAction;
}

function ChangeScreen(action) {
	//FILE CALL
	var file = "BranchesScreens/" + action + ".html";

  $(function(){
    $("#branchContentC").load(file, function(response, status, xhr) {
        if(status == "error") {
          alert("Error: " + xhr.status + " " + xhr.statusText);
        }
    })
  });
}