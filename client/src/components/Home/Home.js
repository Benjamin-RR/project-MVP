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
    } = useContext(CaptureContext);
    setPage("home");
    
    let history = useHistory();
    { !userID && 
        history.push("/Login")
    }

    const [imageIds, setImageIds] = useState(null);

    const loadImages = async () => {
        try{
            // get all images
            const res = await fetch('/image/downloadMany');
            const data = await res.json();
            setImageIds(data);  // ALL images are stored here.
            console.log("DATA:" , data);
            // get all friends images.
            // 1. send POST with current user's array of friends.
            // 2. for each friend, return
            // 1. get array of each friends image, and display only matching images.


        } catch (error) {
            console.error("Error:" , error);
        }
    }

    useEffect(()=> {
        loadImages();
    }, [])

    if (imageIds) {
        console.log("true")
    } else {
        console.log('false');
    }

    return (
        <Wrapper>
            <div>Captures</div>
            {imageIds ? (imageIds.map((imageId, index) => {
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