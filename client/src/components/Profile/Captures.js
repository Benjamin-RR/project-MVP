import React from 'react';
import styled from 'styled-components';
import SingleCapture from '../Common/SingleCapture';
import Loading from '../Common/Loader';
import Button from '../Common/Button';
import Title from './Common/Title';

const Captures = ({feed}) => {
    
    return (
        <Wrapper>
            <Title
                title={"Captures"}
            />
            {(feed) ? (feed.map((data, index) => {
                return(
                    <div
                    key={index}
                    >
                        <Card>
                            <SingleCapture
                                data={data}
                            />
                        </Card>
                        {data.author !== localStorage.getItem("uniqueName") && (
                            <Button 
                                name="Rate"
                                data={data}
                            />
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
    background: rgb(9,9,121);
    background: linear-gradient(90deg, rgba(9,9,121,0.2046568627450981) 0%, rgba(73,113,162,0.2046568627450981) 20%, rgba(73,113,162,0.14583333333333337) 50%, rgba(73,113,162,0.1962535014005602) 80%, rgba(57,64,142,0.1962535014005602) 100%);
`

const Card = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 320px;
    margin: 5px;
`

export default Captures;