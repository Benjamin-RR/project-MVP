// EMAIL VALIDATION
const validateEmail = (email) => {
    let validateStatus = "good"
    // checks for @
    if(!email.includes("@")){
        validateStatus = {status: 400, error: "Invalid email: missing @"}
    };
    // checks for .(dot)
    if(!email.includes(".")){
        validateStatus = {status: 400, error: "Invalid email: missing . (dot)"}
    }
    // checks to makes sure there are at least 2 letters after the dot
    if(!/(?<=\.)[a-zA-z]{2,}/.test(email)){
        validateStatus = {status: 400, error: "Invalid email: dot must be followed by a min. of 2 letters"}
    };
    // validates everything else in the e-mail
        const re = /^[a-zA-z0-9_\-\.]+[@][a-z\-]+[a-z]?[\.][a-z]{2,}$/g;
        // return re.test(email);
        if (!re.test(email)) {
            validateStatus = {status: 400, error: "Invalid email"}
        }
    return validateStatus;
}

// PASSWORD VALIDATION
const validatePassword = (password) => {
    let validateStatus = "good"
        
    return validateStatus;
}

const validateUniqueName = (uniqueName) => {
    let validateStatus = true;

    return validateStatus;
}

module.exports = {
    validateEmail,
    validatePassword,
    validateUniqueName
};