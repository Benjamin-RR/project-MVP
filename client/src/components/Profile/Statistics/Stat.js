import React from 'react';
import styled from 'styled-components';

// stat receives the title, num, and total, and returns a stat bar with it's title. type is used to determine style to return.
const Stat = ({title, num, total, style}) => {

    return (
        <Wrapper>
            <div>{title}</div>
            <div>{num} out of {total} needed to statisticify.</div>
            <div>stats should return with a {style} style.</div>
        </Wrapper>
    )
}

const Wrapper = styled.div`

`

export default Stat;