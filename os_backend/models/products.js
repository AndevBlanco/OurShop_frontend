'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductsSchema = Schema({
    name: String,
    price: Number,
    type: String,
    country: String,
    date_manufacture: Date,
    description: String
});

module.exports = mongoose.model('Products', ProductsSchema);