import React, {useState} from "react";

// will connect and sign up or sign in depending on user's selection.
const Connect = ({
    email,
    password,
    text,}) => {
    let connectStatus = "good";
    const [cStatus, setCStatus] = useState("good");

    // Attempt a new user sign up and immediately sign in.
    if (text === "New user") {
        fetch(`/user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
            if (data.status === 200) {
                // save (and overwrite previous) purchaseID
                localStorage.setItem("userID", data.data._id);
                console.log("DATA(200):" , data);
            }
            if (data.status === 400) {
                connectStatus = data.error;
                console.log("DATA(400):" , data, connectStatus);
                setCStatus(data.error);
            }
            })
            .catch((error) => {
                connectStatus = "A server error occured, please refresh your page and try again.";
                setCStatus("A server error occured, please refresh your page and try again.")
            });
    } else {

    }
    console.log("check this:" , connectStatus);

    return cStatus;
}

export default Connect;