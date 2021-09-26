import React, {useState, useContext} from 'react';
import {CaptureContext} from '../CaptureContext';
// import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Validate from "./Validate";
import Connect from './Connect';
import { useHistory } from 'react-router-dom';
import {FaRegEye} from 'react-icons/fa';
import {FaRegEyeSlash} from 'react-icons/fa';

const Login = () => {
    const {
        page,
        setPage,
        userID,
        setUserID
    } = useContext(CaptureContext);
    setPage("login");
    let history = useHistory();

    const [text, setText] = useState("Sign in");
    const [text2, setText2] = useState("New user");
    const [submitText, setSubmitText] = useState(text);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [type, setType] = useState("password");
    const [badSubmit, setBadSubmit] = useState(null);

    const changeVisibility = () => {
        if (type === "password") {
            setType("text");
        } else {
            setType("password");
        }
    }

    // Handles changing from sign in to new user sign up, and vise versa.
    const handleClick = () => {
        let temp = text;
        setText(text2);
        setText2(temp);
        if (text === "Sign in") {
            setSubmitText("Sign up");
        } else {
            setSubmitText("Sign in");
        }
    }

    // Handles submission of sign in / sign up.
    const handleSubmit = async (e) => {
        e.preventDefault();
        const mySubmit = {email, password, text}
        const validatedStatus = Validate(mySubmit)
        if (validatedStatus !== "good") {
            setBadSubmit(validatedStatus);
            return;
        } else {
            setBadSubmit(null);
        }
        const connectStatus = await Connect(mySubmit)
        if (connectStatus === "good") {
            let test = window.localStorage.getItem("userID");
            setUserID(test)
            console.log("TEST:" , test);
            history.push("/")
            window.location.reload();
        } else {
            setBadSubmit(connectStatus);
        }
    }

    return (
        <Wrapper>
            <FormWrapper>
                <Top>
                    <Text>{text}</Text>
                    <Text2
                        onClick={() => {
                            handleClick();
                        }}
                    >{text2}</Text2>
                </Top>
                <Form>
                    <Input
                        required
                        type="email"
                        placeholder="email@Capture.com"
                        value={email}
                        onChange={(e) => {
                            setEmail((e.target.value).toLowerCase());
                        }}
                    >
                    </Input>
                    <Input
                        required
                        type={type}
                        placeholder="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    >
                    
                    </Input>
                    <Button
                        type="submit"
                        onClick={handleSubmit}
                    >
                        {submitText}
                    </Button>
                </Form>

                <PasswordVisibility
                    type="submit"
                    onClick={changeVisibility}
                >
                    { type==="password" ? (
                        <FaRegEye />
                    ) : (
                        <FaRegEyeSlash />
                    )}
                </PasswordVisibility>

            </FormWrapper>

            { badSubmit &&
                <BadRequest>
                    <div>{badSubmit}</div>
                </BadRequest>
            }

        </Wrapper>
    )
}

const Wrapper = styled.div`
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 500px;
    width: 100%;
    border: 1px solid black;
`

const FormWrapper = styled.div`
    padding: 10px;
    border: 1px solid black;
`

const Top = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 5px;
`

const Text = styled.div`
    font-size:2em;
    color: green;
    font-weight: 900;
`

const Text2 = styled.div`
    text-decoration: none;
    font-weight: 600;
    cursor: pointer;
    &:hover{
        color: brown;
    }
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
`

const Input = styled.input`
    margin: 5px;
    border: 1px solid black;
`

const Button = styled.button`
    margin: 5px;
    height: 40px;
    background: darkgreen;
    color: white;
    border: 1px solid black;
    border-radius: 5px;
    font-size: 1.5em;
    cursor: pointer;
    &:hover{
        background: green;
    }
    &:active{
        transform: scale(95%);
        transition: transform ease-in-out 200ms;
    }
`

const PasswordVisibility = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 5px;
    height: 40px;
    background: darkgreen;
    color: white;
    border: 1px solid black;
    border-radius: 5px;
    font-size: 1.5em;
    cursor: pointer;

    background: darkgreen;
    &:hover{
        background: green;
    }
    &:active{
        transform: scale(95%);
        transition: transform ease-in-out 200ms;
    }
`

const BadRequest = styled.div`
    /* color: darkorange; */
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    margin: 10px;
    border: 1px solid black;
    width: 300px;
    height: 60px;
    font-weight: 900;
`

export default Login;