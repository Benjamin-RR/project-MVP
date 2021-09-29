import React, {useContext, useState, useEffect} from 'react';
import {CaptureContext} from '../CaptureContext';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom'; 
import {Image} from 'cloudinary-react';
import Loading from '../Common/Loader';

const Home = () => {
    const {
        page,
        setPage,
        userID,
        friendArray, 
        setFriendArray
    } = useContext(CaptureContext);
    setPage("home");
    
    let history = useHistory();
    { !userID && 
        history.push("/Login")
    }

    const [imageIds, setImageIds] = useState(null);
    const [loaded, setLoaded] = useState(false);
    let animalsArray = [];

    // console.log("friends:" , friendArray, typeof friendArray);

    const loadImages = async () => {
        try{
            // get all images from cloudinary. (max 30).
            // const res = await fetch('/image/downloadMany');
            // const data = await res.json();
            // setImageIds(data);  // ALL images are stored here.


            // add animal fetch here for more info for homescreen
            // 1. user unique name who posted it (links to their profile)
            // 2. image links to map where image was taken (lat, long)
            // 3. user's commentary on their own image.
            // 4. more stats?


            // get all friend's animals into an array from mongoDB.
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
                    console.log("friend data:" , data.data.captures.animals);
                    const thisUserAnimals = data.data.captures.animals;
                    thisUserAnimals.forEach(animal => {
                        animalsArray.push(animal)
                    })
                    // console.log("CHECK:" , animalsArray);
                    setImageIds(animalsArray);
                    setLoaded(true);
                }
                if (data.status === 400) {
                    console.log("error:" , data.message);
                }
                })
                .catch((error) => {
                    connectStatus = "A client side error occured, please refresh your page and try again.";
                });
            })
            
            
        } catch (error) {
            console.error("Error:" , error);
        }
    }
    
    useEffect(()=> {
        loadImages();
    }, [])
    
    // if (imageIds) {
    //     console.log("true")
    // } else {
    //     console.log('false');
    // }

    console.log("all images:" , imageIds);
    console.log("animal array:" , animalsArray);
    
    return (
        <Wrapper>
            <div>Captures</div>
            {(imageIds && loaded) ? (imageIds.map((imageId, index) => {
            
                    return(
                        <>
                            <Image 
                                key={index}
                                alt="img"
                                cloudName="capturecapture"
                                publicId={imageId}
                                width="300"
                                crop="scale"
                            />
                        </>
                    )

                
            })) : (
                <Loading />
            )
        
        }
        </Wrapper>
    )
}

const Wrapper = styled.div`
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: var(--defaultHeight);
    width: 100%;
    border: 1px solid black;
`

export default Home;