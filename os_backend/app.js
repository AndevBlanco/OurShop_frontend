'use strict'

var express = require('express');
var bodyParser = require('body-parser');
const { model } = require('mongoose');
var cors = require('cors');

var app = express();

// Cargar archivo de Rutas
//var UsersRoutes = require('./routes/users');
//var SubjectsRoutes = require('./routes/subjects');
var UsersRoutes = require('./routes/users');
var ProductsRoutes = require('./routes/products');

// Middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Rutas
//app.use('/questions', cors({origin: 'https://smartquest-frontend.herokuapp.com'}), QuestionsRoutes);
//app.use('/subjects', cors({origin: 'https://smartquest-frontend.herokuapp.com'}), SubjectsRoutes);
app.use('/users', cors({origin: '*'}), UsersRoutes);
app.use('/products', cors({origin: '*'}), ProductsRoutes);

// Exportar
module.exports = app;