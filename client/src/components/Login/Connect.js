import React, {useContext} from 'react';
import { CaptureContext } from '../CaptureContext';

// will connect and sign up or sign in depending on user's selection.
const Connect = async({
    email,
    password,
    text,
    uniqueName,
    displayName,
}) => {
    // const {
    //     page,
    //     setPage,
    //     userID,
    //     setUserID,
    //     mediaQ,
    //     setMediaQ,
    //     uniqueName, 
    //     setUniqueName
    // } = useContext(CaptureContext);
    let connectStatus = "good";

    
    // // used to handle successful log on.
    // const successfulConnect = () => {
    //     // save current logged on user to local storage.
    //     localStorage.setItem("userID", data.data._id);
    //     localStorage.setItem("uniqueName", data.data.uniqueName)
    // }

    // Attempt a new user sign up and either:
    // 1: Succeed. 2: Fail (email already existing). 3: let user know server is having issues.
    if (text === "Register") {
        await fetch(`/user/new`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
                uniqueName: uniqueName,
                displayName: displayName,
                avatarId: "default",
            }),
        })
            .then((response) => response.json())
            .then((data) => {
            if (data.status === 200) {
                // save current logged on user to local storage.
                localStorage.setItem("userID", data.data._id);
                localStorage.setItem("uniqueName", data.data.uniqueName)
                localStorage.setItem("friends", [ uniqueName ])
            }
            if (data.status === 400) {
                connectStatus = data.message;
            }
            })
            .catch((error) => {
                connectStatus = "A server error occured, please refresh your page and try again.";
            });
    } else {
        // Attempt to sign in and either:
        // 1: succeed. 2: Fail (email already existing). 3: let user know server is having issues.
            await fetch(`/user/signIn`, {
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
                    // save current logged on user to local storage.
                    localStorage.setItem("userID", data.data._id);
                    localStorage.setItem("uniqueName", data.data.uniqueName)
                    localStorage.setItem("friends", data.data.friends)

                }
                if (data.status === 400) {
                    connectStatus = data.message;
                }
                })
                .catch((error) => {
                    connectStatus = "A server error occured, please refresh your page and try again.";
                });




    }
    return connectStatus;
}

export default Connect;