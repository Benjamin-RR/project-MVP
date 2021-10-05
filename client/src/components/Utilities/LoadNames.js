// LOAD NAMES

// this function will fetch all uniqueNames in db and store it in an array.
//e.g. [{ //capture info }, {},{}]
export const LoadNames = async () => {
    const nameArray = [];

    let answer;
    fetch('/user/names')
    .then((res) => res.json())
    .then((data) => {
        // console.log("Load Name results:", data.data);
        // store values from here.
        answer = data;
        nameArray.push(data.data);
    })
    .catch((error) => {
        if (error) {
            // set error response here.
        }
    });
    // console.log("answer in load names:" , nameArray);
    return nameArray;
}