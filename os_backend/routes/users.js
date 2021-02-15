'use strict'

var express = require('express');
var UsersControllers = require('../controllers/users');
var router = express.Router();

router.get('/getAll', UsersControllers.getAll);
router.post('', UsersControllers.saveUser);

module.exports = router;