import React from 'react';
import styled from 'styled-components';


const DefaultAvatar = ({name, color}) => {

    // console.log("unique name:" , name);
    // console.log("color:", color);


    return(
        <Wrapper>
            <AvatarWrapper>

                <UserAvatarDefault
                    style={{ 
                        position: "absolute",
                        background: `${color}`,
                        color: 'white',
                        fontWeight: "900"
                    }}
                    >
                    {name.split(name.charAt(2))[0].toUpperCase().split('')[0]+"  "+name.split(name.charAt(2))[0].toUpperCase().split('')[1]}
                </UserAvatarDefault>
                <UserAvatarDefault
                    style={{ 
                        fontWeight: "900",
                        postion: "absolute",
                        fontSize: "1.3em",
                        zIndex: "115",
                        color: "black",
                        background: "transparent",
                    }}
                >
                    {name.split(name.charAt(2))[0].toUpperCase()}
                </UserAvatarDefault>
            </AvatarWrapper>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

const AvatarWrapper = styled.div`
    margin: 5px;
    height: 30px;
    width: 30px;
    /* border: 1px solid black; */
    cursor: pointer;
    position: relative;
`

const UserAvatarDefault = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    /* background: blue; */
    border-radius: 50%;
`

export default DefaultAvatar;