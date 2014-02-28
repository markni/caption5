'use strict';

var mongoose = require('mongoose'),
	User = mongoose.model('User'),
	passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

/**
 * Passport configuration
 */
module.exports = function () {
	// API Access link for creating client ID and secret:
	// https://code.google.com/apis/console/
	var GOOGLE_CLIENT_ID = "347109469636.apps.googleusercontent.com";
	var GOOGLE_CLIENT_SECRET = "CIYRrYtSXInnQD-lFFzOkTOi";

	passport.serializeUser(function (user, done) {
		done(null, user.id);
	});
	passport.deserializeUser(function (id, done) {
		User.findOne({
			_id: id
		}, '-salt -hashedPassword', function (err, user) { // don't ever give out the password or salt
			done(err, user);
		});
	});

	// add other strategies for more authentication flexibility
	passport.use(new LocalStrategy({
			usernameField: 'email',
			passwordField: 'password' // this is the virtual field on the model
		},
		function (email, password, done) {
			User.findOne({
				email: email
			}, function (err, user) {
				if (err) return done(err);

				if (!user) {
					return done(null, false, {
						message: 'This email is not registered.'
					});
				}
				if (!user.authenticate(password)) {
					return done(null, false, {
						message: 'This password is not correct.'
					});
				}
				return done(null, user);
			});
		}
	));

	passport.use(new GoogleStrategy({
			clientID: GOOGLE_CLIENT_ID,
			clientSecret: GOOGLE_CLIENT_SECRET,
			callbackURL: "http://127.0.0.1:8005/auth/google/callback"
		},
		function(accessToken, refreshToken, profile, done) {
			// asynchronous verification, for effect...
			process.nextTick(function () {

				// To keep the example simple, the user's Google profile is returned to
				// represent the logged-in user.  In a typical application, you would want
				// to associate the Google account with a user record in your database,
				// and return that user instead.
				return done(null, profile);
			});
		}
	));


};