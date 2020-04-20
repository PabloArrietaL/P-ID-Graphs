'use strict'

const express = require('express');
const NodeController = require('../controllers/node');
const { createNode } = require('../middlewares/createNode');

const api = express.Router();


api.post('/node', [createNode] ,NodeController.createNode);

module.exports = api;