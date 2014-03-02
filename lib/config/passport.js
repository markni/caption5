'use strict';

var mongoose = require('mongoose'),
	User = mongoose.model('User'),
	passport = require('passport'),
	config = require('./config'),
	LocalStrategy = require('passport-local').Strategy,
	GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


/**
 * Passport configuration
 */
module.exports = function () {
	// API Access link for creating client ID and secret:
	// https://code.google.com/apis/console/
	var GOOGLE_CLIENT_ID = config.passport.GOOGLE_CLIENT_ID;
	var GOOGLE_CLIENT_SECRET = config.passport.GOOGLE_CLIENT_SECRET;
	var GOOGLE_REDIRECT_URLS = config.passport.GOOGLE_REDIRECT_URLS;

	passport.serializeUser(function (user, done) {
		console.log('serializeUser');

		console.log(user);

		done(null, user.id);
	});
	passport.deserializeUser(function (id, done) {
		console.log('deserializeUser');

		console.log(id);
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
			callbackURL: GOOGLE_REDIRECT_URLS
		},
		function(accessToken, refreshToken, profile, done) {

			User.findOne({
				email: profile._json.email
			}, function (err, user) {
				if (err) return done(err);

				if (!user) {
					user = new User({
						name: profile.displayName,
						email: profile.emails[0].value,
						provider: 'google',
						google: profile._json
					});
					user.save(function(err) {
						if (err) console.log(err);
						return done(err, user);
					});
				} else {
					return done(err, user);
				}

			});


		}
	));


};