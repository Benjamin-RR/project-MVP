// LOAD CAPTURES

const LoadCapture = async (arrayToLoad) => {
    const [friendArray, setFriendArray] = useState(localStorage.getItem("friends").split(','));
    let feedArray = [];
    const [feed, setFeed] = useState(null);

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
                setFeed(feedArray);
            })
            .catch((error) => {
                console.log("A server side error occured while attempting to fetch animal data.");
            });
        })
    } catch (error) {
        console.error("Error:" , error);
    }
    

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

export default LoadCapture;