trafficApp.controller('RegCtr',function($scope,TrafficService,$http,$state,$timeout){
	$scope.registerForm=function(){
		var register = {
			name : $scope.e_mail,
			firstName : $scope.firstname,
			lastName : $scope.lastname,
			mobileNum : $scope.mobilenumber,
			password :$scope.pass,
			/*confirmPass :$scope.cpassword*/
		}
		var details = JSON.stringify(register);
		TrafficService.post("http://localhost:8080/traffic/rest/user/registration", details).then(function success(response){
			$scope.data = response;
			console.log($scope.data);
			alert("Data SuccessFully Sent.... !");
			$state.go("header.Registration");
		})
		
	}
	
	 
});
trafficApp.controller('RegCtr1',function($scope,TrafficService,$http,$state,$timeout){
	
	$scope.$on('$viewContentLoaded', function(event) {
	      $timeout(function() {
	    	  $scope.redirect();
	      })
			 
	$scope.redirect=function(){
		$http.get('http://localhost:8080/traffic/rest/user/allUsers').then(function(response){
		       $scope.details = response.data;
		       console.log($scope.details);
		     });
		$state.go("header.Registration");
	}
	
	 })
});