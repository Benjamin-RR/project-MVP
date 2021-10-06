import React, {useContext, useState, useEffect} from 'react';
import {CaptureContext} from '../CaptureContext';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom'; 
import Loading from '../Common/Loader';
import SingleCapture from '../Common/SingleCapture';
import {LoadCapture} from '../Utilities/LoadCapture';
import {Link} from 'react-router-dom';
import YourFriends from './FriendList';
import Button from '../Common/Button';
import Rate from '../Features/Rate';


const Home = () => {
    const {
        page,
        setPage,
        userID,
        // friendArray, 
        // setFriendArray,
        currentCapture,
        setCurrentCapture,
        appLoaded, 
        setAppLoaded,
        homeHasLoaded, 
        setHomeHasLoaded
    } = useContext(CaptureContext);
    let history = useHistory();
    { !userID && 
        history.push("/Login")
    }

    const [friendArray, setFriendArray] = useState(JSON.parse(localStorage.getItem("friends") ));
    const [feed, setFeed] = useState(null);
    const [homeLoading, setHomeLoading] = useState(true);
    
    // Load images and animal data into their arrays, set page to loaded so we can render everything below. (gets called once).
    useEffect( async ()=> {
        setPage("home");
        // console.log("IN HOME:" , friendArray);
        const results = await LoadCapture(friendArray)
        console.log("results received:" , results);
        // LoadCapture(friendArray)
        // .then((data) => {
        //     setFeed(data);
        //     setHomeLoading(false);
        // })
        await setFeed(results)
        setHomeLoading(false);
        // await setFeed( await LoadCapture(friendArray))
    }, [])

    // console.log("FEED:" , feed, friendArray, typeof friendArray);
    
    
    return (
        <Wrapper>
            <div 
                style={{ margin: "10px"}}
            ></div>
            {(feed && !homeLoading) ? (feed.map((data, index) => {
                return(
                    <CaptureContent
                    key={index}
                    >
                        <Card>
                            <SingleCapture
                                data={data}
                            />
                        </Card>
                        { data.author !== (localStorage.getItem("uniqueName")) ? (
                            <Button 
                                name="Rate"
                                data={data}
                            />
                        ) : (
                            <div style={{ marginBottom: "50px"}} ></div>
                        )}
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
    /* height: var(--defaultHeight); */
    min-height: var(--defaultHeight);
    width: 100%;
    border: 1px solid black;
`

const CaptureContent = styled.div`
    /* display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 400px;
    width: 320px;
    border: 1px solid black;
    padding: 5px;
    margin: 5px;
    background: green; */
`

const Card = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* height: 400px; */
    width: 320px;
    /* border: 1px solid black; */
    /* padding: 5px; */
    margin: 5px;
    /* background: green; */
`

export default Home;