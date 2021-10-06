import React, {useContext} from 'react';
import { CaptureContext } from './CaptureContext';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import { useHistory } from 'react-router';
// footer link icons
import {GrYoutube} from 'react-icons/gr';
import {GrInstagram} from 'react-icons/gr';
import {GrFacebook} from 'react-icons/gr';
import {GrLinkedin} from 'react-icons/gr';
import {GrGithub} from 'react-icons/gr';

// for mobile
import {GrGallery} from 'react-icons/gr';
import {AiOutlineCamera} from 'react-icons/ai';
import {BsCloudUpload} from 'react-icons/bs';


const Footer = () => {
    const {
        mediaQ,
    } = useContext(CaptureContext);

    let history = useHistory();
    
    // handles rendering footer correctly if you dynamically change your screen.
    mediaQ.onchange = (e) => {
        // window.location.reload();
    }


    // handles opening all footer link paths.
    const handleLink = (path) => {
        if (path.type === "leave") {
            window.open(path.path, '_blank');
        }
        if (path.type === "stay") {
            history.push(path.path)
            // window.location.reload();
        }
    }

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
    background-image: var(--image-Header-Footer);
    border: 1px solid black;
`

const Left = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    height: 100%;
`

const Text = styled(Link)`
    text-decoration: none;
    cursor: pointer;
    margin: 5px;
    &:hover{
        color: var(--color-light);
        font-weight: 900;
    }
`

const IconWrapper = styled.div`
    display: flex;
`

const Icon = styled.div`
    color: black;
    text-decoration: none;
    margin: 5px;
    width: 30px;
    height: 30px;
    cursor: pointer;
`

const CameraButtons = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 50px;
    background: grey;
    background: var(--color-Header-Footer);
    background-image: var(--image-Header-Footer);
`

export default Footer;