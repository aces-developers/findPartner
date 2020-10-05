'use strict';

const express = require('express');
const router = express.Router();
const userModel = require('../middleware/users-model');
const projectModel = require('../middleware/projects-model');
const votesModel = require('../middleware/vote-model');
const basicAuth = require('../middleware/basic');
const UserSchema = require('../collections-schema/users/user-schema');
const bearer = require('../middleware/bearer');
const Votes = require('../collections-schema/votes/votes-model');

//home/signup/signin ROUTES
router.get('/', handleHome);

router.post('/signup', userModel, handleSignUP);
router.get('/signup', handleSignUpPage);


router.post('/signin', basicAuth, handleSignIn);

//   project related routes
router.get('/newproject', bearer, newProjectPage);
router.post('/newproject', projectModel, bearer, handleNewProject);
router.get('/allprojects', projectModel, bearer, displayAll);
router.get('/project/:id', projectModel, bearer, display);
router.put('/project/:id', projectModel, bearer, updateProject);
router.delete('/project/:id', projectModel, bearer, deleteProject);
/* CRUD ROUTS start */
router.get('/users', userModel,  displayAll);

router.get('/user/:id', userModel,  getuser);
router.put('/user/:id', userModel, bearer, updateUser);
router.delete('/user/:id', userModel, bearer, deleteUser);
/*  CRUD ROUTS end */
// search routes
/**
 * search routes suppourts partial search and the search is passed through as a query 
 * example:http://localhost:3000/searchuser?q=u&search=username will return users that their name start with the letter u 
 */
router.get('/search',userModel ,bearer,handleSearch);
router.get('/searchprojects',projectModel ,bearer,handleSearch);

// route to get all projects for one user
router.get('/allproject/:id',projectModel,bearer,handleUserProjects);

//chat routes
router.get('/inbox/:id',userModel,bearer,handleInbox);

//post rating route 
router.post('/rate',votesModel,createVote);




/* ----------------------------------CALL BACKS BEGIN----------------------------------------- */

//RATE CALL back functions 

function createVote(req,res){
//   req.Votes.group().then(data=>{
//     console.log(data);
//     req.body=data.avgRating;
//   });
  //   console.log(grouped);
  req.model.create(req.body).then(data=>{
    res.status(200).json(data);
  }).catch(err=> {
    console.log(err);
   
  });
}

//chat call back functions
function handleInbox(req,res){
  let id = req.params.id;
  
}


// home call back functions
function handleHome(req, res) {
  res.send('hello world');

}

// callback for search route

function handleSearch (req,res){
  let q =req.query.q;
  let search =req.query.search;
  req.model.search(q,search).then(data=>{
    res.status(200).json(data);
  }).catch(err=> {
    console.log(err);
  });
}

// call back function for displaying all projects for ONE USER
function handleUserProjects(req,res){
  let id = req.params. _ownerId;
  req.model.find(id).then(data=>{
    res.status(200).json(data);
  }).catch(err=>{
    console.log(err);
  });
} 
// function will run on get /signup
function handleSignUpPage(req, res) {
  res.send(
    'this will contain the form ejs of the sign up and n oauth icon for google',
  );
}

//function will run on post /signup
async function handleSignUP(req, res, next) {
 
  req.model.create(req.body).then(data=>{
    res.status(201).json(data);
  }).catch(err=> {
    console.log(err);
    next(err);
  });
}

async function handleSignIn(req, res) {
  const { user, isValid } = req;
  if (isValid) {
    const authUser = new UserSchema({ username: user.username });
    const token = authUser.generateToken();
    res.cookie('token', token, { maxAge: 9000000, httpOnly: true });
    res.status(200).send({ user, token });
  } else {
    res.status(401).send({ msg: 'username/password is incorrect' });
  }
}

//=========================== project route call back functions ========================
function newProjectPage(req, res) {
  res.send('the new project form goes here');
}

function displayAll(req, res,next) {
  req.model
    .getall()
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
}

function handleNewProject(req, res,next) {
  req.body._ownerId = req.user._id;
  req.model
    .create(req.body)
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
}
function display(req, res,next) {
 
  let id = req.params.id;
  req.model
    .get(id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
}

function updateProject(req, res,next) {
  let id = req.params.id;
  console.log(req.user._id, '\n', req.body._ownerId);
  if (req.user._id == req.body._ownerId) {
    req.model
      .update(id, req.body)
      .then((data) => {
        res.status(201).json(data);
      })
      .catch((err) => {
        console.log(err);
        next(err);
      });
  } else {
    res.json('You Do not have access to do this action');
  }
}
function deleteProject(req, res) {
  if (req.user._id == req.body._ownerId) {
    let id = req.params.id;
    req.model
      .delete(id)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        console.log(err);

      });
  } else {
    res.json('You Do not have access to do this action');
  }
}

/* CRUD fuctions' Routs Start  */

function deleteUser(req, res) {
  let id = req.params.id;
  req.model
    .delete(id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
    
    });
}
//------------------
function getuser(req, res) {
  
  let id = req.params.id;
  let avg = Votes.group().then(data=>{
    console.log(data);
    let pos = data.map(function(e) { return e._id; }).indexOf(id);
    // req.body=data.avgRating;
    console.log('pos======>',pos);
    let avg = data[pos].avgRating;
    return avg;
  });
  req.body=avg;
  req.model
    .get(id)
    .then((data) => {
      res.status(201).json(data);
      console.log(req.body);
    })
    .catch((err) => {
      console.log(err);
    
    });
}
function updateUser(req, res) {
  let id = req.params.id;
  req.model
    .update(id, req.body)
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      console.log(err);
    
    });
}
/* CRUD fuctions' Routs End  */

module.exports = router;
