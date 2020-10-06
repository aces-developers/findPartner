'use strict';

const { server } = require('../lib/server');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server);
const jwt = require("jsonwebtoken");
require("dotenv").config();
const projectSchema = require('../lib/collections-schema/projects/project-schema')

describe('Auth Router', () => {
  //********************************************************************* */

  it('can sign up', async () => {
    const userData = {
      username: 'Ahmad',
      password: '123',
      fullname: 'AHMADK',
      email: 'aHMADK@jo.com',
      skillCat: 'Engineering',
      skill: 'web-DEV'
    };
    const results = await mockRequest
      .post('/signup')
      .send(userData);
    expect(results.body['username']).toEqual(userData['username']);
  });
  //********************************************************************* */

  it('can signin with basic', async () => {
    const userData = {
      username: 'Ahmad01',
      password: '123',
      fullname: 'AHMADK01',
      email: 'aHMADK01@jo.com',
      skillCat: 'Engineering',
      skill: 'web-DEV'
    };
    await mockRequest.post('/signup').send(userData);
    const results = await mockRequest.post('/signin').auth('Ahmad01', '123');
    const token = jwt.verify(results.body.token, process.env.JWT_SECRET_KEY);
    console.log('results.body.user._id', results.body.user._id)
    console.log('results.body.tokemn', results.body.token)
    expect(token).toBeDefined();
  });
  //********************************************************************* */

  it('can add new project', async () => {
    const userData = {
      username: 'Ahmad01',
      password: '123',
      fullname: 'AHMADK01',
      email: 'aHMADK01@jo.com',
      skillCat: 'Engineering',
      skill: 'web-DEV'
    };

    await mockRequest.post('/signup').send(userData);
    const results = await mockRequest.post('/signin').auth('Ahmad01', '123');
    // const token = jwt.verify(results.body.token, process.env.JWT_SECRET_KEY);
    const userToken = results.body.token;
    const proj =
    {
      _ownerId: results.body.user._id,
      title: 'ProjAhmad01',
      description: 'DESCRIPTION',
      category: 'Science',
      budget: '987',
      skill: 'IT IS OPTIONAL',
      lacation: 'JOR'
    }
    const projectRes = await mockRequest.post('/newproject').send(proj)
      .set('Authorization', `Bearer ${userToken}`);
    // console.log(projectRes.body)
    expect(projectRes.type).toBe('application/json');
  });
  //********************************************************************* */

  it('can get a project', async () => {
    const userData = {
      username: 'Ahmad02',
      password: '123',
      fullname: 'AHMADK02',
      email: 'aHMADK02@jo.com',
      skillCat: 'Engineering',
      skill: 'web-DEV'
    };

    await mockRequest.post('/signup').send(userData);
    const results = await mockRequest.post('/signin').auth('Ahmad01', '123');
    // const token = jwt.verify(results.body.token, process.env.JWT_SECRET_KEY);
    const userToken = results.body.token;
    const proj =
    {
      _ownerId: results.body.user._id,
      title: 'ProjAhmad02',
      description: 'DESCRIPTION02',
      category: 'Science',
      budget: '987',
      skill: 'IT IS OPTIONAL',
      lacation: 'JOR'
    }
    const projectRes = await mockRequest.post('/newproject').send(proj)
      .set('Authorization', `Bearer ${userToken}`);
    const getProjRes = await mockRequest.get(`/project/${results.body.user._id}`)
      .set('Authorization', `Bearer ${userToken}`);
    // console.log('getProjRes.body',getProjRes.statusCode)
    expect(getProjRes.statusCode).toBe(200);
  });
  const userData = {
    username: 'Ahmad03',
    password: '123',
    fullname: 'AHMADK03',
    email: 'aHMADK03@jo.com',
    skillCat: 'Engineering',
    skill: 'web-DEV'
  };
  //********************************************************************* */

  it('can get all projects', async () => {
    const userData = {
      username: 'Ahmad03',
      password: '123',
      fullname: 'AHMADK03',
      email: 'aHMADK03@jo.com',
      skillCat: 'Engineering',
      skill: 'web-DEV'
    };
    await mockRequest.post('/signup').send(userData);
    const results = await mockRequest.post('/signin').auth('Ahmad03', '123');
    // const token = jwt.verify(results.body.token, process.env.JWT_SECRET_KEY);
    const userToken = results.body.token;
    const getProjRes = await mockRequest.get(`/allprojects`)
      .set('Authorization', `Bearer ${userToken}`);
    console.log('getProjRes.body', getProjRes.body)
    // console.log('getProjRes.body',getProjRes.statusCode)
    expect(getProjRes.statusCode).toBe(201);
  });


  //********************************************************************* */
  it('can update a project', async () => {
    let updatedProj = {
      title: 'ProjAhmad01',
      description: 'DESCRIPTION updatedupdatedupdated',
      category: 'Science',
      budget: '987',
      skill: 'IT IS OPTIONAL',
      lacation: 'JOR'

    }
    const results = await mockRequest.post('/signin').auth('Ahmad01', '123');

    const userToken = results.body.token;
    const getProjRes = await mockRequest.get(`/allprojects`)
      .set('Authorization', `Bearer ${userToken}`);
    let ProjectID = getProjRes.body[0]._id;

    let ownerId = results.body.user._id;

    const getProjRes1 = await mockRequest.put(`/project/${ProjectID}`).send(updatedProj)
      .set('Authorization', `Bearer ${userToken}`);
    // console.log('update.body',getProjRes1.statusCode)
    expect(getProjRes1.statusCode).toBe(200);

  });
  //********************************************************************* */
  it('can delete a project', async () => {
    let updatedProj = {
      title: 'ProjAhmad01',
      description: 'DESCRIPTION updatedupdatedupdated',
      category: 'Science',
      budget: '987',
      skill: 'IT IS OPTIONAL',
      lacation: 'JOR'

    }
    const results = await mockRequest.post('/signin').auth('Ahmad01', '123');

    const userToken = results.body.token;
    const getProjRes = await mockRequest.get(`/allprojects`)
      .set('Authorization', `Bearer ${userToken}`);
    let ProjectID = getProjRes.body[0]._id;

    let ownerId = results.body.user._id;

    const getProjRes1 = await mockRequest.delete(`/project/${ProjectID}`).send(updatedProj)
      .set('Authorization', `Bearer ${userToken}`);
    //  console.log('update.body',getProjRes1.statusCode)
    expect(getProjRes1.statusCode).toBe(200);

  });

  //********************************************************************* */

  it('can get all users', async () => {
    const userData = {
      username: 'Ahmad03',
      password: '123',
      fullname: 'AHMADK03',
      email: 'aHMADK03@jo.com',
      skillCat: 'Engineering',
      skill: 'web-DEV'
    };
    await mockRequest.post('/signup').send(userData);
    const results = await mockRequest.post('/signin').auth('Ahmad03', '123');
    const userToken = results.body.token;
    const getUsersRes = await mockRequest.get(`/users`)
      .set('Authorization', `Bearer ${userToken}`);
    // console.log('getUserRes.body',getUserRes.body)
    expect(getUsersRes.statusCode).toBe(201);
  });
  //********************************************************************* */

  it('can rate a user', async () => {
   
    const results = await mockRequest.post('/signin').auth('Ahmad03', '123');
    const userToken = results.body.token;
    const getUserRes = await mockRequest.get(`/users`)
      .set('Authorization', `Bearer ${userToken}`);
    // console.log('ALL USERS:::::::::', getUserRes.body)
    console.log('results.body.user._id:::::::::', results.body.user._id)

    const rattedUser = {
      _userid: results.body.user._id,
      // _userid: getUserRes.body[0]._id,
      rating: 5
    }
    const results1 = await mockRequest
      .post('/rate')
      .send(rattedUser);
    // console.log('RESULT BODY:::::::::', results1.body)
    // console.log('RESULT BODY:::::::::', results1.statusCode)
    expect(results1.statusCode).toBe(200);

    expect(results1.body['_userid']).toEqual(rattedUser['_userid']);
  });
  //********************************************************************* */

  it('can get a user', async () => {

    const results = await mockRequest.post('/signin').auth('Ahmad03', '123');
    const userToken = results.body.token;

    const getUserRes = await mockRequest.get(`/user/${results.body.user._id}`)
      .set('Authorization', `Bearer ${userToken}`);
    // console.log('getUserRes.body',getUserRes.statusCode)
    expect(getUserRes.statusCode).toBe(201);
  });
  //********************************************************************* */
  it('can update a user', async () => {
    let updatedUser = {
      username: 'Ahmad01',
      password: '123',
      fullname: 'AHMADK01',
      email: 'aHMADK01@jo.com',
      skillCat: 'Engineering',
      skill: 'web-DEV UpdatedUpdatedUpdated'

    }
    const results = await mockRequest.post('/signin').auth('Ahmad01', '123');

    const userToken = results.body.token;
    // const getUserRes = await mockRequest.get(`/users`)
    //   .set('Authorization', `Bearer ${userToken}`);

    let userID = results.body.user._id;

    const getUserRes1 = await mockRequest.put(`/user/${userID}`).send(updatedUser)
      .set('Authorization', `Bearer ${userToken}`);
    //  console.log('update.body',getUserRes1.statusCode)
    expect(getUserRes1.statusCode).toBe(201);

  });
  //********************************************************************* */
  it('can delete a user', async () => {
    let updatedUser = {
      username: 'Ahmad011',
      password: '123',
      fullname: 'AHMADK011',
      email: 'aHMADK011@jo.com',
      skillCat: 'Engineering',
      skill: 'web-DEV UpdatedUpdatedUpdated'

    }
    const results = await mockRequest.post('/signin').auth('Ahmad02', '123');

    const userToken = results.body.token;
    const getUserRes = await mockRequest.get(`/users`)
      .set('Authorization', `Bearer ${userToken}`);
    //  console.log('results.body>>>>>>>>>>',results.body)

    let userID = results.body.user._id;
    const getUserRes1 = await mockRequest.delete(`/user/${userID}`).send(updatedUser)
      .set('Authorization', `Bearer ${userToken}`);
    expect(getUserRes1.statusCode).toBe(200);

  });
  //********************************************************************* */

  it('can search for a user', async () => {
    const userData = {
      username: 'Ahmad077',
      password: '123',
      fullname: 'AHMADK077',
      email: 'aHMADK077@jo.com',
      skillCat: 'Engineering',
      skill: 'web-DEV'
    };
    await mockRequest.post('/signup').send(userData);
    const results = await mockRequest.post('/signin').auth('Ahmad077', '123')
    const userToken = results.body.token;
    // console.log('PRINT THE Ahmad077 OBJ',results.body)

    let searchTerm = 'Ah';
    const getUserRes = await mockRequest.get(`/search?q=${searchTerm}&search=username`)
      .set('Authorization', `Bearer ${userToken}`);
    // console.log('getUserRes.body',getUserRes.body)
    expect(getUserRes.statusCode).toBe(200);
  });

  // //********************************************************************* */

  // it('can rate a user', async () => {
   
  //   const results = await mockRequest.post('/signin').auth('Ahmad077', '123');
  //   const userToken = results.body.token;
  //   const getUserRes = await mockRequest.get(`/users`)
  //     .set('Authorization', `Bearer ${userToken}`);
  //   // console.log('ALL USERS:::::::::', getUserRes.body)

  //   const rattedUser = {
  //     _userid: getUserRes.body[0]._id,
  //     rating: 5
  //   }
  //   const results1 = await mockRequest
  //     .post('/rate')
  //     .send(rattedUser);
  //   // console.log('RESULT BODY:::::::::', results1.body)
  //   // console.log('RESULT BODY:::::::::', results1.statusCode)
  //   expect(results1.statusCode).toBe(200);

  //   expect(results1.body['_userid']).toEqual(rattedUser['_userid']);
  // });
   //********************************************************************* */

   it('can apply for a project', async () => {
    
    const results = await mockRequest.post('/signin').auth('Ahmad077', '123');
    const userToken = results.body.token;
    const getProjRes = await mockRequest.get(`/allprojects`)
    .set('Authorization', `Bearer ${userToken}`);
    // console.log('getProjRes.body========>',getProjRes.body);
    const targetProject = getProjRes.body[0]._id;
    const getUserRes1 = await mockRequest.post(`/apply/${targetProject}`)
      .set('Authorization', `Bearer ${userToken}`);
      // console.log('it is me ',getUserRes1.body)
    expect(getUserRes1.statusCode).toBe(201);
  
  });
    //********************************************************************* */

    it('can return all projects That spacifc user applied on ', async () => {
    
      const results = await mockRequest.post('/signin').auth('Ahmad077', '123');
      const userToken = results.body.token;
      const getUserRes1 = await mockRequest.get(`/allapply`)
        .set('Authorization', `Bearer ${userToken}`);
        // console.log('it is me ',getUserRes1.body)
      expect(getUserRes1.statusCode).toBe(201);
    
    });
      //********************************************************************* */

      it('can return all users whose applied in spacifc project ', async () => {
    
        const results = await mockRequest.post('/signin').auth('Ahmad077', '123');
        const userToken = results.body.token;
        const getProjRes = await mockRequest.get(`/allprojects`)
        .set('Authorization', `Bearer ${userToken}`);
        // console.log('getProjRes.body========>',getProjRes.body);
        const targetProject = getProjRes.body[0]._id;
        const getUserRes1 = await mockRequest.get(`/allapplyuser/${targetProject}`)
        .set('Authorization', `Bearer ${userToken}`);
        // console.log('it is me ',getUserRes1.body)
      expect(getUserRes1.statusCode).toBe(201);
       
      
      });
});
