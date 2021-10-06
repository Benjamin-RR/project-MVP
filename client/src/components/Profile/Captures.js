import React, {useContext} from 'react';
import {CaptureContext} from '../CaptureContext';
import styled from 'styled-components';
import SingleCapture from '../Common/SingleCapture';
import Loading from '../Common/Loader';
import {Link} from 'react-router-dom';

const Captures = ({feed}) => {
    const {
        page,
        setPage,
        userID,
        // friendArray, 
        // setFriendArray,
        currentCapture,
        setCurrentCapture,
        badgeSetting, 
        setBadgeSetting,
    } = useContext(CaptureContext);
    
    return (
        <Wrapper>
            {(feed) ? (feed.map((data, index) => {
                return(
                    <div
                    key={Math.floor(Math.random)* 999999999}
                    >
                        <Card>
                            <SingleCapture
                                data={data}
                            />
                        </Card>
                        {data.author !== localStorage.getItem("uniqueName") && (
                            <Rate
                                onClick={() => {
                                    setCurrentCapture(data)
                                }}
                                to="/Rate"
                            >Rate</Rate>
                        )}
                        <div style={{ marginBottom: "50px"}} ></div>
                    </div>
                )
            })) : (
                <Loading />
            )}
        </Wrapper>
    )
}

const Wrapper = styled.div`
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    /* border: 1px solid black; */
    background: rgb(9,9,121);
    background: linear-gradient(90deg, rgba(9,9,121,0.2046568627450981) 0%, rgba(73,113,162,0.2046568627450981) 20%, rgba(73,113,162,0.14583333333333337) 50%, rgba(73,113,162,0.1962535014005602) 80%, rgba(57,64,142,0.1962535014005602) 100%);
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

export default Captures;