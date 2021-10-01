import React from "react";
import styled from "styled-components";

const Statistics = () => {

    return(
        <Wrapper>
            <div>Statistics</div>
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

export default Statistics;