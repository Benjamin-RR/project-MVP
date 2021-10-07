"use strict";
require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
// const {
//     addCaptureImage,
//     addAvatarImage,
//     downloadImage,
//     downloadImages,
// } = require("./handlers");

const PORT = process.env.PORT 

express()
    .use(function (req, res, next) {
        res.header(
        "Access-Control-Allow-Methods",
        "OPTIONS, HEAD, GET, PUT, POST, DELETE"
        );
        res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
        );
        next();
    })
    .use(morgan("tiny"))
    // .use(express.static("./server/assets"))
    .use(bodyParser.json({limit: '50mb'}))
    .use(express.urlencoded({ extended: true, limit: '50mb' }))
    .use("/", express.static(__dirname + "/"))

    // Rest endpoints.
    .use(require('./routes/user'))
    .use(require('./routes/image'))
    .use(require('./routes/capture'))

    // IMAGES
    // .post("/image/uploadCapture", addCaptureImage)
    // .post("/image/uploadAvatar", addAvatarImage)

    
    // .get("/image/download", downloadImage)           // never has done anything. delete if never used.
    // .get("/image/downloadMany", downloadImages)      // never has done anything. delete if never used.

    
    // This is the catch all Endpoint
    .get("*", (req, res) => {
        res.status(404).json({
        status: 404,
        message: "This is obviously not what you're looking for",
        });
    })

.listen(PORT, () => console.info(`🦊 Listening on port ${PORT}`));
