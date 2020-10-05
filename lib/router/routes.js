
'use strict';
//1047333031626-5aj6tflpq3n78344rb2cvj68q1s3je2t.apps.googleusercontent.com
var request = require('request');
const express = require('express');
const ejs = require('ejs');
const app = express();
const router = express.Router();
const userModel = require('../middleware/users-model');
const projectModel = require('../middleware/projects-model')
const basicAuth = require('../middleware/basic')
const UserSchema = require('../collections-schema/users/user-schema');
const bearer = require('../middleware/bearer');
const oauth = require('../middleware/oauth');
app.use(express.static('./public'));
app.set('view engine', 'ejs');
//home/signup/signin ROUTES
router.get('/', handleHome)
router.get('/signup', handleSignUpPage)
router.post('/signup', userModel, handleSignUP)
router.post("/signin", basicAuth, handleSignIn);
router.get('/users', userModel,displayAll);
//   project related routes
router.get('/newproject', bearer, newProjectPage);
router.post('/newproject', projectModel, bearer, handleNewProject);
router.get('/allprojects', projectModel, bearer, displayAll);
router.get('/project/:id', projectModel, bearer, displayProject);
router.put('/project/:id', projectModel, bearer, updateProject);
router.delete('/project/:id', projectModel, bearer, deleteProject);
//router.post('/completeregister',handleregister);
router.get('/oauth', oauth, handleoauth);
//aouth
function handleoauth(req, res) {
    res.status(200).render('index', {
        token: req.token,
        user: req.user.username,
      });
}


// routes call back functions
function handleHome(req, res) {
    res.send('hello world');
}

// function will run on get /signup
function handleSignUpPage(req, res) {
    res.send('this will contain the form ejs of the sign up and n oauth icon for google')
}

//function will run on post /signup
async function handleSignUP(req, res, next) {

    req.model.create(req.body).then(data => {
        res.status(201).json(data);
    }).catch(err => {
        console.log(err);
        next(err);
    });
}

async function handleSignIn(req, res) {
    
    const { user, isValid } = req;
    if (isValid) {
        const authUser = new UserSchema({ username: user.username });
        const token = authUser.generateToken();
        res.cookie("token", token, { maxAge: 9000000, httpOnly: true });
        res.status(200).send({ user, token });
    } else {
        res.status(401).send({ msg: "username/password is incorrect" });
    }
}


//=========================== project route call back functions ========================
function newProjectPage(req, res) {
    res.send('the new project form goes here')
}

function displayAll(req, res) {

    req.model.getall().then(data => {
        res.status(201).json(data);
    }).catch(err => {
        console.log(err);
        next(err);
    });
}

function handleNewProject(req, res) {
    req.body._ownerId = req.user._id
    req.model.create(req.body).then(data => {
        res.status(201).json(data);
    }).catch(err => {
        console.log(err);
        next(err);
    });

}
function displayProject(req, res) {
    let id = req.params.id
    req.model.get(id).then(data => {
        res.status(200).json(data);
    }).catch(err => {
        console.log(err);
        next(err);
    });
}

function updateProject(req, res) {
    let id = req.params.id
    console.log(req.user._id, '\n', req.body._ownerId)
    if (req.user._id == req.body._ownerId) {
        req.model.update(id, req.body).then(data => {
            res.status(201).json(data);
        }).catch(err => {
            console.log(err);
            next(err);
        });
    } else {
        res.json('You Do not have access to do this action')
    }
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
function deleteProject(req, res) {
    let id = req.params.id
    req.model.delete(id).then(data => {
        res.status(200).json(data);
    }).catch(err => {
        console.log(err);
        next(err);
    });
}
module.exports = router