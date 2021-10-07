import React, {useContext, useState, useEffect} from 'react';
import {CaptureContext} from '../CaptureContext';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom'; 
import Loading from '../Common/Loader';
import SingleCapture from '../Common/SingleCapture';
import {LoadCapture} from '../Utilities/LoadCapture';
import Button from '../Common/Button';
// used for future update
import YourFriends from './FriendList';
import Rate from '../Features/Rate';

const Home = () => {
    const {
        setPage,
        userID,
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
        const results = await LoadCapture(friendArray);
        await setFeed(results);
        await setHomeLoading(false);
    }, [])
    
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
    min-height: var(--defaultHeight);
    width: 100%;
    border: 1px solid black;
`

const CaptureContent = styled.div`
`

const Card = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 320px;
    margin: 5px;
`

export default Home;