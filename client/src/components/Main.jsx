import React from 'react';
import HeroImage from './hero-components/HeroImage';
import AboutSection from './hero-components/AboutSection';
import Services from './Services';
import Staff from './Staff';
import Testimonials from './Testimonials';

function Main() {
  return (
    <div className="main-container">
      <HeroImage />
      <AboutSection />
      <Services />
      <Staff />
      <Testimonials />
    </div>
  );
}

export default Main;
