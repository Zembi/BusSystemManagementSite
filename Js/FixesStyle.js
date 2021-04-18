//INITIALIZE VARIABLES FROM ELEMENTS
var leftC = document.getElementById("leftC");
var leftFixedC = document.getElementById("leftFixedC");
var menuC = document.getElementById("menuC");
var menuBtnC = document.getElementById("menuBtnC");
var menuSymbolC = document.getElementById("menuSymbolC");
var menuDownImgC = document.getElementById("menuDownImgC");
var rightC = document.getElementById("rightC");
var headerC = document.getElementById("headerC");
var headerImg = document.getElementById("headerImg");
var profileInfoC = document.getElementById("profileInfoC");
var usernameC = document.getElementById("usernameC");
var contentC = document.getElementById("contentC");

//FIXING RIGHTC WIDTH
leftC.style.width = "0px";
leftFixedC.style.width = "0px";
rightC.style.width = "calc(100% - " + leftC.style.width + ")";


//FIXING POSITION OF MENU BUTTON DIV IN MENU CONTAINER
menuC.style.marginTop = "-" + menuBtnC.offsetHeight + "px";

//FIXING POSITION OF LAST ELEMENT IN MENU CONTAINER
var heightHelper = menuSymbolC.offsetHeight + menuC.offsetHeight;
menuDownImgC.style.height = "calc(100% - " + heightHelper + "px)";