app.factory('Auth', function Auth($location, $rootScope, Session, User, $cookieStore) {

		// Get currentUser from cookie


		$rootScope.currentUser = $cookieStore.get('user') || null;
		$cookieStore.remove('user');

		return {

			/**
			 * Authenticate user
			 *
			 * @param  {Object}   user     - login info
			 * @param  {Function} callback - optional
			 * @return {Promise}
			 */
			login: function(user, callback) {
				var cb = callback || angular.noop;

				return Session.save({
					email: user.email,
					password: user.password
				}, function(user) {
					$rootScope.currentUser = user;
					return cb();
				}, function(err) {
					return cb(err);
				}).$promise;
			},

			/**
			 * Unauthenticate user
			 *
			 * @param  {Function} callback - optional
			 * @return {Promise}
			 */
			logout: function(callback) {
				var cb = callback || angular.noop;

				return Session.delete(function() {
						$rootScope.currentUser = null;
						$cookieStore.remove('user');
						return cb();
					},
					function(err) {
						return cb(err);
					}).$promise;
			},

			/**
			 * Create a new user
			 *
			 * @param  {Object}   user     - user info
			 * @param  {Function} callback - optional
			 * @return {Promise}
			 */
			createUser: function(user, callback) {
				var cb = callback || angular.noop;

				return User.save(user,
					function(user) {
						$rootScope.currentUser = user;
						return cb(user);
					},
					function(err) {
						return cb(err);
					}).$promise;
			},

			/**
			 * Change password
			 *
			 * @param  {String}   oldPassword
			 * @param  {String}   newPassword
			 * @param  {Function} callback    - optional
			 * @return {Promise}
			 */
			changePassword: function(oldPassword, newPassword, callback) {
				var cb = callback || angular.noop;

				return User.update({
					oldPassword: oldPassword,
					newPassword: newPassword
				}, function(user) {
					return cb(user);
				}, function(err) {
					return cb(err);
				}).$promise;
			},

			/**
			 * Gets all available info on authenticated user
			 *
			 * @return {Object} user
			 */
			currentUser: function() {
				return User.get();
			},

			/**
			 * Simple check to see if a user is logged in
			 *
			 * @return {Boolean}
			 */
			isLoggedIn: function() {
				var user = $rootScope.currentUser;
				return !!user;
			}
		};
	});


app.factory('Session', function ($resource) {
	return $resource('/api/session/');
});


app.factory('User', function ($resource) {
	return $resource('/api/users/:id', {
		id: '@id'
	}, { //parameters default
		update: {
			method: 'PUT',
			params: {}
		},
		get: {
			method: 'GET',
			params: {
				id:'me'
			}
		}
	});
});


app.factory('Project',function($resource){
	return $resource('/api/project/:id',null,{
		update: {method:'PUT'}
	});
});

app.factory('Projects',function($resource){
	return $resource('/api/projects/');

});

app.factory('YoutubeData',function($resource){

	return $resource('https://www.googleapis.com/youtube/v3/videos?id=:id&key=:key&part=snippet', {
		id: '@id',
		key: '@key'
	}, { //parameters default
		get: {
			method: 'GET',
			params: {
				key:'AIzaSyB3BzYUE4RZsV9HBdL_GUMNm7CcHJbqEZ8'
			}
		}
	});

});