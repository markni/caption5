'use strict';

var api = require('./controllers/api'),

	index = require('./controllers'),
	users = require('./controllers/users'),
	projects = require('./controllers/projects'),
	session = require('./controllers/session');

var middleware = require('./middleware');
var passport = require('passport');

/**
 * Application routes
 */
module.exports = function (app) {

	// Server API Routes
//  app.get('/api/awesomeThings', api.awesomeThings);
	app.get('/api/project/:id', projects.get);
	app.post('/api/project', projects.create);
	app.put('/api/project/:id', projects.update);
	app.delete('/api/project/:id', projects.remove);

	app.get('/api/projects', projects.listProjectsByUser);    //TODO: is there a better practice?

	app.post('/api/users', users.create);
	app.put('/api/users', users.changePassword);
	app.get('/api/users/me', users.me);
	app.get('/api/users/:id', users.show);

	//other login methods

	app.get('/auth/google',
		passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.profile',
			'https://www.googleapis.com/auth/userinfo.email'] }),
		function(req, res){
			// The request will be redirected to Google for authentication, so this
			// function will not be called.
		});

	app.get('/auth/google/callback',
		passport.authenticate('google', { failureRedirect: '/login' }), users.authWithGoogle);



	app.post('/api/session', session.login);
	app.del('/api/session', session.logout);

	// All other routes to use Angular routing in app/scripts/app.js
	app.get('/partials/*', index.partials);
	app.get('/*', middleware.setUserCookie, index.index);
};