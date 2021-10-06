import React, {useState, useEffect, useContext} from 'react';
import { CaptureContext } from '../../CaptureContext';
import styled from 'styled-components';
import SingleCapture from '../../Common/SingleCapture';
import { useHistory } from 'react-router-dom'; 

// icons
import {BsStar} from 'react-icons/bs';
import {BsStarFill} from 'react-icons/bs';

const Rate = () => {
    const {
        page,
        setPage,
        userID,
        currentCapture,
        setCurrentCapture,
    } = useContext(CaptureContext);
    let history = useHistory();

    useEffect(() => {
        setPage("rate");

    },[])

    // use history to push to homepage if user forced their way here (from a page that wasn't homepage), to avoid render crash or cheating and voting on their own capture.

    // console.log("current capture is:" , currentCapture);
    // console.log("Window pos:" , window.pageYOffset)

    const [stars, setStars] = useState(0);
    const [starVote, setStarVote] = useState(0);
    const [vote, setVote] = useState(null);
    const [castingVote, setCastingVote] = useState(false);
    

    // HANDLE SUBMIT / STAR CLICK
    const handleStarClick = (e) => {
        e.preventDefault();
        setStarVote(stars)
        console.log("stars on click:", stars);
        // areWeGood();
    }

    // HANDLE SUBMIT / VOTE CLICK
    const handleVoteClick = (e) => {
        // e.preventDefault();
        // setVote(e.target.value)
        // console.log("vote:" , vote);
        // areWeGood();
    }

    // checks to see if we are good to move on and submit
    const submitVote = () => {
        // if (!starVote || !vote) {
        //     console.log("CAST:" , starVote, vote);
        //     console.log("NOT READY")
        //     return;
        // } else {
            // console.log("SUBMITTING!")
            // submit vote and update mongoDB accordingly.
                fetch(`capture/vote`, {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        voter: localStorage.getItem("uniqueName"),
                        author: currentCapture.author,
                        vote: {
                            vote : vote,
                            stars : starVote,
                            captureId : currentCapture._id
                        }
                    }),
                })
                .then((res) => res.json())
                .then((data) => {
                    if (data.status === 200) {
                        console.log("SUCCESS!", data);
                    }
                    if (data.status === 400) {
                        console.log("Pandar's box, an error has occured.", data.error)
                    }
                    // setConfirmation(data.data);
                    // setConfirmationLoaded(true);
                    // setFlightNumber("");
                    console.log("success:", data)
                })
                .catch((error) => {
                    console.log("Error", error);
                });

            // console.log("READY")
        // }
        return;
    }

    if (starVote && vote ) {
        setCastingVote(true);
        submitVote();
        setStarVote(0);
        setVote(null);
        history.push('/');
    }

    return(
        <Wrapper>
            <Text>Is this what the user says it is?</Text>
            <ContentWrapper>
                <Top>
                    {vote ? (
                        <Revote
                            onClick={() => {
                                setVote(null);
                            }}
                        >REVOTE</Revote>
                    ):(
                        <>
                            <Button
                                type="submit"
                                onClick={() => {
                                    setVote("UNSURE");
                                    handleVoteClick();
                                }}
                            >UNSURE</Button>
                            <LeftToRight>
                                <Button
                                    type="submit"
                                    onClick={() => {
                                        setVote("TRUE");
                                        handleVoteClick();
                                    }}
                            >TRUE</Button>
                                <Button
                                    type="submit"
                                    onClick={() => {
                                        setVote("FALSE");
                                        handleVoteClick();
                                    }}
                                >FALSE</Button>
                            </LeftToRight>
                        </>
                    )}
                </Top>

                <Card>
                    <SingleCapture 
                        data={currentCapture}
                        disableAvatar={true}
                        disableMap={true}
                    />
                </Card>

                <Stars
                    onMouseLeave={(e) => {
                        setStars(starVote)
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
    /* justify-content: space-around; */
    align-items: center;
    /* height: var(--defaultHeight); */
    width: 100%;
    border: 1px solid black;
    /* offset-position: -200px; */    
`

const Text = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.4em;
    font-weight: 900;
    width: 354px;
    height: 50px;
    font-weight: center;
    border: 1px solid black;
    background: goldenrod;
    color: white;
`

const ContentWrapper = styled.div`
    padding: 10px;
    display: flex;
    flex-direction: column;
    /* justify-content: space-around; */
    align-items: center;
    /* height: 400px; */
    /* width: 100%; */
    border: 1px solid black;
    /* background: grey; */
    background-color: var(--background-color-alternative);
    background-image: var(--background-image-alternative);
`

const Top = styled.div`
    display: flex;
    flex-direction: column;
`

const Button = styled.button`
    width: 100%;
    cursor: pointer;
    background-color: var(--color-light);
    border: 1px solid black;
    &:hover{
        background-color: var(--color-dark);
        color: goldenrod;
        /* transform: scale(105%); */
        transform: rotate(1.009turn) scale(120%);
    }
    &:active{
        transform: rotate(1.014turn) scale(110%);
    }
    `
    
    const Revote = styled(Button)`
        /* width: 100%; */
    `

const LeftToRight = styled.div`
    display: flex;
    flex-direction: row;
`

const Card = styled.div`
    /* height: 100%; */
    width: 100%;
    /* border: 1px solid black; */
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

