// LOAD CAPTURES

// giving this component an array of unique names will return all unique name's captures. there is no limit to how few or many you can ask it.
export const LoadCapture = async (arrayToLoad) => {
    const friendArray = arrayToLoad;
    let feedArray = [];
    // const [feed, setFeed] = useState(null);
    let feed = [];

    let animalDataArray = [];
    // const [friendArray, setFriendArray] = useState(localStorage.getItem("friends").split(','));


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
                console.log("Double check:", animalDataArray);
                animalDataArray.forEach(person => {
                    console.log("person:", person)
                    person.captures.animals.forEach((animal => {
                        feedArray.push(animal);
                    }))
                })
                // setFeed(feedArray);
                // feed.push()
                // console.log("feed array:" , feedArray);
            })
            .catch((error) => {
                console.log("A server side error occured while attempting to fetch animal data.");
            });
        })
    } catch (error) {
        console.error("Error:" , error);
    }
    console.log("feed array:" , feedArray);

    return feedArray;
}

// const Wrapper = styled.div`
//     padding: 10px;
//     display: flex;
//     flex-direction: column;
//     justify-content: space-around;
//     align-items: center;
//     height: var(--defaultHeight);
//     width: 100%;
//     border: 1px solid black;
// `

// export default LoadCapture;