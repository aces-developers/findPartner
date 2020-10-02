
'use strict';

const express = require('express');
const router = express.Router();
const userModel = require('../middleware/users-model');
const basicAuth = require('../middleware/basic')
const UserSchema = require('../collections-schema/users/user-schema');
const bearer = require('../middleware/bearer');


// GET ROUTES
router.get('/',handleHome)
router.get('/signup',handleSignUpPage)
router.post('/signup',userModel,handleSignUP)
router.post("/signin", basicAuth,handleSignIn);
router.get('/newproject',bearer,newProjectPage)



// routes call back functions
function handleHome(req,res){
    res.send('hello world');
}
function handleSignUpPage(req,res){
    res.send('this will contain the form ejs of the sign up and n oauth icon for google')
}
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

module.exports = router