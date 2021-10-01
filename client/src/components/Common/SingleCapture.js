import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {Image} from 'cloudinary-react';
import DefaultAvatar from './DefaultAvatar';

const SingleCapture = (data) => {
    localStorage.removeItem("coords");
    localStorage.removeItem("CaptureInfo");

    console.log("Data in single capture component:" , data);

    // TO DO:
    // 1. user unique name who posted it (links to their profile)
    // 2. image links to map where image was taken (lat, long)
    return(
        <Wrapper>

            <Top>
                <LeftSide>
                    <Avatar>
                        <DefaultAvatar 
                            name={data.data.author}
                            color={data.data.userColor}
                        />
                    </Avatar>
                    <Author>{data.data.author}</Author>

                </LeftSide>
                
                <Animal>{data.data.capture.animalName}</Animal>
            </Top>
            <ImageWrapper
                onClick={() => {
                    localStorage.setItem("CaptureInfo", JSON.stringify(data) )
                }}
                to="/Explore"
            >
                <Image
                    alt="img"
                    cloudName="capturecapture"
                    publicId={data.data.public_id}
                    width="300"
                    crop="scale"
                />
            </ImageWrapper>
            <Badge />
            <Bottom>
                <Details>
                    <TimeStamp>{data.data.timeStamp}</TimeStamp>
                    <Text>{data.data.capture.documentation}</Text>
                </Details>
                <Rate>Rate</Rate>
            </Bottom>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: var(--defaultHeight);
    width: 100%;
    border: 1px solid black;
`

const Top = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border: 1px solid black;
    width: 100%;
    margin: 10px 0px 10px 0px;
`

const LeftSide = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const Author = styled.div`
    margin-left: 10px;
    font-weight: 900;
    font-size: 1.5em;
`

const Animal = styled.div`
    font-weight: 900;
    font-size: 1.5em;
`

const ImageWrapper = styled(Link)`
    border: 1px solid black;
    cursor: pointer;
`

const Avatar = styled.div`
    height: var(--IconHeight);
    width: var(--IconWidth);
    display: flex;
    justify-content: center;
    align-items: center;
`

const Bottom = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    border: 1px solid black;

`

const Details = styled.div`
    display: flex;
    width: 100%;
    height: 100%;

    flex-direction: column;
    justify-content: space-between;
`

const TimeStamp = styled.div`
    font-size: .9em;
`

const Text = styled.div`
    margin-top: 10px;
    border: 1px solid black;
    width: 100%;
    height: 100%;
`

const Rate = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    /* padding: 5px; */
    /* margin: 5px; */
    margin-top: auto;
    width: 100px;
    border-radius: 7px;
    border: 1px solid black;
    cursor: pointer;
    &:hover{
        
    }
    &:active{

    }
`

const Badge = styled.div`
    position: absolute;
    height: 70px;
    width: 70px;
    src: 'url(verified.png)'
`

export default SingleCapture