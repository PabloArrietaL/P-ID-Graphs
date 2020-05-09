'use strict'

const NodeGraph = require("../models/node_graphs");
const _ = require("underscore");


function updateConnection(id, body, res) {
    NodeGraph.findOneAndUpdate(id, body, { new: true, runValidators: true, useFindAndModify: false })
    .populate('node_source node_target', 'name description', 'Node')
    .populate('graph', 'name description', 'Graph')
    .exec((err, updatedNodes) => {
        if (err) {
            return res.status(500).json({ message: 'Ha ocurrido un error' });
        }

        if (!updatedNodes) {
            return res.status(400).json({ message: "La conexión ya está creada para este grafo" });
        }

        return res.status(200).send(updatedNodes);
    });
}

const createNodeGraph = (req, res) => {

    const body = req.body;

    const nodeGraph = new NodeGraph({
        graph: body.graph,
        node_source: body.node_source,
        node_target: body.node_target,
        description: body.description
    });
    NodeGraph.find({
        $and: [
            { graph: nodeGraph.graph },
            {
                $or: [{ node_source: nodeGraph.node_source, node_target: nodeGraph.node_target },
                { node_source: nodeGraph.node_target, node_target: nodeGraph.node_source }]
            }
        ]
    }, (err, nodes) => {

        if (err) {
            return res.status(500).json({ message: 'Ha ocurrido un error' });
        }

        if (nodes.length > 0) {
            return res.status(400).json({ message: 'Esta combinación ya se encuentra en el grafo' });
        }

        else {
            nodeGraph.save((err, nodesStored) => {
                if (err) {
                    return res.status(500).json({ message: "Ha ocurrido un error" });
                }

                NodeGraph
                    .populate(nodesStored, [
                        { path: 'node_source node_target', model: 'Node' },
                        { path: 'graph', model: 'Graph' }],
                        ((err, connection) => {
                            if (err) {
                                return res.status(500).json({ message: "Ha ocurrido un error" });
                            }
                            else {
                                return res.status(200).send(connection);
                            }

                        }));
            });
        }


    });

}


const updateNodeGraph = (req, res) => {

    const id = req.params.id;
    const body = _.pick(req.body, [
        "graph",
        "node_source",
        "node_target",
        "description"
    ]);


    NodeGraph.findOne({_id:id}, (err, connection) => {
        if (err) {
            return res.status(500).json({ message: 'Ha ocurrido un error' });
        }
        else {
            if (body.node_source==connection.node_source & body.node_target==connection.node_target) {
                updateConnection(id, body, res);
            }
            else {
                NodeGraph.find({graph: body.graph, node_source: body.node_source, node_target: body.node_target}, 
                    (err, nodes) => {
                    if (err) {
                        return res.status(500).json({ message: 'Ha ocurrido un error' });
                    }
            
                    if (nodes.length > 0) {
                        return res.status(400).json({ message: 'Esta combinación ya se encuentra en el grafo' });
                    }
            
                    else {
                        updateConnection(id, body, res);
                    }
                });
            }
        }
    }); 
}


const deleteNodeGraph = (req, res) => {

    const id = req.params.id;

    NodeGraph.findOneAndDelete(id, (err, delNode) => {
        if (err) {
            return res.status(500).json({
                message: "Ha ocurrido un error"
            });
        }

        if (!delNode) {
            return res.status(400).json({
                message: "Conexión no encontrado"
            });
        }

        return res.status(200).send(delNode);
    });

}

const getNodeGraphs = (req, res) => {

    const id = req.params.id;

    NodeGraph.find({graph: id})
        .populate('node_source node_target', 'name description', 'Node')
        .populate('graph', 'name description', 'Graph')
        .exec((err, nodes) => {
            if (err) {
                return res.status(500).json({ message: 'Ha ocurrido un error' });
            }
            if (!nodes.length) {
                return res.status(400).json({ message: 'No hay nodos asociados al grafo' });
            }

            return res.status(200).send(nodes);

        });
}

module.exports = {
    createNodeGraph,
    updateNodeGraph,
    deleteNodeGraph,
    getNodeGraphs
}