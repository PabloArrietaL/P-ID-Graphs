"use strict";

const _ = require("underscore");
const moment = require("moment");
const Node = require("../models/node");
const multer = require("multer");
const { upload } = require("../middlewares/multer");
const { deleteFile, uploadImageById } = require("./upload");

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

                res.status(500).json({
                    message: err.message
                });
            }
            res.status(500).json({
                message: err
            });
        }

        if (file !== undefined) {
            // validate file extension type.
            let CutName = file.originalname.split(".");
            let extension = CutName[CutName.length - 1].toLowerCase();

            // Allowed extensions
            let ExtensionsValidated = ["png", "jpg", "jpeg"];

            if (ExtensionsValidated.indexOf(extension) < 0) {
                let extensions = ExtensionsValidated.join(", ");
                fs.unlink(file.path);
                res.status(400).json({
                    message: `Las extensiones permitidas son ${extensions}`,
                });
            }
            node.img = file.filename;
        }

        node.save((err, nodeStored) => {
            if (err) {
                res.status(500).send({ message: "Se ha producido un error" });
            }

            res
                .status(200)
                .send({ message: "Nodo creado correctamente", data: nodeStored });
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
        { new: true, runValidators: true, useFindAndModify: false }, (err, nodeDB) => {
            if (err) {
                res.status(500).json({ message: '' });
            }

            if (!nodeDB) {
                res.status(400).json({ message: "Nodo no encontrado" });
            }

            res.status(200).json({
                message: 'Nodo actualizado correctamente',
                data: nodeDB
            });
        })
}

const deleteNode = (req, res) => {
    let id = req.params.id;

    Node.findByIdAndRemove(id, (err, deletedNode) => {
        if (err) {
            return res.status(500).json({
                message: err
            });
        }

        if (!deletedNode) {
            res.status(400).json({
                message: "Nodo no encontrado"
            });
        }
        deleteFile(deletedNode.img)
        res.json({
            message: "Nodo eliminado correctamente"
        });
    });
};

module.exports = {
    createNode,
    deleteNode,
    updateNode
};
