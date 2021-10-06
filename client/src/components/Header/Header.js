import React, {useContext, useState} from 'react';
import {CaptureContext} from '../CaptureContext';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
// icons
import {AiFillHome} from 'react-icons/ai';
import {AiOutlineHome} from 'react-icons/ai';
import {MdMessage} from 'react-icons/md';
import {FiMessageSquare} from 'react-icons/fi'
import {AiFillCompass} from 'react-icons/ai';
import {AiOutlineCompass} from 'react-icons/ai'
import {AiFillTrophy} from 'react-icons/ai';
import {AiOutlineTrophy} from 'react-icons/ai'
import Dropdown from './Dropdown/Dropdown';

import DefaultAvatar from '../Common/DefaultAvatar';

const Header = () => {
    const {
        page,
        dropdown,
        setDropdown,
        userID,
        mediaQ,
        setCurrentCapture,
        setComingFrom
    } = useContext(CaptureContext);
    const [userColor, setUserColor] = useState(localStorage.getItem("userColor"));
    const [uniqueName, setUniqueName] = useState(localStorage.getItem("uniqueName"));

    
    let headerHeight = `150px`;
    if (mediaQ.matches === false) {
        headerHeight = "100%"
    } else {
        headerHeight = `100px`
    }
    mediaQ.onchange = (e) => {
        // window.location.reload();
    }
        
    // handle dropdown
    const handleMouseEnter = () => {
        setDropdown(true)
    }
    const handleMouseLeave = () => {
        setDropdown(false)
    }

    return (
        <Wrapper
            style={{
                height: `${headerHeight}`
            }}
        >
            <TitleWrapper
                to="/"
            >
                <img 
                    src='/Title.png'
                    style={{ height: "50px" , width: "100%"}}
                />
            </TitleWrapper>

            { userID ? (
                <>
                    <IconWrapper>
                        <Icon 
                            to="/" >
                            { page === "home" ? (
                                <AiFillHome 
                                    style={{ height: "100%", width: "100%"}}
                                />
                            ) : (
                                <AiOutlineHome 
                                    style={{ height: "100%", width: "100%"}}
                                />
                            )}
                        </Icon>

                        {/* <Icon to="/DM" >
                        { page === "dm" ? (
                                <MdMessage 
                                    style={{ height: "100%", width: "100%"}}
                                />
                            ) : (
                                <FiMessageSquare 
                                    style={{ height: "100%", width: "100%"}}
                                />
                            )}
                        </Icon> */}

                        <Icon 
                            onClick={() => {
                                setCurrentCapture(null);
                                setComingFrom('header');
                            }}
                            to="/Explore"
                        >
                        { page === "explore" ? (
                                <AiFillCompass 
                                    style={{ height: "100%", width: "100%"}}
                                />
                            ) : (
                                <AiOutlineCompass 
                                    style={{ height: "100%", width: "100%"}}
                                />
                            )}
                        </Icon>

                        {/* <Icon to="/Leaderboard" >
                        { page === "leaderboard" ? (
                                <AiFillTrophy 
                                    style={{ height: "100%", width: "100%"}}
                                />
                            ) : (
                                <AiOutlineTrophy 
                                    style={{ height: "100%", width: "100%"}}
                                />
                            )}
                        </Icon> */}

                        <UserAvatar
                            onClick={() => {
                                if (mediaQ.matches === false) {
                                    setDropdown(!dropdown);
                                }
                            }}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            style={{
                                background: `${userColor}`,
                                borderRadius: "50%"
                            }}
                        >
                            <DefaultAvatar 
                                name={uniqueName}
                                color={userColor}
                            />
                        </UserAvatar>
                    </IconWrapper>
                    { dropdown && (
                        <Dropdown />
                    )}
                </>
            ) : (
                <div></div> 
            )}
            
        </Wrapper>
    )
}

const Wrapper = styled.div`
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 150px;
    width: 100%;
    background: var(--color-Header-Footer);
    background-image: var(--image-Header-Footer);
    border: 1px solid black;
`

const TitleWrapper = styled(Link)`
    display: flex;
    flex-direction: column;
    text-decoration: none;
`

const IconWrapper = styled.div`
    display: flex;
    align-items: center;
`

const Icon = styled(Link)`
    color: black;
    text-decoration: none;
    margin: 5px;
    width: 30px;
    height: 30px;
`

const UserAvatar = styled.div`
    margin: 5px;
    height: 40px;
    width: 40px;
    cursor: pointer;
    position: relative;
`

export default Header;