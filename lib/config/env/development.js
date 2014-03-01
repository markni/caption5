'use strict';

module.exports = {
	env: 'development',
	mongo: {
		uri: 'mongodb://localhost/nagi-dev'
	},
	passport: {
		GOOGLE_CLIENT_ID: "347109469636.apps.googleusercontent.com",
		GOOGLE_CLIENT_SECRET: "CIYRrYtSXInnQD-lFFzOkTOi",
		GOOGLE_REDIRECT_URLS: "http://127.0.0.1:8005/auth/google/callback"
	}
};