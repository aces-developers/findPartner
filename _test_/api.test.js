'use strict';

const { server } = require('../lib/server');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server);
const jwt = require("jsonwebtoken");
require("dotenv").config();

describe('Auth Router', () => {
  it('can sign up', async () => {
    const userData = {
      username: 'Ahmad',
      password: '123',
      fullname: 'AHMADK',
      email: 'aHMADK@jo.com',
      skill: 'web-DEV',
    };
    const results = await mockRequest
      .post('/signup')
      .send(userData);
    expect(results.body['username']).toEqual(userData['username']);
  });
  it('can signin with basic', async () => {
    const userData = {
        username: 'xxxx',
        password: '123',
        fullname: 'xxxx',
        email: 'xxx@jo.com',
        skill: 'web-DEV'
      };
          await mockRequest.post('/signup').send(userData);
    const results = await mockRequest.post('/signin').auth('xxxx', '123');
    const token = jwt.verify(results.body.token, process.env.JWT_SECRET_KEY);
    expect(token).toBeDefined();
  });

  it('can get all users with bearer', async () => {
   
    const userData = {
        username: 'yyyy',
        password: '123',
        fullname: 'yyyy',
        email: 'yyyy@jo.com',
        skill: 'web-DEV',
      };
    await mockRequest.post('/signup').send(userData);
    const results = await mockRequest.post('/signin').auth('xxxx', '123');
    const token = jwt.verify(results.body.token, process.env.JWT_SECRET_KEY);
    const results1 = await mockRequest.get('/users')
    .set('Authorization', 'Bearer ' + token)
    // console.log('results1.body/////////',results1);//status
    expect(typeof (results1.body)).toEqual(Object);
     });
    
  it('can get a user by id', async () => {
    const userData = {
        username: 'zzz',
        password: '123',
        fullname: 'zzz',
        email: 'zzz@jo.com',
        skill: 'web-DEV',
      };
      await mockRequest.post('/signup').send(userData);
   const results =   await mockRequest.post('/signin').auth('zzz', '123');
     const token = jwt.verify(results.body.token, process.env.JWT_SECRET_KEY);
      const xxx =  await mockRequest.get('/user/5f79c33aee2246080f0ccb93')
      .set('Authorization', 'Bearer ' + token)
        expect(typeof xxx).toBe(Object);
     });

     
});











// >>>>>>>>> I will be back in a min, other guys on their way back to home <<<<<<<<
































