import React, {useContext, useState, useEffect} from 'react';
import {CaptureContext} from '../CaptureContext';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom'; 
import Loading from '../Common/Loader';
import SingleCapture from '../Common/SingleCapture';
import LoadCapture from '../Utilities/LoadCapture';

const Home = () => {
    const {
        page,
        setPage,
        userID,
        // friendArray, 
        // setFriendArray
    } = useContext(CaptureContext);
    const [friendArray, setFriendArray] = useState(localStorage.getItem("friends").split(','));

    if (page !== "home") {
        setPage("home");
        // window.location.reload();
    }
    
    let history = useHistory();
    { !userID && 
        history.push("/Login")
    }

    let feedArray = [];
    const [feed, setFeed] = useState(null);

    // // LOAD CAPTURES
    // const loadCaptures = async () => {
    //     let animalDataArray = [];

    //     try{
    //         // get each user data (includes animal captures) and put into a new array.
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
    //                     const userData = data.data;
    //                         animalDataArray.push(userData);
    //                 }
    //                 if (data.status === 400) {
    //                     console.log("error:" , data.message);
    //                 }
    //                 return(animalDataArray)
    //             })
    //             .then((animalDataArray) => {
    //                 console.log("Double check:", animalDataArray);
    //                 animalDataArray.forEach(person => {
    //                     console.log("person:", person)
    //                     person.captures.animals.forEach((animal => {
    //                         feedArray.push(animal);
    //                     }))
    //                 })
    //                 setFeed(feedArray);
    //             })
    //             .catch((error) => {
    //                 console.log("A server side error occured while attempting to fetch animal data.");
    //             });
    //         })
    //     } catch (error) {
    //         console.error("Error:" , error);
    //     }
    // }

    // console.log("Friend list:" , friendArray);
    
    // Load images and animal data into their arrays, set page to loaded so we can render everything below. (gets called once).
    useEffect( async ()=> {
        await loadCaptures() 
    }, [])

    return (
        <Wrapper>
            <div>Captures</div>
            {(feed) ? (feed.map((data, index) => {
                return(
                    <CaptureContent
                    key={index}
                    >
                        <SingleCapture
                            data={data}
                        />
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

export default Home;