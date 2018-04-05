trafficApp.controller('imageuploadingCtrl',['$scope','TrafficService','$state','$rootScope',function($scope,TrafficService,$state,$rootScope){
	   
	   

	  /*$scope.imageUploadFunc = function(event){

	 
	var preview = document.getElementById('controller');  
	 var file    = document.querySelector('input[type=file]').files[0];
	  var reader  = new FileReader();

	  

	  if (file) {
	  
	    reader.readAsDataURL(file);
	   
	  }
	  
	  reader.addEventListener("load", function () {
	  
	    preview.src = reader.result;
	    $rootScope.$broadcast('event',  preview.src)
	  }, false);
	     
	  }  */
	
	    $scope.stepsModel = [];

	    $scope.imageUpload = function(event){
	         var files1 = event.target.files; 
	  //FileList object
	  $scope.ReportData.userImges= files1;
	         console.log($scope.ReportData.userImges);
	         for (var i = 0; i < files1.length; i++) {
	             var file = files1[i];
	                 var reader = new FileReader();
	                 reader.onload = $scope.imageIsLoaded; 
	                 reader.readAsDataURL(file);
	         }
	    }

	    $scope.imageIsLoaded = function(e){
	        $scope.$apply(function() {
	            $scope.stepsModel.push(e.target.result);
	        });
	    }
	}]);