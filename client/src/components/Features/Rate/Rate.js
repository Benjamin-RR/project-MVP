import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import SingleCapture from '../../Common/SingleCapture';

// icons
import {BsStar} from 'react-icons/bs';
import {BsStarFill} from 'react-icons/bs';

const Rate = () => {
    const [stars, setStars] = useState(0);

    // HANDLE SUBMIT / STAR CLICK
    const handleStarClick = (e) => {
        e.preventDefault();
        setStars(e.target.value)
        // setStars(5)
        console.log("stars on click:", stars);
    }


    return(
        <Wrapper>
            <Text>Is this what the user says it is?</Text>
            <ContentWrapper>
                <Top>
                    <Button>UNSURE</Button>
                    <LeftToRight>
                        <Button>TRUE</Button>
                        <Button>FALSE</Button>
                    </LeftToRight>
                </Top>
                <Card>
                    {/* <SingleCapture 
                
                /> */}
                </Card>
                <Stars
                    onMouseLeave={(e) => {
                        setStars(0)
                    }}
                >

                    {stars > 0 ? (
                        <Icon
                            type="submit"
                            onClick={handleStarClick}
                            onMouseEnter={(e) => {
                                setStars(1)
                            }}
                        >
                            <BsStarFill 
                                style={{ height: "100%", width: "100%"}}
                            />
                        </Icon>
                    ) : (
                        <Icon
                        type="submit"
                        onClick={handleStarClick}
                        onMouseEnter={(e) => {
                            setStars(1)
                        }}
                    >
                        <BsStar 
                            style={{ height: "100%", width: "100%"}}
                        />
                    </Icon>
                    )}

                    {stars > 1 ? (
                        <Icon
                            type="submit"
                            onClick={handleStarClick}
                            onMouseEnter={(e) => {
                                setStars(2)
                            }}
                        >
                            <BsStarFill 
                                style={{ height: "100%", width: "100%"}}
                            />
                        </Icon>
                    ) : (
                        <Icon
                        type="submit"
                        onClick={handleStarClick}
                        onMouseEnter={(e) => {
                            setStars(2)
                        }}
                    >
                        <BsStar 
                            style={{ height: "100%", width: "100%"}}
                        />
                    </Icon>
                    )}

                    {stars > 2 ? (
                        <Icon
                            type="submit"
                            onClick={handleStarClick}
                            onMouseEnter={(e) => {
                                setStars(3)
                            }}
                        >
                            <BsStarFill 
                                style={{ height: "100%", width: "100%"}}
                            />
                        </Icon>
                    ) : ( 
                        <Icon
                            type="submit"
                            onClick={handleStarClick}
                            onMouseEnter={(e) => {
                                setStars(3)
                            }}
                        >
                        <BsStar 
                            style={{ height: "100%", width: "100%"}}
                        />
                    </Icon>
                    )}

                    {stars > 3 ? (
                        <Icon
                            type="submit"
                            onClick={handleStarClick}
                            onMouseEnter={(e) => {
                                setStars(4)
                            }}
                        >
                            <BsStarFill 
                                style={{ height: "100%", width: "100%"}}
                            />
                        </Icon>
                    ) : (
                        <Icon
                            type="submit"
                            onClick={handleStarClick}
                            onMouseEnter={(e) => {
                                setStars(4)
                            }}
                        >
                            <BsStar 
                                style={{ height: "100%", width: "100%"}}
                            />
                        </Icon>
                    )}

                    {stars > 4 ? (
                        <Icon
                            type="submit"
                            onClick={handleStarClick}
                            onMouseEnter={(e) => {
                                setStars(5)
                            }}
                        >
                            <BsStarFill 
                                style={{ height: "100%", width: "100%"}}
                            />
                        </Icon>
                    ) : (
                        <Icon
                        type="submit"
                        onClick={handleStarClick}
                        onMouseEnter={(e) => {
                            setStars(5)
                        }}
                    >
                        <BsStar 
                            style={{ height: "100%", width: "100%"}}
                        />
                    </Icon>
                    )}
                </Stars>
            </ContentWrapper>
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

const Text = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.4em;
    font-weight: 900;
    width: 300px;
    height: 50px;
    font-weight: center;
    border: 1px solid black;
`

const ContentWrapper = styled.div`
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 400px;
    width: 300px;
    border: 1px solid black;
`

const Top = styled.div`
    display: flex;
    flex-direction: column;
`

const Button = styled.button`
    width: 100%;
    cursor: pointer;
    &:hover{
        color: blue;
        /* transform: scale(105%); */
        transform: rotate(1.009turn) scale(120%);
    }
    &:active{
        transform: rotate(1.014turn) scale(110%);
    }
`

const LeftToRight = styled.div`
    display: flex;
    flex-direction: row;
`

const Card = styled.div`
    height: 100%;
    width: 100%;
    border: 1px solid black;
    margin: 5px;
`

const Stars = styled.div`
    display: flex;
    flex-direction: row;
    `

const Icon = styled.div`
    height: 40px;
    width: 40px;
    margin: 5px;
    cursor: pointer;
    color: goldenrod;
    /* border: 1px solid black; */
    &:hover{
        color: gold;
        transform: scale(125%);
        transform: rotate(1.01turn) scale(140%);
    }
    &:active{
        transform: scale(95%);
    }
`

export default Rate;

