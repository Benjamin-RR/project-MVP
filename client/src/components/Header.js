import React, {useContext} from 'react';
import {CaptureContext} from './CaptureContext';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {AiFillHome} from 'react-icons/ai';
import {AiOutlineHome} from 'react-icons/ai';
import {MdMessage} from 'react-icons/md';
import {FiMessageSquare} from 'react-icons/fi'
import {AiFillCompass} from 'react-icons/ai';
import {AiOutlineCompass} from 'react-icons/ai'
import {AiFillTrophy} from 'react-icons/ai';
import {AiOutlineTrophy} from 'react-icons/ai'

const Header = () => {
    const {
        page,
        setPage,
        dropdown,
        setDropdown
    } = useContext(CaptureContext);    

    console.log("Page:" , page);

    const handleDropdown = () => {
        setDropdown(true)
    }

    return (
        <Wrapper>
            <TitleWrapper
                to="/"
            >
                <h1>Capture</h1>
                <h2>Your animal of desire</h2>
            </TitleWrapper>

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
                        handleDropdown();
                    }}
                >
                    {/* <img 
                        src=""
                        alt="user's avatar"
                    /> */}
                </UserAvatar>
            </IconWrapper>
            
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
    border: 1px solid black;
`

export default Header;