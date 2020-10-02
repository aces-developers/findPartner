'use strict';
const Users = require('../collections-schema/users/user-model');
// a function to control when to run users shecma . 
 module.exports = async (req, res, next) => {
    req.model = Users
    next();
}
