import React from 'react';
import styled from 'styled-components';

const Title = (title) => {
    return <ThisTitle>{title.title}</ThisTitle>
}

const ThisTitle = styled.div`
font-size: 2em;
font-weight: 900;
padding-bottom: 10px;
color: white;
`

export default Title;