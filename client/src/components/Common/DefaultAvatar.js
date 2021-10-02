import React from 'react';
import styled from 'styled-components';


const DefaultAvatar = ({name, color}) => {

    console.log("unique name:" , name);
    console.log("color:", color);


    return(
        <Wrapper>
            <AvatarWrapper
                style={{ background: `${color}`, }}
            >
                <AvatarLetterWhite>
                    {name.split(name.charAt(2))[0].toUpperCase().split('')[0]+"  "+name.split(name.charAt(2))[0].toUpperCase().split('')[1]}
                </AvatarLetterWhite>
                <AvatarLetterBlack>
                    {name.split(name.charAt(2))[0].toUpperCase()}
                </AvatarLetterBlack>
            </AvatarWrapper>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    border-radius: 50%;
`

const AvatarWrapper = styled.div`
    /* border: 1px solid black; */
    width: 100%;
    height: 100%;
    cursor: pointer;
    position: relative;
    text-decoration: none;
    border-radius: 50%;
    /* border: 1px solid black; */
    `

const AvatarLetterWhite = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    /* border-radius: 50%; */
    text-decoration: none;
    position: absolute;
    color: white;
    font-weight: 900;
    font-size: 1.1em;
`

const AvatarLetterBlack = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    /* border-radius: 50%; */
    text-decoration: none;
    font-weight: 900;
    position: absolute;
    font-size: 1.3em;
    z-index: 115;
    color: black;
    background: transparent;
    /* border: 1px solid black; */
`

export default DefaultAvatar;