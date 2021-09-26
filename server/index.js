"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const {
    getUser,
    addNewUser } = require("./handlers");

const PORT = 7777;

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
    .use(bodyParser.json())
    .use(express.urlencoded({ extended: false }))
    .use("/", express.static(__dirname + "/"))

    // REST endpoints
    // .use(require('./routes/items'))
    // .use(require('./routes/companies'))
    // .use(require('./routes/purchases'))
    .get("/user", getUser)
    .post("/user", addNewUser)

    // This is the catch all Endpoint
    .get("*", (req, res) => {
        res.status(404).json({
        status: 404,
        message: "This is obviously not what you're looking for",
        });
    })

.listen(PORT, () => console.info(`🦊 Listening on port ${PORT}`));
