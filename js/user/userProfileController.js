trafficApp.controller('userPCtrl',['$scope','$state','$stateParams','factory',function($scope,$state,$stateParams,factory){
	
	
$scope.$on('$viewContentLoaded',function(){
		$scope.sendDetails();
		$scope.userObject = {};
		})

	$scope.sendDetails = function(){
		debugger;
		factory.userPedit($stateParams.getid).then(function(data){
			$scope.userD = data; 
			console.log($scope.userD);
		/*console.log($scope.user);
		console.log($scope.user.id);*/
			},function(err){
				if(err){
					$scope.errorMessage = err;
				}
			})
		}

	$scope.putData = function(){
		debugger;
		factory.putUserdata($stateParams.getid,$scope.userD).then(function(data){
			$scope.dddd=data;
			console.log($scope.dddd);
			alert("Data Edited Successfully");
		},function(err){
			if(err){
				$scope.errorMessage = err;
			}else{
				$scope.errorMessage = err;
			}
		})
	}
	
}]);