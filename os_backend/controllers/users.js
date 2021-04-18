'use strict'

var Users = require('../models/users');
var bcrypt = require('bcrypt');

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
            user.dni = params.dni;
            user.nick_name = params.nick_name;
            user.address = params.address;
            user.email = params.email;
            user.passwd = params.passwd;

            async function hashPassword(password) {
                const salt = await bcrypt.genSalt(10)
                const hash = await bcrypt.hash(password, salt)
                console.log(hash)
                user.password = hash;
                user.save((err, userStored) => {
                    if(err) return res.status(500).send({status: false, type: '500', error: err});
                    if (!userStored) return res.status(404).send({status:false, type: '404'});
                    return res.status(200).send({user: userStored});
                });
            }
            hashPassword(params.passwd);

        } catch (error) {
            return res.status(500).send({status:false, type: '500', error: err});
        }        
    },

    login: function (req, res) {
        var params = req.body;
        var nameUser = params.xusername;
        var passUser = params.xpassword;

        Users.findOne({email: nameUser}, function(err, result){
            if(err) return res.status(500).send({status: false, type: '500', error: err});
            if(!result) return res.status(404).send({status:false, type: '404'});

            async function comparePassword(password) {
                const resultPass = await bcrypt.compare(passUser, password)
                return res.status(200).send({
                    login: resultPass,
                    id: result.id,
                    name: result.first_name + " " + result.last_name,
                });
            }

            if(passUser){
                comparePassword(result.password);
            }
        });
    }
}

module.exports = controller;