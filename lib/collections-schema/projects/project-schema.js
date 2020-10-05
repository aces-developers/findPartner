'user strict';

const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
  _ownerId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true,enum: ['Engineering', 'Arts',
  'Business', 'Communications', 'Community','Education','Science','Farming','Health','IT'] },
  budget: { type: String },
  //subCat
  skill: { type: String},
  lacation: {type: String}
});

module.exports = mongoose.model('projectSchema', projectSchema);
