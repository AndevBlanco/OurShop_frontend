'use strict'

var mongoose = require('mongoose');
var app = require('./app');

mongoose.Promise = global.Promise

mongoose.connect(
    'mongodb+srv://AndevBlanco:rAcRQAOuQedmDqua@ourshop.sawvp.mongodb.net/Viena?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}
    )
    .then(() => {
        console.log("Conexión establecida con éxito");

        //Creating the server
        app.listen(process.env.PORT || 3700, () => {
            console.log("Servidor corriendo correctamente");
        });
    })
    .catch(error => console.log(error));