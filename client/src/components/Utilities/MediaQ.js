import React, {useContext} from 'react';
import { CaptureContext } from '../CaptureContext';
import styled from 'styled-components';

// sets styles globally into CaptureContext depending on mediaQuery.
export  const MediaQ = () => {
    const {
        mediaQ, setMediaQ
    } = useContext(CaptureContext);

    // as the comment above, this future update will make this app WAY more dynamic.

    // { (mediaQ.matches === true) ? (
    //     console.log("true")
    // ):(
    //     console.log("false")
    // ) }
}