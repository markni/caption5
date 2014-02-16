'use strict';

var mongoose = require('mongoose'),
	Project = mongoose.model('Project');

/**
 * Create user
 */
exports.create = function (req, res, next) {
	if (req.user && req.user._id){
		var newProject = new Project(req.body);
		newProject._creator = req.user._id;
		newProject.save(function(err,doc) {
			if (err) {
				return res.json(400, err);
			}
			else {
				res.json(200,doc);
			}
		});
	}
	else{
		return res.send(403);
	}
};


exports.update = function(req,res,next){
	var projectId = req.params.id;
	Project.findById(projectId).populate('_creator').exec(function(err,project){

		project.save(function(err) {
			if (err) {
				return res.json(400, err);
			}
			else {
				res.send(200);
			}
		});

	});

};