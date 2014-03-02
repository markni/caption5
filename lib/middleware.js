'use strict';

/**
 * Custom middleware used by the application
 */
module.exports = {

  /**
   *  Protect routes on your api from unauthenticated access
   */
  auth: function auth(req, res, next) {
	  console.log('auth');
    if (req.isAuthenticated()) return next();
    res.send(401);
  },

  /**
   * Set a cookie for angular so it knows we have an http session
   */
  setUserCookie: function(req, res, next) {
	  console.log('setUserCookie');
	  console.log(req.user);
    if(req.user) {
      res.cookie('user', JSON.stringify(req.user.userInfo));
    }

    next();
  }
};