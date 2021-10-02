import React from 'react';
import styled from 'styled-components';
import SingleCapture from '../Common/SingleCapture';

const Captures = ({data}) => {
    
    console.log("data from captures:", data)

    return (
        <Wrapper>
            <div>Captures</div>
            <SingleCapture
                data={data}
            />
        </Wrapper>
    )
}

const Wrapper = styled.div`
    padding: 10px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    /* height: 100%; */
    width: 100%;
    border: 1px solid black;
`

export default Captures;