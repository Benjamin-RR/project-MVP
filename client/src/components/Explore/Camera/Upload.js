import React, {useContext, useState, useEffect} from 'react';
import {CaptureContext} from '../../CaptureContext';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom'; 

import {BsGrid} from 'react-icons/bs';
import {BsGridFill} from 'react-icons/bs';
import {AiOutlineCloseSquare} from 'react-icons/ai'

import importAll from '../../../assets/index'

const Upload = () => {
    const {
        page,
        setPage,
        userID
    } = useContext(CaptureContext);
    setPage("upload");
    
    let history = useHistory();
    { !userID && 
        history.push("/Login")
    }

    const [theImage, setTheImage] = useState(null);
    const [selectedImage, setSelectedImage] = useState('');
    const [previewSource, setPreviewSource] = useState('');
    const [grid, setGrid] = useState(false)
    const imgArray = [];


    // useEffect(() => {
    //     // if (selectedImage)
    //     console.log("test");
    // }, [selectedImage])

    // handles switching layout of displaying images by grid or singularly.
    const handleGrid = () => {
        const temp = !grid;
        setGrid(temp);
    }

    // handle submitting image
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("PREVIEW:" , previewSource);
        // return;
        if(!previewSource) return;
        uploadImage(previewSource);
    }


    console.log("selected image:" , selectedImage)
    console.log("preview source:" , previewSource)


    const uploadImage = async (base64EncodedImage) => {
        await fetch('/upload', {
            method: 'POST',
            body: JSON.stringify({
                data: base64EncodedImage
            }),
            headers: {'Content-type': 'application/json'}
        })

        console.log("code:" , base64EncodedImage);

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
            <div>choose image to upload</div>
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
                />
            </>
            )}
            <Input 
                type="file" 
                name="image"
                value = {theImage}
                onChange={(e) =>{
                    setSelectedImage(e.target.files[0]);
                    const reader = new FileReader();
                    reader.readAsDataURL(e.target.files[0]);
                    reader.onloadend = () => {
                        setPreviewSource(reader.result);
                    }
                }}
            />
            <Button 
                type="submit"
                    // onSubmit={(e)=> handleSubmit()}
                >
                    Upload Image
            </Button>
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

const Input = styled.input`
    width: 300px;
    height: 20px;
    border: 1px solid black;
    font-size: 15px;
    /* text-decoration: none; */
`

const Button = styled.button`
    margin: 10px;
    background: darkgreen;
    color: white;
    border: 1px solid black;
    border-radius: 5px;
    padding: 5px;
`

export default Upload;