'use strict';

const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
  _ownerId: { type: String, required: true },
  _ownerName: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  isopen:{type :Boolean,defualt :true},
  category: { type: String, required: true,enum: ['engineering', 'arts',
    'business', 'communications', 'community','education','science','farming','health','it'] },
  budget: { type: String },
  //subCat
  skill: { type: String},
  lacation: {type: String},
});

module.exports = mongoose.model('projectSchema', projectSchema);
