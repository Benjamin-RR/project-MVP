import React, {useState} from 'react';
import styled from 'styled-components';
import SingleCapture from '../Common/SingleCapture';

// icons
import {BsStar} from 'react-icons/bs';
import {BsStarFill} from 'react-icons/bs';

const Rate = () => {
    const [stars, setStars] = useState(5);

    const handleStarClick = (stars) => {

    }

    const handleMouseEnter = (value) => {
        // setStars(value)
    }
    const handleMouseLeave = (value) => {
        // setStars(value)
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
                    onMouseLeave={handleMouseLeave(1)}
                >

                    {stars > 0 ? (
                        <Icon
                            i
                            onClick={handleStarClick(1)}
                            onMouseEnter={handleMouseEnter(1)}
                        >
                            <BsStarFill 
                                style={{ height: "100%", width: "100%"}}
                            />
                        </Icon>
                    ) : (
                        <Icon
                        onClick={handleStarClick(1)}
                        onMouseEnter={handleMouseEnter(1)}
                    >
                        <BsStar 
                            style={{ height: "100%", width: "100%"}}
                        />
                    </Icon>
                    )}

                    {stars > 1 ? (
                        <Icon
                            onClick={handleStarClick(2)}
                            onMouseEnter={handleMouseEnter(2)}
                        >
                            <BsStarFill 
                                style={{ height: "100%", width: "100%"}}
                            />
                        </Icon>
                    ) : (
                        <Icon
                        onClick={handleStarClick(2)}
                        onMouseEnter={handleMouseEnter(2)}
                    >
                        <BsStar 
                            style={{ height: "100%", width: "100%"}}
                        />
                    </Icon>
                    )}

                    {stars > 2 ? (
                        <Icon
                            onClick={handleStarClick(3)}
                            onMouseEnter={handleMouseEnter(3)}
                        >
                            <BsStarFill 
                                style={{ height: "100%", width: "100%"}}
                            />
                        </Icon>
                    ) : ( 
                        <Icon
                        onClick={handleStarClick(3)}
                        onMouseEnter={handleMouseEnter(3)}
                    >
                        <BsStar 
                            style={{ height: "100%", width: "100%"}}
                        />
                    </Icon>
                    )}

                    {stars > 3 ? (
                        <Icon
                            onClick={handleStarClick(4)}
                            onMouseEnter={handleMouseEnter(4)}
                        >
                            <BsStarFill 
                                style={{ height: "100%", width: "100%"}}
                            />
                        </Icon>
                    ) : (
                        <Icon
                            onClick={handleStarClick(4)}
                            onMouseEnter={handleMouseEnter(4)}
                        >
                            <BsStar 
                                style={{ height: "100%", width: "100%"}}
                            />
                        </Icon>
                    )}

                    {stars > 4 ? (
                        <Icon
                            onClick={handleStarClick(5)}
                            onMouseEnter={handleMouseEnter(5)}
                        >
                            <BsStarFill 
                                style={{ height: "100%", width: "100%"}}
                            />
                        </Icon>
                    ) : (
                        <Icon
                        onClick={handleStarClick(5)}
                        onMouseEnter={handleMouseEnter(5)}
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
    cursor: pointer;
`

const Icon = styled.div`
    height: 40px;
    width: 40px;
    margin: 5px;
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

