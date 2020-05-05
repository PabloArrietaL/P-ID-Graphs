'use strict'

const Graph = require('../models/graph');

const createGraph = (req, res, next) => {

    const name = req.body.name;

    Graph.find({ name: name }, (err, graphs) => {
        if (graphs.length) {
            res.status(500).send({ message: 'El nombre del grafo no está disponible'});
        }
        else {
            next();
        }

    });
}

module.exports = { createGraph }