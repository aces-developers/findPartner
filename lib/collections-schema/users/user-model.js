'use strict';
const schema = require('./user-schema');
const Model = require('../../model/mongo');

class Users extends Model {
  constructor() {
    super(schema);
  }
  getListUser(list){
    return this.schema.find({ _id: list},{username:1,email:1,_id:0});
  }
  getByEmail(email){
    console.log(' getByOwner -->',email)
    let obj = email ? { email } : {};
    return this.schema.find(obj);
  }
}
module.exports = new Users();