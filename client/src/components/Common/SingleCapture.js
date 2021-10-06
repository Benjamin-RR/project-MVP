import React, {useContext} from 'react';
import { CaptureContext } from '../CaptureContext';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {Image} from 'cloudinary-react';
import DefaultAvatar from './DefaultAvatar';
import { CardStyles } from './CardStyles/CardStyles';

const SingleCapture = (data, disableAvatar, disableMap) => {
    const {
        page,
        setPage,
        userID,
        // friendArray, 
        // setFriendArray,
        currentCapture,
        setCurrentCapture,
        badgeSetting, 
        setBadgeSetting,
        comingFrom,
        setComingFrom
    } = useContext(CaptureContext);

    // console.log("single capture data:" , data, disableAvatar, disableMap)

    const badge = `/verified.png`
    
    // CardStyles(data.data);

    return(
            <Wrapper2
                style={{ background: `${CardStyles(data.data)}` , filter: "brightness(2.0)"}}
            >
                <Wrapper
                    style={{ background: `${CardStyles(data.data)}` , filter: "brightness(0.5)"}}
                >
                    <Top>
                        <AvatarAndAuthor>
                            {disableAvatar === true ? (
                                <DisabledAvatar>
                                    <DefaultAvatar
                                        name={data.data.author}
                                        color={data.data.userColor}
                                    />
                                </DisabledAvatar>
                            ):(
                                <Avatar
                                    onClick={() => {
                                        setCurrentCapture(data);
                                    }}
                                    to="/Profile"
                                >
                                    <DefaultAvatar 
                                        name={data.data.author}
                                        color={data.data.userColor}
                                    />
                                </Avatar>
                            )}
                            <Author>{data.data.author}</Author>
                        </AvatarAndAuthor>
                        
                        <Animal>{data.data.capture.animalName}</Animal>
                    </Top>
                    {disableMap === true ? (
                        <DisabledImageWrapper>
                            <Image
                                alt="img"
                                cloudName="capturecapture"
                                publicId={data.data.public_id}
                                width="300"
                                crop="scale"
                            />
                        </DisabledImageWrapper>
                    ):(
                        <ImageWrapper
                            onClick={() => {
                                setCurrentCapture(data);
                                setComingFrom('singleCapture');
                            }}
                            to="/Explore"
                        >
                            <Image
                                alt="img"
                                cloudName="capturecapture"
                                publicId={data.data.public_id}
                                width="300"
                                crop="scale"
                                // style={{ display: "flex" , justifyContent: "center", alignItems: "center"}}
                            />
                        </ImageWrapper>
                    )}
                    {(data.data.capture.verified && badgeSetting ) && (
                        <Badge 
                            src={badge}
                        />
                    )}
                    <Bottom>
                        <Details>
                            <TimeStamp>{data.data.timeStamp}</TimeStamp>
                            {data.data.capture.documentation && (
                                <Text
                                    style={{ background: `${CardStyles(data.data)}`  }}
                                    // background: linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 10%, rgba(0,212,255,1) 100%);}}
                                >{data.data.capture.documentation}</Text>
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
    /* height: var(--defaultHeight); */
    width: 100%;
    /* background: green; */
    background-color: var(--background-color-card);
    background-image: var(--background-image-card);
    border: 2px solid black;
    position: relative;
`

const Wrapper2 = styled.div`
    margin-top: 30px;
    /* background: lightgreen; */
    background-color: var(--background-color-card);
    background-image: var(--background-image-card);
    height: 100%;
    width: 100%;
    padding: 7px;
    box-shadow: 20px -11px 23px 5px rgba(0,0,0,0.7);
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
    padding: 5px 5px 0px 5px; 
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
    padding-bottom: 5px;
`

const DisabledImageWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
    cursor: pointer;
`

const ImageWrapper = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
    cursor: pointer;
`

const Badge = styled.img`
    position: absolute;
    height: 50px;
    width: 50px;
    top: 80px;
    left: 255px;
    /* background: red; */
    src: 'url("/verified.png)';
`

const DisabledAvatar = styled.div`
    height: 40px;
    width: 40px;
`

const Avatar = styled(Link)`
    /* height: var(--IconHeight);
    width: var(--IconWidth); */
    height: 40px;
    width: 40px;
    /* display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px; */
    text-decoration: none;
    /* border: 1px solid black; */
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
    padding: 5px;
    /* border: 1px solid black; */
    width: 100%;
    height: 100px;
    background: lightgreen; 
    filter: brightness(2.0);
`

export default SingleCapture