//INITIALIZE VARIABLES FROM ELEMENTS
var menuC = document.getElementById("menuC");
var menuBtnC = document.getElementById("menuBtnC");
var menuSymbolC = document.getElementById("menuSymbolC");
var menuDownImgC = document.getElementById("menuDownImgC");
var usernameC = document.getElementById("usernameC");

//FIXING POSITION OF MENU BUTTON DIV IN MENU CONTAINER
menuC.style.marginTop = "-" + menuBtnC.offsetHeight + "px";

//FIXING POSITION OF LAST ELEMENT IN MENU CONTAINER
var heightHelper = menuSymbolC.offsetHeight + menuC.offsetHeight;
menuDownImgC.style.height = "calc(100% - " + heightHelper + "px)";
