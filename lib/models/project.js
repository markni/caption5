'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;


var ProjectSchema = new Schema({
	title:  String,
	cues: Array,
	created: {type:Date, default: Date.now},
	modified:{type:Date, default: Date.now},
	_creator: {type:Schema.Types.ObjectId, ref: 'User'}
});


mongoose.model('Project', ProjectSchema);
