'use strict';
// a function to control when to run projects shecma . 
const projects = require('../collections-schema/projects/project-model');
module.exports = async (req, res, next) => {
    req.model = projects
    next();
}