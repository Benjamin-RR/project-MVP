
export const getCapturesForMap = async (position) => {
    
    let users;
    const allCaptures = [];
    await fetch('/users')
    .then((res) => res.json())
    .then((data) => {
        // console.log("fetch results:", data.data);
        // store values from here.
        users = data.data;
        // AnimalCaptureArray.push(data.data);
    })
    .catch((error) => {
        if (error) {
            // set error response here.
        }
    });
    // console.log("users in fetch" , users);

    users.forEach(user => {
        // console.log("user info:" , user);
        // console.log('user info2:', user.captures.animals);
        (user.captures.animals).forEach(capture => {
            console.log("ANIMAL:" , capture);
            allCaptures.push(capture)
        })
    })
    console.log("allCaptures:" , allCaptures);

    return allCaptures;
}