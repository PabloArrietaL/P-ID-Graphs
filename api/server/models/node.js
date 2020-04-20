'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NodeSchema = Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    created_date: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Node', NodeSchema);