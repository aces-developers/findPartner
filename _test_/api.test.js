'use strict';

const jwt = require('jsonwebtoken');
const  route  = require('../lib/router/routes');
const supergoose = require('@code-fellows/supergoose');

const mockRequest = supergoose(route);

describe('Auth Router', () => {
    it('can sign up', async () => {
      const userData = {
        username:'Ahmad',
        password: '123',
        fullname:'AHMADK',
        email: 'aHMADK@jo.com',
        skill: 'web-DEV'
      };
      const results = await mockRequest.post('/signup').send(userData);
      let user = results.body;
    //   expect(userData[username]).toEqual(user[username]);
    });

// });
});

