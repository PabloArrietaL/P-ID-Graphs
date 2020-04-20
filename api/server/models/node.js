'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NodeSchema = Schema({
    name: { type: String, required: [true, "El nombre es requerido"], unique: true },
    description: { type: String, required: true },
    img: { type: String, required: true },
    created_date: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Node', NodeSchema);