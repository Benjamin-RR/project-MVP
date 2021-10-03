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
                    person.captures.animals.forEach((animal => {
                        feedArray.push(animal);
                    }))
                })
            })
            .catch((error) => {
                console.log("A server side error occured while attempting to fetch animal data.");
            });
        })
    } catch (error) {
        console.error("Error:" , error);
    }
    return feedArray;
}