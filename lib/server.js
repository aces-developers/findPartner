'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(bodyParser.json());
const routes = require('./router/routes');
app.use(routes);
app.use(express.static('./public'));
app.set('view engine', 'ejs');




module.exports = {
  server: app,
  start:() => {
    let PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
  },
};