'use strict';
const schema = require('./apply-schema');
const model = require('../../model/mongo');
class Apply extends model {
  constructor() {
    super(schema);
  }
  geUsertById(userId){
    let obj = userId ? { userId } : {};
    return this.schema.find(obj);
  }
  getProjectById(projectId){
    let obj = projectId ? { projectId } : {};
    console.log('obj --> ', obj);
    return this.schema.find(obj);
  }
}
module.exports = new Apply();
