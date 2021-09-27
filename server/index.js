"use strict";
require("dotenv").config();


const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const {
    signInUser,
    addNewUser,
    addCaptureImage,
    addAvatarImage,
    downloadImage,
    downloadImages,
    userUpdate
} = require("./handlers");

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

    // REST endpoints
    // .use(require('./routes/items'))
    // .use(require('./routes/companies'))
    // .use(require('./routes/purchases'))
    .post("/user/signIn", signInUser)
    .post("/user/new", addNewUser)
    .post("/image/uploadCapture", addCaptureImage)
    .post("/image/uploadAvatar", addAvatarImage)
    .get("/image/download", downloadImage)
    .get("/image/downloadMany", downloadImages)
    .post("/user/update", userUpdate)


    // This is the catch all Endpoint
    .get("*", (req, res) => {
        res.status(404).json({
        status: 404,
        message: "This is obviously not what you're looking for",
        });
    })

.listen(PORT, () => console.info(`🦊 Listening on port ${PORT}`));
