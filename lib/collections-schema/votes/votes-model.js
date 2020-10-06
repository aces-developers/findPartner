'use strict';
const schema = require('./votes-schema');
const model = require('../../model/mongo');
class Vote extends model {
  constructor() {
    super(schema);
  }
}
module.exports = new Vote();
