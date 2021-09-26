"use strict";

const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const { v4: uuidv4 } = require("uuid");

// GET USER
const getUser = async (req, res) => {
    const client = await new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("Capture");
    const email = req.params.email

    console.log("req:" , req.params);

    console.log("byEmail:", email);
    
    const user = await db.collection("users").findOne({ email });
    console.log("user:" , user);
    user ?
    res.status(200).json({ status: 200, data: user, message: "user found"})
    :
    res.status(400).json({ status: 400, data: req.params, message: "user not found"})
    // console.log("user" , user)
    client.close();

};



// ADD NEW USER
const addNewUser = async (req, res) => {

    console.log("received:" , req.body);

    // verify this email account is not already taken.
    const client = await new MongoClient(MONGO_URI, options);
    const email = req.body.email
    const query = { email }

    await client.connect();
    const db = client.db("Capture");

    const emailFound = await db.collection("users").findOne({ email })

    if (!emailFound) {
        // add new user to database! yes!
        const newUser = {
            _id : uuidv4(),
            ...req.body
        }
        await db.collection("users").insertOne(newUser);
        res.status(200).json({
            status: 200,
            data: newUser,
            message: "New user signed up! Welcome to Capture!",
        });
    } else {
        res.status(400).json({
            status: 400,
            data: req.body,
            error: `${req.body.email} is already in use.`,
            message: `${req.body.email} is already in use.`,
        });
    }
    client.close();
};

module.exports = {
    getUser,
    addNewUser,
};