'use strict'

const mongoose = require('mongoose');
const app = require('./app');
require('dotenv').config();

const port = process.env.PORT || 8080;
const options = { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true };

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_DB, options)
    .then(() => {
        console.log('Conexión exitosa a la base de datos');
        app.listen(port, () => {
            console.log('El servidor local con node y express esta corriendo en el puerto ' + port);
        });
    })
    .catch(err => console.log(err));