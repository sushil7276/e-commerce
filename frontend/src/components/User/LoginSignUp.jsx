import React, { Fragment, useEffect, useRef, useState } from 'react';
import "./LoginSignUp.css";
import Loader from '../layout/Loader/Loader';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import FaceIcon from '@material-ui/icons/Face';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { clearErrors, login, register } from '../../actions/userAction';


function LoginSignUp() {

    const dispatch = useDispatch();
    const alert = useAlert();
    let navigate = useNavigate();

    const { error, loading, isAuthenticated } = useSelector((state) => state.user);

    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switchTab = useRef(null);


    // State
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    // user State
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    });

    const { name, email, password } = user;

    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState("/Profile.png");


    // Login Event Handle
    const loginSubmit = (e) => {
        e.preventDefault();
        dispatch(login(loginEmail, loginPassword))
    }

    // Register Event Handle
    const registerSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("password", password);
        myForm.set("avatar", avatar);

        dispatch(register(myForm));
    }

    const registerDataChange = (e) => {
        if (e.target.name === 'avatar') {

            const reader = new FileReader();

            reader.onload = () => {

                /* "(reader.readyState===0) `0` means initial Stage
                    "(reader.readyState===1) `1` means loading Stage"
                    "(reader.readyState===2) `1` means Done Stage"
                */
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };

            // Image file save
            reader.readAsDataURL(e.target.files[0]);

        }
        else {
            setUser({ ...user, [e.target.name]: e.target.value })
        }
    }

    // This code Use for React Router Dom V5
    // const redirect = location.search ? location.search.split("=")[1] : "/account";

    // This code Use for React Router Dom V6
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const redirect = queryParams.get('/shipping') || '/account';


    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }


        if (isAuthenticated) {
            navigate(redirect);
        }


    }, [dispatch, error, alert, navigate, isAuthenticated, redirect]);



    const switchTabs = (e, tab) => {
        if (tab === "login") {
            switchTab.current.classList.add("shiftToNeutral");
            switchTab.current.classList.remove("shiftToRight");
            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft");
        }

        // opposite of login
        if (tab === "register") {
            switchTab.current.classList.add("shiftToRight");
            switchTab.current.classList.remove("shiftToNeutral");
            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");
        }
    }


    return (
        <>
            {loading ? <Loader /> : (
                <Fragment>
                    <div className="LoginSignUpContainer">
                        <div className="LoginSignUpBox">
                            <div>
                                <div className="login_signUp_toggle">
                                    <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                                    <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                                </div>
                                <button ref={switchTab}></button>
                            </div>

                            {/* Login Form */}
                            <form className='loginForm' ref={loginTab} onSubmit={loginSubmit}>
                                <div className="loginEmail">
                                    <MailOutlineIcon />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        required
                                        value={loginEmail}
                                        onChange={(e) => setLoginEmail(e.target.value)} />
                                </div>

                                <div className="loginPassword">
                                    <LockOpenIcon />
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        required
                                        value={loginPassword}
                                        onChange={(e) => setLoginPassword(e.target.value)}
                                    />
                                </div>
                                <Link to="/password/forgot" className="linkForgotPassword">Forgot Password?</Link>
                                <input type="submit" value="Login" className="loginBtn" />
                            </form>

                            {/* Register Form */}
                            <form
                                className="signUpForm"
                                ref={registerTab}
                                encType="multipart/form-data"
                                onSubmit={registerSubmit}
                            >
                                <div className="signUpName">
                                    <FaceIcon />
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        required
                                        name="name"
                                        value={name}
                                        onChange={registerDataChange}
                                    />
                                </div>
                                <div className="signUpEmail">
                                    <MailOutlineIcon />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        required
                                        name="email"
                                        value={email}
                                        onChange={registerDataChange}
                                    />
                                </div>
                                <div className="signUpPassword">
                                    <LockOpenIcon />
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        required
                                        name="password"
                                        value={password}
                                        onChange={registerDataChange}
                                    />
                                </div>

                                <div id="registerImage">
                                    <img src={avatarPreview} alt="Avatar Preview" />
                                    <input
                                        type="file"
                                        name="avatar"
                                        accept="image/*"
                                        onChange={registerDataChange}
                                    />
                                </div>
                                <input type="submit" value="Register" className="signUpBtn" />
                            </form>
                        </div>
                    </div>
                </Fragment>
            )}
        </>
    )
}

export default LoginSignUp