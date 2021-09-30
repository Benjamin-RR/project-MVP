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
        setPage,
        dropdown,
        setDropdown,
        userID,
        mediaQ,
        setMediaQ,
        friendClick, 
        setFriendClick,
        // userColor,
        // setUserColor,
        // uniqueName, 
        // setUniqueName,
    } = useContext(CaptureContext);
    const [userColor, setUserColor] = useState(localStorage.getItem("userColor"));
    const [uniqueName, setUniqueName] = useState(localStorage.getItem("uniqueName"));

    
    let headerHeight = `150px`;
    if (mediaQ.matches === false) {
        headerHeight = "100%"
    } else {
        headerHeight = `150px`
    }
    mediaQ.onchange = (e) => {
        window.location.reload();
    }
        
    // handle dropdown
    const handleMouseEnter = () => {
        setDropdown(true)
    }
    const handleMouseLeave = () => {
        setDropdown(false)
    }

    // console.log("user color: ", userColor);
    // console.log("CHECK", uniqueName.split(uniqueName.charAt(2))[0].toUpperCase()  );

    // // test for character string
    // var txt = 'Hello World!';
    // var x = 30,
    //     y = 50;

    // context.font = "40px Helvetica";

    // context.strokeStyle = 'white';

    // // setup these to match your needs
    // context.miterLimit = 2;
    // context.lineJoin = 'circle';

    // // draw an outline, then filled
    // context.lineWidth = 7;
    // context.strokeText(txt, x, y);
    // context.lineWidth = 1;
    // context.fillText(txt, x, y);


    return (
        <Wrapper
            style={{
                height: `${headerHeight}`
            }}
        >
            <TitleWrapper
                to="/"
            >
                <h1>Capture</h1>
                <h2>Your animal of desire</h2>
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

                        <Icon to="/DM" >
                        { page === "dm" ? (
                                <MdMessage 
                                    style={{ height: "100%", width: "100%"}}
                                />
                            ) : (
                                <FiMessageSquare 
                                    style={{ height: "100%", width: "100%"}}
                                />
                            )}
                        </Icon>

                        <Icon to="/Explore" >
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

                        <Icon to="/Leaderboard" >
                        { page === "leaderboard" ? (
                                <AiFillTrophy 
                                    style={{ height: "100%", width: "100%"}}
                                />
                            ) : (
                                <AiOutlineTrophy 
                                    style={{ height: "100%", width: "100%"}}
                                />
                            )}
                        </Icon>

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
    border: 1px solid black;
`

const TitleWrapper = styled(Link)`
    display: flex;
    flex-direction: column;
    text-decoration: none;
`

const IconWrapper = styled.div`
    display: flex;
    /* border: 1px solid black; */
`

const Icon = styled(Link)`
    color: black;
    text-decoration: none;
    margin: 5px;
    width: 30px;
    height: 30px;
    /* border: 1px solid black; */
`

const UserAvatar = styled.div`
    margin: 5px;
    height: 30px;
    width: 30px;
    /* border: 1px solid black; */
    cursor: pointer;
    position: relative;
`

export default Header;