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