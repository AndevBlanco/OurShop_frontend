'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsersSchema = Schema({
    first_name: String,
    last_name: String,
    dni: String,
    username: String,
    address: String,
    email: String,
    passwd: String,
    type_user: Number
});

module.exports = mongoose.model('Users', UsersSchema);