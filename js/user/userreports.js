trafficApp.controller('ReportCntrl',['$scope','factory','$state',function($scope,factory,$state){
	
	
	$scope.offencelist=["Irregular Parking","Wrong Side Driving","Tripple Riding","Without Helmet","Cellphone Driving","Hit and Run by Vehicle"];
	$scope.typeofvehicle=["Two Wheeler","Three Wheeler","Four Wheeler","Heavy vehicle"];
	
	$scope.postrprt = function(){
		
		console.log($scope.ReportData);
		
		var formData = new FormData();
		var params = $scope.ReportData;
		$.each(params, function(k, v) {
		formData.append(k, v);
		console.log(formData);
		});
		console.log(formData);
		factory.postreport(formData).then(function(data){
			$scope.Rdata = data;
			console.log($scope.Rdata);
			$state.go('header.Dashboard');
			
		})
	}
}
]);