"use strict";

const express = require("express");

const api = express();

const ImageController = require("../controllers/image");
const UploadController = require("../controllers/upload");

api.get("/image/:img", ImageController.getAndShowImage);
api.put("/image/:id", UploadController.uploadImageById);


module.exports = api;