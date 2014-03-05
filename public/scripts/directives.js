app.directive('mongooseError', function () {
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function (scope, element, attrs, ngModel) {
			element.on('keydown', function () {
				return ngModel.$setValidity('mongoose', true);
			});
		}
	};
});

app.directive('onKeypress', function ($parse) {
	return function (scope, elm, attrs) {
		//Evaluate the variable that was passed
		//In this case we're just passing a variable that points
		//to a function we'll call each keyup
		var keypressFn = $parse(attrs.onKeypress);
		elm.bind('keypress', function (evt) {
			//$apply makes sure that angular knows
			//we're changing something
			//scope.$apply(function() {
			keypressFn(scope, {
				$event: evt
			});
			//});
		});
	};
});

app.directive("dropZone", function () {
	return function (scope, elm) {

		elm.bind('dragover', scope.onDragOver);

		elm.bind('dragenter', scope.onDragbegin);

		elm.bind('dragleave', scope.onDragLeave);

		elm.bind('drop', scope.onDrop);

	}

});

app.directive('videoSelector', function () {
	return function (scope, elm) {
		elm.bind('change', scope.onVideoSelected);
	}

});

app.directive('subSelector', function () {
	return function (scope, elm) {
		elm.bind('change', scope.onSubSelected);
	}

});

/*
 * Get notified when height changes and change margin-top
 */
app.directive('emHeightTarget', function ($window) {
	return {
		link: function (scope, elem, attrs) {



			scope.$watch('vHeight', function (newHeight, oldHeight) {
				if (!scope.project_youtube)   {
					elem.attr('style', 'height: ' + (newHeight) + 'px');
				}
			});

			scope.$watch('leftColWidth', function (newHeight, oldHeight) {
				if (scope.project_youtube)   {
					elem.attr('style', 'height: ' + (scope.leftColWidth*9/16) + 'px');
				}
			});

			// Set on resize
			angular.element($window).bind('resize', function () {
				//force apply&digest when window resize
				scope.$apply();
			});
		}
	}
});

/*
 * Checks every $digest for height changes
 */
app.directive('emHeightSource', function ($timeout) {

	return {
		link: function (scope, elem, attrs) {

			scope.$watch(function () {

				scope.vHeight = elem[0].offsetHeight;

			});
		}
	}

} );

app.directive('emWidthSource', function ($timeout) {

	return {
		link: function (scope, elem, attrs) {

			scope.$watch(function () {
				scope.leftColWidth = elem[0].offsetWidth - 30;
			});
		}
	}

} );


/*
 * simple video player directive
 */
app.directive('videoPlayer', function ($timeout) {

	return {

		link: function (scope, elm, attrs) {

			elm.bind('timeupdate', scope.onTimeUpdate);
			elm.bind('pause', scope.onPause);
			elm.bind('play', scope.onPlay);
			elm.bind('volumechange', scope.onVolumeChange);

		}
	}


} );


/*
 * auto resize video controls
 */

app.directive('videoControl',function($window){
	return {

		scope: {
			controlWidth: "=vcWidth",
			videoWidth: "=vWidth",
			fixedWidth: "=fixedPartsWidth"
		},
		controller: function($scope,$element) {
			$scope.$watch('videoWidth', function (newWidth, oldWidth) {
				$element.attr('style', 'width: ' + ((newWidth-$scope.fixedWidth) * $scope.controlWidth - 1) + 'px');

			});
		}


	}

});

app.directive('youtubePlayer',function($window,$interval){
	return{


		scope: {
			videoWidth: "=leftColWidth",
			youtubeUrl:"=youtubeUrl",
			youtubePaused:"=youtubePaused",
			youtubeVolume:"=youtubeVolume",
			youtubeDuration:"=youtubeDuration",
			youtubeCurrentTime:"=youtubeCurrentTime"
		},


		controller:function($scope,$element){


			function updatePlayerInfo() {
				// Also check that at least one function exists since when IE unloads the
				// page, it will destroy the SWF before clearing the interval.


				if($element[0] && $element[0].getDuration) {
					$scope.youtubeDuration = parseInt($element[0].getDuration());
				}

				if ( $element[0].getCurrentTime && typeof $element[0].getCurrentTime() == "number"){
					$scope.youtubeCurrentTime = $element[0].getCurrentTime();
					$scope.$emit('timeupdate');
				}


			}

			function _run() {
				$element[0].width =  $scope.videoWidth;
				$element[0].height =  $scope.videoWidth*9/16;
			}


			$window.onYouTubePlayerReady = function(playerId) {


				if($scope.youtubeUrl && $scope.extractYoutubeId($scope.youtubeUrl)){
					$scope.youtubeId =$scope.extractYoutubeId($scope.youtubeUrl);


					$element[0].loadVideoById($scope.youtubeId);
					if ($scope.youtubePaused){
						$element[0].pauseVideo();
					}


					$interval(function(){

						updatePlayerInfo();


					},250);
				}


			};



			$scope.extractYoutubeId = function(url){
				url = url.toString();
				var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
				var match = url.match(regExp);
				if (match&&match[7].length==11){
					return match[7];
				}else{
					return null;
				}

			};

			if (google){
				google.setOnLoadCallback(_run);
			}



		},
		link:function (scope, element, attrs){

			scope.$watch('youtubeVolume',function(newV,oldV){

				if (typeof newV == "number" && element[0].setVolume){
					var v = parseInt(newV*100);

					element[0].setVolume(v);
				}



			});

			scope.$watch('youtubePaused',function(newState,oldState){

				if (element[0].pauseVideo && element[0].playVideo )  {
					if (newState){
						element[0].pauseVideo();
					}
					else{
						element[0].playVideo();
					}
				}


			});

			scope.$watch('youtubeUrl',function(newUrl,oldUrl){
				if (newUrl) {
					var newId = scope.extractYoutubeId(newUrl);
					if(newId && element[0].loadVideoById){
						element[0].loadVideoById(newId);
					}
				}
			});

			scope.$watch('videoWidth', function (newWidth, oldWidth) {

				if (element[0]){
					element[0].width =   scope.videoWidth;
					element[0].height = scope.videoWidth*9/16;
				}


			});

			scope.$on('setcurrenttime', function(event, mass) {

				var seconds = parseInt(mass[0]);


				if (typeof seconds  == 'number' && !isNaN(seconds) ){

					element[0].seekTo(seconds,true);

				}
			});




		}
	}
});