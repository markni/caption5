app.controller('navbarCtrl', function ($scope, $location, Auth) {
		$scope.menu = [{
			'title': 'HOME',
			'link': '/',
			'public': true
		}, {
			'title': 'SETTINGS',
			'link': '/settings',
			'public': false
		}];

		$scope.logout = function() {
			Auth.logout()
				.then(function() {
					$location.path('/login');
				});
		};

		$scope.isActive = function(route) {
			return route === $location.path();
		};
	});
