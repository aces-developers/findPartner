
'use strict';
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userSchema = mongoose.Schema({
  username: { type: String ,required: true },
  password: { type: String, default:null},
  fullname: { type: String,default:null },
  email: { type: String, index: true, unique: true, required: true },
  skillCat:{type: String, required:true, 
    enum: ['engineering', 'arts',
      'business', 'communications', 'community','education','science','farming','health','it']},
  //subCat
  skill: { type: String},
});

userSchema.plugin(uniqueValidator);
userSchema.index({'username':'text','skill':'text'});
if(this.password !== null){

  userSchema.pre('save', async function (next) {
    console.log('pre save');
    
    this.password = await bcrypt.hash(this.password, 10);
    next();
  });
}


userSchema.methods.authenticateUser = function () {
  return new Promise((resolve, reject) => {
    const { username, password } = this;
    this.constructor.findOne({ username }).then(async (user) => {
      if (user) {
        const isValid = await bcrypt.compare(password, user.password);
        resolve({ isValid, user });
      } else {
        reject(new Error('username/password incorrect'));
      }
    });
  });
};

userSchema.methods.generateToken = function () {
  const { username } = this;
  console.log('generateToken' , this );
  const token = jwt.sign({ username }, process.env.JWT_SECRET_KEY);
  return token;
};

userSchema.statics.decodeToken = function (token) {
  return new Promise((resolve, reject) => {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      this.findOne({ username: decoded.username }).then((user) => {
        if (!user) return reject(new Error('invalidToken!'));
        resolve(user);
      });
    } catch (error) {
      reject(error);
    }
  });
};



module.exports = mongoose.model('userSchema', userSchema);
