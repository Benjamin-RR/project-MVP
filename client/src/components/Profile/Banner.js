import React, {useContext, useState} from 'react';
import {CaptureContext} from '../CaptureContext';import styled from 'styled-components';
// icons
import {TiCameraOutline} from 'react-icons/ti';
import {TiCamera} from 'react-icons/ti';
import {RiNumbersLine} from 'react-icons/ri';
import {RiNumbersFill} from 'react-icons/ri';
import {BsPeople} from 'react-icons/bs';
import {BsPeopleFill} from 'react-icons/bs';

import DefaultAvatar from '../Common/DefaultAvatar';


const Banner = ({data}) => {
    const {
        page,
        setPage,
        userID,
        mediaQ,
        setMediaQ,
        profileOption,
        setProfileOption
    } = useContext(CaptureContext);
    // const [selected, setSelected] = useState("Statistics")

    // console.log("from banner:" , data);

    return (
        <>
            <Wrapper>
                <TopToBottom>
                    <LeftToRight>
                        <Avatar>
                            <DefaultAvatar 
                                name={data.data.author}
                                color={data.data.userColor}
                                // style={{ height: "40px" , width: "40px"}}
                            />
                        </Avatar>
                        <UniqueName>
                            {data.data.author}
                        </UniqueName>
                    </LeftToRight>
                    { (mediaQ.matches === false) && (
                        <IconWrapper>
                            <Icon>
                                { profileOption === "Captures" ? (
                                    <TiCamera 
                                        style={{ height: "100%", width: "100%"}}
                                        // onClick={()=>{
                                        //     setSelected("Capture")
                                        // }}
                                    />
                                ) : (
                                    <TiCameraOutline 
                                        style={{ height: "100%", width: "100%"}}
                                        onClick={()=>{
                                            setProfileOption("Captures")
                                        }}
                                    />
                                )}
                            </Icon>

                            <Icon>
                            { profileOption === "Statistics" ? (
                                    <RiNumbersFill 
                                        style={{ height: "100%", width: "100%"}}
                                    />
                                ) : (
                                    <RiNumbersLine 
                                        style={{ height: "100%", width: "100%"}}
                                        onClick={()=>{
                                            setProfileOption("Statistics")
                                        }}
                                    />
                                )}
                            </Icon>

                            <Icon>
                            { profileOption === "Friends" ? (
                                    <BsPeopleFill 
                                        style={{ height: "100%", width: "100%"}}
                                    />
                                ) : (
                                    <BsPeople 
                                        style={{ height: "100%", width: "100%"}}
                                        onClick={()=>{
                                            setProfileOption("Friends")
                                        }}
                                    />
                                )}
                            </Icon>
                        </IconWrapper>
                    )}
                </TopToBottom>
            </Wrapper>
        </>
    )
}

const Wrapper = styled.div`
    /* padding: 10px; */
    display: flex;
    /* justify-content: space-around;
    align-items: center; */
    height: 150px;
    width: 100vw;
    border: 1px solid black;
`

const TopToBottom = styled.div`
    display: flex;
    flex-direction: column;
`

const LeftToRight = styled.div`
    display: flex;
    flex-direction: row;
    padding: 5px;
    height: 100%;
`

const Avatar = styled.div`
    /* display: flex;
    align-items: center; */
    height: 40px;
    width: 40px;
`

const UniqueName = styled.div`
    border: 1px solid black;
    margin-left: 10px;
    height: 50px;
    width: 100px;
    font-weight: 900;
    font-size: 2em;
`

const IconWrapper = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
    border: 1px solid black;
    /* margin-left: auto; */
`

const Icon = styled.div`
    color: black;
    text-decoration: none;
    margin: 5px;
    width: 30px;
    height: 30px;
    cursor: pointer;
    /* border: 1px solid black; */
`

export default Banner;