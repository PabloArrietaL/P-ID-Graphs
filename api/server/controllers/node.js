"use strict";

const _ = require("underscore");
const moment = require("moment");
const Node = require("../models/node");
const NodeGraph = require("../models/node_graphs");
const multer = require("multer");
const { upload } = require("../middlewares/multer");
const { deleteFile } = require("./upload");

const createNode = (req, res) => {
    upload(req, res, function (err) {
        let file = req.file;
        let body = req.body;

        let node = new Node({
            name: body.name,
            description: body.description,
            created_date: moment().format("YYYY MM DD HH:mm:ss"),
        });

        if (err instanceof multer.MulterError) {
            if (err.code == "LIMIT_UNEXPECTED_FILE") {
                err.message = "La imagen no se ha cargado correctamente";

                return res.status(500).json({
                    message: err.message
                });
            }
            return res.status(500).json({
                message: err
            });
        }

        if (file !== undefined) {

            let CutName = file.originalname.split(".");
            let extension = CutName[CutName.length - 1].toLowerCase();

            let ExtensionsValidated = ["png", "jpg", "jpeg", "svg"];

            if (ExtensionsValidated.indexOf(extension) < 0) {
                let extensions = ExtensionsValidated.join(", ");
                fs.unlink(file.path);
                return res.status(400).json({
                    message: `Las extensiones permitidas son ${extensions}`,
                });
            }
            node.img = file.filename;
        }

        node.save((err, nodeStored) => {
            if (err) {
                return res.status(500).json({ message: "Ha ocurrido un error" });
            }

            return res.status(200).json({ message: "Nodo creado correctamente", data: nodeStored });
        });
    });
};

const updateNode = (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, [
        "name",
        "description"
    ]);

    Node.findByIdAndUpdate(id, body,
        { new: true, runValidators: true, useFindAndModify: false }, (err, updatedNode) => {
            if (err) {
                return res.status(500).json({ message: 'Ha ocurrido un error' });
            }

            if (!updatedNode) {
                return res.status(400).json({ message: "Nodo no encontrado" });
            }

            return res.status(200).json({
                message: 'Nodo actualizado correctamente',
                data: updatedNode
            });
        });
}

const deleteNode = (req, res) => {

    const id = req.params.id;

    NodeGraph.find({
        $or: [{ node_source: id }, { node_target: id }]
    },
        (err, nodeGraphs) => {
            if (err) {
                return res.status(500).json({
                    message: "Ha ocurrido un error"
                });
            }
            if (nodeGraphs.length == 0) {
                Node.findOneAndDelete(id, (err, deletedNode) => {
                    if (err) {
                        return res.status(500).json({
                            message: "Ha ocurrido un error"
                        });
                    }
                    if (!deletedNode) {
                        return res.status(400).json({
                            message: "Nodo no encontrado"
                        });
                    }
                    deleteFile(deletedNode.img)
                    return res.json({
                        message: "Nodo eliminado correctamente"
                    });
                });
            }

            if (nodeGraphs.length > 0) {
                return res.status(400).json({
                    message: "El nodo ya está asociado a un grafo"
                });
            }
        }
    );


};

const getNodes = (req, res) => {

    Node.find({}, (err, nodes) => {
        if (err) {
            return res.status(500).json({ message: 'Ha ocurrido un error' });
        }
        if (!nodes.length) {
            return res.status(400).json({ message: 'No hay nodos disponibles' });
        }

        return res.status(200).json({ message: 'ok', data: nodes });

    });
}

module.exports = {
    createNode,
    deleteNode,
    updateNode,
    getNodes
};
