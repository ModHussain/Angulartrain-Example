trafficApp.factory('factory',['$http','$q',function($http,$q,$scope){

	return{
		//post API for report issue
		postreport:function(formData){
				var deferred =$q.defer();
				var img = {
						transformRequest: angular.identity,
				        headers: {'Content-Type': undefined}
				}
				$http.post('http://localhost:8080/traffic/rest/report/addReport',formData,img).success(function(response){
					deferred.resolve(response);
				}).error(function(err){
					deferred.reject(err);
				})
				return deferred.promise;
			},
	
			userPedit:function(id){
				var deferred = $q.defer();
				$http.get("http://localhost:8080/traffic/rest/user/getUserByPrimeryKey/" + id).success(function(response){
					deferred.resolve(response);
				}).error(function(err){
					deferred.reject(err);
				})
				return deferred.promise;
		},
			putUserdata:function(id,putdata){
				var deferred = $q.defer();
				$http.put("http://localhost:8080/traffic/rest/user/updateUser/"  + id,putdata).success(function(response){
					deferred.resolve(response);
				}).error(function(err){
					deferred.reject(err);
				})
				return deferred.promise;
			},
		
		imgView:function(userId){
			var deferred = $q.defer();
			console.log(userId);
			$http.get("http://localhost:8080/traffic/rest/report/getReportById/"+userId).success(function(response){
				deferred.resolve(response);	
			}).error(function(err){
				deferred.reject(err);
			})
			return deferred.promise;
			}
	
	}
}]);