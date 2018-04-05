 trafficApp.controller('notificationCtrl',function($scope,$http){

      $http.get('https://api.myjson.com/bins/1f87f5').then(function(response){
        $scope.details = response.data;
        console.log($scope.details);
       
      });
  });