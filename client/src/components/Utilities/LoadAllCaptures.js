// LOAD ALL CAPTURES

// this function will fetch all animal captures in db and store it in an array.
//e.g. [{ //capture info }, {},{}]
export const LoadAllCaptures = async () => {
    const AnimalCaptureArray = [];

    let answer;
    fetch('/captures')
    .then((res) => res.json())
    .then((data) => {
        // store values from here.
        answer = data;
        AnimalCaptureArray.push(data.data);
    })
    .catch((error) => {
        if (error) {
            // set error response here.
        }
    });
    return answer;
}