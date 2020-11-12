'use strict';
class Model {
  constructor(schema) {
    this.schema = schema;
  }
  create(record) {
    let newRecord = new this.schema(record);
    console.log('create', newRecord);
    return newRecord.save();
  }
  get(_id) {
    console.log('_ID', _id);
    let obj = _id ? { _id } : {};
    console.log('obj', obj);
    return this.schema.find(obj);
  }
  getApplied(arr) {
    let objsArr = arr.map((id) => {
      return this.get(id);
    });
    return objsArr;
  }
  getall() {
    return this.schema.find().sort({ _id: -1 });
  }
  update(_id, record) {
    return this.schema.findByIdAndUpdate(_id, record, { new: true });
  }
  delete(_id) {
    return this.schema.findByIdAndDelete(_id);
  }
  search(q, search) {
    return this.schema
      .find(
        {
          [search]: {
            $regex: new RegExp(q.toLowerCase()),
          },
        },
        {
          id: 0,
          _v: 0,
        }
      )
      .limit(20);
  }
  // searchp(q, search) {
  //   return this.schema
  //     .find(
  //       {
  //         [search]: {
  //           $regex: new RegExp(q),
  //         },
  //         isopen: true,
  //       },
  //       {
  //         id: 0,
  //         _v: 0,
  //       }
  //     )
  //     .sort({ _id: -1 })
  //     .limit(20);
  // }
  group() {
    return this.schema.aggregate([
      {
        $group: {
          _id: '$_userid',
          avgRating: { $avg: '$rating' },
        },
      },
    ]);
  }
}
module.exports = Model;
