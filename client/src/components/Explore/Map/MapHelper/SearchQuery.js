// filter data with search query
export const filterDataWithSearchQuery = (AllCaptureArray, searchQuery) => {
        
    let finalAnswer = [];
    console.log("captureArray received to FILTER:" , AllCaptureArray);
    console.log("searchQuery received to FILTER:" , searchQuery);
    let verified = false;
    let unverified = false;
    if (!AllCaptureArray) {
        return;
    }

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
    return finalAnswer;
}