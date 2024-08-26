import AboutSection from './Hero-Component/AboutSection';
import HeroImage from './Hero-Component/HeroImage';
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
