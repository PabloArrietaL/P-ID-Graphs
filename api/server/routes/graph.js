'use strict'

const express = require('express');
const GraphController = require('../controllers/graph');
const { createGraph } = require('../middlewares/createGraph');

const api = express.Router();

api.get('/graph', GraphController.getGraphs);
api.post('/graph', [createGraph], GraphController.createGraph);
api.delete('/graph/:id', GraphController.deleteGraph);
api.put('/graph/:id', GraphController.updateGraph);

module.exports = api;