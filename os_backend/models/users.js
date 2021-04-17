'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsersSchema = Schema({
    first_name: String,
    last_name: String,
    dni: String,
    nick_name: String,
    address: String,
    email: String,
    passwd: String,
    cart: [{
        nameP: String,
        priceP: Number,
        countryP: String,
        dateM: Date,
        dateA: Date
    }]
});

module.exports = mongoose.model('Users', UsersSchema);