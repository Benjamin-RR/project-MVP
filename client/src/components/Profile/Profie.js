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
        setPage,
        userID,
        mediaQ,
        profileOption,
        currentCapture,
    } = useContext(CaptureContext);
    const [captureFeed, setCaptureFeed] = useState(null);
    const [userInfoFeed, setUserInfoFeed] = useState(null);
    const data = currentCapture;

    let history = useHistory();
    { !userID && 
        history.push("/Login")
    }

    useEffect( async ()=> {
        setPage("profile");

        // for rendering this profile's captures.
        const thisProfileCaptures = await LoadCapture([data.data.author])
        setCaptureFeed(thisProfileCaptures)
        // for getting all stats/achievements of this profile
        const thisProfileInfo = await LoadUsers([data.data.author])
        await setUserInfoFeed(thisProfileInfo)
    }, [])

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
    display: flex;
    align-items: center;
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