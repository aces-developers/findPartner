'user strict';
const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    _ownerId: { type: String, required: true},
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    budget: { type: String,},
  });