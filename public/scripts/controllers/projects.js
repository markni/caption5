app.controller('projectsCtrl', function ($scope, $route, $timeout, $http, $sce, $location, $routeParams, Project, Projects, Auth) {

	$scope.project_list = null;

	$scope.listProjects = function(){
		Projects.query(function(projects){

			$scope.project_list = projects;

		});

	};

	$scope.listProjects();


});
