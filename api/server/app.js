'use strict'

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// routes
const node_routes = require('./routes/node');
const graph_routes = require('./routes/graph');
const image_routes = require('./routes/image');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();

});

app.use('/api', node_routes);
app.use('/api', graph_routes);
app.use('/api', image_routes);

module.exports = app;