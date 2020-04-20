'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GraphSchema = Schema({
    name: { type: String, required: [true, "El nombre es requerido"], unique: true },
    description: { type: String, required: false },
    created_date: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Graph', GraphSchema);