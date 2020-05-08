"use strict";

const _ = require("underscore");
const moment = require("moment");
const Graph = require("../models/graph");
const NodeGraph = require("../models/node_graphs");


function deletedGraph(id, res) {
    Graph.findOneAndDelete(id, (err, delGraph) => {
        if (err) {
            return res.status(500).json({
                message: "Ha ocurrido un error"
            });
        }

        if (!delGraph) {
            return res.status(400).json({
                message: "Grafo no encontrado"
            });
        }

        return res.json({
            message: "Grafo eliminado correctamente",
            data: delGraph
        });
    });
}

const createGraph = (req, res) => {

    const body = req.body;

    const graph = new Graph({
        name: body.name,
        description: body.description,
        created_date: moment().format("YYYY MM DD HH:mm:ss")
    });

    graph.save((err, graphStored) => {
        if (err) {
            return res.status(500).json({ message: "Ha ocurrido un error" });
        }

        return res.status(200).send(graphStored);
    });

}

const updateGraph = (req, res) => {

    const id = req.params.id;
    const body = _.pick(req.body, [
        "name",
        "description"
    ]);

    Graph.findByIdAndUpdate(id, body,
        { new: true, runValidators: true, useFindAndModify: false }, (err, updatedGraph) => {
            if (err) {
                return res.status(500).json({ message: 'Ha ocurrido un error' });
            }

            if (!updatedGraph) {
                return res.status(400).json({ message: "Grafo no encontrado" });
            }

            return res.status(200).send(updatedGraph);
        });

}

const deleteGraph = (req, res) => {

    const id = req.params.id;

    NodeGraph.find({ graph: id }, (err, nodeGraphs) => {
        if (err) {
            return res.status(500).json({
                message: "Ha ocurrido un error"
            });
        }
        if (nodeGraphs.length == 0) {
            deletedGraph(id, res);
        }

        if (nodeGraphs.length > 0) {
            NodeGraph.deleteMany({ graph: id }, (err) => {
                if (err) {
                    return res.status(500).json({
                        message: "Ha ocurrido un error"
                    });
                }

                deletedGraph(id, res);
            });
        }

    });
}

const getGraphs = (req, res) => {

    Graph.find({}, (err, graphs) => {
        if (err) {
            return res.status(500).json({ message: 'Ha ocurrido un error' });
        }
        if (!graphs.length) {
            return res.status(400).json({ message: 'No hay grafos disponibles' });
        }

        return res.status(200).send(graphs);

    });
}

module.exports = {
    createGraph,
    updateGraph,
    deleteGraph,
    getGraphs
};