const superagent = require('superagent');
const users = require('../collections-schema/users/user-model');
const User = require('../collections-schema/users/user-schema');
require('dotenv').config();

const CLIENT_ID = process.env.CLIENT_ID_LINKEDIN;
const CLIENT_SECRET = process.env.CLIENT_SECRET_LINKEDIN;
const API_SERVER = 'http://localhost:3000/oauthlinked';
const remoteAPI = process.env.REMOTE_API_LINKEDIN;
const tokenServerURL = process.env.TOKEN_SERVER_LINKEDIN;
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
    console.log('shduhfusaohdf;oawi')
    let tokenResponse = await superagent.post('https://www.linkedin.com/oauth/v2/accessToken').type('form').send({
        code: code,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: API_SERVER,
        grant_type: 'authorization_code',
    });

   

    const access_token = tokenResponse.body.access_token;
    console.log('exchangeCodeForToken Out', access_token);
    return access_token;
}

// this will use the user api endpoint to get user info/repo info
async function getRemoteUserInfo(token) {
    console.log('getRemoteUserInfo');

    // this will use the access token to get user details
    const userResponse = await superagent.get(remoteAPI)
        .set('Authorization', ` Bearer ${token}`);
    console.log('sjdfhdsf');
    const user = userResponse.body;
    console.log('Authorization : ',user);
    return user;
}

async function getUser(remoteUser) {
    console.log('remoteUser : ' )
    // const userRecord = {
    //     email: remoteUser.email,
    //     username: remoteUser.email,
    //     //password:null,

    // };
    // // console.log('userRecord : ',userRecord)
    // const user = await users.create(userRecord);
    // console.log('user : --- >  ', user)

    // const authUser = new User({ username: user.username });
    // const token = authUser.generateToken();
    // console.log('token : ', token);
    // return [user, token];
}