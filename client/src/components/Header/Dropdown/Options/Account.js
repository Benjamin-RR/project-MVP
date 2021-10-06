import React, {useContext, useEffect} from 'react'
import { CaptureContext } from '../../../CaptureContext'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'; 


const Account = () => {
    const {
        page,
        setPage,
        dropdown,
        setDropdown,
        userID,
        setUserID,
        mediaQ,
        setMediaQ,
        uniqueName,
        setUniqueName,
        friendClick, 
        setFriendClick
    } = useContext(CaptureContext);

    useEffect(() => {
        setPage("account");
    },[])
    
    let history = useHistory();
    { !userID && 
        history.push("/Login")
    }

    return(
        <Wrapper>
            <div>Account</div>
        </Wrapper>
    )

}

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: var(--defaultHeight);
    width: 100%;
    border: 1px solid black;
`

// const IconWrapper = styled.div`
//     display: flex;
//     /* border: 1px solid black; */
// `

const Icon = styled(Link)`
    color: black;
    text-decoration: none;
    margin: 5px;
    width: 30px;
    height: 30px;
    /* border: 1px solid black; */
`

export default Account;
