import React, {useContext} from 'react';
import { CaptureContext } from './CaptureContext';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import { useHistory } from 'react-router';
// footer link icons
import {GrYoutube} from 'react-icons/gr';
import {GrInstagram} from 'react-icons/gr';
import {GrFacebook} from 'react-icons/gr';
import {GrLinkedin} from 'react-icons/gr'
import {GrGithub} from 'react-icons/gr';

// for mobile
import {GrGallery} from 'react-icons/gr';
import {AiOutlineCamera} from 'react-icons/ai';
import {BsCloudUpload} from 'react-icons/bs';


const Footer = () => {
    const {
        page,
        setPage,
        dropdown,
        setDropdown,
        userID,
        mediaQ,
        setMediaQ
    } = useContext(CaptureContext);

    let history = useHistory();

    // if (@media(max-width: 600px))
    // const mediaQuery = window.matchMedia('(min-width: 600px')
    // console.log("testing:" , mediaQuery);
    // if (mediaQuery.matches === true) {
        // console.log("true")
    // } else {
        // console.log("false")
    // }
    
    // handles rendering footer correctly if you dynamically change your screen.
    mediaQ.onchange = (e) => {
        window.location.reload();
    }


    // handles opening all footer link paths.
    const handleLink = (path) => {
        console.log("check:", path.path);
        if (path.type === "leave") {
            window.open(path.path, '_blank');
        }
        if (path.type === "stay") {
            history.push(path.path)
            // window.location.reload();
        }
    }

    // || page !== "explore"
    return (
        <>
            { (mediaQ.matches === true) ? (
                <Wrapper>
                    <Left>
                        <Text to="/About" >About</Text>
                        <Text to="/Blog" >Blog</Text>
                        <Text to="/Help" >Help</Text>
                        <Text to="/Terms" >Terms of Use</Text>
                        <Text to="Contact" >Contact us</Text>
                    </Left>

                    <IconWrapper
                        onClick={() => {
                            // handleLink("");
                        }}
                    >
                        <Icon>
                            <GrYoutube 
                                style={{ height: "100%", width: "100%"}}
                            />
                        </Icon>
                        <Icon
                            onClick={() => {
                                // handleLink("");
                            }}
                        >
                            <GrInstagram 
                                style={{ height: "100%", width: "100%"}}
                            />
                        </Icon>
                        <Icon
                            onClick={() => {
                                // handleLink("");
                            }}
                        >
                            <GrFacebook 
                                style={{ height: "100%", width: "100%"}}
                            />
                        </Icon>
                        <Icon
                            onClick={() => {
                                
                                handleLink({path: "https://www.linkedin.com/in/benjaminrobertrussell/", type: "leave"});
                            }}
                        >
                            <GrLinkedin 
                                style={{ height: "100%", width: "100%"}}
                            />
                        </Icon>
                        <Icon
                            onClick={() => {
                                handleLink({path: "https://github.com/Benjamin-RR/project-MVP", type: "leave"});
                            }}
                        >
                            <GrGithub 
                                style={{ height: "100%", width: "100%"}}
                            />
                        </Icon>
                    </IconWrapper>
                </Wrapper>
            ) : (
                <CameraButtons>
                    <Icon
                    onClick={() => {
                        handleLink({path: "/Gallery", type: "stay"});
                    }}
                    >
                        <GrGallery 
                            style={{ height: "100%", width: "100%"}}
                        />
                    </Icon>
                    <Icon
                    onClick={() => {
                        handleLink({path: "/Camera", type: "stay"});
                    }}
                    >
                        <AiOutlineCamera 
                            style={{ height: "100%", width: "100%"}}
                        />
                    </Icon>
                    <Icon
                        onClick={() => {
                            handleLink({path: "/Upload", type: "stay"});
                        }}
                    >
                        <BsCloudUpload 
                            style={{ height: "100%", width: "100%"}}
                        />
                    </Icon>
                </CameraButtons>
            )}
        </>
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

const Left = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    height: 100%;
    /* border: 1px solid black; */
`

const Text = styled(Link)`
    text-decoration: none;
    cursor: pointer;
    margin: 5px;
    &:hover{
        color: darkgreen;
    }
`

const IconWrapper = styled.div`
    display: flex;
    /* border: 1px solid black; */
`

const Icon = styled.div`
    /* display: flex;
    justify-content: center;
    align-items: center; */
    color: black;
    text-decoration: none;
    margin: 5px;
    width: 30px;
    height: 30px;
    cursor: pointer;
    /* border: 1px solid black; */
`

const CameraButtons = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 50px;
    background: grey;
`

export default Footer;