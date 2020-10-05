'use strict';
const Votes = require('../collections-schema/votes/votes-model');
// a function to control when to run users shecma . 
module.exports = async (req, res, next) => {
  req.model = Votes;
  next();
};
