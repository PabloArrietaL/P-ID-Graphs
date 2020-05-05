'use strict'

const Graph = require('../models/graph');

const createGraph = (req, res, next) => {

    const name = req.body.name;

    Graph.find({ name: name }, (err, graphs) => {
        if (graphs.length) {
            return res.status(500).json({ message: 'El nombre del grafo no está disponible'});
        }
        else {
            next();
        }

    });
}

module.exports = { createGraph }