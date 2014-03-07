/*
 * simple video player directive
 */
app.directive('videoPlayer', function ($timeout) {

	return {

		scope: {
			videoWidth: "=videoWidth",
			videoUrl: "=videoUrl",
			videoPaused: "=videoPaused",
			videoVolume: "=videoVolume",
			videoDuration: "=videoDuration",
			videoCurrentTime: "=videoCurrentTime",
			videoTitle: "=videoTitle"

		},

		controller: function ($scope,$element) {
			$scope.onTimeUpdate = function () {
				$scope.videoCurrentTime = $element[0].currentTime ;
				if ($element[0].duration){
					$scope.videoDuration = $element[0].duration;
				}

				$scope.$emit('timeupdate');
				$scope.$apply();
			};

		},

		link: function (scope, element, attrs, controller) {

			element.bind('timeupdate', scope.onTimeUpdate);

			scope.$on('setcurrenttime', function(event, mass) {

				var seconds = parseFloat(mass[0]);

				if (!mass[1]){

					if (typeof seconds  == 'number' && !isNaN(seconds) ){

						if(element[0].currentTime ) {
							element[0].currentTime = seconds;
						}


					}
				}



			});

			scope.$watch('videoVolume',function(newV,oldV){
				newV = parseFloat(newV);
				if (typeof newV == "number"){
					element[0].volume = newV;
				}
			});

			scope.$watch('videoPaused',function(newV,oldV){
				if (element[0].pause && element[0].play )  {
					if (newV){
						element[0].pause();
					}
					else{
						element[0].play();
					}
				}

			});

		}
	}

});