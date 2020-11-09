'use strict';
class Model {
  constructor(schema) {
    this.schema = schema;
  }
  create(record) {
    let newRecord = new this.schema(record);
    console.log('create',newRecord);
    return newRecord.save();
  }
  get(_id) {
    let obj = _id ? { _id } : {};
    return this.schema.find(obj);
  }
  getApplied(arr) {
    let objsArr = arr.map((id)=>{
      return this.get(id);
    });
    return objsArr;
  }
  getall(){
    return this.schema.find({});
  }
  update(_id, record) {
    return this.schema.findByIdAndUpdate(_id, record,{new: true} );
  }
  delete(_id) {
    return this.schema.findByIdAndDelete(_id);
  }
  search(q,search){
    return this.schema.find({
      [search]:{
        $regex: new RegExp(q.toLowerCase()),
      },
  
    },{
      id:0,
      _v:0,
    }).limit(20);
  }
  searchp(q,search){
    return this.schema.find({
      [search]:{
        $regex: new RegExp(q.toLowerCase()) ,
      },
      isopen: true ,
    },{
      id:0,
      _v:0,
    }).limit(20);
  }
  group(){
    return this.schema.aggregate(
      [
        {
          $group:
            {
              _id: '$_userid',
              avgRating: { $avg: '$rating' },
            },
        },
      ],
    );
  }
  
}
module.exports =  Model;