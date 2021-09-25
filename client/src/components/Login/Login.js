import React, {useContext} from 'react';
import {CaptureContext} from '../CaptureContext';
import styled from 'styled-components';

const Login = () => {
    const {
        page,
        setPage
    } = useContext(CaptureContext);
    setPage("login");
    return (
        <Wrapper>
            <div>Login</div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    padding: 10px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 500px;
    width: 100%;
    border: 1px solid black;
`

export default Login;