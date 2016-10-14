require(__dirName +'./library/angular.min.js')

var app = angular.module("myShoppingList", []);
app.controller("myCtrl", function($scrope){
	$scope.products = ["Milk","Bread", "Cheese"];
	$scope.addItem = function() {
		$scope.products.push($scope.addMe);
	}
});

