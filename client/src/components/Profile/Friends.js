import React from 'react';
import styled from 'styled-components';

const Friends = (data) => {
    // console.log("data in friends:" , data.data[0].uniqueName);

    return (
        <Wrapper>
            <div>Friends</div>
            <div>This user's settings has disabled this section from being viewed.'.</div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    padding: 10px;
    display: flex;
    flex-direction: column;
    /* justify-content: space-around; */
    align-items: center;
    /* height: 100%; */
    min-height: var(--defaultHeight);
    width: 100%;
    /* border: 1px solid black; */
    background: rgb(9,9,121);
    background: linear-gradient(90deg, rgba(9,9,121,0.2046568627450981) 0%, rgba(73,113,162,0.2046568627450981) 20%, rgba(73,113,162,0.14583333333333337) 50%, rgba(73,113,162,0.1962535014005602) 80%, rgba(57,64,142,0.1962535014005602) 100%);
`

export default Friends;