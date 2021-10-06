import React, {useState} from 'react'

// LOAD CAPTURES

// Uses an array of uniqueNames to fetch each uniqueName's Captures. Range: (1 - infinite)
//e.g.
// ['ron'] // results: all ron's captures.
// ['ron','harry','dumbledore'] // results: all of ron's, harry's, and dumbledoore's captures are taken.

// each caputre (an object) are stored into an array. e.g. [ { //capture info }, {}, {} ]
export const LoadCapture = async (arrayToLoad) => {
    // const [thisAnswer, setThisAnswer] = useState(null);
    // console.log("array to load" , arrayToLoad, typeof arrayToLoad);
    const friendArray = arrayToLoad;
    let feedArray = [];
    let animalDataArray = [];
    // const [feed, setFeed] = useState(null);
    
    // console.log("received:" , arrayToLoad);
    try{
        // get each user data (includes animal captures) and put into a new array.
        friendArray.forEach( async (friend) => {
            // console.log("LOADCAPTURE:" , friend);

            await fetch('/user/info', {
                method: 'POST',
                body: JSON.stringify({
                    friend
                }),
                headers: {'Content-type': 'application/json'}
            })
            .then((response) => response.json())
            .then((data) => {
                // console.log("data:" , data);
                if (data.status === 200) {
                    const userData = data.data;
                    animalDataArray.push(userData);
                    // console.log("user data:" , userData);
                }
                if (data.status === 400) {
                    console.log("error:" , data.message);
                }
                // console.log("animal data array:" , animalDataArray);
                return(animalDataArray)
            })
            .then((animalDataArray) => {
                animalDataArray.forEach(person => {
                    // console.log("person:", person);
                    person.captures.animals.forEach((animal => {
                        feedArray.push(animal);
                    }))
                })
            })
            .catch((error) => {
                console.log("ERROR:", error, "Occured while attempting to fetch all user/s animal captures in LoadCapture.js component.");
            });
        })
    } catch (error) {
        console.error("Error:" , error);
    }

    // const FinalArrayAnswer = feedArray.filter((capture, index) => feedArray.indexOf(capture) !== index);

    const FinalArrayAnswer = [ ...new Set(feedArray)];
    
    // const FinalArrayAnswer = feedArray.filter(onlyUniques)
    // function onlyUniques(capture, index){
    //     return (
            
    //     }
        
        // console.log("TEST:" , FinalArrayAnswer);
    // const finalArrayAnswer = feedArray.filter()
    // feedArray.forEach((feed, index) => {
    //     console.log("each feed:" , feed);
    // })

    // console.log("feed array:" , feedArray);
    // console.log("feed array filtered:"  )
    return feedArray;
}