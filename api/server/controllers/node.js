'use strict'

const moment = require('moment');
const Node = require('../models/node');

function createNode(req, res) {

    let node = new Node({
        name: req.body.name,
        description: req.body.description,
        created_date: moment().format('YYYY MM DD HH:mm:ss')
    });

    Node.find({name: node.name}, (err, nodes)=> {
        if(!nodes.length){
            node.save((err, nodeStored) => {
                if(err) {
                    res.status(500).send({message: 'Se ha producido un error'});
                }
                else {
                    res.status(200).send({message: "Nodo creado correctamente", data: nodeStored});
                }
            });
        }
        else {
            res.status(500).send({message: 'El nombre del nodo no está disponible', data: err});
        }   
    });
}

function deleteNode(req, res) {

}

module.exports = {
    createNode
}