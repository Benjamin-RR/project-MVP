import React from 'react';
import styled from 'styled-components';

// generates user's default avatar using their name, and randomly assigned color (from sign up).
const DefaultAvatar = ({name, color}) => {
    // console.log("unique name:" , name);
    // console.log("color:", color);

    // converts hex colors to rgba.
    function hexToRgbA(hex){
        let c;
        if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
            c= hex.substring(1).split('');
            if(c.length== 3){
                c= [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            c= '0x'+c.join('');
            return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',1)';
        }
    }
    const thisColor = `radial-gradient(circle, rgba(250,250,250,1) 0%, ${hexToRgbA(color)} 50%`;

    return(
        <Wrapper>
            <AvatarWrapper
                style={{ background: `${color}`, }}
            >
                {/* <AvatarLetterWhite>
                    {name.split(name.charAt(2))[0].toUpperCase().split('')[0]+"  "+name.split(name.charAt(2))[0].toUpperCase().split('')[1]}
                </AvatarLetterWhite> */}
                <AvatarLetterBlack
                    style={{ background: `${thisColor}` }}
                >
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
    border-radius: 50%;
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