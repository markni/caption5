'use strict';

var path = require('path'),
	config = require('../config/config');

/**
 * Send partial, or 404 if it doesn't exist
 */
exports.partials = function(req, res) {
  var stripped = req.url.split('.')[0];
  var requestedView = path.join('./', stripped);
  res.render(requestedView, function(err, html) {
    if(err) {
      res.send(404);
    } else {
      res.send(html);
    }
  });
};

/**
 * Send our single page app
 */
exports.index = function(req, res) {
	res.sendfile(config.root + '/public/index.html');
};
