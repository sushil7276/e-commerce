import React from "react";
import "./Contact.css";
import { Button } from "@material-ui/core";

function Contact() {
    return (
        <div className="contactContainer">
            <a className="mailBtn" href="mailto:shil7276@gmail.com">
                <Button>Contact: shil7276@gmail.com</Button>
            </a>
        </div>
    )
}

export default Contact