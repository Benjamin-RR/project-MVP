import React, {useContext} from 'react';
import { CaptureContext } from './CaptureContext';
import styled from 'styled-components';

const Dropdown = () => {
    const {
        page,
        setPage,
        dropdown,
        setDropdown,
        userID,
        setUserID,
        mediaQ,
        setMediaQ
    } = useContext(CaptureContext);

    // handle reponsive window.
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

    // handle sign out.
    const handleSignOut = () => {
        localStorage.removeItem("userID");
        setUserID(null);
        window.location.reload();
    }

    return(
        (mediaQ.matches === true) ? (
            <Wrapper
                style={{ top: "85px"}}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <DropDownHide></DropDownHide>
                <DropDownItem>Account</DropDownItem>
                <DropDownItem>Friends</DropDownItem>
                <DropDownItem>Achievements</DropDownItem>
                <DropDownItem>Help</DropDownItem>
                <DropDownItem>Settings</DropDownItem>
                <DropDownItem
                    onClick={handleSignOut} type="submit"
                >Sign Out</DropDownItem>


            </Wrapper>
        ) : (
            <Wrapper>
                <DropDownHide></DropDownHide>
                <DropDownItem>Account</DropDownItem>
                <DropDownItem>Friends</DropDownItem>
                <DropDownItem>Achievements</DropDownItem>
                <DropDownItem>Help</DropDownItem>
                <DropDownItem>Settings</DropDownItem>
                <DropDownItem
                    onClick={handleSignOut} type="submit"
                >Sign Out</DropDownItem>
            </Wrapper>
        )
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 200px;
    height: 200px;
    /* border: 1px solid black; */
    position: absolute;
    right: 10px;
    top: 80px;
`


const DropDownItem = styled.button`
    padding: 10px;
    width: 100%;
    cursor: pointer;
    background: #e56717;
    color: white;
    border: none;
    font-weight: 900;
    font-size: 1em;
    &:hover {
        background: darkorange;
    }
    &:active {
        transform: scale(0.9);
    }
    `

    const DropDownHide = styled(DropDownItem)`
        visibility: hidden;
    `


export default Dropdown;