trafficApp.controller("LoginController", function($scope,$rootScope, $cookieStore,$state,UserService) {

    $scope.rememberMe = false;

    $scope.login = function () {
    	debugger;
        UserService.authenticate($.param({
            username: $scope.username,
            password: $scope.password
        }), function (authenticationResult) {
            var accessToken = authenticationResult.token;
            $rootScope.accessToken = accessToken;
            if ($scope.rememberMe) {
                $cookieStore.put('accessToken', accessToken);
            }
            UserService.get(function (user) {
                $rootScope.user = user;
                /*console.log(user);
                console.log(user.name);
                console.log(authenticationResult.user);*/
                $scope.userObject = authenticationResult.user;	
                console.log($scope.userObject);
                console.log('Userid Printed');
                console.log($scope.userObject.id);
                console.log($scope.userObject.roles)
                var uId = $scope.userObject.id;
                console.log('UID');
                console.log(uId);
                localStorage.setItem('uId', $scope.userObject.id);
                $state.go('header.Dashboard');  
            });
        });
    }
})