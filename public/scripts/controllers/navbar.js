app.controller('navbarCtrl', function ($scope, $location, Auth) {
	$scope.dropDownOpen = false;

	$scope.menu = [
		{
			'title': 'HOME',
			'link': '/',
			'public': true
		},
		{
			'title': 'PROJECTS',
			'link': '/projects',
			'public': false
		}
	];

	$scope.logout = function () {
		Auth.logout()
			.then(function () {
				$location.path('/login');
			});
	};

	$scope.isActive = function (route) {
		return route === $location.path();
	};

	$scope.toggleDropDown = function () {
		$scope.dropDownOpen = !$scope.dropDownOpen;
	}



});
