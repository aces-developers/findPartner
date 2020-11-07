'use strict';
const schema = require('./user-schema');
const Model = require('../../model/mongo');

class Users extends Model {
  constructor() {
    super(schema);
  }
  getByEmail(email){
    console.log(' getByOwner -->',email)
    let obj = email ? { email } : {};
    return this.schema.find(obj);
  }
}
module.exports = new Users();