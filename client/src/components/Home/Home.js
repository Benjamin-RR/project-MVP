import React, {useContext, useState, useEffect} from 'react';
import {CaptureContext} from '../CaptureContext';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom'; 
import {Image} from 'cloudinary-react';
import Loading from '../Common/Loader';
// import Loading2 from '../Common/Loader2'

const Home = () => {
    const {
        page,
        setPage,
        userID,
        friendArray, 
        setFriendArray
    } = useContext(CaptureContext);
    const [loaded, setLoaded] = useState(false);
    if (page !== "home") {
        setPage("home");
        window.location.reload();
    }
    
    let history = useHistory();
    { !userID && 
        history.push("/Login")
    }
    
    // array animal pictures to render, includes logged on user, and thier friends.
    const [imageIds, setImageIds] = useState(null);
    let animalsArray = [];
    // array of animal data of each animal that will be rendered. again; includes logged on user, and their friends.
    const [animalData, setAnimalData] = useState(null);
    let animalDataArray = [];
        
    
    const loadImages = async () => {
        try{
            // get all images from cloudinary. (max 30).
            // const res = await fetch('/image/downloadMany');
            // const data = await res.json();
            // setImageIds(data);  // ALL images are stored here.
                        
            // get all friend's animal img sources into an array from mongoDB.
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
                        const thisUserAnimalPicss = data.data.captures.animals;
                        thisUserAnimalPicss.forEach(animal => {
                            animalsArray.push(animal)
                        })
                    }
                    if (data.status === 400) {
                        console.log("error:" , data.message);
                    }
                })
                .catch((error) => {
                    console.log("A server side error occured while attempting to fetch images.");
                });
            })
        } catch (error) {
            console.error("Error:" , error);
        }
        // store all images to render into an array into a state.
        setImageIds(animalsArray);
    }
    

    const loadAnimalData = async () => {
        try{
            // get each animal detail into a new array.
            
            friendArray.forEach( async (friend) => {
                await fetch('/animal', {
                    method: 'POST',
                    body: JSON.stringify({
                        friend
                    }),
                    headers: {'Content-type': 'application/json'}
                })
                .then((response) => response.json())
                .then((data) => {
                    if (data.status === 200) {
                        const thisUserAnimalData = data.data;
                            animalDataArray.push(thisUserAnimalData);
                    }
                    if (data.status === 400) {
                        console.log("error:" , data.message);
                    }
                })
                .catch((error) => {
                    console.log("A server side error occured while attempting to fetch animal data.");
                });
            })
        } catch (error) {
            console.error("Error:" , error);
        }
        // store each animal data into an array.
        setAnimalData(animalDataArray);
    }
    
    // Load images and animal data into their arrays, set page to loaded so we can render everything below. (gets called once).
    useEffect(()=> {
        loadImages();
        loadAnimalData();
        setLoaded(true);
    }, [])

    
    console.log("loaded?:" , loaded);
    console.log("all images:" , imageIds);
    console.log("all animal data:", animalData);    

    // TO DO: use both image array and animal aray to render:
    // 1. user unique name who posted it (links to their profile)
    // 2. image links to map where image was taken (lat, long)
    // 3. user's commentary on their own image.
    // 4. more stats?
    return (
        <Wrapper>
            <div>Captures</div>
            {(imageIds) ? (imageIds.map((imageId, index) => {
                
                    return(
                            <Image 
                                key={index}
                                alt="img"
                                cloudName="capturecapture"
                                publicId={imageId}
                                width="300"
                                crop="scale"
                            />
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