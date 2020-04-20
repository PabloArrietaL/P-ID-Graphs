'use strict'

const moment = require('moment');
const Node = require('../models/node');
const multer = require('multer');
const { upload } = require('../middlewares/multer');

const createNode = (req, res) => {
    upload(req, res, function (err) {

        let file = req.file;
        let body = req.body;
        
        console.log(req);
        let node = new Node({
            name: body.name,
            description: body.description,
            created_date: moment().format('YYYY MM DD HH:mm:ss')
        });

        if (err instanceof multer.MulterError) {
            if (err.code == "LIMIT_UNEXPECTED_FILE") {
                err.message = [
                    "Request exceeds the number of files for the same part name.",
                    "Request includes a file associated to a non expected part."
                ];

                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            return res.status(500).json({
                ok: false,
                err
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
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: `The permitted extensions are ${extensions}`,
                        ext: extension
                    }
                });
            }
            node.img = file.filename;
        }

        node.save((err, nodeStored) => {
            if (err) {
                res.status(500).send({ message: 'Se ha producido un error' });
            }

            res.status(200).send({ message: "Nodo creado correctamente", data: nodeStored });

        });

    });
};

const deleteNode = (req, res) => {

};

module.exports = {
    createNode,
    deleteNode
}