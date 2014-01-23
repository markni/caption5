var saveAs=saveAs||"undefined"!=typeof navigator&&navigator.msSaveOrOpenBlob&&navigator.msSaveOrOpenBlob.bind(navigator)||function(a){"use strict";var b=a.document,c=function(){return a.URL||a.webkitURL||a},d=a.URL||a.webkitURL||a,e=b.createElementNS("http://www.w3.org/1999/xhtml","a"),f=!a.externalHost&&"download"in e,g=a.webkitRequestFileSystem,h=a.requestFileSystem||g||a.mozRequestFileSystem,i=function(b){(a.setImmediate||a.setTimeout)(function(){throw b},0)},j="application/octet-stream",k=0,l=[],m=function(){for(var a=l.length;a--;){var b=l[a];"string"==typeof b?d.revokeObjectURL(b):b.remove()}l.length=0},n=function(a,b,c){b=[].concat(b);for(var d=b.length;d--;){var e=a["on"+b[d]];if("function"==typeof e)try{e.call(a,c||a)}catch(f){i(f)}}},o=function(d,i){var m,o,p,q=this,r=d.type,s=!1,t=function(){var a=c().createObjectURL(d);return l.push(a),a},u=function(){n(q,"writestart progress write writeend".split(" "))},v=function(){(s||!m)&&(m=t(d)),o?o.location.href=m:window.open(m,"_blank"),q.readyState=q.DONE,u()},w=function(a){return function(){return q.readyState!==q.DONE?a.apply(this,arguments):void 0}},x={create:!0,exclusive:!1};if(q.readyState=q.INIT,i||(i="download"),f){m=t(d),b=a.document,e=b.createElementNS("http://www.w3.org/1999/xhtml","a"),e.href=m,e.download=i;var y=b.createEvent("MouseEvents");return y.initMouseEvent("click",!0,!1,a,0,0,0,0,0,!1,!1,!1,!1,0,null),e.dispatchEvent(y),q.readyState=q.DONE,void u()}return a.chrome&&r&&r!==j&&(p=d.slice||d.webkitSlice,d=p.call(d,0,d.size,j),s=!0),g&&"download"!==i&&(i+=".download"),(r===j||g)&&(o=a),h?(k+=d.size,void h(a.TEMPORARY,k,w(function(a){a.root.getDirectory("saved",x,w(function(a){var b=function(){a.getFile(i,x,w(function(a){a.createWriter(w(function(b){b.onwriteend=function(b){o.location.href=a.toURL(),l.push(a),q.readyState=q.DONE,n(q,"writeend",b)},b.onerror=function(){var a=b.error;a.code!==a.ABORT_ERR&&v()},"writestart progress write abort".split(" ").forEach(function(a){b["on"+a]=q["on"+a]}),b.write(d),q.abort=function(){b.abort(),q.readyState=q.DONE},q.readyState=q.WRITING}),v)}),v)};a.getFile(i,{create:!1},w(function(a){a.remove(),b()}),w(function(a){a.code===a.NOT_FOUND_ERR?b():v()}))}),v)}),v)):void v()},p=o.prototype,q=function(a,b){return new o(a,b)};return p.abort=function(){var a=this;a.readyState=a.DONE,n(a,"abort")},p.readyState=p.INIT=0,p.WRITING=1,p.DONE=2,p.error=p.onwritestart=p.onprogress=p.onwrite=p.onabort=p.onerror=p.onwriteend=null,a.addEventListener("unload",m,!1),q}("undefined"!=typeof self&&self||"undefined"!=typeof window&&window||this.content);"undefined"!=typeof module&&(module.exports=saveAs),function(){function a(a){var b=a.split(":");try{var c=b[2].split(",");return 1===c.length&&(c=b[2].split(".")),3600*parseFloat(b[0],10)+60*parseFloat(b[1],10)+parseFloat(c[0],10)+parseFloat(c[1],10)/1e3}catch(d){return 0}}function b(b){return parseInt(1e3*a(b))}function c(a){for(var b=a.length-1;b>=0&&!a[b];)b--;return b}var d,e=this,f=e.Popcorn;d=f?f:e.Popcorn={},d.parseSRT=function(a){var d,e,f,g,h,i={title:"",remote:"",data:[]},j=[],k=0,l=0;for(d=a.split(/(?:\r\n|\r|\n)/gm),g=c(d)+1,k=0;g>k;k++){for(h={},f=[],h.id=parseInt(d[k++],10),e=d[k++].split(/[\t ]*-->[\t ]*/),h.begin=b(e[0]),l=e[1].indexOf(" "),-1!==l&&(e[1]=e[1].substr(0,l)),h.end=b(e[1]);g>k&&d[k];)f.push(d[k++]);h.text=f.join("\\N").replace(/\{(\\[\w]+\(?([\w\d]+,?)+\)?)+\}/gi,""),h.text=h.text.replace(/</g,"&lt;").replace(/>/g,"&gt;"),h.text=h.text.replace(/&lt;(\/?(font|b|u|i|s))((\s+(\w|\w[\w\-]*\w)(\s*=\s*(?:\".*?\"|'.*?'|[^'\">\s]+))?)+\s*|\s*)(\/?)&gt;/gi,"<$1$3$7>"),h.text=h.text.replace(/\\N/gi,"<br />"),j.push(h)}return i.data=j,i}}.call(this);var app=angular.module("ameApp",["ngRoute","ngTouch","ngCookies","ngResource","chieffancypants.loadingBar","ngAnimate"]);app.config(["$routeProvider","$locationProvider","$httpProvider",function(a,b,c){b.html5Mode(!0),a.when("/",{templateUrl:"/views/home.html",controller:"homeCtrl"}).when("/login",{templateUrl:"/views/login.html",controller:"loginCtrl"}).when("/signup",{templateUrl:"/views/signup.html",controller:"signupCtrl"}).when("/settings",{templateUrl:"/views/settings.html",controller:"settingsCtrl",authenticate:!0}).otherwise({redirectTo:"/"}),b.html5Mode(!0),c.interceptors.push(["$q","$location",function(a,b){return{responseError:function(c){return 401===c.status||403===c.status?(b.path("/login"),a.reject(c)):a.reject(c)}}}])}]).run(["$rootScope","$location","Auth",function(a,b,c){a.$on("$routeChangeStart",function(a,d){console.log(d.authenticate),d.authenticate&&!c.isLoggedIn()&&b.path("/login")})}]),app.factory("Auth",["$location","$rootScope","Session","User","$cookieStore",function(a,b,c,d,e){return b.currentUser=e.get("user")||null,e.remove("user"),{login:function(a,d){var e=d||angular.noop;return c.save({email:a.email,password:a.password},function(a){return b.currentUser=a,e()},function(a){return e(a)}).$promise},logout:function(a){var d=a||angular.noop;return c.delete(function(){return b.currentUser=null,d()},function(a){return d(a)}).$promise},createUser:function(a,c){var e=c||angular.noop;return d.save(a,function(a){return b.currentUser=a,e(a)},function(a){return e(a)}).$promise},changePassword:function(a,b,c){var e=c||angular.noop;return d.update({oldPassword:a,newPassword:b},function(a){return e(a)},function(a){return e(a)}).$promise},currentUser:function(){return d.get()},isLoggedIn:function(){var a=b.currentUser;return!!a}}}]),app.factory("Session",["$resource",function(a){return a("/api/session/")}]),app.factory("User",["$resource",function(a){return a("/api/users/:id",{id:"@id"},{update:{method:"PUT",params:{}},get:{method:"GET",params:{id:"me"}}})}]),app.directive("mongooseError",function(){return{restrict:"A",require:"ngModel",link:function(a,b,c,d){b.on("keydown",function(){return d.$setValidity("mongoose",!0)})}}}),app.directive("onKeypress",["$parse",function(a){return function(b,c,d){var e=a(d.onKeypress);c.bind("keypress",function(a){e(b,{$event:a})})}}]),app.directive("dropZone",function(){return function(a,b){b.bind("dragover",a.onDragOver),b.bind("dragenter",a.onDragbegin),b.bind("dragleave",a.onDragLeave),b.bind("drop",a.onDrop)}}),app.directive("videoSelector",function(){return function(a,b){b.bind("change",a.onVideoSelected)}}),app.directive("subSelector",function(){return function(a,b){b.bind("change",a.onSubSelected)}}),app.controller("homeCtrl",["$scope","$http","$sce",function(a,b,c){function d(a,b,c){var d;return d=isNaN(h.textTracks[0].mode)?new TextTrackCue(a,b,c):new TextTrackCue(c,a,b,"","","",!0)}function e(a,b){var c="00000000000000000000",d=a+"";return c.slice(0,b-d.length)+d}function f(){"undefined"!=typeof localStorage&&(localStorage.lastSave=JSON.stringify(a.project.cues))}function g(a){return parseInt(1e3*a)}var h=document.getElementById("video"),i=1500;a.project={start:!1,name:"subtitlename",meta:{},cues:[{text:"Welcome to Stop, Backward!",begin:1e3,end:3999},{text:"Looks like your video is working",begin:4e3,end:7999},{text:"Now go ahead and click the Start Project button on the top",begin:8e3,end:11999},{text:"And you can start working !",begin:12e3,end:15999},{text:"The captions you entered will be listed on the right",begin:16e3,end:19999},{text:"If you want to adjust them, simple click on the text you want to edit",begin:2e4,end:23999}]},a.generatedFiles={},a.currentCuePos=a.project.cues.length,a.initProject=function(){a.project.start=!0,h.pause()},a.openVideo=function(){var a=document.getElementById("video-selector");a.click()},a.openSub=function(){var a=document.getElementById("sub-selector");a.click()},a.togglePause=function(a){a.preventDefault(),h.paused?h.play():h.pause()},a.reloadTrack=function(a){var b;try{if(console.log(typeof h.addTextTrack),"undefined"!=typeof h.addTextTrack){if(console.log(typeof h.textTracks.subtitles),h.textTracks&&h.textTracks[0]){if(b=h.textTracks[0],b.cues)for(var c=b.cues.length,e=0;c>e;e++)b.cues&&b.cues[0]&&b.removeCue(b.cues[0])}else b=h.addTextTrack("subtitles");b.mode=isNaN(h.textTracks[0].mode)?"showing":2;for(var e=0;e<a.length;e++){var f=a[e].begin/1e3,g=void 0===a[e+1]?h.duration||0:a[e+1].begin/1e3;g=g?g-.001:g;var i=a[e].end?a[e].end/1e3:g,j=a[e].text;f&&i&&j&&(b.addCue(d(f,i,j)),console.log("addCue: "+j+" "+f+" --> "+i))}}}catch(k){}},a.removeCue=function(b){var c=a.project.cues.indexOf(b);c>=0&&(a.project.cues.splice(c,1),f(),a.reloadTrack(a.project.cues))},a.editCue=function(b){a.editMode=!0,a.newCue=b,a.navigatedTo(b.begin,!1)},a.modifyTime=function(b,c){var d=a.newCue[b]+c;a.newCue[b]=d>0?d:0,a.reloadTrack(a.project.cues)},a.navigatedTo=function(a,b){console.log(a),h.currentTime=a/1e3,b&&h.play(),!b&&h.pause()},a.createCue=function(){console.log("create cue"),a.newCue.text&&(console.log("x"),a.editMode||(a.newCue.begin=parseInt(1e3*h.currentTime),a.newCue.end=parseInt(1e3*h.currentTime)+i,console.log(a.newCue),a.project.cues.push(a.newCue)),a.newCue={},a.editMode=!1,a.reloadTrack(a.project.cues),f()),h.play()},a.onEdit=function(a){console.log(a.which),13!==a.which&&h.pause()},a.download=function(b){var c;"vtt"===b?c=a.vttOutput(a.project.cues):"srt"===b&&(c=a.srtOutput(a.project.cues));var d=new Blob([c],{type:"text/plain;charset=utf-8"});saveAs(d,a.project.name+"."+b)},a.onVideoSelected=function(){var b=this.files[0],d=URL.createObjectURL(b);a.videoUrl=c.trustAsResourceUrl(d),b.name&&(a.project.name=b.name),a.$apply()},a.onSubSelected=function(){var b=this.files[0];console.log(b);var c=new FileReader;c.onload=function(b){console.log("onload");var d=c.result;if(console.log(d),d){try{var e=Popcorn.parseSRT(d).data;a.project.cues=e,a.$apply(),console.log("done")}catch(b){console.log(b)}a.reloadTrack(a.project.cues)}},c.readAsText(b)},a.onDrop=function(b){b.preventDefault&&b.preventDefault();var d=b.dataTransfer.files[0],e=URL.createObjectURL(d);a.videoUrl=c.trustAsResourceUrl(e),a.$apply()},a.onDragOver=function(b){return console.log("drag over"),b.preventDefault&&b.preventDefault(),b.dataTransfer.dropEffect="copy",a.onDrag=!0,a.$apply(),!1},a.onDragLeave=function(b){return b.preventDefault&&b.preventDefault(),a.onDrag=!1,a.$apply(),!1},a.onDragbegin=function(a){return a.preventDefault&&a.preventDefault(),a.dataTransfer.dropEffect="copy",!1},a.convert=function(a,b){b||(b=".");var c=a%1e3,d=Math.floor(a/1e3%60),f=Math.floor(a/6e4%60),g=Math.floor(a/36e5%60);return e(g,2)+":"+e(f,2)+":"+e(d,2)+b+e(c,3)},a.loadFromLocal=function(){"undefined"!=typeof localStorage&&localStorage.lastSave&&confirm("Are you sure you want to load last auto save? \n\n This will overwrite your current work")&&(a.project.cues=[],a.project.cues=JSON.parse(localStorage.lastSave),a.reloadTrack(a.project.cues))},a.vttOutput=function(b){for(var c="WEBVTT\n\n",d=0;d<b.length;d++){c+=d+1,c+="\n",c+=a.convert(b[d].begin,".")+" --> ";var e=void 0===b[d+1]?g(h.duration||0):b[d+1].begin;e=e?e-1:e,c+=a.convert(b[d].end?b[d].end:e,"."),c+="\n",c+=b[d].text,c+="\n\n"}return c},a.srtOutput=function(b){for(var c="",d=0;d<b.length;d++){c+=d+1,c+="\n",c+=a.convert(b[d].begin)+" --> ";var e=void 0===b[d+1]?g(h.duration||0):b[d+1].begin;e=e?e-1:e,c+=a.convert(b[d].end?b[d].end:e),c+="\n",c+=b[d].text,c+="\n\n"}return c},a.reloadTrack(a.project.cues),h.volume=.2,b.get("/api/awesomeThings").success(function(b){a.awesomeThings=b})}]),app.controller("loginCtrl",["$scope","Auth","$location",function(a,b,c){a.user={},a.errors={},a.login=function(d){a.submitted=!0,d.$valid&&b.login({email:a.user.email,password:a.user.password}).then(function(){c.path("/")}).catch(function(b){b=b.data,a.errors.other=b.message})}}]),app.controller("navbarCtrl",["$scope","$location","Auth",function(a,b,c){a.menu=[{title:"HOME",link:"/","public":!0},{title:"SETTINGS",link:"/settings","public":!1}],a.logout=function(){c.logout().then(function(){b.path("/login")})},a.isActive=function(a){return a===b.path()}}]),app.controller("signupCtrl",["$scope","Auth","$location",function(a,b,c){a.user={},a.errors={},a.register=function(d){a.submitted=!0,d.$valid&&b.createUser({name:a.user.name,email:a.user.email,password:a.user.password}).then(function(){c.path("/")}).catch(function(b){b=b.data,a.errors={},angular.forEach(b.errors,function(b,c){d[c].$setValidity("mongoose",!1),a.errors[c]=b.type})})}}]),app.controller("settingsCtrl",["$scope","User","Auth",function(a,b,c){a.errors={},a.changePassword=function(b){a.submitted=!0,b.$valid&&c.changePassword(a.user.oldPassword,a.user.newPassword).then(function(){a.message="Password successfully changed."}).catch(function(){b.password.$setValidity("mongoose",!1),a.errors.other="Incorrect password"})}}]);