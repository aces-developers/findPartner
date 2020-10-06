'use strict';
const schema = require('./user-schema');
const Model = require('../../model/mongo');

class Users extends Model {
  constructor() {
    super(schema);
  }
}
module.exports = new Users();