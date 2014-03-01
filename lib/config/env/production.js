'use strict';

module.exports = {
	env: 'production',
	mongo: {
		uri: process.env.MONGOLAB_URI ||
			process.env.MONGOHQ_URL ||
			'mongodb://localhost/nagi'
	},
	passport: {
		GOOGLE_CLIENT_ID: "347109469636-mgo4fbptmtnd27879pgpgn2k7i4s3aj0.apps.googleusercontent.com",
		GOOGLE_CLIENT_SECRET: "U-kdyt_0zuSxlPJKdo9eQH5M",
		GOOGLE_REDIRECT_URLS: "http://nagi.ca/auth/google/callback"
	}
};