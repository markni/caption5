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
	var updatedProject = req.body;
	Project.findById(projectId).exec(function(err,project){
		console.log(req.user._id.toString() == project._creator.toString());
		if (req.user !='undefined' && req.user._id && (req.user._id.toString() == project._creator.toString())){
			project.update(updatedProject,function(err) {
				if (err) {
					return res.json(400, err);
				}
				else {
					res.send(200);
				}
			});
		}
		else{
			return res.send(403);
		}


	});

};