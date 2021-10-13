import React, {useContext, useEffect, useState} from 'react'
import { CaptureContext } from '../../../CaptureContext'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'; 
//icons
import {AiOutlineCloseSquare} from 'react-icons/ai'


const Friends = () => {
    const {
        setPage,
        userID,
        setFriendClick
    } = useContext(CaptureContext);
    const [friendToAdd, setFriendToAdd] = useState(null);
    console.log("friends:" , localStorage.getItem("friends"))
    
    useEffect(() => {
        setPage("friends");

    },[])
    
    let history = useHistory();
    { !userID && 
        history.push("/Login")
    }

    const handleSubmit = () => {


        fetch(`user/add`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                currentFriends: localStorage.getItem("friends"),        // this line should be removed.
                friendToAdd: friendToAdd
            }),
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.status === 200) {
                console.log("SUCCESS!", data);
            }
            if (data.status === 400) {
                console.log("Pandar's box, an error has occured.", data.error)
            }
            console.log("success:", data)
        })
        .catch((error) => {
            console.log("Error", error);
        });
        return;
    }


    return(
        <Wrapper>
            <FriendWrapper>
                <LeftToRight>
                    <h2>Add friend</h2>
                    <Icon
                        onClick={()=>{
                            setFriendClick(false)
                        }}
                        to='/'
                    >
                        <AiOutlineCloseSquare 
                            style={{ height: "100%" , width: "100%"}}
                        />
                    </Icon>
                </LeftToRight>
                <Form>
                    <Input 
                        type="text"
                        placeholder="by email or unique name"
                        onChange={handleSubmit}
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
    justify-content: space-evenly;
    align-items: center;
    width: 340px;
    height: 200px;
    top: 200px;
    left: 10px;
    border: 1px solid black;
    background: var(--color-light);
    border-radius: 10px;
`

const Icon = styled(Link)`
    color: black;
    text-decoration: none;
    margin: 5px;
    width: 30px;
    height: 30px;
`

const LeftToRight = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 10px 10px 10px 20px;
`

const Form = styled.form`

`

const Input = styled.input`

`

export default Friends;
