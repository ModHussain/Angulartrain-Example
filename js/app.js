var trafficApp = angular.module('exampleApp', ['ui.router', 'ngCookies','trafficApp.services'])
 
trafficApp.run(function ($rootScope, $location, $cookieStore, UserService) {

    /* Reset error when a new view is loaded */
    $rootScope.$on('$viewContentLoaded', function () {
        delete $rootScope.error;
    });

    $rootScope.hasRole = function (role) {

        if ($rootScope.user === undefined) {
            return false;
        }

        if ($rootScope.user.roles[role] === undefined) {
            return false;
        }

        return $rootScope.user.roles[role];
    };

    $rootScope.logout = function () {
        delete $rootScope.user;
        delete $rootScope.accessToken;
        $cookieStore.remove('accessToken');
        localStorage.clear();
        $location.path("/login");
    };

    /* Try getting valid user from cookie or go to login page */
    var originalPath = $location.path();
    $location.path("/login");
    var accessToken = $cookieStore.get('accessToken');
    if (accessToken !== undefined) {
        $rootScope.accessToken = accessToken;
        UserService.get(function (user) {
            $rootScope.user = user;
            $location.path(originalPath);
        });
    }

    $rootScope.initialized = true;
});

function IndexController($scope, BlogPostService) {

    $scope.blogPosts = BlogPostService.query();

    $scope.deletePost = function (blogPost) {
        blogPost.$remove(function () {
            $scope.blogPosts = BlogPostService.query();
        });
    };
}

function EditController($scope, $routeParams, $location, BlogPostService) {

    $scope.blogPost = BlogPostService.get({id: $routeParams.id});

    $scope.save = function () {
        $scope.blogPost.$save(function () {
            $location.path('/');
        });
    };
}

function CreateController($scope, $location, BlogPostService) {

    $scope.blogPost = new BlogPostService();

    $scope.save = function () {
        $scope.blogPost.$save(function () {
            $location.path('/');
        });
    };
}


var services = angular.module('trafficApp.services', ['ngResource']);

services.factory('UserService', function ($resource) {

    return $resource('rest/user/:action', {},
        {
            authenticate: {
                method: 'POST',
                params: {'action': 'authenticate'},
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }
        }
    );
});

services.factory('BlogPostService', function ($resource) {

    return $resource('rest/blogposts/:id', {id: '@id'});
});
