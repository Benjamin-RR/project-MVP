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
    if (page !== "home") {
        setPage("home");
        window.location.reload();
    }
    
    let history = useHistory();
    { !userID && 
        history.push("/Login")
    }
    
    const [loaded, setLoaded] = useState(false);
    // array animal pictures to render, includes logged on user, and thier friends.
    // const [imageIds, setImageIds] = useState(null);
    // let animalsArray = [];
    // array of animal data of each animal that will be rendered. again; includes logged on user, and their friends.
    // const [animalData, setAnimalData] = useState(null);
    let animalDataArray = [];
    let feedArray = [];
    // const [feed, setFeed] = useState({
    //     source: null,
    //     capture: null,
    // });        
    const [feed, setFeed] = useState(null);
    
    // const loadImages = async () => {
    //     try{
    //         // get all images from cloudinary. (max 30).
    //         // const res = await fetch('/image/downloadMany');
    //         // const data = await res.json();
    //         // setImageIds(data);  // ALL images are stored here.
                        
    //         // get all friend's animal img sources into an array from mongoDB.
    //         friendArray.forEach( async (friend) => {
    //             await fetch('/user/info', {
    //                 method: 'POST',
    //                 body: JSON.stringify({
    //                     friend
    //                 }),
    //                 headers: {'Content-type': 'application/json'}
    //             })
    //             .then((response) => response.json())
    //             .then((data) => {
    //                 if (data.status === 200) {
    //                     const thisUserAnimalPicss = data.data.captures.animals;
    //                     thisUserAnimalPicss.forEach(animal => {
    //                         animalsArray.push(animal)
    //                     })
    //                 }
    //                 if (data.status === 400) {
    //                     console.log("error:" , data.message);
    //                 }
    //             })
    //             .catch((error) => {
    //                 console.log("A server side error occured while attempting to fetch images.");
    //             });
    //         })
    //     } catch (error) {
    //         console.error("Error:" , error);
    //     }
    //     // store all images to render into an array into a state.
    //     // setImageIds(animalsArray);
    //     // setFeed({source: animalsArray})
    //     return animalsArray;
    // }
    

    const loadCaptures = async () => {
        try{
            // get each user data (includes animal captures) and put into a new array.
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
                        const userData = data.data;
                            animalDataArray.push(userData);
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
        // setAnimalData(animalDataArray);
        // setFeed({capture: animalDataArray})
        return animalDataArray;
    }
    
    // Load images and animal data into their arrays, set page to loaded so we can render everything below. (gets called once).
    useEffect( async ()=> {
        // one = await loadImages();
        const theCaptures = await loadCaptures();
        setFeed(theCaptures);
        
    }, [])
    
    // console.log("loaded?:" , loaded);
    console.log("FEED:" , feed);

    if (feed) {
        let animalArray = [];
        feed.forEach(person => {
            // animalArray.push(animal.captures.animals);
            person.captures.animals.forEach((animal => {
                feedArray.push(animal);
            }))
        })
        // animalArray.forEach(item => {
        //     feedArray.push(item);
        // })
        console.log("animal array:" , animalArray);
        console.log("FINAL : feed array:" , feedArray);
        // setLoaded(true);

    }


    // TO DO: use both image array and animal aray to render:
    // 1. user unique name who posted it (links to their profile)
    // 2. image links to map where image was taken (lat, long)
    // 3. user's commentary on their own image.
    // 4. more stats?
    return (
        <Wrapper>
            <div>Captures</div>
            {(loaded) ? (feed.map((aCapture, index) => {
                return(
                    <CaptureContent
                        key={index}
                    >
                        <Top>
                            <Avatar />
                            <div>uniqueName</div>
                            <div>animal</div>
                        </Top>
                        <Image
                            alt="img"
                            cloudName="capturecapture"
                            publicId={aCapture}
                            width="300"
                            crop="scale"
                        />
                        <Bottom>
                            <Details>
                                <div>timestamp?</div>
                                <div>documented comment</div>
                            </Details>
                            <Rate>Rate</Rate>
                        </Bottom>
                        
                    </CaptureContent>
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

const CaptureContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 400px;
    width: 320px;
    border: 1px solid black;
    padding: 5px;
    margin: 5px;
    background: green;
`

const Top = styled.div`
    display: flex;
    flex-direction: row;
`

const Avatar = styled.div`
    height: var(--IconHeight);
    width: var(--IconWidth);
`

const Bottom = styled.div`
    
`

const Details = styled.div`
    display: flex;
    flex-direction: row;
`

const Rate = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
`



export default Home;