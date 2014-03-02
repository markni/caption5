app.controller('projectsCtrl', function ($scope, $route, $timeout, $http, $sce, $location, $routeParams, Project, Projects, Auth) {

	$scope.project_list = [];

	$scope.listProjects = function(){
		Projects.query(function(projects){

			$scope.project_list = projects;

		});

	};

	$scope.editProject =function(project){
		$location.path('/p/'+project._id);
	}

	$scope.createProject = function(){
		$location.path('/');
	}

	$scope.removeProject = function(event,project,index){
		event.stopPropagation();
		console.log(project._id);;
		Project.remove({ id:project._id },function(){
			$scope.project_list.splice(index, 1);
		});

	}

	$scope.formatCreated = function(created){
		var d = new Date(created);
		return d.toLocaleDateString();

	}

	$scope.getProjectTypeIcon = function(remote){
		if (remote){
			return 'icon-link';
		}
		else {
			return 'icon-film'
		}
	}


	$scope.listProjects();


});
