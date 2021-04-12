var menuSymbolC = document.getElementById("menuSymbolC");
var menuC = document.getElementById("menuC");
var heightHelper = menuSymbolC.offsetHeight + menuC.offsetHeight;
document.getElementById("menuDownImgC").style.height = "calc(100% - " + heightHelper + "px)"; 