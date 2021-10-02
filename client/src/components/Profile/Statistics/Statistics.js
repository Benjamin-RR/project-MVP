import React from "react";
import styled from "styled-components";

const Statistics = () => {

    return(
        <Wrapper>
            <Top>

            </Top>
            Statistics
        </Wrapper>
    )
}

const Wrapper = styled.div`
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    /* height: 100%; */
    width: 100%;
    border: 1px solid black;
`

const Top = styled.div`

`

export default Statistics;