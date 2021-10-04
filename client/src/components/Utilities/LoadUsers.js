// LOAD CAPTURES

// giving this component an array of unique names will return all unique name's user Info. there is no limit to how few or many you can ask it.

//e.g.
// ['ron'] // results: all ron's user info.
// ['ron','harry','dumbledore'] // results: all of ron's, harry's, and dumbledoore's user info.

// all user info are stored into an array. e.g. [{ //capture info }, {},{}]
export const LoadUsers = async (arrayToLoad) => {
    const friendArray = arrayToLoad;
    let usersInfoArray = [];

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
                        usersInfoArray.push(userData);
                }
                if (data.status === 400) {
                    console.log("error:" , data.message);
                }
                return(usersInfoArray)
            })
            .catch((error) => {
                console.log("An error occured while fetching user/s info.");
            });
        })
    } catch (error) {
        console.error("Error:" , error);
    }
    return usersInfoArray;
}