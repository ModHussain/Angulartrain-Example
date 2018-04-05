trafficApp.controller('userHCtrl',['$scope','$state','factory',function($scope,$state,$stateParams,factory){
	$scope.$on('$viewContentLoaded',function(){
		})
		$scope.getid1 = localStorage.getItem('uId');
		console.log("Profile Id")
		console.log($scope.getid1);
}
]);