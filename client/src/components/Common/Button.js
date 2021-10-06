import React, {useContext} from 'react';
import { CaptureContext } from '../CaptureContext';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// This is for Rate buttons throughout the app.
const Button = ({name, data}) => {
    const {
        setCurrentCapture,
    } = useContext(CaptureContext);
    return(
        <ThisButton
            onClick={() => {
                setCurrentCapture(data)
            }}
            to="/Rate"
        >{name}
        </ThisButton>
    )
}

const ThisButton = styled(Link)`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    margin-bottom: 50px;
    margin-left: auto;
    margin-right: 20px;
    width: 100px;
    border-radius: 7px;
    border: 1px solid white;
    color: white;
    cursor: pointer;
    text-decoration: none;
    &:hover{
        background: white;
        color: black;
        transform: scale(125%) ease-in-out 1000ms;
    }
    &:active{
        transform: scale(95%);
    }
`

export default Button;