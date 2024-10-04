const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth.js');
const main = require('../controllers/main.js');

// routes signin
router.get('/', auth.signin);
router.post('/signin', auth.login);

// routes signup
router.get('/signup', auth.signup);
router.post('/signup', auth.register);

// routes recoverPassword
router.get('/recover', auth.recover);
router.post('/recoverPass', auth.recoverPassword);

// routes resetPassword
router.get('/reset/:email/:token', auth.reset);
router.post('/resetPassword', auth.resetPassword);

// routes logout session
router.get('/logout', auth.logout);

// export router instance
module.exports = router;