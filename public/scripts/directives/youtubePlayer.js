app.directive('youtubePlayer',function($window,$interval,YoutubeData){
	return{


		scope: {
			videoWidth: "=leftColWidth",
			youtubeUrl:"=youtubeUrl",
			youtubePaused:"=youtubePaused",
			youtubeVolume:"=youtubeVolume",
			youtubeDuration:"=youtubeDuration",
			youtubeCurrentTime:"=youtubeCurrentTime",
			youtubeTitle:"=youtubeTitle"
		},


		controller:function($scope,$element){

			//private methods

			function loadYoutubeDataById(id){

				YoutubeData.get({id:id}).$promise.then(function(video) {
					if (video && video.items && video.items.length>0){
						$scope.youtubeTitle =  video.items[0].snippet.title || "Youtube Video";
					}
				}, function(errResponse) {
					console.log(errResponse);// fail
				});
			}

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

					loadYoutubeDataById($scope.youtubeId);




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
				newV = parseFloat(newV);

				if (typeof newV == "number" && element[0].setVolume){
					var v = parseInt(newV*100);
					console.log(v);

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
					console.log(newId);
					if(newId && element[0].loadVideoById){
						element[0].loadVideoById(newId);

						$scope.youtubeId(newId);
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

				var seconds = parseFloat(mass[0]);


				if (typeof seconds  == 'number' && !isNaN(seconds) ){

					element[0].seekTo(seconds,true);

				}
			});




		}
	}
});