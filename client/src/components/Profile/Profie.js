import React, {useContext, useState, useEffect} from 'react';
import {CaptureContext} from '../CaptureContext';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom'; 
//components
import Banner from './Banner';
import Captures from './Captures';
import Statistics from './Statistics';
import Achievements from './Achievements';
import Friends from './Friends';
// utility
import {LoadCapture} from '../Utilities/LoadCapture';



const Profile = () => {
    const {
        page,
        setPage,
        userID,
        mediaQ,
        setMediaQ,
        profileOption,
        setProfileOption
    } = useContext(CaptureContext);
    setPage("profile");

    let history = useHistory();
    { !userID && 
        history.push("/Login")
    }

    const data = (JSON.parse(localStorage.getItem("CaptureInfo")).data );
    const [feed, setFeed] = useState(null);

    console.log("data from profile:" , data)

    useEffect( async ()=> {
        const results = await LoadCapture([data.author])
        console.log("results:" , results);
        setFeed(results)
    }, [])

    // console.log("mediaQ:" , mediaQ);

    return (
        <>
            { (mediaQ.matches === false) ? (
                <Wrapper>
                    <TopToBottom>
                        <Banner 
                            data={data}
                        />
                        <LeftToRight>
                            {profileOption === "Captures" && (
                                <Captures 
                                    feed={feed}
                                />
                            )}
                            {profileOption === "Statistics" && (
                                <TopToBottom>
                                    <Statistics 
                                        data={data}
                                    />
                                    <Achievements 
                                        data={data}
                                    />
                                </TopToBottom>
                            )}
                            {profileOption === "Friends" && (
                                    <Friends 
                                        data={data}
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
                                feed={feed}
                            />
                            <TopToBottom>
                                <Statistics 
                                    data={data}
                                />
                                <Achievements 
                                    data={data}
                                />
                            </TopToBottom>
                                <Friends 
                                    data={data}
                                />
                        </LeftToRight>

                    </TopToBottom>
                </Wrapper>
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