import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {Image} from 'cloudinary-react';
import DefaultAvatar from './DefaultAvatar';
// import Badge from '/verified.png'

const SingleCapture = (data) => {
    localStorage.removeItem("coords");
    localStorage.removeItem("CaptureInfo");

    const badge = `/verified.png`
    let marker = `/markerVerified.png`

    console.log("Data in single capture component:" , data);

    // TO DO:
    // 1. user unique name who posted it (links to their profile)
    // 2. image links to map where image was taken (lat, long)
    return(
            <Wrapper2>
        <Wrapper>

                <Top>
                    <AvatarAndAuthor>
                        <Avatar>
                            <DefaultAvatar 
                                name={data.data.author}
                                color={data.data.userColor}
                            />
                        </Avatar>
                        <Author>{data.data.author}</Author>
                    </AvatarAndAuthor>
                    
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
                        width="296"
                        crop="scale"
                        // style={{ display: "flex" , justifyContent: "center", alignItems: "center"}}
                    />
                </ImageWrapper>
                {data.data.capture.verified && (
                    <Badge 
                        src={badge}
                    />
                )}
                <Bottom>
                    <Details>
                        <TimeStamp>{data.data.timeStamp}</TimeStamp>
                        {data.data.capture.documentation && (
                            <Text>{data.data.capture.documentation}</Text>
                        )}
                    </Details>
                </Bottom>
        </Wrapper>
            </Wrapper2>
    )
}

const Wrapper = styled.div`
    /* padding: 4px; */
    display: flex;
    flex-direction: column;
    /* justify-content: space-around; */
    /* align-items: center; */
    height: var(--defaultHeight);
    width: 100%;
    background: green;
    border: 1px solid black;
    position: relative;
`

const Wrapper2 = styled.div`
    background: lightgreen;
    height: 100%;
    width: 100%;
    padding: 4px;
`

const Top = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border: 1px solid black;
    width: 100%;
    /* margin: px; */
`

const AvatarAndAuthor = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    /* margin: 5px; */
    padding: 5px; 
    margin-right: auto;
    /* border: 1px solid black; */
`

const Author = styled.div`
    margin-left: 10px;
    font-weight: 900;
    font-size: 1.5em;
`

const Animal = styled.div`
    font-weight: 900;
    font-size: 1.5em;
    margin-left: auto;
    margin-right: auto;
`

const ImageWrapper = styled(Link)`
    /* position: relative; */
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
    padding: 5px; 
`

const TimeStamp = styled.div`
    font-size: .7em;
    margin-left: auto;
    /* margin-bottom: auto; */
`

const Text = styled.div`
    margin-top: 10px;
    border: 1px solid black;
    width: 100%;
    height: 100px;
    background: lightgreen; 
`

const Badge = styled.img`
    position: absolute;
    height: 50px;
    width: 50px;
    top: 70px;
    left: 244px;
    /* background: red; */
    src: 'url("/verified.png)';
`

export default SingleCapture