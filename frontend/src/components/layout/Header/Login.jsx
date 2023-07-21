import React, { useState } from 'react'
import "./Header.css";
import { SpeedDial, SpeedDialAction } from '@material-ui/lab';
import { useHistory } from "react-router-dom";
import LoginIcon from '@mui/icons-material/Login';
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useSelector } from 'react-redux'


function Login() {
    const history = useHistory();

    const [open, setOpen] = useState(false);

    const { cartItems } = useSelector((state) => state.cart)

    const options = [
        {
            icon: <ShoppingCartIcon style={{ color: cartItems.length > 0 ? "tomato" : "unset" }} />,

            name: `Cart(${cartItems.length})`,
            func: cart
        },
        { icon: <LoginIcon />, name: "Login", func: loginPage },
    ];


    function cart() {
        history.push("/cart");
    }

    function loginPage() {
        history.push("/login");
    }


    return (
        <>
            <SpeedDial
                ariaLabel='SpeedDial tooltip example'
                direction='down'
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
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