"use strict";

const fs = require("fs");
const path = require("path");

const getAndShowImage = (req, res) => {
  let img = req.params.img;

  let pathImage = path.resolve(__dirname, `../../uploads/${img}`);
  if (fs.existsSync(pathImage)) {
    return res.sendFile(pathImage); // Show the image using the path
  }
};

module.exports = { getAndShowImage };