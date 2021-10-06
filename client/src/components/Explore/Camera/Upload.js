import React, {useContext, useState, useEffect} from 'react';
import {CaptureContext} from '../../CaptureContext';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom'; 

import {BsGrid} from 'react-icons/bs';
import {BsGridFill} from 'react-icons/bs';
import {AiOutlineCloseSquare} from 'react-icons/ai'

// import {importAll} from '../../../assets'
import Loading from '../../Common/Loader';

const Upload = () => {
    const {
        setPage,
        userID,
        myLocation,
    } = useContext(CaptureContext);

    useEffect(() => {
        setPage("upload");
    },[])

    // get gallery from folder.
    // console.log("test from upload:", importAll() );
    
    let history = useHistory();
    { !userID && 
        history.push("/Login")
    }
    
    // for displaying different layout on image select.
    const [grid, setGrid] = useState(false)
    const imgArray = [];
    // for database.
    const [uniqueName, setUniqueName] = useState(localStorage.getItem("uniqueName"));
    const [userColor, setSetUserColor] = useState(localStorage.getItem("userColor"));
    const [previewSource, setPreviewSource] = useState('');
    const [animalName, setAnimalName] = useState('');
    const [description, setDescription] = useState(null);
    const [attemptSubmit, setAttemptSubmit] = useState(false);

    // handles switching layout of displaying images by grid or singularly.
    const handleGrid = () => {
        // const temp = !grid;
        setGrid(!grid);
    }

    // handle submitting image
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!previewSource) return;
        setAttemptSubmit(true);
        uploadImage(previewSource);
    }


    // this will upload the choosen file to cloudinary.
    const uploadImage = async (base64EncodedImage) => {
        await fetch('/image/uploadCapture', {
            method: 'POST',
            body: JSON.stringify({
                author: uniqueName,
                userColor: userColor,
                capture: {
                    location: { lat: myLocation.coords.latitude, lng: myLocation.coords.longitude},
                    authenticScore: 0,
                    rank: 0,
                    verified: false,
                    true: 0,
                    false: 0,
                    uncertain: 0,
                    stars: 0,
                    documentation: description,
                    type: "not specified",
                    rarity: 1,
                    endangered: false,
                    animalName: animalName,
                    data: base64EncodedImage,
                },
            }),
            headers: {'Content-type': 'application/json'}
        })
        setAttemptSubmit(false)
    }

    return (
    <Wrapper>
        <Form
            onSubmit={handleSubmit}
        >
            <Top>
            <Icon
                onClick={() => {
                    handleGrid();
                }}
            >
                {grid ? (
                    <BsGridFill 
                        style={{ height: "100%" , width: "100%" }}
                    />
                ) : (
                    <BsGrid 
                        style={{ height: "100%" , width: "100%" }}
                    />
                    )}
            </Icon>
            <Icon>
                <AiOutlineCloseSquare 
                    style={{ height: "100%" , width: "100%" }}
                />
            </Icon>
            </Top>
            <>
                <Img 
                    src={previewSource} 
                    alt="chosen" 
                />
            </>
            {/* )} */}
                {/* <Gallery>
                    <OneImage>
                        for uploading directly all images to display. this would be a gallery to select images to upload from.
                    </OneImage>
                </Gallery> */}
            <Input 
                type="file" 
                name="image"
                onChange={(e) =>{
                    const reader = new FileReader();
                    reader.readAsDataURL(e.target.files[0]);
                    reader.onloadend = () => {
                        console.log("reader:", reader.result)
                        setPreviewSource(reader.result);
                    }
                }}
            />
            <InputWrapper>
                <Input
                    required
                    placeholder="Animal Name"
                    value={animalName}
                    onChange={(e) => {
                        setAnimalName(e.target.value);
                    }}
                ></Input>
                <Input
                    placeholder="Comment Optional*"
                    value={description}
                    maxLength="210"
                    onChange={(e) => {
                        setDescription(e.target.value);
                    }}
                ></Input>
            </InputWrapper>
            { attemptSubmit ? (
                <Button 
                type="submit"
                style={{ background: "white"}}
                >
                    <Loading/>
            </Button>
            ) : (
            <Button 
                type="submit"
                >
                    Upload Capture
            </Button>
            )}
        </Form>
    </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: var(--defaultHeight);
    width: 100%;
    padding: 10px;
`

const Form = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Top = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 300px;
`

const Icon = styled.div`
    color: black;
    text-decoration: none;
    margin: 5px;
    width: 30px;
    height: 30px;
    cursor: pointer;
`

const Img = styled.img`
    height: 300px;
    width: 300px;
    margin: 10px 0px 10px 0px;
    background: lightgrey;
`

const Gallery = styled.div`
    display: inline-block;
    border: 1px solid black;
`

const OneImage = styled.img`
    height: 100%;
    width: 100%;
    border: 1px solid black;
`

const InputWrapper = styled.div`
    display: flex;
`

const Input = styled.input`
    width: 120px;
    height: 20px;
    border: 1px solid black;
    font-size: 15px;
    margin: 5px;
`

const Text = styled.div`
    height: 20px;
    margin: 5px;

`

const Button = styled.button`
    margin: 10px;
    width: 230px;
    height: 55px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color-dark);
    color: white;
    border: 1px solid black;
    border-radius: 5px;
    padding: 5px;
    cursor: pointer;
    &:hover{
        background: var(--color-light);
    }
    &:active{
        transform: scale(95%);
    }
`

export default Upload;