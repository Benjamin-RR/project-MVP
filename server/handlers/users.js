// Endpoints related to users.
"use strict";
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const { v4: uuidv4 } = require("uuid");
const {
    validateEmail,
    validatePassword,
    validateUniqueName
} = require("./validate");


//////////////////////////////////////////////
//                                          //
//              SIGN IN USER                //
//                                          //
//////////////////////////////////////////////
// verify email exists in DB using req.body.email and verifies password matches using req.body.password. signs in.
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

//////////////////////////////////////////////
//                                          //
//              ADD NEW USER                //
//                                          //
//////////////////////////////////////////////
// verify email and uniqune name (from req.body) do not already exist in DB, then add user.
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
                total: 0,
                numOfLocations: 0,
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
            moreStats: {
                numOfRatingsGiven: 0, 
                numFalsified: 0, 
                numTruthified: 0, 
                numIndecisive: 0, 
                numOfStarsGiven: 0, 
                numLoggedOn: 1, 
                avgHoursPerDay: 0,
                userSince: 0,
                minutesUsed: 0,
                numMapSearches: 0, 
                numMapUses: 0,
            },
            achievements: {
                AnimalLover: false, 
                AnimalEnthusiast: false, 
                Biologist: false, 
                Zoologist: false, 
                Scientist: false, 
                Authenticator: false,
                Inspector: false, 
                TopPlayer: false
            },
            friends: [ req.body.uniqueName ],
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


//////////////////////////////////////////////
//                                          //
//             GET USER INFO                //
//                                          //
//////////////////////////////////////////////
// func. finds a user with matching unique name, and gets it's entire document.
const getUserInfo = async (req, res) => {
    try{
        const client = await new MongoClient(MONGO_URI, options);
        await client.connect();
        const db = client.db("Capture");
        const uniqueName = req.body.friend
        const user = await db.collection("users").findOne({ uniqueName });
        // if user found, send back info.
        user ? (
            res.status(200).json({ status: 200, data: user, message: "matched found."})
        ) : (
            res.status(400).json({ status: 400, data: req.body, message: "user not found"})
        )
        client.close();
    }
    catch {
        res.status(500).json({ status: 500, data: req.body, message: "sorry we are having server issues."})
        client.close();
    }
}

// This Endpoint is coming in future update //
//////////////////////////////////////////////
//                                          //
//              ADD FRIEND                  //
//                                          //
//////////////////////////////////////////////
// func. searches for a unique name OR email, updates that user with friend req pending, and querying user with friend req waiting.
const addFriend = async (req, res) => {
    // try{
    // const client = await new MongoClient(MONGO_URI, options);
    // await client.connect();
    // const db = client.db("Capture");
    // // attempt to find friend being searched.

    // // res.status(200).json({ status: 200, data: req.body, message: "update success." });
    // client.close();
    // }
    // catch {
    //     res.status(400).json({     
    //         status: 400,
    //         data: req.body,
    //         error: `An error occured.`,
    //     })
    // }
}


//////////////////////////////////////////////
//                                          //
//          GET ALL UNIQUE NAMES            //
//                                          //
//////////////////////////////////////////////
// fetches all unique names in DB. if this project ever grows this endpoint MUST be changed to limit results by quantity.
const getAllUniqueNames = async (req, res) => {
    // connect to mongo database.
    try{
        // connect to mongoDB
        const client = await new MongoClient(MONGO_URI, options);
        await client.connect();
        const db = client.db("Capture");
        
        const uniqueNames = await db.collection('users').find().toArray();
        const answer = [];
        uniqueNames.forEach(name => {
            answer.push(name.uniqueName);
        })
        if (uniqueNames) {
            res.status(200).json({ status: 200, data: answer, message: 'success!'});
        } else {
            res.status(404).json({ status: 404, error: "nothing found.", message: "error in fetching."})
        }
        client.close();
    }
    catch (err) {
        res.status(500).json({ status: 500, error: err, message: "sorry we are having server issues."})
    }
}

//////////////////////////////////////////////
//                                          //
//              GET ALL USERS               //
//                                          //
//////////////////////////////////////////////
// fetches all users in DB. if this project ever grows this endpoint MUST be changed to limit results.
const getAllUsers = async (req, res) => {
    // connect to mongo database.
    try{
        // connect to mongoDB
        const client = await new MongoClient(MONGO_URI, options);
        await client.connect();
        const db = client.db("Capture");
        
        const allUsers = await db.collection('users').find().toArray();
        
        if (allUsers) {
            res.status(200).json({ status: 200, data: allUsers, message: 'success!'});
        } else {
            res.status(404).json({ status: 404, error: "nothing found.", message: "error in fetching."})
        }
        client.close();
    }
    catch (err) {
        res.status(500).json({ status: 500, error: err, message: "sorry we are having server issues."})
    }
}


module.exports = { signInUser, addNewUser, getUserInfo, addFriend, getAllUniqueNames, getAllUsers };