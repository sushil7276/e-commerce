import React from 'react';
import "./Header.css";
import { SpeedDial, SpeedDialAction } from '@material-ui/lab';
import { useHistory } from "react-router-dom";
import InfoIcon from '@mui/icons-material/Info';
import LoginIcon from '@mui/icons-material/Login';
import ContactsIcon from '@mui/icons-material/Contacts';

function Login() {
    const history  = useHistory();

    const options = [
        { icon: <ContactsIcon />, name: "Contact", func: contact },
        { icon: <InfoIcon />, name: "About", func: about },
        { icon: <LoginIcon />, name: "Login", func: loginPage },
    ];


    function contact() {
        history.push("/contact");
    }

    function about() {
        history.push("/about");
    }

    function loginPage() {
        history.push("/login");
    }


    return (
        <>
            <SpeedDial
                ariaLabel='SpeedDial tooltip example'
                direction='down'
                open
                className='speedDial'
                style={{ zIndex: "11" }}
                icon={
                    <img
                        className='speedDialIcon'
                        src={"/Profile.png"}
                        alt='Profile'
                    />
                }
            >
                {options.map((item) => (
                    <SpeedDialAction icon={item.icon} tooltipTitle={item.name} onClick={item.func} key={item.name}
                        tooltipOpen={window.innerWidth <= 600 ? true : false} />
                )
                )}
            </SpeedDial>
        </>
    )
}

export default Login