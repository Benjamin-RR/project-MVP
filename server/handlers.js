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

//////////////////////////////////////////////
//                                          //
//              SIGN IN USER                //
//                                          //
//////////////////////////////////////////////
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
                numLoggedOn: 0, 
                avgHoursPerDay: 0,
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
//           ADD CAPTURED IMAGE             //
//                                          //
//////////////////////////////////////////////
const addCaptureImage = async (req, res) => {
    try{
        // upload image to cloudinary
        const fileStr = req.body.capture.data;
        const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: 'Capture'
        })
        console.log("upload response:" , uploadedResponse);

        // create new animal document on mongoDB
        const client = await new MongoClient(MONGO_URI, options);
        await client.connect();
        const db = client.db("Capture");

        // create new animal capture object.
        const newCapture = {
            _id : uuidv4(),
            timeStamp: uploadedResponse.created_at,
            public_id: uploadedResponse.public_id,
            ...req.body
        }
        // await db.collection("animals").insertOne(newCapture);

        // get old user data.
        const uniqueName = req.body.author
        const oldUserData = await db.collection("users").findOne({ uniqueName });
        // store all animals into an array, then push the new one in.
        let animalArray = oldUserData.captures.animals
        // animalArray.push(uploadedResponse.public_id)
        animalArray.push(newCapture);
        
        const query = { uniqueName }

        // update animal array.
        let update = { $set: { "captures.animals": animalArray}}
        await db.collection("users").updateOne(query, update)

        // update total captures
        update = { $set: { "captures.total": (Number(oldUserData.captures.total)+1)}}
        await db.collection("users").updateOne(query, update)

        // if description given, update, otherwise move on.
        if (req.body.capture.documentation) {
            update = { $set: { "captures.documentations": (Number(oldUserData.captures.documentations)+1)}}
            await db.collection("users").updateOne(query, update)
        }

        res.status(200).json({message: "animal Captured successfully!"})
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "upload failed."})
    }
}

//////////////////////////////////////////////
//                                          //
//            ADD AVATAR IMAGE              //
//                                          //
//////////////////////////////////////////////
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

//////////////////////////////////////////////
//                                          //
//             DOWNLOAD IMAGE               //
//                                          //
//////////////////////////////////////////////
const downloadImage = async (req, res) => {
    try{
        const {resources} = await cloudinary.search.expression('folder:animals')
        // .sort_by('public_id', 'desc')
        // .max_results(30)
        // .execute();
        // const publicIds = resources.map(file=> file.public_id);
        // res.send(publicIds);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "download failed."})
    }
}

//////////////////////////////////////////////
//                                          //
//             DOWNLOAD IMAGES              //
//                                          //
//////////////////////////////////////////////
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

//////////////////////////////////////////////
//                                          //
//              UPDATE USER                 //
//                                          //
//////////////////////////////////////////////
const userUpdate = async (req, res) => {

}

//////////////////////////////////////////////
//                                          //
//              ADD FRIEND                  //
//                                          //
//////////////////////////////////////////////
const addFriend = async (req, res) => {

    try{
    const client = await new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("Capture");

    // attempt to find friend being searched.

    // let _id = req.body.seat
    // let query = {_id}
    // const checkNewSeat = await db.collection("SA231").findOne(query)
    // if (checkNewSeat.isAvailable === false) {
    //     thisError = true
    //     res.status(400).json({
    //     status: 400,
    //     data: req.body,
    //     error: ` Sorry ${req.body.givenName}, seat ${_id} has already been booked. We will email you at ${req.body.email} once seat ${_id} becomes available once more.`,
    // })
    // }
    
    // // get old seat id.
    // _id = req.body._id
    // query = {_id}
    // const oldFlightInfo = await db.collection("reservations").findOne(query)
    // const oldSeatID = oldFlightInfo._id
    
    // // change old seat availability to true.
    // _id = oldFlightInfo.seat
    // query = { _id}
    // let newValues = { $set: { isAvailable: true } };
    // await db.collection("SA231").updateOne(query, newValues);
    
    // // change new seat to availability to false.
    // _id = req.body.seat
    // query = { _id}
    // newValues = { $set: { isAvailable: false } };
    // await db.collection("SA231").updateOne(query, newValues);
        
    // // update reservation info.
    //     _id = req.body._id;
    //     query = { _id };
    //     newValues = {
    //     $set: {
    //         seat: req.body.seat,
    //         givenName: req.body.givenName,
    //         surname: req.body.surname,
    //         email: req.body.email,
    //     },
    //     };
    // await db.collection("reservations").updateOne(query, newValues);
    // res.status(200).json({ status: 200, data: req.body, message: "update success." });
    // client.close();
    }
    catch {

    // if (!thisError) {
    //     res.status(400).json({     
    //         status: 400,
    //         data: req.body,
    //         error: `An error occured. Be sure to provide all expected keys: _id, flight, seat, givenName, surname, email. (and their value pairs.)`,
    //     })
    // }
    }
}

//////////////////////////////////////////////
//                                          //
//             GET USER INFO                //
//                                          //
//////////////////////////////////////////////
const getUserInfo = async (req, res) => {
    try{
        // console.log("check:", req.body);
        const client = await new MongoClient(MONGO_URI, options);
        await client.connect();
        const db = client.db("Capture");
        const uniqueName = req.body.friend
        const user = await db.collection("users").findOne({ uniqueName });
        // if user found, sound back info.
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

//////////////////////////////////////////////
//                                          //
//            GET ANIMAL INFO               //
//                                          //
//////////////////////////////////////////////
const getAnimal = async (req, res) => {
    try{
        const client = await new MongoClient(MONGO_URI, options);
        await client.connect();
        const db = client.db("Capture");
        const author = req.body.friend
        console.log("check:", author);
        const animal = await db.collection("animals").findOne( {author} );
        // if animal found, sound back info.
        console.log("Animal:" , animal);
        animal ? (
            res.status(200).json({ status: 200, data: animal, message: "matched found."})
        ) : (
            res.status(400).json({ status: 400, data: req.body, message: "animal not found"})
        )
        client.close();
    }
    catch {
        res.status(500).json({ status: 500, data: req.body, message: "sorry we are having server issues."})
        client.close();
    }
}

//////////////////////////////////////////////
//                                          //
//           VOTE ON A CAPTURE              //
//                                          //
//////////////////////////////////////////////
const captureVote = async (req, res) => {
    console.log("CAPTURE VOTE:", req.body)
    try{
        // connect to mongo database.
        const client = await new MongoClient(MONGO_URI, options);
        await client.connect();
        const db = client.db("Capture");

    // get old user data of VOTER.
    let uniqueName = req.body.voter
    const oldVoterData = await db.collection("users").findOne({uniqueName})

    // update old user data of VOTER into a new object.
    let trues = Number(oldVoterData.moreStats.numTruthified)
    let falses = Number(oldVoterData.moreStats.numFalsified)
    let uncertains = Number(oldVoterData.moreStats.numIndecisive)
    if (req.body.vote.vote === "FALSE") {
        falses = falses+1
    }
    if (req.body.vote.vote === "TRUE") {
        trues = trues+1
    }
    if (req.body.vote.vote === "UNSURE") {
        uncertains = uncertains+1
    }
    let query = { uniqueName }
    let update = { $set: { 
            "moreStats": {
                numOfRatingsGiven: Number(oldVoterData.moreStats.numOfRatingsGiven)+1,
                numTruthified: trues,
                numFalsified: falses,
                numIndecisive: uncertains,
                numOfStarsGiven: Number(oldVoterData.moreStats.numOfStarsGiven)+Number(req.body.vote.stars),
                numLoggedOn: Number(oldVoterData.moreStats.numLoggedOn),
                avgHoursPerDay: Number(oldVoterData.moreStats.avgHoursPerDay),
                numMapSearches: Number(oldVoterData.moreStats.numMapSearches),
                numMapUses: Number(oldVoterData.moreStats.numMapUses),
            }
        }
    }
    // update VOTER with new object into mongoDB.
    const updatedVoter = await db.collection("users").updateOne(query, update)

    // get old user data of AUTHOR.
    uniqueName = req.body.author
    const oldAuthorData = await db.collection("users").findOne({uniqueName})
    console.log("old author data:" , oldAuthorData);
    // update old user data of AUTHOR into a new object.
    trues = Number(oldAuthorData.captures.numOfTrues)
    falses = Number(oldAuthorData.captures.numOfFalses)
    uncertains = Number(oldAuthorData.captures.numOfUncertains)
    if (req.body.vote.vote === "FALSE") {
        falses = falses+1
    }
    if (req.body.vote.vote === "TRUE") {
        trues = trues+1
    }
    if (req.body.vote.vote === "UNSURE") {
        uncertains = uncertains+1
    } 
    query = { uniqueName }
    update = { $set: { 
            "captures": {
                numOfTrues: trues,
                numOfFalses: falses,
                numOfUncertains: uncertains,
                numOfStars: Number(oldAuthorData.captures.numOfStars)+Number(req.body.vote.stars),
            }
        }
    }
    console.log("AUTHOR QUERY, UPDATE:", query, update);
    // update AUTHOR with new object into mongoDB.
    const updatedAuthor = await db.collection("users").updateOne(query, update);

    res.status(200).json({ status: 200, data: req.body, message: "vote casted successfully!" });
    client.close();
    }
    catch {
        res.status(400).json({     
            status: 400,
            data: req.body,
            error: `An error occured during your casted vote.`,
            message: `An error occured during your casted vote.`
        })
    }
}

module.exports = {
    signInUser,
    addNewUser,
    addCaptureImage,
    addAvatarImage,     // not doing much yet.
    downloadImage,      // not doing much yet.
    downloadImages,
    userUpdate,         // not doing much yet.
    addFriend,          // not doing much yet.
    getUserInfo,
    getAnimal,
    // getUser,
    captureVote,
};