// LOAD CAPTURES

// Uses an array of uniqueNames to fetch each uniqueName's Captures. Range: (1 - infinite)
//e.g.
// ['ron'] // results: all ron's captures.
// ['ron','harry','dumbledore'] // results: all of ron's, harry's, and dumbledoore's captures are taken.

// each caputre (an object) are stored into an array. e.g. [ { //capture info }, {}, {} ]
export const LoadCapture = async (arrayToLoad) => {
    const friendArray = arrayToLoad;
    let feedArray = [];
    // const [feed, setFeed] = useState(null);
    let animalDataArray = [];

    console.log("received:" , arrayToLoad);

    try{
        // get each user data (includes animal captures) and put into a new array.
        friendArray.forEach( async (friend) => {
            await fetch('/user/info', {
                method: 'POST',
                body: JSON.stringify({
                    friend
                }),
                headers: {'Content-type': 'application/json'}
            })
            .then((response) => response.json())
            .then((data) => {
                console.log("data:" , data);
                if (data.status === 200) {
                    const userData = data.data;
                        animalDataArray.push(userData);
                }
                if (data.status === 400) {
                    console.log("error:" , data.message);
                }
                return(animalDataArray)
            })
            .then((animalDataArray) => {
                animalDataArray.forEach(person => {
                    console.log("person:", person);
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
    return feedArray;
}