app.controller('homeCtrl', function ($scope, $route, $timeout, $http, $sce, $location, $routeParams, Project, Projects, Auth) {

	var v = document.getElementById('video');


	$scope.system_msg = null;
	$scope.hasMsg = false;
	$scope.openRemoteUrl = false;

	$scope.timeouts = [];



	//video related

	$scope.isPaused = false;
	$scope.currentTime = 0;
	$scope.volume = 0;
	$scope.duration = 0;



	var avgDelay = 1500; // 500ms delay

//	var leavingPageText = "You'll lose your changes if you leave";
//	window.onbeforeunload = function(){
//		return leavingPageText;
//	}

	$scope.$on('$locationChangeStart', function(event, next, current) {
//		if ($scope.dirty){
//			if(!confirm(leavingPageText + "\n\nAre you sure you want to leave this page?")) {
//				event.preventDefault();
//			}
//		}

	});


	//ugly hack that prevents route change
	var lastRoute = $route.current;
	$scope.$on('$locationChangeSuccess', function(event) {
		if ($route.current.params.projectId && $route.current.params.projectId == $scope.project_id){
			$route.current = lastRoute;
		}
		else {
			lastRoute = $route.current;
		}

	});


	$scope.project_id = $routeParams.projectId || null;

	$scope.project_list = [];



	$scope.project = {
		title: 'Default Project Name',
		start: false,
		remote: null,
		cues: [
			{text: 'Thanks for using Caption5!', begin: 1000, end: 3999},
			{text: 'Looks like your video is working', begin: 4000, end: 7999},
			{text: 'Now go ahead and click the Start Project button on the top', begin: 8000, end: 11999},
			{text: 'And you can start working !', begin: 12000, end: 15999},
			{text: 'The captions you entered will be listed on the right', begin: 16000, end: 19999},
			{text: 'If you want to adjust them, simple click on the text you want to edit', begin: 20000, end: 23999}
		]
	};

	$scope.removeProject = function(){
		if ($scope.project_id){
			Project.remove({ id:$scope.project_id },function(){
				$scope.project_id = null;
			});
		}
	};

	$scope.loadProject = function(){

		if ($scope.project_id){

			Project.get({ id:$scope.project_id },function(project){
				$scope.project.title = project.title;
				$scope.project.cues = project.cues;
				$scope.project.start = true;
				$scope.project.remote = project.remote;

				if (project.remote !== null){
					$scope.videoUrl =  $sce.trustAsResourceUrl(project.remote);
					$timeout(function(){v.pause()},500);
				}
				else {
					$scope.showMsg('Please reload <em>'+project.title+'</em> from your computer.');
				}

			});

		}

	};

	$scope.saveProject = function() {
		if (Auth.isLoggedIn()) {
			//update project
			if ($scope.project_id){
				Project.update({ id:$scope.project_id }, $scope.project);
				$scope.dirty = false;
				$scope.showMsg('Changes made to project has been saved.');
			}
			//new project
			else{
				Project.save($scope.project,function(u,h){
					$scope.project_id = u._id;
					$location.path('/p/'+ u._id);
					$scope.dirty = false;
					$scope.showMsg('A new project has been saved.');
				});
			}
		}
		else{
			$scope.showMsg('You have to ' + '<a href="/signup">create an account</a>' + ' in order to to save projects.')
		}

	};

	$scope.listProjects = function(){
	    Projects.query(function(projects){

			$scope.project_list = projects;

		});

	};

	$scope.generatedFiles = {

	};

	$scope.currentCuePos = $scope.project.cues.length;

	//start the project, file selector will be removed
	$scope.initProject = function () {

		$scope.project.start = true;
		$scope.openRemoteUrl = false;
		v.pause();//stop video

		$scope.showMsg('Move your cursor here to show project menu.');

		//v.currentTime = 0;//reset video to the beginning
	};

	//trigger click on the real file selector from the fake button
	$scope.openVideo = function () {

		var videoSelector = document.getElementById('video-selector');
		videoSelector.click();

	};



	$scope.openSub = function () {

		var subSelector = document.getElementById('sub-selector');
		subSelector.click();

	};

	//video controls

	//toggle play/pause when video is clicked
	$scope.togglePause = function (event) {



		if ($scope.project.start){
			if (event){
				event.preventDefault(); //firefox already has this behaviour
			}

			v.paused ? v.play() : v.pause();
		}


	};

	//live preview created track
	$scope.reloadTrack = function (array) {
		$scope.dirty = true;
		var track;

		try {


//		console.log(typeof v.addTextTrack);
			if (typeof v.addTextTrack != 'undefined') {

//			console.log(typeof  v.textTracks["subtitles"]);
				if (v.textTracks && v.textTracks[0]) {
//				console.log('has old cues!'); //clear old tracks
					track = v.textTracks[0];
					if (track.cues) {
						var len = track.cues.length;
						for (var i = 0; i < len; i++) {
							track.cues && track.cues[0] && track.removeCue(track.cues[0]);
						}
					}

				}
				else {
					//console.log('no old cues!');

					track = v.addTextTrack("subtitles");
				}

				if (isNaN(v.textTracks[0].mode)) {
					track.mode = "showing";
				}
				else {
					track.mode = 2;
				}

				for (var i = 0; i < array.length; i++) {

					var begin = array[i].begin / 1000;
					var next = (array[i + 1] === undefined) ? (v.duration || 0) : (array[i + 1].begin) / 1000;
					next = next ? next - 0.001 : next;

					var end = (array[i].end) ? (array[i].end / 1000) : next;

					var text = array[i].text.replace(/<br(|\/| \/)>/g,'\n'); //replace <br/> <br> <br /> with new line in vtt

					if (begin && end && text) {
						track.addCue(createCue(begin, end, text));
//					console.log('addCue: ' + text +' ' + begin + ' --> ' + end);
					}
				}
			}

		} catch (e) {

		}

	};

	function createCue(start, end, text) {
		var cue;
		if (isNaN(v.textTracks[0].mode)) {
			cue = new TextTrackCue(start, end, text);
		}
		else {
			cue = new TextTrackCue(text, start, end, '', '', '', true);
		}
		return cue;
	}

	$scope.removeCue = function (cue) {

		var index = $scope.project.cues.indexOf(cue);
		if (index >= 0) {
			$scope.project.cues.splice(index, 1);
			saveToLocal();
			$scope.reloadTrack($scope.project.cues);//update live preview
		}

	};

	$scope.editCue = function (cue,pause) {
		$scope.editMode = true;
		$scope.newCue = cue;

		$scope.navigatedTo(cue.begin, false);

	};

	$scope.modifyTime = function (type, duration) {

		var newTime = $scope.newCue[type] + duration;
		if (newTime > 0) {
			$scope.newCue[type] = newTime;

		}
		else {
			$scope.newCue[type] = 0;
		}

		$scope.reloadTrack($scope.project.cues);
	};

	$scope.shiftTrack  = function(duration){
		console.log(duration);
		for (var i = 0; i< $scope.project.cues.length; i++){
			if (duration === Math.abs(duration) || $scope.project.cues[i].begin >  Math.abs(duration)) {
				console.log('?');
				$scope.project.cues[i].begin += duration;
				$scope.project.cues[i].end += duration;
			}
			else {
				console.log('??+'+$scope.project.cues[i].begin);
				$scope.project.cues[i].begin += $scope.project.cues[i].begin * (duration / Math.abs(duration));
				$scope.project.cues[i].end += $scope.project.cues[i].begin* (duration / Math.abs(duration));
			}

		}
		$scope.reloadTrack($scope.project.cues);
	};

	$scope.navigatedTo = function (milli, autoplay) {
//		console.log(milli);

		v.currentTime = milli / 1000;
		autoplay && v.play();
		!autoplay && v.pause();

	};

	//project control
	$scope.createCue = function () {
//		console.log('create cue');
		if ($scope.newCue.text) {
//			console.log('x');
			if (!$scope.editMode) {
				$scope.newCue.begin = parseInt(v.currentTime * 1000);
				$scope.newCue.end = parseInt(v.currentTime * 1000) + avgDelay;
//				console.log($scope.newCue);
				$scope.project.cues.push($scope.newCue);

			}

			$scope.newCue = {};

			$scope.editMode = false;

			$scope.reloadTrack($scope.project.cues);
			saveToLocal();

		}

		v.play();

	};

	$scope.onEdit = function (evt) {
//		console.log(evt.which);
		if (evt.which !== 13) {
			v.pause();
		}

	};

	$scope.download = function (type) {
		var file;

		if (type === 'vtt') {
			file = $scope.vttOutput($scope.project.cues);
		}
		else if (type === 'srt') {
			file = $scope.srtOutput($scope.project.cues);
		}

		var blob = new Blob([file], {
			type: "text/plain;charset=utf-8"
		});
		saveAs(blob, $scope.project.name + "." + type);
	};

	//file Selector controls

	//on file selected, update scope with the latest video url
	$scope.onVideoSelected = function () {
		//file selected
		var f = this.files[0];
		//https://developer.mozilla.org/en-US/docs/Web/API/URL.createObjectURL
		var fileURL = URL.createObjectURL(f);
		$scope.videoUrl = $sce.trustAsResourceUrl(fileURL);
		$scope.project.remote = null;
		if (f.name) {

			$scope.project.title = f.name;
			$scope.showMsg('Loaded <em>'+ f.name +'</em>' + ' from local drive.');
		}
		$scope.$apply();
	};



	$scope.loadOnlineVideo = function(){
		if ($scope.remoteUrl){

			$scope.videoUrl = $sce.trustAsResourceUrl($scope.remoteUrl);
			$scope.project.remote = $scope.remoteUrl;

			var fname = '';
			try{
				fname = $scope.project.remote.split('/').pop();
			}catch(e){
				console.log(e);
			}

			if (fname){
				$scope.project.title = fname;
			}

			$scope.showMsg('Loaded <em>'+ $scope.videoUrl +'</em>' + ' from the external url.');
		}

	};

	$scope.onSubSelected = function () {
		//file selected
		var f = this.files[0];

//		console.log(f);

		readSub(f);

	};

	function readSub(f) {
		var ext = f.name.split('.').pop();

		var reader = new FileReader();

		reader.onload = function (e) {
//			console.log('onload');


			var sub = reader.result;
//			console.log(sub);
			if (sub) {
				if (ext === 'srt'){
					var data = Popcorn.parseSRT(sub).data;
					$scope.project.cues = data;
					$scope.$apply();

				}
				else if (ext === 'ass' || ext === 'ssa'){
					try {
						var data = Popcorn.parseSSA(sub).data;
						$scope.project.cues = data;
						$scope.$apply();

//					console.log('done');
					} catch (e) {
						console.log(e);

					}
				}


				$scope.reloadTrack($scope.project.cues);
			}

		}

		reader.readAsText(f);
	}

	$scope.onDrop = function (e) {

		if (e.preventDefault) e.preventDefault();
		var f = e.dataTransfer.files[0];

		var ext = f.name.split('.').pop();

		if (ext === 'srt' || ext === 'ssa') {

			readSub(f);

		}
		else {
			var fileURL = URL.createObjectURL(f);
			$scope.project.title = f.name;
			$scope.showMsg('Loaded <em>'+ f.name +'</em>' + ' from local drive.');


			$scope.videoUrl = $sce.trustAsResourceUrl(fileURL);
			$scope.$apply();
		}

	};

	//video Dropzone controls

	$scope.onDragOver = function (e) {
//		console.log('drag over');
		if (e.preventDefault) e.preventDefault();
		e.dataTransfer.dropEffect = 'copy';
		$scope.onDrag = true;
		$scope.$apply();
		return false;
	};

	$scope.onDragLeave = function (e) {
		if (e.preventDefault) e.preventDefault();
		$scope.onDrag = false;
		$scope.$apply();
		return false;
	};

	$scope.onDragbegin = function (e) {
		if (e.preventDefault) e.preventDefault();
		e.dataTransfer.dropEffect = 'copy';
		return false;

	};

	//helper functions

	$scope.convert = function (milli, deli, short) {
		if (!deli) deli = '.';

		var milliseconds = milli % 1000;
		var seconds = Math.floor((milli / 1000) % 60);
		var minutes = Math.floor((milli / (60 * 1000)) % 60);
		var hours = Math.floor((milli / (60 * 60 * 1000)) % 60);
		if (short){
			return zeroFill(hours, 2) + ":" + zeroFill(minutes, 2) + ":" + zeroFill(seconds, 2);

		}
		else {
			return zeroFill(hours, 2) + ":" + zeroFill(minutes, 2) + ":" + zeroFill(seconds, 2) + deli + zeroFill(milliseconds, 3);

		}
	};

	function zeroFill(number, width) {
		var fillZeroes = "00000000000000000000";
		var input = number + ""; // make sure it's a string
		return (fillZeroes.slice(0, width - input.length) + input);
	}

	$scope.loadFromLocal = function () {

		if (typeof localStorage != 'undefined' && !!localStorage.lastSave) {

			if (confirm("Are you sure you want to load last auto save? \n\n This will overwrite your current work")) {
				$scope.project.cues = [];

				$scope.project.cues = JSON.parse(localStorage.lastSave);

				$scope.reloadTrack($scope.project.cues);
				$scope.showMsg('Restored form last auto save.');
			}

		}



	};

	function saveToLocal() {

		if (typeof localStorage != 'undefined') {
			localStorage.lastSave = JSON.stringify($scope.project.cues);
		}

	}

	function convertSec(sec) {
		return parseInt(sec * 1000);
	}

	$scope.vttOutput = function (array) {
		var output = "WEBVTT\n\n";
		for (var i = 0; i < array.length; i++) {
			output += i + 1;
			output += '\n';
			//debugger;
			output += $scope.convert(array[i].begin, '.') + ' --> ';

			var next = (array[i + 1] === undefined) ? convertSec(v.duration || 0) : array[i + 1].begin;
			if (next === undefined) debugger;
			next = next ? next - 1 : next;
			output += $scope.convert((array[i].end) ? (array[i].end) : next, '.');
			output += '\n';
			output += array[i].text;
			output += '\n\n';

		}

		return output;
	};

	$scope.srtOutput = function (array) {

		var output = "";
		for (var i = 0; i < array.length; i++) {
			output += i + 1;
			output += '\n';
			//debugger;
			output += $scope.convert(array[i].begin) + ' --> ';

			var next = (array[i + 1] === undefined) ? convertSec(v.duration || 0) : array[i + 1].begin;
			if (next === undefined) debugger;
			next = next ? next - 1 : next;

			output += $scope.convert((array[i].end) ? (array[i].end) : next);
			output += '\n';
			output += array[i].text;
			output += '\n\n';
		}

		return output;
	}


	$scope.isCueActive = function(cue){
		if ($scope.currentTime * 1000>=cue.begin && $scope.currentTime * 1000 <= cue.end ){

			return true;
		}
		else {

			return false;
		}
	};

	$scope.showMsg = function(msg){
		//clear all timeouts
		var i = $scope.timeouts.length;
		while (i--) {
				$timeout.cancel($scope.timeouts.splice(i, 1));

		}

		$scope.system_msg = msg;
		$scope.hasMsg = true;

		var t1 = $timeout(function(){
			$scope.hasMsg = false;
		},4000);                     //this flag is used to control show/hide css animation
									//it runs 1000ms before the text being cleared out by angular

		var t2 = $timeout(function(){
			$scope.system_msg = null;
		},5000);

		$scope.timeouts.push(t1);
		$scope.timeouts.push(t2);
	};


	$scope.onTimeUpdate = function(){
		$scope.currentTime = v.currentTime;
		$scope.$apply();
	};

	$scope.onPause = function(){
		$scope.isPaused = true;
		$scope.$apply();
	};


	$scope.onPlay = function(){
		$scope.duration = v.duration;
		$scope.isPaused = false;
		$scope.$apply();
	};

	$scope.onVolumeChange = function(){
		$scope.volume = v.volume;
		$scope.$apply();
	};


	$scope.setVolume = function(){
		v.volume = $scope.volume;
	};

	$scope.setCurrentTime= function(){
		v.currentTime = $scope.currentTime;


	};

	$scope.getVolumeIcon = function(){

		if (v.volume){
			if (v.volume > 0.8) {
				return 'icon-volume-2';
			}
			else {
				  return 'icon-volume-1';
			}
		}
		return 'icon-volume-off';


	};




	//run block

	$scope.reloadTrack($scope.project.cues);

	$scope.dirty = false;

	$scope.$watch('videoUrl', function() {
		if (typeof $scope.videoUrl != 'undefined'){
			v.setAttribute("controls","controls");
		}

	});

	v.volume = 0.2; //prevent too loud video


	if (Auth.isLoggedIn()){
		$scope.loadProject();
		$scope.listProjects();
		$scope.isLoggedIn = true;
	}


});
