import MinimizeIcon from '@mui/icons-material/Minimize';
import Salon_Img from '../../assets/salon-demo-img.jpg';
import { Link as ScrollLink } from 'react-scroll';
import './AboutSection.css';

function AboutSection() {
  return (
    <div className='flex flex-col px-44 flex-wrap h-full py-16 max-lg:px-28 max-md:px-20 max-sm:px-4 max-sm:py-8 About' id='About'>
      <div className="desc-container w-full flex flex-wrap max-sm:justify-center">
        <div className="desc-left flex-1 max-sm:text-center max-sm:text-3xl max-lg:text-4xl font-semibold"> WELCOME TO <br /> ENRICH HAIR SALOON
          <br />
          <span><MinimizeIcon /><MinimizeIcon /></span>
        </div>
        <div className="desc-right max-2xl:basis-1/2 max-xl:basis-1/2 max-md:basis-1/2 max-sm:basis-full max-sm:text-sm max-sm:px-4 max-sm:text-start max-sm:mt-3">Welcome to Enrich Salon, where beauty and luxury converge. Our expert stylists are committed to enhancing your unique style with personalized care. Whether it&apos;s a chic haircut, vibrant color, or a relaxing spa treatment, we ensure every visit leaves you refreshed and confident. Step into our modern space, and let us pamper you with top-notch service and premium products. Your beauty is our passion.
          <br />
          <ScrollLink sx={{ my: 2, color: 'white', display: 'block' }} className='cursor-pointer' activeClass="active" to='Staff' spy={true} smooth={true} offset={-100} duration={600} ><button className="button mt-4">Our Stylists</button></ScrollLink>
        </div>
      </div>

      <div className="look-container w-full flex justify-center mt-5">
        <img src={Salon_Img} className='h-[500px] w-[900px]' />
      </div>
    </div>
  )

}

export default AboutSection;