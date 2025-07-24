
const express = require('express');
const app = express();
const router = express.Router();
const User = require('../models/User.js');
const wrapAsync = require('../utils/wrapAsync.js');
const passport = require('passport');
const {saveRedirectUrl} = require('../middleware.js');
const userController = require('../controller/user.js');


router.route('/signup').get(( userController.getSingup)).post(wrapAsync(userController.postSignup));

router.route('/login').get((userController.getLogin)).post(saveRedirectUrl, passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), (userController.postLogin));


//router.get('/signup', ( userController.getSingup));

//router.post('/signup', wrapAsync(userController.postSignup));

//router.get('/login', (userController.getLogin));

// router.post('/login',saveRedirectUrl, passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), (userController.postLogin));

router.get('/logout',(userController.getLogout));

module.exports = router;