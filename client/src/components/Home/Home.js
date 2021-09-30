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
        // window.location.reload();
    }
    
    let history = useHistory();
    { !userID && 
        history.push("/Login")
    }
    
    const [loaded, setLoaded] = useState(false);    
    let animalDataArray = [];
    let feedArray = [];
    const [feed, setFeed] = useState(null);

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
        await setFeed(animalDataArray);
    }

    // configures the loaded data to the correct format, once done, loading is set to true, page renders.
    const configCaptures = () => {

        console.log("Double check:", feed);
        feed.forEach(person => {
            console.log("person:", person)
            person.captures.animals.forEach((animal => {
                feedArray.push(animal);
            }))
        })
        setFeed(feedArray);
        console.log("FINAL : feed array:" , feedArray);
    }

    const wait = () => {
        // setTimeout(func(), 1000);
        // setTimeout(func() { alert("Hello"); }, 3000);
    }
    
    
    // Load images and animal data into their arrays, set page to loaded so we can render everything below. (gets called once).
    useEffect( async ()=> {
        await loadCaptures()
        // setTimeout(wait(), 1000);
        // wait();
        configCaptures()
        // setTimeout(wait(), 1000);
        setLoaded(true)
        // setTimeout(func() , 1000);

    }, [])
    // useEffect(() => {
    //     configCaptures()
    //     setLoaded(true)
    // },[feed])
    

    // console.log("FEED:" , feed);

    // if (feed) {
    //     let animalArray = [];
    //     feed.forEach(person => {
    //         // animalArray.push(animal.captures.animals);
    //         person.captures.animals.forEach((animal => {
    //             feedArray.push(animal);
    //         }))
    //     })
    //     setfeed2(animalArray);
        
    //     console.log("animal array:" , animalArray);
    //     console.log("FINAL : feed array:" , feedArray);
    // }
    // if (feed2) {
    //     // setFeed(null);
    //     // setLoaded(true);
    // }

    
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
                            publicId={aCapture.public_id}
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