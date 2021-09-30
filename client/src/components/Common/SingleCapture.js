import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {Image} from 'cloudinary-react';


const SingleCapture = (data) => {

    console.log("DATA:" , data)


    // TO DO: use both image array and animal aray to render:
    // 1. user unique name who posted it (links to their profile)
    // 2. image links to map where image was taken (lat, long)
    // 3. user's commentary on their own image.
    // 4. more stats?
    return(
        <Wrapper>

            <Top>
                <Avatar
                    // style={{background=`${data.avatarId.color}`}}
                >{data.data.author}</Avatar>
                <div>{data.data.author}</div>
                <div>{data.data.capture.animalName}</div>
            </Top>
            <ImageWrapper
                
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
                    <div>{data.data.timeStamp}</div>
                    <div>{data.data.capture.documentation}</div>
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
`

const ImageWrapper = styled(Link)`

`

const Avatar = styled.div`
    height: var(--IconHeight);
    width: var(--IconWidth);
    display: flex;
    justify-content: center;
    align-items: center;
`

const Bottom = styled.div`
    
`

const Details = styled.div`
    display: flex;
    flex-direction: row;
`

const Rate = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
`

const Badge = styled.div`
    position: absolute;
    height: 70px;
    width: 70px;
    src: 'url(verified.png)'
`

export default SingleCapture