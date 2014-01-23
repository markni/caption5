app.directive('mongooseError', function () {
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function(scope, element, attrs, ngModel) {
			element.on('keydown', function() {
				return ngModel.$setValidity('mongoose', true);
			});
		}
	};
});


app.directive('onKeypress', function($parse) {
	return function(scope, elm, attrs) {
		//Evaluate the variable that was passed
		//In this case we're just passing a variable that points
		//to a function we'll call each keyup
		var keypressFn = $parse(attrs.onKeypress);
		elm.bind('keypress', function(evt) {
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


app.directive("dropZone", function() {
	return function(scope, elm) {

		elm.bind('dragover', scope.onDragOver);

		elm.bind('dragenter', scope.onDragbegin);

		elm.bind('dragleave', scope.onDragLeave);

		elm.bind('drop', scope.onDrop);

	}

});

app.directive('videoSelector', function() {
	return function(scope, elm) {
		elm.bind('change', scope.onVideoSelected);
	}

})


app.directive('subSelector', function() {
	return function(scope, elm) {
		elm.bind('change', scope.onSubSelected);
	}

})
