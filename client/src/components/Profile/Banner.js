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
        mediaQ,
        profileOption,
        setProfileOption
    } = useContext(CaptureContext);


    return (
        <>
            <Wrapper>
                <img 
                    src={`/banner.jpg`} 
                    alt="Profile Banner"
                    style={{ width: "100%", height: "100%", position: "absolute", objectFit: "cover", zIndex: "0"}}
                />
                <TopToBottom>
                    <LeftToRight>
                        <Avatar>
                            <DefaultAvatar 
                                name={data.author}
                                color={data.userColor}
                            />
                        </Avatar>
                        <UniqueName>
                            {data.author}
                        </UniqueName>
                    </LeftToRight>
                    { (mediaQ.matches === false) && (
                        <IconWrapper>
                            <Icon>
                                { profileOption === "Captures" ? (
                                    <TiCamera 
                                        style={{ height: "100%", width: "100%"}}
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
    display: flex;
    height: 150px;
    width: 100%;
    position: relative;
`

const TopToBottom = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`

const LeftToRight = styled.div`
    display: flex;
    flex-direction: row;
    padding: 5px;
    height: 100%;
`

const Avatar = styled.div`
    height: 40px;
    width: 40px;
`

const UniqueName = styled.div`
    margin-left: 10px;
    height: 50px;
    width: 100px;
    font-weight: 900;
    font-size: 2em;
`

const IconWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-left: auto;
    z-index: 2;
`

const Icon = styled.div`
    color: black;
    text-decoration: none;
    margin: 5px;
    width: 30px;
    height: 30px;
    cursor: pointer;
`

export default Banner;