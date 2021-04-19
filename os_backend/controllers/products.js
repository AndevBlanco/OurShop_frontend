'use strict'

const Products = require('../models/products');

var controllers = {
    getProductItem: function (req, res) {
        var productId = req.query.id;
        Products.findById(productId, (err, product) => {
            if (err) return res.status(500).send({ message: "Error al devolver el id" });
            if (!product) return res.status(404).send({ message: "La pregunta no se encontro" });
            return res.status(200).send(product)
        })
    },
    getAll: function(req, res){
        try {
            Products.find().exec((err, product) => {
                if(err) return res.status(500).send({status: false, type: '500', error: err});
                if (!product) return res.status(404).send({status:false, type: '404'});
                var product_list = []
                for(var i in product){
                    product_list.push(product[i]);
                }
                return res.status(200).send(product_list);
            });
        } catch (error) {
            return res.status(500).send({status:false, type: '500', error: err});
        }
    },

    saveProducts: function(req, res){
        try {
            var product = Products();
            var params = req.body;
            product.name = params.name;
            product.price = params.price;
            product.type = params.type;
            product.country = params.country;
            product.date_manufacture = params.date_manufacture;
            product.description = params.description;
            product.date_added = params.date_added;

            product.save((err, productStored) => {
                if(err) return res.status(500).send({status: false, type: '500', error: err});
                if (!productStored) return res.status(404).send({status:false, type: '404'});
                return res.status(200).send({product: productStored});
            });
        } catch (error) {
            return res.status(500).send({status:false, type: '500', error: err});
        }
    }
};

module.exports = controllers;