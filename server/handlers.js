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
//           ADD CAPTURED IMAGE             //
//                                          //
//////////////////////////////////////////////
// adds image to cloudinary
// creates new animal capture object.
// find (by uniqueName) and get user's array of captures and adds new capture to that array.
// update user's statistics. (e.g. total captures)
const addCaptureImage = async (req, res) => {
    try{
        // upload image to cloudinary
        const fileStr = req.body.capture.data;
        const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: 'Capture'
        })

        // connect to mongoDB
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

        // get old user data.
        const uniqueName = req.body.author
        const oldUserData = await db.collection("users").findOne({ uniqueName });
        // store all animals into an array, then push the new one in.
        let animalArray = oldUserData.captures.animals
        animalArray.push(newCapture);
        
        // update animal array.
        const query = { uniqueName }
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
// finds documents by uniqueName and updates user's avatar color or image.
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
    // try{
    //     const {resources} = await cloudinary.search.expression('folder:animals')
    //     // .sort_by('public_id', 'desc')
    //     // .max_results(30)
    //     // .execute();
    //     // const publicIds = resources.map(file=> file.public_id);
    //     // res.send(publicIds);
    // } catch (err) {
    //     console.error(err);
    //     res.status(500).json({message: "download failed."})
    // }
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
        console.log("user:" , user);
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

//////////////////////////////////////////////
//                                          //
//            GET ANIMAL INFO               //
//                                          //
//////////////////////////////////////////////
// const getAnimal = async (req, res) => {
//     try{
//         const client = await new MongoClient(MONGO_URI, options);
//         await client.connect();
//         const db = client.db("Capture");
//         const author = req.body.friend
//         console.log("check:", author);
//         const animal = await db.collection("animals").findOne( {author} );
//         // if animal found, send back info.
//         console.log("Animal:" , animal);
//         animal ? (
//             res.status(200).json({ status: 200, data: animal, message: "matched found."})
//         ) : (
//             res.status(400).json({ status: 400, data: req.body, message: "animal not found"})
//         )
//         client.close();
//     }
//     catch {
//         res.status(500).json({ status: 500, data: req.body, message: "sorry we are having server issues."})
//         client.close();
//     }
// }

//////////////////////////////////////////////
//                                          //
//           VOTE ON A CAPTURE              //
//                                          //
//////////////////////////////////////////////
// func. recevies req.body (the casted vote) and updates: the capture, the author of capture, and the voter.
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

    // update old data of AUTHOR's PERSONAL statistics into a new object.
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
                total: oldAuthorData.captures.total,
                numOfLocations: oldAuthorData.captures.numOfLocations,
                authenticScore: oldAuthorData.captures.authenticScore,
                rank: oldAuthorData.captures.rank,
                numOfTrues: trues,
                numOfFalses: falses,
                numOfUncertains: uncertains,
                numOfStars: Number(oldAuthorData.captures.numOfStars)+Number(req.body.vote.stars),
                documentations: oldAuthorData.captures.documentations,
                types: oldAuthorData.captures.types,
                animals: oldAuthorData.captures.animals,
            }
        }
    }
    // update AUTHOR PERSONAL statistics with new object into mongoDB.
    const updatedAuthor = await db.collection("users").updateOne(query, update);

    // get old ANIMAL CAPTURE data using captureId.    
    query = {"captures.animals._id" : req.body.vote.captureId}
    const test = await db.collection("users").findOne(query);
    let animalToUpdate;
    const test2 = test.captures.animals.forEach(animal => {
        if (animal._id === req.body.vote.captureId) {
            animalToUpdate = animal;
        }
    })
    
    // Find and change value for casted vote of "TRUE","FALSE","UNSURE".
    trues = Number(animalToUpdate.capture.true)
    falses = Number(animalToUpdate.capture.false)
    uncertains = Number(animalToUpdate.capture.uncertain)
    if (req.body.vote.vote === "FALSE") {
        falses = falses+1;
    }
    if (req.body.vote.vote === "TRUE") {
        trues = trues+1;
    }
    if (req.body.vote.vote === "UNSURE") {
        uncertains = uncertains+1;
    } 

    // determine if this capture is now verified or not.
    let verifiedValue;
    if (trues > 6 && trues > falses) {
        verifiedValue = true;
    } else { 
        verifiedValue = false;
    }

    // update old data of AUTHOR's ANIMAL CAPTURE statistics into a new object.
    // query = {"captures.animals._id" : req.body.vote.captureId}   // doesn't change.
    update = { $set: { 
            "captures.animals.$.capture": {
                location: animalToUpdate.capture.location,
                authenticScore: animalToUpdate.capture.authenticScore,
                rank: animalToUpdate.capture.rank,
                verified: verifiedValue,
                true: trues,
                false: falses,
                uncertain: uncertains,
                stars: Number(animalToUpdate.capture.stars)+Number(req.body.vote.stars),
                documentation: animalToUpdate.capture.documentation,
                type: animalToUpdate.capture.type,
                rarity: animalToUpdate.capture.rarity,
                endangered: animalToUpdate.capture.endangered,
                animalName: animalToUpdate.capture.animalName,
                data: animalToUpdate.capture.data
            }
        }
    }
    // update AUTHOR ANIMAL CAPTURE statistics with new object into mongoDB.
    const updatedAnimalCapture = await db.collection("users").updateOne(query, update);

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

//////////////////////////////////////////////
//                                          //
//          GET CAPTURES FOR MAP            //
//                                          //
//////////////////////////////////////////////
// using query of lat long, gets up to 100 capture documents into an array closes to the center point are prioritiezed.
const getCapturesForMap = async (res, req) => {
    // connect to mongo database.

    // const client = await new MongoClient(MONGO_URI, options);
    // await client.connect();
    // const db = client.db("Capture");

    // client.close();
    // console.log("disconnected!");
};

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
        console.log("YAY!");
        
        const uniqueNames = await db.collection('users').find().toArray();
        console.log("all:" , uniqueNames, uniqueNames.length);
        const answer = [];
        uniqueNames.forEach(name => {
            answer.push(name.uniqueName);
        })
        console.log("answer:" , answer);
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

module.exports = {
    signInUser,
    addNewUser,
    addCaptureImage,
    addAvatarImage,     // not doing much (plans for using in future feature.)
    downloadImage,      // not doing much yet.
    downloadImages,     // not doing much yet.
    addFriend,          // not doing much (plans for using in future feature.)
    getUserInfo,
    // getAnimal,
    // getUser,
    captureVote,
    getCapturesForMap,
    getAllUniqueNames,
};