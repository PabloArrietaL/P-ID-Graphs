'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NodeGraphSchema = Schema({
    graph: { type: Schema.ObjectId, ref: 'Node' },
    node: { type: Schema.ObjectId, ref: 'Graph' },
    created_date: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Node_Graph', NodeGraphSchema);