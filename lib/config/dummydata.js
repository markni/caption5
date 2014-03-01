'use strict';

var mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Thing = mongoose.model('Thing'),
	Project = mongoose.model('Project');

/**
 * Populate database with sample application data
 */

////Clear old things, then add things in
//Thing.find({}).remove(function () {
//	Thing.create({
//			name: 'AngularJS',
//			info: 'AngularJS is a toolset for building the framework most suited to your application development.',
//			awesomeness: 10
//		}, {
//			name: 'Karma',
//			info: 'Spectacular Test Runner for JavaScript.',
//			awesomeness: 10
//		}, {
//			name: 'Express',
//			info: 'Flexible and minimalist web application framework for node.js.',
//			awesomeness: 10
//		}, {
//			name: 'MongoDB + Mongoose',
//			info: 'An excellent document database. Combined with Mongoose to simplify adding validation and business logic.',
//			awesomeness: 10
//		}, function () {
//			console.log('finished populating things');
//		}
//	);
//});

// Clear old users, then add a default user
//User.find({name:'Test User'}).remove(function () {
//	User.create({
//			provider: 'local',
//			name: 'Test User',
//			email: 't@t.com',
//			password: 'test'
//		}, function (err, user) {
//			console.log('finished populating test user ' + user._id);
//
//			Project.find({}).remove(function () {
//				Project.create({title: 'test project',remote:'http://www.w3schools.com/html/movie.mp4', cues: [
//					{text: 'Thanks for using Caption5!', begin: 1000, end: 3999},
//					{text: 'Looks like your video is working', begin: 4000, end: 7999},
//					{text: 'Now go ahead and click the Start Project button on the top', begin: 8000, end: 11999},
//					{text: 'And you can start working !', begin: 12000, end: 15999},
//					{text: 'The captions you entered will be listed on the right', begin: 16000, end: 19999},
//					{text: 'If you want to adjust them, simple click on the text you want to edit', begin: 20000, end: 23999}
//				], _creator: user._id}, {title: 'test project 2', cues: [
//					{text: 'Thanks for using Caption5!', begin: 1000, end: 3999},
//					{text: 'Looks like your video is working', begin: 4000, end: 7999},
//					{text: 'Now go ahead and click the Start Project button on the top', begin: 8000, end: 11999},
//					{text: 'And you can start working !', begin: 12000, end: 15999},
//					{text: 'The captions you entered will be listed on the right', begin: 16000, end: 19999},
//					{text: 'If you want to adjust them, simple click on the text you want to edit', begin: 20000, end: 23999}
//				], _creator: user._id}, function (err) {
//					console.log('finished populating dummy project');
//				});
//			});
//
//		}
//	);
//});


