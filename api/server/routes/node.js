'use strict'

const express = require('express');
const NodeController = require('../controllers/node');


const api = express.Router();

api.get('/node', NodeController.getNodes);
api.post('/node', NodeController.createNode);
api.delete('/node/:id', NodeController.deleteNode);
api.put('/node/:id', NodeController.updateNode);

module.exports = api;