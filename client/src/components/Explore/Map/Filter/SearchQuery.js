import React, {useContext} from 'react';
import { CaptureContext } from '../../../CaptureContext';


// filter data with search query
const SearchQuery = () => {
    const {
        searchQuery, 
    } = useContext(CaptureContext);

    let finalAnswer = [];
    console.log("captureArray received to FILTER:" , AllCaptureArray);
    console.log("searchQuery received to FILTER:" , searchQuery);
    let verified = false;
    let unverified = false;
    
    // searchQuery {certified: false, unCertified: false, animal: null, user: null}
    if (searchQuery.certified) {
        verified = true;
        let answer = AllCaptureArray.filter(verifiedCaptures)
        function verifiedCaptures(capture){
            return (
                capture.capture.verified
            )
        }
        answer.forEach(capture => {
            finalAnswer.push(capture);
        })
    }
    if (searchQuery.unCertified) {
        unverified = true;
        let answer = AllCaptureArray.filter(unVerifiedCaptures)
        function unVerifiedCaptures(capture){
            return (
                !capture.capture.verified
            )
        }
        answer.forEach(capture => {
            finalAnswer.push(capture);
        })
    }

    if (!verified && !unverified) {
        finalAnswer = AllCaptureArray;
    }

    if (searchQuery.animal.length > 0) {
        finalAnswer = finalAnswer.filter(animal)
        function animal(capture){
            return (
                (capture.capture.animalName).toLowerCase() === (searchQuery.animal).toLowerCase()
            )
        }
    }
    
    if (searchQuery.user.length > 0) {
        finalAnswer = finalAnswer.filter(user)
        function user(capture){
            return (
                (capture.author).toLowerCase() === (searchQuery.user).toLowerCase()
            )
        }
    }
    // if (!finalAnswer) {
    //     finalAnswer = [];
    // }
    console.log("answer:" , finalAnswer);
    
    setCaptureArray(finalAnswer);
    // setPage('explore');
    // return finalAnswer;
}

export default SearchQuery;