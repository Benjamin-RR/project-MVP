"use strict";

const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const { cloudinary } = require('./utils/cloudinary');
const { v4: uuidv4 } = require("uuid");
const {
    validateEmail,
    validatePassword,
    validateUniqueName
} = require("./validate");

// GET USER
const signInUser = async (req, res) => {
    let signInStatus = "good";
    // Validate email is indeed good.
    signInStatus = validateEmail(req.body.email)    
    if (!signInStatus === "good") {
        res.status(400).json({ status: 400, data: req.body, message: signInStatus})
    }
    const client = await new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("Capture");
    const email = req.body.email
    const password = req.body.password
    
    const user = await db.collection("users").findOne({ email });
    // console.log("this users info:" , user);
    user ? (
        // if email exists in database, make sure password matches.
        user.password !==password ? (
            res.status(400).json({ status: 400, data: req.body, message: "email and password did not match"})
        ) : (
            res.status(200).json({ status: 200, data: user, message: "matched. signing in..."})
        )

    )
    : (
        res.status(400).json({ status: 400, data: req.body, message: "user not found"})
    )
    client.close();

};


// ADD NEW USER
const addNewUser = async (req, res) => {
    // verify this email account is not already taken.
    const client = await new MongoClient(MONGO_URI, options);
    const email = req.body.email
    await client.connect();
    const db = client.db("Capture");
    const emailFound = await db.collection("users").findOne({ email })

    // verify uniqueName is indeed unique!
    const uniqueName = req.body.uniqueName
    const results = await db.collection("users").findOne({ uniqueName });
    if (results) {
        res.status(400).json({
            status: 400,
            data: req.body,
            error: `${req.body.uniqueName} is already in use. Please choose a new name.`,
            message: `${req.body.uniqueName} is already in use. Please choose a new name.`,
        });
        client.close();
        return;
    }

    if (!emailFound) {
        // add new user to database! yes!
        const newUser = {
            _id : uuidv4(),
            ...req.body,
            captures: {
                numOflocations: 0,
                authenticScore: 0,
                rank: 0,
                numOfTrues: 0,
                numOfFalses: 0,
                numOfUncertains: 0,
                numOfStars: 0,
                documentations: 0,
                types: 0,
                animals: [],
            },
            moreStats: {numOfRatingsGiven: 0, numFalsified: 0, numTruthified: 0, numIndecisive: 0, numLoggedOn: 0},
            achievements: {AnimalLover: false, AnimalEnthusiast: false, Biologist: false, Zoologist: false, Scientist: false, Authenticator: false, Inspector: false, TopPlayer: false},
            friends: [],
        }

        await db.collection("users").insertOne(newUser);
        res.status(200).json({
            status: 200,
            data: newUser,
            message: "New user signed up! Welcome to Capture!",
        });
        client.close();
        return;
    } else {
        res.status(400).json({
            status: 400,
            data: req.body,
            error: `${req.body.email} is already in use.`,
            message: `${req.body.email} is already in use.`,
        });
        client.close();
        return;
    }
};


// UPLOAD IMAGE
const addCaptureImage = async (req, res) => {
    const _id = req.body.userID;
    console.log("test", req.body);
    try{
        // upload image to cloudinary
        const fileStr = req.body.data;
        const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: 'Capture'
        })

        console.log("upload response:" , uploadedResponse);

        // create new animal document on mongoDB
        const client = await new MongoClient(MONGO_URI, options);
        await client.connect();
        const db = client.db("Capture");
        const newCapture = {
            _id : uuidv4(),
            timeStamp: uploadedResponse.created_at,
            ...req.body
        }
        console.log("new capture:" , newCapture)
        await db.collection("animals").insertOne(newCapture);

        // console.log("checking");
        // // find user to update
        // const userToUpdate = await db.collection("users").findOne({_id})
        // console.log("user to update:", userToUpdate);

        // const newValues = { $set: { isAvailable: false } };
        // await db.collection("SA231").updateOne(query, newValues);

        // update current user info on mongoDB
        // await db.collection("users").updateOne()


        res.status(200).json({message: "animal Captured successfully!"})

    } catch (err) {
        console.error(err);
        res.status(500).json({message: "upload failed."})
    }
}

// UPLOAD IMAGE
const addAvatarImage = async (req, res) => {
//     try{
//         // upload image to cloudinary
//         const fileStr = req.body.data;
//         const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
//             upload_preset: 'Capture'
//         })
//         console.log("response:" , uploadedResponse);
//         if (uploadedResponse) {
//             console.log("got response");
//         }
//         // create new capture document on mongoDB

//         // update current user's animal captures
//         res.status(200).json({message: "animal Captured successfully!"})

//     } catch (err) {
//         console.error(err);
//         res.status(500).json({message: "upload failed."})
//     }
}

const downloadImage = async (req, res) => {
    try{
        
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "download failed."})
    }
}

const downloadImages = async (req, res) => {
    try{
        const {resources} = await cloudinary.search.expression('folder:animals')
        .sort_by('public_id', 'desc')
        .max_results(30)
        .execute();
        const publicIds = resources.map(file=> file.public_id);
        res.send(publicIds);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "download failed."})
    }
}

const userUpdate = async (req, res) => {

}

module.exports = {
    signInUser,
    addNewUser,
    addCaptureImage,
    addAvatarImage,
    downloadImage,
    downloadImages,
    userUpdate
};