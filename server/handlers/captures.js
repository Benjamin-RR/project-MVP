// Endpoints related to captures: "vote on capture", and "get all captures for map".
"use strict";
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};


//////////////////////////////////////////////
//                                          //
//           VOTE ON A CAPTURE              //
//                                          //
//////////////////////////////////////////////
// func. recevies req.body (the casted vote) and updates: the capture, the author of capture, and the voter.
const captureVote = async (req, res) => {
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
    console.log("test:" , test);
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
    console.log("vote on capture success")
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
//        GET ALL CAPTURES FOR MAP          //
//                                          //
//////////////////////////////////////////////
// using query of lat long, gets up to 100 capture documents into an array closes to the center point are prioritiezed.
const getCapturesForMap = async (req, res) => {
    try{
        // connect to mongoDB
        const client = await new MongoClient(MONGO_URI, options);
        await client.connect();
        const db = client.db("Capture");
        
        const animalCaptures = await db.collection('users').find('captures').toArray();
        const answer = [];
        animalCaptures.forEach(name => {
            answer.push(name.uniqueName);
        })
        if (animalCaptures) {
            res.status(200).json({ status: 200, data: animalCaptures, message: 'success!'});
        } else {
            res.status(404).json({ status: 404, error: "nothing found.", message: "error in fetching."})
        }
        client.close();
        console.log("get captures for map success")
    }
    catch (err) {
        res.status(500).json({ status: 500, error: err, message: "sorry we are having server issues."})
    }
};


module.exports = { captureVote, getCapturesForMap };