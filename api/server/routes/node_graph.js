'use strict'

const express = require('express');
const NodeGraphController = require('../controllers/node_graph');

const api = express.Router();

api.get('/nodeGraph', NodeGraphController.getNodeGraphs);
api.post('/nodeGraph', NodeGraphController.createNodeGraph);
api.delete('/nodeGraph/:id', NodeGraphController.deleteNodeGraph);
api.put('/nodeGraph/:id', NodeGraphController.updateNodeGraph);

module.exports = api;