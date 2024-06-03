import React from 'react';
import './HeroImage.css';
import salonLady from "C:/Users/hp/Desktop/saloon_project/hair-saloon/client/src/assets/salon-lady.jpg"

function HeroImage() {
    return (
        <>
            <div className="text-container top-48 left-48 max-lg:top-32 max-lg:left-32 max-md:top-24 max-md:left-24 max-sm:top-20 max-sm:left-16">
                <h1 className="text-white text-8xl max-lg:text-7xl max-sm:text-xl">
                    BEAUTY &
                    <br className="max-md:hidden" />
                    <span> HAIR SALON</span>
                </h1>

                <h2 className="hero-desc mt-3 max-sm:text-xs">
                    CHANGE YOUR LOOK WITH OUR TALENTED STYLISTS.
                </h2>

                <div className="hero-btn-container mt-4">
                    <button className='hero-btn text-white'>BOOK A SEAT</button>
                </div>

            </div>
             <div className="image-container">
                <img src={salonLady} alt="" />
             </div>
        </>
    )
};

export default HeroImage;