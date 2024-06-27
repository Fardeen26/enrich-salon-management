import React from 'react';
import './HeroImage.css';
import { Link as RouterLink } from 'react-router-dom';
import salonLady from "../../assets/salon-lady.jpg"

function HeroImage() {
    return (
        <>
            <div className="text-container top-56 left-48 max-lg:top-32 max-lg:left-32 max-md:top-24 max-md:left-24 max-sm:top-20 max-sm:left-16" id='Home'>
                <h1 className="hero-heading text-white text-8xl max-lg:text-6xl max-sm:text-xl">
                    BEAUTY &
                    <br className="max-md:hidden" />
                    <span> HAIR SALON</span>
                </h1>

                <h2 className="hero-desc mt-3 max-sm:text-xs max-lg:text-sm">
                    CHANGE YOUR LOOK WITH OUR TALENTED STYLISTS.
                </h2> 

                <div className="hero-btn-container mt-4">
                    {/* <button className='hero-btn text-white'>BOOK A SEAT</button> */}
                    <RouterLink to={`book`}><button className='hero-btn text-white'>BOOK A SEAT</button></RouterLink>
                </div>

            </div>
             <div className="image-container">
                <img src={salonLady} alt="" />
             </div>
        </>
    )
};

export default HeroImage;