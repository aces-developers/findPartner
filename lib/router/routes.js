
'use strict';

const express = require('express');
const router = express.Router();
const userModel = require('../middleware/users-model');
const projectModel = require('../middleware/projects-model')
const basicAuth = require('../middleware/basic')
const UserSchema = require('../collections-schema/users/user-schema');
const bearer = require('../middleware/bearer');


// GET ROUTES
router.get('/',handleHome)
router.get('/signup',handleSignUpPage)
router.post('/signup',userModel,handleSignUP)
router.post("/signin", basicAuth,handleSignIn);

//   project related routes
router.get('/newproject',bearer,newProjectPage);
router.post('/newproject',projectModel,handleNewProject);
router.get('/allprojects',projectModel,displayAll);
router.get('/project/:id',projectModel,displayProject);
router.put('/project/:id',projectModel,updateProject);
router.delete('/project/:id',projectModel,deleteProject);


// routes call back functions
function handleHome(req,res){
    res.send('hello world');
}

// function will run on get /signup
function handleSignUpPage(req,res){
    res.send('this will contain the form ejs of the sign up and n oauth icon for google')
}

//function will run on post /signup
async function handleSignUP(req,res,next){

    req.model.create(req.body).then(data=>{
        res.status(201).json(data);
    }).catch(err=> {
        console.log(err);
        next(err);
    });
}

async function handleSignIn (req, res){
    const { user, isValid } = req;
    if (isValid) {
      const authUser = new UserSchema({ username: user.username });
      const token = authUser.generateToken();
      res.cookie("token", token, { maxAge: 900000, httpOnly: true });
      res.status(200).send({ user, token });
    } else {
      res.status(401).send({ msg: "username/password is incorrect" });
    }
  }

function newProjectPage (req,res){
    res.send('the new project form goes here')
}

function displayAll(req,res){

    req.model.getall().then(data=>{
        res.status(201).json(data);
    }).catch(err=> {
        console.log(err);
        next(err);
    });
}

function handleNewProject(req,res){
    req.model.create(req.body).then(data=>{
        res.status(201).json(data);
    }).catch(err=> {
        console.log(err);
        next(err);
    });

}
function  displayProject(req,res){
    let id = req.params.id
    req.model.get(id).then(data=>{
        res.status(200).json(data);
    }).catch(err=> {
        console.log(err);
        next(err);
    });
}

function updateProject(req,res){
    let id = req.params.id
    req.model.update(id,req.body).then(data=> {
        res.status(201).json(data);
    }).catch(err=>{
        console.log(err);
        next(err);
    });
}
function deleteProject(req,res){
    let id = req.params.id
    req.model.delete(id).then(data=> {
        res.status(200).json(data);
    }).catch(err=>{
        console.log(err);
        next(err);
    });
}
module.exports = router