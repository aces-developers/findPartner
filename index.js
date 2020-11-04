'use strict';
const mongoose = require('mongoose');
const serverModule = require('./lib/server');
require('dotenv').config();
const mongooseOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

let MONGOOSE_URL = process.env.MONGO_WALEED;
mongoose
  .connect(MONGOOSE_URL, mongooseOptions)
  .then(() => console.log('mongodb connected'))
  .catch((err) => console.log(err));
serverModule.start();
