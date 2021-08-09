
//INITIALIZE VARIABLES FOR STYLING 
var listOfBranchesBtn = document.getElementById("listOfBranchesBtn");
var newBranchBtn = document.getElementById("newBranchBtn");
var currentAction = "Start";
var lastAction = "none";

listOfBranchesBtn.addEventListener("click", StartBranchScreen);
newBranchBtn.addEventListener("click", NewBranchBtnListener);

//MAIN FUNCTION
ServerBranch();

//*(1)START OF BRANCHES SERVER
function ServerBranch() {
  StartBranchScreen();
}


//(1)->IF BRANCHES SHOWVIEW BUTTON IS PRESSED, LOAD ShowBranches.html AND HIDE THE BUTTON
function StartBranchScreen() {
  if((sessionStorage.getItem("Load") != "On") && (lastAction != "Start")) {
    //ChangeScreen("ShowBranches");
    ChangeScreen("ShowBranches");
    currentAction = "Start";
    listOfBranchesBtn.style.display = "none";
    newBranchBtn.style.display = "block";
  }
  lastAction = currentAction;
}

//(1)->IF CREATE A NEW BRANCH BUTTON IS PRESSED, LOAD CreateNewBranch.html AND HIDE THE BUTTON
function NewBranchBtnListener() {
  if((sessionStorage.getItem("Load") != "On") && (lastAction != "NewBranch")) {
    ChangeScreen("CreateNewBranch");
    currentAction = "NewBranch";
    listOfBranchesBtn.style.display = "block";
    newBranchBtn.style.display = "none";
  }
  lastAction = currentAction;
}

//(1)->FUNCTION THAT IS BEING CALLED WHEN BUTTON IS PRESSED, TO CHANGE BRANCHES CONTENT SCREEN
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