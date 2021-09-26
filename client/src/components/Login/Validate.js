// validates form.
const Validate = ({email, password, text,}) => {
    let status="good"
    if ( !email.includes("@") || !email.includes(".") || email.length < 8) {
        status="Invalid email"
    }
    if ( password.length < 8) {
        status="password requires 8 characters."
    }
    return status;
}
export default Validate;