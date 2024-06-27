// import React, {useRef} from 'react';
// import HeroImage from './hero-components/HeroImage';
// import AboutSection from './hero-components/AboutSection'
// import Services from './Services.jsx';
// import Staff from './Staff.jsx';
// import Testimonials from './Testimonials.jsx'

// function Main() {
//     const services = useRef(null);

//     const scrollToSection = (elementRef) => {
//         window.scrollTo({
//             top: elementRef.current.offsetTop,
//             behavior: 'smooth'
//         })
//     }

//     return (
//         <>
//             <div className="main-container">
//                 <button onClick={() => scrollToSection(services)}>go to service</button>
//                 <HeroImage />
//                 <AboutSection />
//                 <Services ref={services}/>
//                 <Staff />
//                 <Testimonials />
//             </div>
//         </>
//     )
// };

// export default Main;

import React, { useRef } from 'react';
import HeroImage from './hero-components/HeroImage';
import AboutSection from './hero-components/AboutSection';
import Services from './Services'; // Assuming Services is still a React component
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
