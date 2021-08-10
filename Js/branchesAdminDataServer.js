
//INITIALIZE VARIABLES FOR STYLING 
var listOfBranchesBtn = document.getElementById("listOfBranchesBtn");
var newBranchBtn = document.getElementById("newBranchBtn");
var currentAction = "Start";
var lastAction = "none";
//BRANCHES ARRAY
var branchArray = [];
//ARRAY TO CHECK IF BRANCHES INFO ARE IN OPENED OR CLOSED SITUATION
var branchSituationArray = [];

listOfBranchesBtn.addEventListener("click", StartBranchScreen);
newBranchBtn.addEventListener("click", NewBranchBtnListener);

//MAIN FUNCTION
ServerBranch();

//*(1)START OF BRANCHES SERVER
async function ServerBranch() {
  var branchHelperArray = await GetAllBranches();
  ConvertBranchArrayToBranchObjArray(branchHelperArray);
  StartBranchScreen();
}

//(1)->
function GetAllBranches() {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'POST',
      url: "../Php/getBranchesPhp.php",
      data: {},
      success: function(data) {
        //alert(data);
        array = JSON.parse(data);
        resolve(array);
      }
    });
  });
}

//(1)->
function ConvertBranchArrayToBranchObjArray(array) {
  for(var i = 0; i < array.length; i++) {
    branchArray.push(new Branch(array[i].id, array[i].type, array[i].street, array[i].location, array[i].image, array[i].manager, array[i].storeId, array[i].status, array[i].adminControl));
    branchSituationArray.push(0);
  }
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