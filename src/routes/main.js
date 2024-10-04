const express = require('express');
const router = express.Router();
const main = require('../controllers/main.js');
const { isLoggedIn } = require('../helpers/auth.js');

// routes main
router.get('/main', isLoggedIn, main.start);

// export router instance
module.exports = router;