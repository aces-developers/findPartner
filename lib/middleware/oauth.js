const superagent = require('superagent');
const users = require('../collections-schema/users/user-model');
const User=require('../collections-schema/users/user-schema');
require('dotenv').config();
const {
  CLIENT_ID,
  CLIENT_SECRET,
} = process.env;
const API_SERVER = 'http://localhost:3000/oauth';

module.exports = async function (req, res, next) {
  try {
    const {
      code,
    } = req.query;
    console.log('second log')
    console.log('(1) CODE:', code);

    const remoteToken = await exchangeCodeForToken(code);
    console.log('(2) ACCESS TOKEN:', remoteToken);

    const remoteUser = await getRemoteUserInfo(remoteToken);
    console.log('(3) GOOGLE USER', remoteUser);

    const data = await getUser(remoteUser);
    console.log(data);
    req.token = data[1];
    req.user = data[0].username;

    console.log('(4) LOCAL USER', req.user);
    next();
  } catch (e) {
    next(`ERROR: ${e.message}`);
  }
};

// this will use the access_token github api endpoint
async function exchangeCodeForToken(code) {
  const tokenResponse = await superagent.post('https://www.googleapis.com/oauth2/v4/token')
    .send({
      code,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: API_SERVER,
      grant_type: 'authorization_code',
     });

  console.log('exchangeCodeForToken Out');

  const {
    access_token,
  } = tokenResponse.body;
  return access_token;
}

// this will use the user api endpoint to get user info/repo info
async function getRemoteUserInfo(token) {
  // this will use the access token to get user details
  const userResponse = await superagent.get(`https://oauth2.googleapis.com/tokeninfo?access_token=${token}`)
    .set('user-agent', 'express-app')
    .set('Authorization', `token ${token}`);

  const user = userResponse.body;
  return user;
}

async function getUser(remoteUser) {
    console.log('remoteUser : ',remoteUser)
  const userRecord = {
    email: remoteUser.email,
    username:remoteUser.email,
    //password:null,

  };
   // console.log('userRecord : ',userRecord)
    const user = await users.create(userRecord);
    console.log('user : --- >  ',user)
    
    const authUser = new User({ username: user.username });
    const token = authUser.generateToken();
    console.log('token : ', token);
    return [user,token];
}