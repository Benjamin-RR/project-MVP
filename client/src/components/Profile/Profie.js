import React, {useContext, useState, useEffect} from 'react';
import {CaptureContext} from '../CaptureContext';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom'; 
//components
import Banner from './Banner';
import Captures from './Captures';
import Statistics from './Statistics';
import Achievements from './Statistics/Achievements';
import Friends from './Friends';
// utility
import {LoadCapture} from '../Utilities/LoadCapture';
import { LoadUsers } from '../Utilities/LoadUsers';

import Loader from '../Common/Loader';


const Profile = () => {
    const {
        page,
        setPage,
        userID,
        mediaQ,
        setMediaQ,
        profileOption,
        setProfileOption,
        currentCapture,
        setCurrentCapture
    } = useContext(CaptureContext);
    setPage("profile");

    let history = useHistory();
    { !userID && 
        history.push("/Login")
    }
    // const data = currentCapture;
    const data = (JSON.parse(localStorage.getItem("CaptureInfo")).data );
    const [feed, setFeed] = useState(null);
    const [captureFeed, setCaptureFeed] = useState(null);
    const [userInfoFeed, setUserInfoFeed] = useState(null);

    useEffect( async ()=> {
        // for rendering this profile's captures.
        const thisProfileCaptures = await LoadCapture([data.author])
        // console.log("RESULT CAPTURES:" , thisProfileCaptures);
        setCaptureFeed(thisProfileCaptures)
        // for getting all stats/achievements of this profile
        const thisProfileInfo = await LoadUsers([data.author])

        // console.log("NEW:" , thisProfileInfo);
        // thisProfileCaptures.forEach(()=> {
        //     console.log("test")
        // })

        console.log("RESULT USER INFO:" , thisProfileInfo);
        setUserInfoFeed(thisProfileInfo)
    }, [])

    // console.log("FOR STATISTICS:" , userInfoFeed )
    console.log("check states:", captureFeed, userInfoFeed);

    return (
        <>
            {(captureFeed && userInfoFeed) ? (
                <div>
                    { (mediaQ.matches === false) ? (
                        <Wrapper>
                            <TopToBottom>
                                <Banner 
                                    data={data}
                                />
                                <LeftToRight>
                                    {profileOption === "Captures" && (
                                        <Captures 
                                        feed={captureFeed}
                                        />
                                    )}
                                    {profileOption === "Statistics" && (
                                        <TopToBottom>
                                            <Statistics 
                                                data={userInfoFeed}
                                            />
                                            <Achievements 
                                                data={userInfoFeed}
                                            />
                                        </TopToBottom>
                                    )}
                                    {profileOption === "Friends" && (
                                            <Friends 
                                                data={userInfoFeed}
                                            />
                                    )}
                                </LeftToRight>
        
                            </TopToBottom>
                        </Wrapper>
                    ):(
                        <Wrapper>
                            <TopToBottom>
                                <Banner 
                                    data={data}
                                />
                                <LeftToRight>
                                    <Captures 
                                        feed={captureFeed}
                                    />
                                    <TopToBottom>
                                        <Statistics 
                                            data={userInfoFeed}
                                        />
                                        <Achievements 
                                            data={userInfoFeed}
                                        />
                                    </TopToBottom>
                                        <Friends 
                                            data={userInfoFeed}
                                        />
                                </LeftToRight>
        
                            </TopToBottom>
                        </Wrapper>
                    )}
                </div>
            ):(
                <Loader />
            )}
        </>
    )
}

const Wrapper = styled.div`
    /* padding: 10px; */
    display: flex;
    justify-content: space-around;
    align-items: center;
    /* height: var(--defaultHeight); */
    width: 100%;
    border: 1px solid black;
`

const TopToBottom = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`

const LeftToRight = styled.div`
    display: flex;
    flex-direction: row;
`


export default Profile;