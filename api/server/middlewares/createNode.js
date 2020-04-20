'use strict'

const Node = require('../models/node');

const createNode = (req, res, next) => {

    const name = req.body.name;

    Node.find({ name: name }, (err, nodes) => {
        if (nodes.length) {
            res.status(500).send({ message: 'El nombre del nodo no está disponible', data: err });
        }
        else {
            next();
        }

    });
}

module.exports = { createNode }