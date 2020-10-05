'use strict';

const { server } = require('../lib/server');
const supergoose = require('@code-fellows/supergoose');

const mockRequest = supergoose(server);

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
});
