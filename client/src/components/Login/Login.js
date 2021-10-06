import React, {useState, useContext, useEffect} from 'react';
import {CaptureContext} from '../CaptureContext';
// import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Validate from "./Validate";
import Connect from './Connect';
import { useHistory } from 'react-router-dom';
// for new user / back
import {FiUserPlus} from 'react-icons/fi';
import {TiArrowBackOutline} from 'react-icons/ti';
// for password visibility
import {FaRegEye} from 'react-icons/fa';
import {FaRegEyeSlash} from 'react-icons/fa';

const Login = () => {
    const {
        setPage,
        userID,
        setUserID,
        mediaQ,
    } = useContext(CaptureContext);
    
    useEffect(() => {
        setPage("login");
    },[])

    let history = useHistory();
    { userID && 
        history.push("/Home")
    }

    // useStates for submission.
    const [uniqueName, setUniqueName] = useState("");
    const [text, setText] = useState("Sign in");
    const [text2, setText2] = useState("Register");
    const [submitText, setSubmitText] = useState(text);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState('');
    const [type, setType] = useState("password");
    const [badSubmit, setBadSubmit] = useState(null);

    // handles rendering for responsive change of screen.
    mediaQ.onchange = (e) => {
        window.location.reload();
    }

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
            setSubmitText("Register");
        } else {
            setSubmitText("Sign in");
        }
    }

    // Handles submission of sign in / sign up.
    const handleSubmit = async (e) => {
        e.preventDefault();
        const mySubmit = {email, password, text, uniqueName, displayName}   // used for both validation and connect.
        // validate submitted 
        const validatedStatus = Validate(mySubmit)
        if (validatedStatus !== "good") {
            setBadSubmit(validatedStatus);
            return;
        } else {
            setBadSubmit(null);
        }
        // attempt connection
        const connectStatus = await Connect(mySubmit)
        if (connectStatus === "good") {
            const id = window.localStorage.getItem("userID");
            setUserID(id)
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
                </Top>
                <FormAndButtonWrap>

                <Form>
                    {text !=="Sign in" && (
                        <>
                            <Input
                                required
                                type="text"
                                placeholder="unique name"
                                value={uniqueName}
                                maxLength="50"
                                onChange={(e) => {
                                    setUniqueName((e.target.value));
                                }}
                            >
                            </Input>
                            <Input
                            required
                            type="text"
                            placeholder="display name"
                            value={displayName}
                            maxLength="25"
                            onChange={(e) => {
                                setDisplayName((e.target.value));
                            }}
                        >
                        </Input>
                    </>
                    )}
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
                    { (!mediaQ.matches === true) ? (
                    <Button
                        type="submit"
                        onClick={handleSubmit}
                        style={{ position: "absolute", bottom: "80px", right: "10px"}}
                    >
                        {submitText}
                    </Button>
                    ) : (
                        <Button
                        type="submit"
                        onClick={handleSubmit}
                    >
                        {submitText}
                    </Button>
                    )}
                </Form>
                <ButtonWrap>
                    { (mediaQ.matches === true && text !=="Sign in") && (
                        <Icon
                            style={{ visibility: "hidden"}}
                        />
                    )}
                    <Icon
                        onClick={handleClick}
                    >
                        {text==="Sign in" ? (
                            <FiUserPlus />
                        ):(
                            <TiArrowBackOutline />
                        )}
                    </Icon>
                    { (mediaQ.matches === true && text !=="Sign in") && (
                            <Icon
                                style={{ visibility: "hidden"}}
                            />
                    )}
                    <Icon
                        onClick={changeVisibility}
                    >
                        { type==="password" ? (
                            <FaRegEye />
                        ) : (
                            <FaRegEyeSlash />
                        )}
                    </Icon>
                    { (mediaQ.matches === true) && (
                            <Icon
                                style={{ visibility: "hidden"}}
                            />
                    )}
                </ButtonWrap>
                </FormAndButtonWrap>



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
    height: var(--defaultHeight);
    width: 100%;
    border: 1px solid black;
`

const FormAndButtonWrap = styled.div`
    display: flex;
`

const FormWrapper = styled.div`
    padding: 10px;
    border: 1px solid black;
    background-color: var(--background-color-alternative);
    background-image: var(--background-image-alternative);
`

const Top = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 5px;
`

const Text = styled.div`
    font-size:2em;
    color: white;
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
    width: 240px;
`

const ButtonWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

const Button = styled.button`
    margin: 5px;
    height: 40px;
    background: var(--color-light);
    color: white;
    border: 1px solid black;
    border-radius: 5px;
    font-size: 1.5em;
    cursor: pointer;
    &:hover{
        background: var(--color-dark);
    }
    &:active{
        transform: scale(95%);
        transition: transform ease-in-out 200ms;
    }
`

const Icon = styled(Button)`
    height: 42px;
    width: 42px;
    margin: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const BadRequest = styled.div`
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