import React, {useContext, useState, useEffect} from 'react';
import {CaptureContext} from '../CaptureContext';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom'; 
import Loading from '../Common/Loader';
import SingleCapture from '../Common/SingleCapture';
import {LoadCapture} from '../Utilities/LoadCapture';
import {Link} from 'react-router-dom';


const Home = () => {
    const {
        page,
        setPage,
        userID,
        // friendArray, 
        // setFriendArray,
        currentCapture,
        setCurrentCapture
    } = useContext(CaptureContext);
    let history = useHistory();
    { !userID && 
        history.push("/Login")
    }

    const [friendArray, setFriendArray] = useState(JSON.parse(localStorage.getItem("friends") ));
    const [feed, setFeed] = useState(null);
    const [homeLoading, setHomeLoading] = useState(true);

    if (page !== "home") {
        setPage("home");
        // window.location.reload();
    }
    
    // Load images and animal data into their arrays, set page to loaded so we can render everything below. (gets called once).
    useEffect( async ()=> {
        const results = await LoadCapture(friendArray)
        // LoadCapture(friendArray)
        // .then((data) => {
        //     setFeed(data);
        //     setHomeLoading(false);
        // })
        setFeed(results)
        // setHomeLoading(false);
    }, [])

    if (feed && homeLoading) {
        setHomeLoading(false)
    }

    // console.log("FEED:" , feed, friendArray, typeof friendArray);
    
    
    return (
        <Wrapper>
            <div>Captures</div>
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
                            <Rate
                                // onClick={() => {
                                //     localStorage.setItem("CaptureInfo", JSON.stringify(data) )
                                // }}
                                onClick={() => {
                                    setCurrentCapture(data)
                                }}
                                to="/Rate"
                            >Rate</Rate>
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
    border: 1px solid black;
    /* padding: 5px; */
    margin: 5px;
    /* background: green; */
`

const Rate = styled(Link)`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    margin-bottom: 50px;
    margin-left: auto;
    margin-right: 20px;
    width: 100px;
    border-radius: 7px;
    border: 1px solid black;
    cursor: pointer;
    text-decoration: none;
    &:hover{
        transform: scale(125%) ease-in-out 1000ms;
    }
    &:active{
        transform: scale(95%);
    }
`

export default Home;