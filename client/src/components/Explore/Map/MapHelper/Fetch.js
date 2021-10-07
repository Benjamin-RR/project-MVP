// this component fetches all captures into one array.
export const getCapturesForMap = async (position) => {
    
    let users;
    const allCaptures = [];
    await fetch('/users')
    .then((res) => res.json())
    .then((data) => {
        users = data.data;
    })
    .catch((error) => {
        console.log("OOPS!", error);
    });
    users.forEach(user => {
        (user.captures.animals).forEach(capture => {
            allCaptures.push(capture)
        })
    })

    return allCaptures;
}