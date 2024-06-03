import React from 'react';
import HeroImage from './hero-components/HeroImage';
import AboutSection from './hero-components/AboutSection'

function Main() {
    return (
        <>
            <div className="main-container">
                    <HeroImage />
                    <AboutSection />
            </div>
        </>
    )
};

export default Main;