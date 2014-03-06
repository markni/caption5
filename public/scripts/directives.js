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

