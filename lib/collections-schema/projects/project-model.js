'use strict';
const schema = require('./project-schema');
const model = require('../../model/mongo');
class Project extends model {
  constructor() {
    super(schema);
  }
}
module.exports = new Project();
