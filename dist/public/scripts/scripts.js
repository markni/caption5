var saveAs=saveAs||"undefined"!=typeof navigator&&navigator.msSaveOrOpenBlob&&navigator.msSaveOrOpenBlob.bind(navigator)||function(a){"use strict";var b=a.document,c=function(){return a.URL||a.webkitURL||a},d=a.URL||a.webkitURL||a,e=b.createElementNS("http://www.w3.org/1999/xhtml","a"),f=!a.externalHost&&"download"in e,g=a.webkitRequestFileSystem,h=a.requestFileSystem||g||a.mozRequestFileSystem,i=function(b){(a.setImmediate||a.setTimeout)(function(){throw b},0)},j="application/octet-stream",k=0,l=[],m=function(){for(var a=l.length;a--;){var b=l[a];"string"==typeof b?d.revokeObjectURL(b):b.remove()}l.length=0},n=function(a,b,c){b=[].concat(b);for(var d=b.length;d--;){var e=a["on"+b[d]];if("function"==typeof e)try{e.call(a,c||a)}catch(f){i(f)}}},o=function(d,i){var m,o,p,q=this,r=d.type,s=!1,t=function(){var a=c().createObjectURL(d);return l.push(a),a},u=function(){n(q,"writestart progress write writeend".split(" "))},v=function(){(s||!m)&&(m=t(d)),o?o.location.href=m:window.open(m,"_blank"),q.readyState=q.DONE,u()},w=function(a){return function(){return q.readyState!==q.DONE?a.apply(this,arguments):void 0}},x={create:!0,exclusive:!1};if(q.readyState=q.INIT,i||(i="download"),f){m=t(d),b=a.document,e=b.createElementNS("http://www.w3.org/1999/xhtml","a"),e.href=m,e.download=i;var y=b.createEvent("MouseEvents");return y.initMouseEvent("click",!0,!1,a,0,0,0,0,0,!1,!1,!1,!1,0,null),e.dispatchEvent(y),q.readyState=q.DONE,void u()}return a.chrome&&r&&r!==j&&(p=d.slice||d.webkitSlice,d=p.call(d,0,d.size,j),s=!0),g&&"download"!==i&&(i+=".download"),(r===j||g)&&(o=a),h?(k+=d.size,void h(a.TEMPORARY,k,w(function(a){a.root.getDirectory("saved",x,w(function(a){var b=function(){a.getFile(i,x,w(function(a){a.createWriter(w(function(b){b.onwriteend=function(b){o.location.href=a.toURL(),l.push(a),q.readyState=q.DONE,n(q,"writeend",b)},b.onerror=function(){var a=b.error;a.code!==a.ABORT_ERR&&v()},"writestart progress write abort".split(" ").forEach(function(a){b["on"+a]=q["on"+a]}),b.write(d),q.abort=function(){b.abort(),q.readyState=q.DONE},q.readyState=q.WRITING}),v)}),v)};a.getFile(i,{create:!1},w(function(a){a.remove(),b()}),w(function(a){a.code===a.NOT_FOUND_ERR?b():v()}))}),v)}),v)):void v()},p=o.prototype,q=function(a,b){return new o(a,b)};return p.abort=function(){var a=this;a.readyState=a.DONE,n(a,"abort")},p.readyState=p.INIT=0,p.WRITING=1,p.DONE=2,p.error=p.onwritestart=p.onprogress=p.onwrite=p.onabort=p.onerror=p.onwriteend=null,a.addEventListener("unload",m,!1),q}("undefined"!=typeof self&&self||"undefined"!=typeof window&&window||this.content);"undefined"!=typeof module&&(module.exports=saveAs),function(){function a(a){var b=a.split(":");try{var c=b[2].split(",");return 1===c.length&&(c=b[2].split(".")),3600*parseFloat(b[0],10)+60*parseFloat(b[1],10)+parseFloat(c[0],10)+parseFloat(c[1],10)/1e3}catch(d){return 0}}function b(b){return parseInt(1e3*a(b))}function c(a,b){for(var c=b;!a[c];)c++;return c}function d(a){for(var b=a.length-1;b>=0&&!a[b];)b--;return b}var e,f=this,g=f.Popcorn;e=g?g:f.Popcorn={},e.parseSRT=function(a){var e,f,g,h,i,j={title:"",remote:"",data:[]},k=[],l=0,m=0;for(e=a.split(/(?:\r\n|\r|\n)/gm),h=d(e)+1,l=0;h>l;l++){for(i={},g=[],l=c(e,l),i.id=parseInt(e[l++],10),f=e[l++].split(/[\t ]*-->[\t ]*/),i.begin=b(f[0]),m=f[1].indexOf(" "),-1!==m&&(f[1]=f[1].substr(0,m)),i.end=b(f[1]);h>l&&e[l];)g.push(e[l++]);i.text=g.join("\\N").replace(/\{(\\[\w]+\(?([\w\d]+,?)+\)?)+\}/gi,""),i.text=i.text.replace(/</g,"&lt;").replace(/>/g,"&gt;"),i.text=i.text.replace(/&lt;(\/?(font|b|u|i|s))((\s+(\w|\w[\w\-]*\w)(\s*=\s*(?:\".*?\"|'.*?'|[^'\">\s]+))?)+\s*|\s*)(\/?)&gt;/gi,"<$1$3$7>"),i.text=i.text.replace(/\\N/gi,"<br />"),k.push(i)}return j.data=k,j}}.call(this),function(){function a(a,b){var e,f=a.substr(10).split(","),g=/\{(\\[\w]+\(?([\w\d]+,?)+\)?)+\}/gi,h=/\\N/gi;if(console.log(f),e={begin:d(f[b.begin]),end:d(f[b.end])},-1===e.begin||-1===e.end)throw"Invalid time";return e.text=c(f,b.text).replace(g,"").replace(h,"<br />"),e}function b(a){var b=a.split(":");return 10!==a.length||b.length<3?-1:3600*parseInt(b[0],10)+60*parseInt(b[1],10)+parseFloat(b[2],10)}function c(a,b){for(var c=a.length,d=[],e=b;c>e;e++)d.push(a[e]);return d.join(",")}function d(a){return parseInt(1e3*b(a))}function e(a){var b,c,d=a.substr(8).split(", "),e={};for(c=0,b=d.length;b>c;c++)"Start"===d[c]?e.begin=c:"End"===d[c]?e.end=c:"Text"===d[c]&&(e.text=c);return e}var f,g=this,h=g.Popcorn;f=h?h:g.Popcorn={},f.parseSSA=function(b){var c,d,f,g={title:"",remote:"",data:[]},h=/(?:\r\n|\r|\n)/gm,i=[],j=0;for(c=b.split(h),f=c.length;f>j&&"[Events]"!==c[j];)j++;for(d=e(c[++j]),console.log(d);++j<f&&c[j]&&"["!==c[j][0];)try{i.push(a(c[j],d))}catch(k){}return g.data=i,console.log(g),g}}.call(this);var app=angular.module("ameApp",["ngRoute","ngTouch","ngCookies","ngResource","ngSanitize","ngAnimate","chieffancypants.loadingBar"]);app.config(["$routeProvider","$locationProvider","$httpProvider",function(a,b,c){b.html5Mode(!0),a.when("/",{templateUrl:"/views/home.html",controller:"homeCtrl"}).when("/p/:projectId",{templateUrl:"/views/home.html",controller:"homeCtrl"}).when("/login",{templateUrl:"/views/login.html",controller:"loginCtrl"}).when("/signup",{templateUrl:"/views/signup.html",controller:"signupCtrl"}).when("/settings",{templateUrl:"/views/settings.html",controller:"settingsCtrl",authenticate:!0}).otherwise({redirectTo:"/"}),b.html5Mode(!0),c.interceptors.push(["$q","$location",function(a,b){return{responseError:function(c){return 401===c.status||403===c.status?(b.path("/login"),a.reject(c)):a.reject(c)}}}])}]).run(["$rootScope","$location","Auth",function(a,b,c){a.$on("$routeChangeStart",function(a,d){console.log(d.authenticate),d.authenticate&&!c.isLoggedIn()&&b.path("/login")})}]),app.factory("Auth",["$location","$rootScope","Session","User","$cookieStore",function(a,b,c,d,e){return b.currentUser=e.get("user")||null,e.remove("user"),{login:function(a,d){var e=d||angular.noop;return c.save({email:a.email,password:a.password},function(a){return b.currentUser=a,e()},function(a){return e(a)}).$promise},logout:function(a){var d=a||angular.noop;return c.delete(function(){return b.currentUser=null,d()},function(a){return d(a)}).$promise},createUser:function(a,c){var e=c||angular.noop;return d.save(a,function(a){return b.currentUser=a,e(a)},function(a){return e(a)}).$promise},changePassword:function(a,b,c){var e=c||angular.noop;return d.update({oldPassword:a,newPassword:b},function(a){return e(a)},function(a){return e(a)}).$promise},currentUser:function(){return d.get()},isLoggedIn:function(){var a=b.currentUser;return!!a}}}]),app.factory("Session",["$resource",function(a){return a("/api/session/")}]),app.factory("User",["$resource",function(a){return a("/api/users/:id",{id:"@id"},{update:{method:"PUT",params:{}},get:{method:"GET",params:{id:"me"}}})}]),app.factory("Project",["$resource",function(a){return a("/api/project/:id",null,{update:{method:"PUT"}})}]),app.factory("Projects",["$resource",function(a){return a("/api/projects/")}]),app.directive("mongooseError",function(){return{restrict:"A",require:"ngModel",link:function(a,b,c,d){b.on("keydown",function(){return d.$setValidity("mongoose",!0)})}}}),app.directive("onKeypress",["$parse",function(a){return function(b,c,d){var e=a(d.onKeypress);c.bind("keypress",function(a){e(b,{$event:a})})}}]),app.directive("dropZone",function(){return function(a,b){b.bind("dragover",a.onDragOver),b.bind("dragenter",a.onDragbegin),b.bind("dragleave",a.onDragLeave),b.bind("drop",a.onDrop)}}),app.directive("videoSelector",function(){return function(a,b){b.bind("change",a.onVideoSelected)}}),app.directive("subSelector",function(){return function(a,b){b.bind("change",a.onSubSelected)}}),app.controller("homeCtrl",["$scope","$route","$timeout","$http","$sce","$location","$routeParams","Project","Projects","Auth",function(a,b,c,d,e,f,g,h,i,j){function k(a,b,c){var d;return d=isNaN(p.textTracks[0].mode)?new TextTrackCue(a,b,c):new TextTrackCue(c,a,b,"","","",!0)}function l(b){var c=b.name.split(".").pop(),d=new FileReader;d.onload=function(b){var e=d.result;if(e){if("srt"===c){var f=Popcorn.parseSRT(e).data;a.project.cues=f,a.$apply()}else if("ass"===c||"ssa"===c)try{var f=Popcorn.parseSSA(e).data;a.project.cues=f,a.$apply()}catch(b){console.log(b)}a.reloadTrack(a.project.cues)}},d.readAsText(b)}function m(a,b){var c="00000000000000000000",d=a+"";return c.slice(0,b-d.length)+d}function n(){"undefined"!=typeof localStorage&&(localStorage.lastSave=JSON.stringify(a.project.cues))}function o(a){return parseInt(1e3*a)}var p=document.getElementById("video");a.system_msg=null,a.hasMsg=!1,a.openRemoteUrl=!1;var q=1500;a.$on("$locationChangeStart",function(){});var r=b.current;a.$on("$locationChangeSuccess",function(){b.current.params.projectId&&b.current.params.projectId==a.project_id?b.current=r:r=b.current}),a.project_id=g.projectId||null,a.project_list=[],a.project={title:"Default Project Name",start:!1,remote:null,cues:[{text:"Thanks for using Caption5!",begin:1e3,end:3999},{text:"Looks like your video is working",begin:4e3,end:7999},{text:"Now go ahead and click the Start Project button on the top",begin:8e3,end:11999},{text:"And you can start working !",begin:12e3,end:15999},{text:"The captions you entered will be listed on the right",begin:16e3,end:19999},{text:"If you want to adjust them, simple click on the text you want to edit",begin:2e4,end:23999}]},a.removeProject=function(){a.project_id&&h.remove({id:a.project_id},function(){a.project_id=null})},a.loadProject=function(){a.project_id&&h.get({id:a.project_id},function(b){a.project.title=b.title,a.project.cues=b.cues,a.project.start=!0,a.project.remote=b.remote,null!==b.remote?(a.videoUrl=e.trustAsResourceUrl(b.remote),c(function(){p.pause()},500)):a.showMsg("Please reload <em>"+b.title+"</em> from your computer.")})},a.saveProject=function(){a.project_id?(h.update({id:a.project_id},a.project),a.dirty=!1):h.save(a.project,function(b){console.log("clicked"),a.project_id=b._id,f.path("/p/"+b._id),a.dirty=!1})},a.listProjects=function(){i.query(function(b){a.project_list=b})},a.generatedFiles={},a.currentCuePos=a.project.cues.length,a.initProject=function(){a.project.start=!0,a.openRemoteUrl=!1,p.pause()},a.openVideo=function(){var a=document.getElementById("video-selector");a.click()},a.openSub=function(){var a=document.getElementById("sub-selector");a.click()},a.togglePause=function(b){a.project.start&&(b.preventDefault(),p.paused?p.play():p.pause())},a.reloadTrack=function(b){a.dirty=!0;var c;try{if("undefined"!=typeof p.addTextTrack){if(p.textTracks&&p.textTracks[0]){if(c=p.textTracks[0],c.cues)for(var d=c.cues.length,e=0;d>e;e++)c.cues&&c.cues[0]&&c.removeCue(c.cues[0])}else c=p.addTextTrack("subtitles");c.mode=isNaN(p.textTracks[0].mode)?"showing":2;for(var e=0;e<b.length;e++){var f=b[e].begin/1e3,g=void 0===b[e+1]?p.duration||0:b[e+1].begin/1e3;g=g?g-.001:g;var h=b[e].end?b[e].end/1e3:g,i=b[e].text.replace(/<br(|\/| \/)>/g,"\n");f&&h&&i&&c.addCue(k(f,h,i))}}}catch(j){}},a.removeCue=function(b){var c=a.project.cues.indexOf(b);c>=0&&(a.project.cues.splice(c,1),n(),a.reloadTrack(a.project.cues))},a.editCue=function(b){a.editMode=!0,a.newCue=b,a.navigatedTo(b.begin,!1)},a.modifyTime=function(b,c){var d=a.newCue[b]+c;a.newCue[b]=d>0?d:0,a.reloadTrack(a.project.cues)},a.navigatedTo=function(a,b){p.currentTime=a/1e3,b&&p.play(),!b&&p.pause()},a.createCue=function(){a.newCue.text&&(a.editMode||(a.newCue.begin=parseInt(1e3*p.currentTime),a.newCue.end=parseInt(1e3*p.currentTime)+q,a.project.cues.push(a.newCue)),a.newCue={},a.editMode=!1,a.reloadTrack(a.project.cues),n()),p.play()},a.onEdit=function(a){13!==a.which&&p.pause()},a.download=function(b){var c;"vtt"===b?c=a.vttOutput(a.project.cues):"srt"===b&&(c=a.srtOutput(a.project.cues));var d=new Blob([c],{type:"text/plain;charset=utf-8"});saveAs(d,a.project.name+"."+b)},a.onVideoSelected=function(){var b=this.files[0],c=URL.createObjectURL(b);a.videoUrl=e.trustAsResourceUrl(c),a.project.remote=null,b.name&&(a.project.title=b.name,a.showMsg("Loaded <em>"+b.name+"</em> from local drive.")),a.$apply()},a.loadOnlineVideo=function(){a.remoteUrl&&(a.videoUrl=e.trustAsResourceUrl(a.remoteUrl),a.project.remote=a.remoteUrl,a.showMsg("Loaded <em>"+a.videoUrl+"</em> from the external url."))},a.onSubSelected=function(){var a=this.files[0];l(a)},a.onDrop=function(b){b.preventDefault&&b.preventDefault();var c=b.dataTransfer.files[0],d=c.name.split(".").pop();if("srt"===d||"ssa"===d)l(c);else{var f=URL.createObjectURL(c);a.showMsg("Loaded <em>"+c.name+"</em> from local drive."),a.videoUrl=e.trustAsResourceUrl(f),a.$apply()}},a.onDragOver=function(b){return b.preventDefault&&b.preventDefault(),b.dataTransfer.dropEffect="copy",a.onDrag=!0,a.$apply(),!1},a.onDragLeave=function(b){return b.preventDefault&&b.preventDefault(),a.onDrag=!1,a.$apply(),!1},a.onDragbegin=function(a){return a.preventDefault&&a.preventDefault(),a.dataTransfer.dropEffect="copy",!1},a.convert=function(a,b){b||(b=".");var c=a%1e3,d=Math.floor(a/1e3%60),e=Math.floor(a/6e4%60),f=Math.floor(a/36e5%60);return m(f,2)+":"+m(e,2)+":"+m(d,2)+b+m(c,3)},a.loadFromLocal=function(){"undefined"!=typeof localStorage&&localStorage.lastSave&&confirm("Are you sure you want to load last auto save? \n\n This will overwrite your current work")&&(a.project.cues=[],a.project.cues=JSON.parse(localStorage.lastSave),a.reloadTrack(a.project.cues),a.showMsg("Restored form last auto save."))},a.vttOutput=function(b){for(var c="WEBVTT\n\n",d=0;d<b.length;d++){c+=d+1,c+="\n",c+=a.convert(b[d].begin,".")+" --> ";var e=void 0===b[d+1]?o(p.duration||0):b[d+1].begin;e=e?e-1:e,c+=a.convert(b[d].end?b[d].end:e,"."),c+="\n",c+=b[d].text,c+="\n\n"}return c},a.srtOutput=function(b){for(var c="",d=0;d<b.length;d++){c+=d+1,c+="\n",c+=a.convert(b[d].begin)+" --> ";var e=void 0===b[d+1]?o(p.duration||0):b[d+1].begin;e=e?e-1:e,c+=a.convert(b[d].end?b[d].end:e),c+="\n",c+=b[d].text,c+="\n\n"}return c},a.showMsg=function(b){a.system_msg=b,a.hasMsg=!0,c(function(){a.hasMsg=!1},4e3),c(function(){a.system_msg=null},5e3)},a.reloadTrack(a.project.cues),a.dirty=!1,a.$watch("videoUrl",function(){"undefined"!=typeof a.videoUrl&&p.setAttribute("controls","controls")}),p.volume=.2,j.isLoggedIn()&&(a.loadProject(),a.listProjects())}]),app.controller("loginCtrl",["$scope","Auth","$location",function(a,b,c){a.user={},a.errors={},a.login=function(d){a.submitted=!0,d.$valid&&b.login({email:a.user.email,password:a.user.password}).then(function(){c.path("/")}).catch(function(b){b=b.data,a.errors.other=b.message})}}]),app.controller("navbarCtrl",["$scope","$location","Auth",function(a,b,c){a.dropDownOpen=!1,a.menu=[{title:"HOME",link:"/","public":!0},{title:"SETTINGS",link:"/settings","public":!1},{title:"PROJECTS",link:"/projects","public":!1}],a.logout=function(){c.logout().then(function(){b.path("/login")})},a.isActive=function(a){return a===b.path()},a.toggleDropDown=function(){a.dropDownOpen=!a.dropDownOpen}}]),app.controller("signupCtrl",["$scope","Auth","$location",function(a,b,c){a.user={},a.errors={},a.register=function(d){a.submitted=!0,d.$valid&&b.createUser({name:a.user.name,email:a.user.email,password:a.user.password}).then(function(){c.path("/")}).catch(function(b){b=b.data,a.errors={},angular.forEach(b.errors,function(b,c){d[c].$setValidity("mongoose",!1),a.errors[c]=b.type})})}}]),app.controller("settingsCtrl",["$scope","User","Auth",function(a,b,c){a.errors={},a.changePassword=function(b){a.submitted=!0,b.$valid&&c.changePassword(a.user.oldPassword,a.user.newPassword).then(function(){a.message="Password successfully changed."}).catch(function(){b.password.$setValidity("mongoose",!1),a.errors.other="Incorrect password"})}}]);