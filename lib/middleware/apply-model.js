'use strict';
// a function to control when to run projects shecma . 
const applyuser = require('../collections-schema/apply/apply-model');
module.exports = async (req, res, next) => {
  req.model = applyuser;
  next();
};