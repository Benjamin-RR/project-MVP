import React, {useContext} from 'react'
import { CaptureContext } from '../../../CaptureContext'
import styled from 'styled-components'

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

    return(
        <div>from friends</div>
    )

}

const FriendWrapper = styled.div`
    display: flex;
    position: absolute;
    top: 200px;
    left: 10px;
`

const AddFriend = styled.div`

`

export default Friends;