import React from 'react';
import styled from 'styled-components';

const Page404 = () => {
    const {
        page,
        setPage
    } = useContext(CaptureContext);
    setPage("404");
    return (
        <Wrapper>
            <div>404</div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    border: 1px solid red;
`

export default Page404;