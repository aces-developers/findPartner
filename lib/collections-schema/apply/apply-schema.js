'user strict';

const mongoose = require('mongoose');

const applySchema = mongoose.Schema({
  userId: { type: String, required: true },
  projectId: { type: String, required: true },
  
});

module.exports = mongoose.model('applySchema', applySchema);
