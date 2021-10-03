import React from 'react';
import styled from 'styled-components';

const Friends = () => {

    return (
        <Wrapper>
            <div>Friends</div>
            <div>Coming in future update.</div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 100%;
    width: 30%;
    border: 1px solid black;
`

export default Friends;