import React from 'react';
import styled from 'styled-components';
import Title from './Common/Title';

const Friends = (data) => {

    return (
        <Wrapper>
            <Title
                title={"Friends"}
            />
            <div>This user's settings has disabled this section from being viewed.'.</div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    min-height: calc( var(--defaultHeight) - 20px);
    background: rgb(9,9,121);
    background: linear-gradient(90deg, rgba(9,9,121,0.2046568627450981) 0%, rgba(73,113,162,0.2046568627450981) 20%, rgba(73,113,162,0.14583333333333337) 50%, rgba(73,113,162,0.1962535014005602) 80%, rgba(57,64,142,0.1962535014005602) 100%);
`

export default Friends;