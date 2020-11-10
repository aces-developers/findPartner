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
  getProjectIdByUserID(userId){
   // let obj = userId ? { userId } : {};
    console.log('obj --> ', userId);
   // find( { _id}, { projectID: 1, _id: 0 }
    
    return this.schema.find( { userId: userId }, { projectId: 1, _id: 0 } );
  }

  getProposal(projectId){
    return this.schema.find( { projectId: projectId }, { proposal: 1,userId:1, _id: 0 } );
  }
}
module.exports = new Apply();
