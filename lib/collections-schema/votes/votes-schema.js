'use strict';

const mongoose = require('mongoose');

const voteSchema = mongoose.Schema({
  _userid: { type: String, required: true },
  rating: { type: Number, required: true },

});
voteSchema.methods.group = function(){
 
};

module.exports = mongoose.model('voteSchema', voteSchema);
