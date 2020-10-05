'use strict';
const schema = require('./apply-schema');
const model = require('../../model/mongo');
class Apply extends model {
  constructor() {
    super(schema);
  }
}
module.exports = new Apply();
