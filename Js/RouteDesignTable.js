function RouteDesignTable(routeArr) {
	this.routeArr = routeArr;

	this.desginTableWithDays = function(container) {
		var designRouteC = document.createElement("div");
		designRouteC.id = "designRouteC";
		container.appendChild(designRouteC);

			var designRouteTitleC = document.createElement("div");
			designRouteTitleC.id = "designRouteTitleC";
			designRouteC.appendChild(designRouteTitleC);

				var designRouteHelperBtnC = document.createElement("div");
				designRouteHelperBtnC.id = "designRouteHelperBtnC";
				designRouteTitleC.appendChild(designRouteHelperBtnC);

				var designRouteFromC = document.createElement("div");
				designRouteFromC.id = "designRouteFromC";
				designRouteTitleC.appendChild(designRouteFromC);

				var designRouteImgC = document.createElement("div");
				designRouteImgC.id = "designRouteImgC";
				designRouteTitleC.appendChild(designRouteImgC);

				var designRouteToC = document.createElement("div");
				designRouteToC.id = "designRouteToC";
				designRouteTitleC.appendChild(designRouteToC);

				var designRouteDurationC = document.createElement("div");
				designRouteDurationC.id = "designRouteDurationC";
				designRouteTitleC.appendChild(designRouteDurationC);

				var designRouteBusStatusHelperC = document.createElement("div");
				designRouteBusStatusHelperC.id = "designRouteBusStatusHelperC";
				designRouteTitleC.appendChild(designRouteBusStatusHelperC);
	}

	this.desginTableWithDates = function(container) {
		//var designTitleRouteC = document.createElement("div");
	}
}