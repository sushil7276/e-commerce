import React from 'react'
import "./Footer.css"
import playStore from "../../../images/playstore.png"
import appStore from "../../../images/Appstore.png"

const Footer = () => {
    return (
        <footer id='footer'>
            <div className='leftFooter'>
                <h4>DOWNLOAD OUR APP</h4>
                <p>Download App for Android and IOS mobile phone</p>
                <img src={playStore} alt='playstore' />
                <img src={appStore} alt='Appstore' />
            </div>

            <div className='midFooter'>
                <h1>E - COMMERCE</h1>
                <p>High Quality is our first priority</p>
                <p>Copyrights 2023 &copy; Sushil</p>
            </div>

            <div className='rightFooter'>
                <h4>Follow Us</h4>
                <a href='https://www.instagram.com/sushilbabar72/'>Instagram</a>
                <a href='https://www.linkedin.com/in/sushil-babar-3a6618237/'>LinkedIn</a>
                <a href='https://www.facebook.com/sushil.babar.58'>Facebook</a>
            </div>
        </footer>
    )
}

export default Footer