'use strict';
const schema = require('./project-schema');
const model = require('../../model/mongo');
class Project extends model {
  constructor() {
    super(schema);
  }
  getListProject(list) {
    return this.schema.find({ _id: list });
  }
  getByOwner(_ownerId) {
    console.log(' getByOwner -->', _ownerId);
    let obj = _ownerId ? { _ownerId } : {};
    return this.schema.find(obj);
  }
  // searchp(q,search){
  //   return this.schema.find({
  //     [search]:{
  //       $regex: new RegExp(q.toLowerCase()) ,
  //     },
  //     isopen: true ,
  //   },{
  //     id:0,
  //     _v:0,
  //   }).limit(20);
  // }
}
module.exports = new Project();
