import React, {useContext, useState, useEffect} from 'react';
import {CaptureContext} from '../../CaptureContext';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom'; 

import {BsGrid} from 'react-icons/bs';
import {BsGridFill} from 'react-icons/bs';
import {AiOutlineCloseSquare} from 'react-icons/ai'

import importAll from '../../../assets/index'
import Loading from '../../Common/Loader';

const Upload = () => {
    const {
        page,
        setPage,
        userID,
        uniqueName,
        myLocation
    } = useContext(CaptureContext);
    setPage("upload");
    
    let history = useHistory();
    { !userID && 
        history.push("/Login")
    }

    // for displaying different layout on image select.
    const [grid, setGrid] = useState(false)
    const imgArray = [];
    // for database.
    const [previewSource, setPreviewSource] = useState('');
    const [animalName, setAnimalName] = useState('');
    const [description, setDescription] = useState(null);
    const [attemptSubmit, setAttemptSubmit] = useState(false);

    // handles switching layout of displaying images by grid or singularly.
    const handleGrid = () => {
        const temp = !grid;
        setGrid(temp);
    }

    // handle submitting image
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!previewSource) return;
        setAttemptSubmit(true);
        uploadImage(previewSource);
    }

    console.log("unique name:" , uniqueName)


    const uploadImage = async (base64EncodedImage) => {
        await fetch('/image/uploadCapture', {
            method: 'POST',
            body: JSON.stringify({
                author: {
                    userID: userID,
                    author: uniqueName,
                },
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
            {/* <img src={ require(`./images/animal.png`).default} alt="" /> */}
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
            {previewSource !== null && (
            <>
                <Img 
                    src={previewSource} 
                    alt="chosen" 
                    // style={{ height: "200px" , width: "200px"}}
                    style={{}}
                />
            </>
            )}
            <Input 
                type="file" 
                name="image"
                // value = {theImage}
                onChange={(e) =>{
                    // setSelectedImage(e.target.files[0]);
                    const reader = new FileReader();
                    reader.readAsDataURL(e.target.files[0]);
                    reader.onloadend = () => {
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
                    placeholder="Short description (Optional)*"
                    value={description}
                    onChange={(e) => {
                        setDescription(e.target.value);
                    }}
                ></Input>
            </InputWrapper>
            { attemptSubmit ? (
                <Button 
                type="submit"
                    // onSubmit={(e)=> handleSubmit()}
                style={{ background: "white"}}
                >
                    <Loading/>
            </Button>
            ) : (
            <Button 
                type="submit"
                    // onSubmit={(e)=> handleSubmit()}
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
    /* border: 1px solid black;  */
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

const InputWrapper = styled.div`
    display: flex;
`

const Input = styled.input`
    width: 120px;
    height: 20px;
    border: 1px solid black;
    font-size: 15px;
    margin: 5px;
    /* text-decoration: none; */
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
    background: darkgreen;
    color: white;
    border: 1px solid black;
    border-radius: 5px;
    padding: 5px;
    cursor: pointer;
`

export default Upload;