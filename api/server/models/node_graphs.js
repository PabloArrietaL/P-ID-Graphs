'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NodeGraphSchema = Schema({
    graph: { type: Schema.Types.ObjectId, ref: 'Node' },
    node_source: { type: Schema.Types.ObjectId, ref: 'Graph' },
    node_target: { type: Schema.Types.ObjectId, ref: 'Graph' },
    created_date: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Node_Graph', NodeGraphSchema);