var app = angular.module('ameApp', ['ngRoute',
	'ngTouch', 'ngCookies','ngResource','ngSanitize','ngAnimate','chieffancypants.loadingBar']);

app.config(function ($routeProvider, $locationProvider, $httpProvider) {
	$locationProvider.html5Mode(true);    //no hash tag in URL



	$routeProvider
		.when('/', {
			templateUrl: '/views/home.html',
			controller: 'homeCtrl'
		})
		.when('/editor', {
			templateUrl: '/views/editor.html',
			controller: 'editorCtrl'
		})
		.when('/p/:projectId', {
			templateUrl: '/views/editor.html',
			controller: 'editorCtrl'
		})
		.when('/login', {
			templateUrl: '/views/login.html',
			controller: 'loginCtrl'
		})
		.when('/signup', {
			templateUrl: '/views/signup.html',
			controller: 'signupCtrl'
		})
		.when('/settings', {
			templateUrl: '/views/settings.html',
			controller: 'settingsCtrl',
			authenticate: true
		})

		.when('/projects', {
			templateUrl: '/views/projects.html',
			controller: 'projectsCtrl',
			authenticate: true
		})


		.otherwise({
			redirectTo: '/'
		});

	$locationProvider.html5Mode(true);

	//Intercept 401s and 403s and redirect you to login
	$httpProvider.interceptors.push(['$q', '$location', function ($q, $location) {
		return {
			'responseError': function (response) {
				if (response.status === 401 || response.status === 403) {
					$location.path('/login');
					return $q.reject(response);
				}
				else {
					return $q.reject(response);
				}
			}
		};
	}]);

}).run(function ($rootScope, $location, Auth) {


		//Redirect to login if route requires auth and you're not logged in
		$rootScope.$on('$routeChangeStart', function (event, next) {


			if (next.authenticate && !Auth.isLoggedIn()) {
				$location.path('/login');
			}
		});

	});






