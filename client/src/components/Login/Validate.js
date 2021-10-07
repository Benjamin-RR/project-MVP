// validates form.
const Validate = ({email, password, text, uniqueName, displayName}) => {
    let status="good"

    //FOR ALL SIGN INS
    // validate email.
    if ( !email.includes("@") || !email.includes(".") || email.length < 8) {
        status="Invalid email"
    }
    // password must have 0-9, special character, a-z, A-Z, at least once, with a password length of more then 10.
    const re = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{10,}$/;
    if (!re.test(password)) {
        status="password must contain one: number, special character, lowercase, and uppercase."
    }
    // validate password
    if ( password.length < 10) {
        status="password requires 10 characters."
    }

    // FOR NEW USERS
    if (text === "Register") {
        // be sure user entered a uniqueName
        if (uniqueName.length < 1) {
            status="a unique name is required."
        }
        // be sure user entered a displayName
        if (displayName.length < 1) {
            status="a display name is required."
        }
    }
    
    return status;
}
export default Validate;