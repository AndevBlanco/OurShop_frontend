'use strict'

var express = require('express');
var ProductsControllers = require('../controllers/products');
var router = express.Router();

router.get('/getAll', ProductsControllers.getAll);
router.post('', ProductsControllers.saveProducts)

module.exports = router;