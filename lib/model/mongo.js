'use strict';
class Model {
  constructor(schema) {
    this.schema = schema;
  }
  create(record) {
    let newRecord = new this.schema(record);
    return newRecord.save();
  }
  get(_id) {
    let obj = _id ? { _id } : {};
    return this.schema.find(obj);
  }
  getall(){
    return this.schema.find({});
  }
  update(_id, record) {
    return this.schema.findByIdAndUpdate(_id, record);
  }
  delete(_id) {
    return this.schema.findByIdAndDelete(_id);
  }
  search(q){
    return this.schema.find({
      username:{
        $regex: new RegExp(q),
      },
  
    },{
      id:0,
      _v:0,
    }).limit(10);
  }
  searchTitle(q){
    return this.schema.find({
      title:{
        $regex: new RegExp(q),
      },
  
    },{
      id:0,
      _v:0,
    }).limit(10);
  }
  searchSkill(q){
    return this.schema.find({
      skill:{
        $regex: new RegExp(q),
      },
  
    },{
      id:0,
      _v:0,
    }).limit(10);
  }
  
}
module.exports =  Model;