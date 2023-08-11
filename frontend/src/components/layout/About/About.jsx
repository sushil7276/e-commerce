import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import LinkedIn from "@material-ui/icons/LinkedIn";
import GitHub from "@material-ui/icons/GitHub";


function About() {

    const visitInstagram = () => {
        window.location = "https://github.com/sushil7276";
    };


    return (
        <div className="aboutSection">
            <div></div>
            <div className="aboutSectionGradient"></div>
            <div className="aboutSectionContainer">
                <Typography component="h1">About Us</Typography>

                <div>
                    <div>
                        <Avatar
                            style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
                            src="https://res.cloudinary.com/dw8z8ud3z/image/upload/v1690881261/s6_ehbuit.jpg"
                            alt="Founder"
                        />
                        <Typography>Sushil Babar</Typography>
                        <Button onClick={visitInstagram} color="primary">
                            Visit GitHub
                        </Button>
                        <span>
                            This is a sample website made by @sushilbabar. Only with the
                            purpose to learn MERN Stack
                        </span>
                    </div>
                    <div className="aboutSectionContainer2">
                        <Typography component="h2">Our Profile</Typography>
                        <a
                            href="https://www.linkedin.com/in/sushil-babar-3a6618237/"
                            target="blank"
                        >
                            <LinkedIn className="youtubeSvgIcon" />
                        </a>

                        <a href="https://github.com/sushil7276" target="blank">
                            <GitHub className="instagramSvgIcon" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About
