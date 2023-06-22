import React, { Fragment, useEffect, useRef, useState } from 'react';
import "./UpdateProfile.css";
import Loader from '../layout/Loader/Loader';
import { Link, useNavigate } from 'react-router-dom';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import FaceIcon from '@material-ui/icons/Face';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { clearErrors, updateProfile } from '../../actions/userAction';

function UpdateProfile() {

    const dispatch = useDispatch();
    const alert = useAlert();
    let navigate = useNavigate();

    const { user } = useSelector((state) => state.user);
    const { error, isUpdated, loading } = useSelector((state) => state.profile);

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);

    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState("/Profile.png");


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

    useEffect(() => {

        if (isAuthenticated) {
            navigate("/account");
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }


    }, [dispatch, error, alert, navigate, isAuthenticated]);

    return (
        <div>UpdateProfile</div>
    )
}

export default UpdateProfile