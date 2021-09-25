import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {GrYoutube} from 'react-icons/gr';
import {GrInstagram} from 'react-icons/gr';
import {GrFacebook} from 'react-icons/gr';
import {GrLinkedin} from 'react-icons/gr'
import {GrGithub} from 'react-icons/gr';


const Footer = () => {

    const handleLink = (path) => {
        window.open(path, '_blank');
    }

    return (
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
                        handleLink("https://www.linkedin.com/in/benjaminrobertrussell/");
                    }}
                >
                    <GrLinkedin 
                        style={{ height: "100%", width: "100%"}}
                    />
                </Icon>
                <Icon
                    onClick={() => {
                        handleLink("https://github.com/Benjamin-RR/project-MVP");
                    }}
                >
                    <GrGithub 
                        style={{ height: "100%", width: "100%"}}
                    />
                </Icon>
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
    color: black;
    text-decoration: none;
    margin: 5px;
    width: 30px;
    height: 30px;
    cursor: pointer;
    /* border: 1px solid black; */
`

export default Footer;