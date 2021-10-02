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

    justify-content: space-around;
    align-items: center;
    /* height: 100%; */
    width: 100%;
    border: 1px solid black;
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