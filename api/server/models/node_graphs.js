'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NodeGraphSchema = Schema({
    graph: { type: Schema.Types.ObjectId, ref: 'Node', required: true },
    node_source: { type: Schema.Types.ObjectId, ref: 'Graph', required: true },
    node_target: { type: Schema.Types.ObjectId, ref: 'Graph', required: true },
    description: { type: String, required: false }
});

module.exports = mongoose.model('Node_Graph', NodeGraphSchema);