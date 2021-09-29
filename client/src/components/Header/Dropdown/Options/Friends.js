import React, {useContext} from 'react'
import { CaptureContext } from '../../../CaptureContext'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'; 
//icons
import {AiOutlineCloseSquare} from 'react-icons/ai'


const Friends = () => {
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
    setPage("friends");
    
    let history = useHistory();
    { !userID && 
        history.push("/Login")
    }

    const closeFriends = () => {
        setFriendClick(false)
    }

    return(
        <Wrapper>
            <FriendWrapper>
                <LeftToRight>
                    <h2>Add friend</h2>
                    <Icon>
                        <AiOutlineCloseSquare 
                            style={{ height: "100%" , width: "100%"}}
                        />
                    </Icon>
                </LeftToRight>
                <Form>
                    <Input 
                        type="text"
                        placeholder="by email or unique name"
                    />
                </Form>
            </FriendWrapper>
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

const FriendWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* position: absolute; */
    width: 340px;
    height: 200px;
    top: 200px;
    left: 10px;
    border: 1px solid black;
    background: green;
    border-radius: 10px;
    /* z-index: 10; */
`

// const Close = styled.button`

// `

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

const LeftToRight = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    /* border: 1px solid black; */
    margin: 10px;
`

const Form = styled.form`

`

const Input = styled.input`

`

const AddFriend = styled.div`

`

export default Friends;