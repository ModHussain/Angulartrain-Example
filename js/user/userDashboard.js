trafficApp.controller("userdashboardCtrl", function($scope, $http, factory,
		TrafficService, $stateParams) {

	$scope.$on('$viewContentLoaded', function() {
		$scope.View();
		$scope.user = {};
	})

	TrafficService.get(
			"http://localhost:8080/traffic/rest/report/getAllReports").then(
			function(data) {
				$scope.datails = data;

			}, function(err) {
				console.log(err);
			})

	$scope.View = function() {
		debugger;
		factory.imgView($stateParams.userId).then(function(data) {
			console.log($stateParams.userId);
			$scope.user = data.userImges;

			angular.forEach($scope.user, function(imag) {
				$scope.imgS = imag;
				console.log(imag.fileName);

			})
		}, function(err) {
			if (err) {
				$scope.errorMessage = err;
			}
		})
	}

});