'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsersSchema = Schema({
    first_name: String,
    last_name: String,
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