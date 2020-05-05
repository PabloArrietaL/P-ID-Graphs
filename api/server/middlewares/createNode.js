'use strict'

const Node = require('../models/node');

const createNode = (req, res, next) => {

    const name = req.body.name;

    console.log(req.body);

    Node.find({ name: name }, (err, nodes) => {
        console.log(nodes);
        if (nodes.length > 0) {
            return res.status(500).json({ message: 'El nombre del nodo no está disponible'});
        }
        else {
            next();
        }

    });
}

module.exports = { createNode }