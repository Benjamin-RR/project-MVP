import React, {useContext} from 'react';
import { CaptureContext } from '../CaptureContext';

// will connect and sign up or sign in depending on user's selection.
const Connect = async({
    email,
    password,
    text,
    uniqueName,
    displayName,
    userColor,
    setUserColor,
    friendArray, 
    setFriendArray,
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

        // used to generate a random color for new users.
        const Color = () => {
            let letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
              color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }
        const newUserColor = Color();

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
                avatarSrc: {userColor: newUserColor},
            }),
        })
            .then((response) => response.json())
            .then((data) => {
            if (data.status === 200) {
                // save current logged on user to local storage.
                localStorage.setItem("userID", data.data._id);
                localStorage.setItem("uniqueName", data.data.uniqueName)
                localStorage.setItem("userColor", newUserColor)
                // localStorage.setItem("friends", [ uniqueName ])
                localStorage.setItem("friends", JSON.stringify(uniqueName) )

            }
            if (data.status === 400) {
                connectStatus = data.message;
            }
            })
            .catch((error) => {
                connectStatus = "error while registering, please refresh your page and try again.";
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
                    console.log("DATA:" , data)
                    localStorage.setItem("userID", data.data._id);
                    localStorage.setItem("uniqueName", data.data.uniqueName)
                    localStorage.setItem("userColor", data.data.avatarSrc.userColor)
                    // setUserColor(data.data.avatarSrc.userColor)
                    localStorage.setItem("friends", JSON.stringify(data.data.friends) )

                    // if ( localStorage.getItem("friends").includes(',')) {
                    //     console.log("attempting to split... ", localStorage.getItem("friends"));

                    //     // localStorage.setItem("friends");
                    // };
                    
                    // setFriendArray(data.data.friends)
                }
                if (data.status === 400) {
                    connectStatus = data.message;
                }
                })
                .catch((error) => {
                    connectStatus = "Error while loggin in, please refresh your page and try again.";
                });
    }
    return connectStatus;
}

export default Connect;