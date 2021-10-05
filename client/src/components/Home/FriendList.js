import Reach from 'react';
import styled from 'styled-components';

const YourFriends = () => {

    return(
        <Wrapper>
            <div>friends</div> 
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 300px;
`

export default YourFriends;