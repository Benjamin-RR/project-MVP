// "use strict";
// const { MongoClient } = require("mongodb");

// require("dotenv").config();
// const { MONGO_URI } = process.env;
// const options = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// };

// const { cloudinary } = require('./utils/cloudinary');
// const { v4: uuidv4 } = require("uuid");


// //////////////////////////////////////////////
// //                                          //
// //           ADD CAPTURED IMAGE             //
// //                                          //
// //////////////////////////////////////////////
// // adds image to cloudinary
// // creates new animal capture object.
// // find (by uniqueName) and get user's array of captures and adds new capture to that array.
// // update user's statistics. (e.g. total captures)
// const addCaptureImage = async (req, res) => {
//     try{
//         // upload image to cloudinary
//         const fileStr = req.body.capture.data;
//         const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
//             upload_preset: 'Capture'
//         })

//         // connect to mongoDB
//         const client = await new MongoClient(MONGO_URI, options);
//         await client.connect();
//         const db = client.db("Capture");

//         // create new animal capture object.
//         const newCapture = {
//             _id : uuidv4(),
//             timeStamp: uploadedResponse.created_at,
//             public_id: uploadedResponse.public_id,
//             ...req.body
//         }

//         // get old user data.
//         const uniqueName = req.body.author
//         const oldUserData = await db.collection("users").findOne({ uniqueName });
//         // store all animals into an array, then push the new one in.
//         let animalArray = oldUserData.captures.animals
//         animalArray.push(newCapture);
        
//         // update animal array.
//         const query = { uniqueName }
//         let update = { $set: { "captures.animals": animalArray}}
//         await db.collection("users").updateOne(query, update)

//         // update total captures
//         update = { $set: { "captures.total": (Number(oldUserData.captures.total)+1)}}
//         await db.collection("users").updateOne(query, update)

//         // if description given, update, otherwise move on.
//         if (req.body.capture.documentation) {
//             update = { $set: { "captures.documentations": (Number(oldUserData.captures.documentations)+1)}}
//             await db.collection("users").updateOne(query, update)
//         }

//         res.status(200).json({message: "animal Captured successfully!"})
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({message: "upload failed."})
//     }
// }

// //////////////////////////////////////////////
// //                                          //
// //            ADD AVATAR IMAGE              //
// //                                          //
// //////////////////////////////////////////////
// // finds documents by uniqueName and updates user's avatar color or image.
// const addAvatarImage = async (req, res) => {
// //     try{
// //         // upload image to cloudinary
// //         const fileStr = req.body.data;
// //         const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
// //             upload_preset: 'Capture'
// //         })
// //         console.log("response:" , uploadedResponse);
// //         if (uploadedResponse) {
// //             console.log("got response");
// //         }
// //         // create new capture document on mongoDB

// //         // update current user's animal captures
// //         res.status(200).json({message: "animal Captured successfully!"})

// //     } catch (err) {
// //         console.error(err);
// //         res.status(500).json({message: "upload failed."})
// //     }
// }

// module.exports = {
//     addCaptureImage,
//     addAvatarImage,     // not doing much (plans for using in future feature.)
// };