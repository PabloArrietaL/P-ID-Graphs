'use strict'

const multer = require('multer');
const { upload } = require('../middlewares/multer');
const fs = require('fs-extra');
const path = require('path');
const Node = require('../models/node');

const uploadImageById = (req, res) => {

    upload(req, res, function (err) {
        let id = req.params.id;
        const file = req.file;

        // If there is no file, a 400 error will return.
        if (!file) {
            return res.status(400).json({
                ok: false,
                err: { message: "No files were uploaded." }
            });
        }

        if (err instanceof multer.MulterError) {
            return res.status(500).json({
                ok: false,
                err
            });
        } else if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        validationImage(file, res); // validate file extension type.

        imgNode(id, res, file); // <-- Add the image to the product referenced by the id.
    });
};

const validationImage = (file, res) => {
    let CutName = file.originalname.split(".");
    let extension = CutName[CutName.length - 1];

    // Allowed extensions
    let ExtensionsValidated = ["png", "jpg", "jpeg"];

    if (ExtensionsValidated.indexOf(extension) < 0) {
        let extensions = ExtensionsValidated.join(", ");

        return res.status(400).json({
            ok: false,
            err: {
                message: `The permitted extensions are ${extensions}`,
                ext: extension
            }
        });
    }
}

const imgNode = (id, res, file) => {
    Node.findById(id, (err, nodeDB) => {
        if (err) {
            // Nota: even if an error occurs, the image is uploaded. deleteFile is the solution
            deleteFile(file.filename); // --> Delete the image just uploaded
            return res.status(500).json({
                ok: false,
                err
            });
        }
        // If there is no product
        if (!nodeDB) {
            deleteFile(file.filename); // --> Delete the image just uploaded
            return res.status(400).json({
                ok: false,
                err: {
                    message: "Product no found."
                }
            });
        }
        deleteFile(nodeDB.img);
        //nodeDB.img.push(fileName); // <-- if the img field is an array
        nodeDB.img = file.filename;
        nodeDB.save(async (err, savedNodeImg) => {
            if (err) {
                fs.unlink(file.path);
                return res.status(400).json({
                    ok: false,
                    message: err
                });
            }
            res.json({
                ok: true,
                node: savedNodeImg
            });
        });
    });
};

const deleteFile = fileName => {
    // Path to the existing image in the uploads folder
    let pathImage = path.resolve(__dirname, `../../uploads/${fileName}`);

    // Delete the existing image in the uploads folder
    if (fs.existsSync(pathImage)) {
        fs.unlinkSync(pathImage);
    }
};

module.exports = { deleteFile, uploadImageById };