'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsersSchema = Schema({
    first_name: String,
    last_name: String,
    username: String,
    email: String,
    address: String,
    age: Number,
    dni: String
    /*cart: [{
        nameP: String,
        priceP: Number,
        countryP: String,
        dateM: Date,
        dateA: Date
    }],*/
});

module.exports = mongoose.model('Users', UsersSchema);