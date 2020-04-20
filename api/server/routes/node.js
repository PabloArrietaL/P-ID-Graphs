'use strict'

const express = require('express');
const NodeController = require('../controllers/node');

const api = express.Router();


api.post('/node',  NodeController.createNode);

module.exports = api;