'use strict'

var Users = require('../models/users');

var controller = {
    getAll: function(req, res){
        try {
            Users.find().exec((err, users) => {
                if(err) return res.status(500).send({status: false, type: '500', error: err});
                if (!users) return res.status(404).send({status:false, type: '404'});
                return res.status(200).send({
                    users
                });
            });
        } catch (error) {
            return res.status(500).send({status:false, type: '500', error: err});
        }
    },

    saveUser: function(req, res){
        try {
            var user = Users();
            var params = req.body;
            console.log(params);
            user.first_name = params.first_name;
            user.last_name = params.last_name;
            user.age = parseInt(params.age);
            user.dni = params.dni;

            user.save((err, userStored) => {
                if(err) return res.status(500).send({status: false, type: '500', error: err});
                if (!userStored) return res.status(404).send({status:false, type: '404'});
                return res.status(200).send({user: userStored});
            });
        } catch (error) {
            return res.status(500).send({status:false, type: '500', error: err});
        }        
    }
}

module.exports = controller;