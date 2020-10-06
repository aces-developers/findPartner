'user strict';

const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const applySchema = mongoose.Schema({
  userId: { type: String, required: true },
  projectId: { type: String, required: true },
  flag: { type: String, index: true, unique: true, required: true },
});
applySchema.plugin(uniqueValidator);
module.exports = mongoose.model('applySchema', applySchema);
