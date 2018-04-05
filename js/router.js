trafficApp.config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider){
	$urlRouterProvider.otherwise("/")
	$stateProvider
	.state('/', {
		url: "/",
		templateUrl: "partials/login.html",
		controller:'LoginController'
	})

	   /*user routing*/
	.state('header', {
			resolve:{
			'check':function($location,$rootScope){
			if(!$rootScope.loggedIn){
			$location.path('/');
					}
				}
			},
			url: "/header",
			templateUrl: "partials/user/userheader.html",
			controller:'userHCtrl'
			})
	.state('header.Dashboard', {
		url: "/Dashboard",
		templateUrl: "partials/user/userDashboard.html",
		controller:'userdashboardCtrl'
	})
	.state('header.imgView', {
		url: "/viewDetails/:userId",
		templateUrl: "partials/user/userImgview.html",
		controller:"userdashboardCtrl"
	})
	.state('header.Notification', {
		url: "/Notification",
		templateUrl: "partials/user/usernotification.html",
		controller:'notificationCtrl'
	})
	.state('header.userStatic', {
		url: "/userStatic/:getid",
		templateUrl: "partials/user/userProfileStatic.html",
		controller:"userPCtrl"
	})
	.state('header.userProfile',{
		url:"/userProfile/:getid",
		templateUrl: "partials/user/userProfileEdit.html",
		controller:"userPCtrl"
	})
	.state('header.Report', {
		url: "/Report",
		templateUrl: "partials/user/userreport.html",
		controller:"ReportCntrl"
	})
	.state('header.Registration', {
			url: "/Registration",
			templateUrl: "partials/user/userregistration.html",
			controller:"RegCtr1"
	})
	.state('header.RegNew', {
			url: "/RegNew",
			templateUrl: "partials/user/userreg.html",
			controller:"RegCtr"
	})

	      /*user-routing end*/

       /*admin routing*/
	.state('admin_header', {
		 resolve:{
		 	'check':function($location,$rootScope){
		 		if(!$rootScope.loggedIn){
		 			$location.path('/');
		 		}
		 	}
		 },
		url: "/admin_header",
		templateUrl: "admin/admin_header.html",
		//controller:'notificationCtrl'
	})
	.state('admin_header.dashboard', {
		url: "/admin_dashboard",
		templateUrl: "admin/admin_dashboard.html",
		controller:'user_dashboardCtrl'
	})
	.state('admin_header.adminApprovals', {
		url: "/admin_Approvals",
		templateUrl: "admin/admin_aprovals.html",
		controller:'admin_ApprovalsCtrl'
	})
	.state('admin_header.govtApprovals', {
		url: "/govt_Approvals",
		templateUrl: "admin/admin_govtaprovals.html",
		controller:'govt_ApprovalsCtrl'
	})
	.state('admin_header.Notification', {
		url: "/Notification",
		templateUrl: "admin/admin_notification.html",
		controller:'admin_NotificationCtrl'
	})
	

     /*admin routing end*/
$httpProvider.interceptors.push(function ($q, $rootScope, $location) {
    return {
        'responseError': function (rejection) {
            var status = rejection.status;
            var config = rejection.config;
            var method = config.method;
            var url = config.url;

            if (status == 401) {
                $location.path("/login");
            } else {
                $rootScope.error = method + " on " + url + " failed with status " + status;
            }

            return $q.reject(rejection);
        }
    };
}
);

/* Registers auth token interceptor, auth token is either passed by header or by query parameter
* as soon as there is an authenticated user */
$httpProvider.interceptors.push(function ($q, $rootScope, $location) {
    return {
        'request': function (config) {
            var isRestCall = config.url.indexOf('rest') == 0;
            if (isRestCall && angular.isDefined($rootScope.accessToken)) {
                var accessToken = $rootScope.accessToken;
                if (exampleAppConfig.useAccessTokenHeader) {
                    config.headers['X-Access-Token'] = accessToken;
                } else {
                    config.url = config.url + "?token=" + accessToken;
                }
            }
            return config || $q.when(config);
        }
    };
}
);

})

