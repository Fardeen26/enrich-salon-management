import React from 'react'
import MinimizeIcon from '@mui/icons-material/Minimize';
import Salon_Img from '../../assets/salon-demo-img.jpg';
import './AboutSection.css';

function AboutSection() {
  return (
    <div className='flex flex-col px-44 flex-wrap h-full py-16 max-lg:px-28 max-md:px-20 max-sm:px-4 max-sm:py-8 About' id='About'>
      <div className="desc-container w-full flex flex-wrap max-sm:justify-center">
        <div className="desc-left flex-1 max-sm:text-center max-sm:text-3xl max-lg:text-4xl font-semibold"> WELCOME TO <br /> ENRICH HAIR SALOON
          <br />
          <span><MinimizeIcon /><MinimizeIcon /></span>
        </div>
        <div className="desc-right max-2xl:basis-1/2 max-xl:basis-1/2 max-md:basis-1/2 max-sm:basis-full max-sm:text-sm max-sm:px-4 max-sm:text-start max-sm:mt-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo vero, tenetur, blanditiis incidunt iure eaque inventore quas culpa nemo ducimus sapiente sequi hic! Possimus, repellendus sequi sunt quas dolore, iste commodi nesciunt atque, impedit recusandae nisi distinctio error cupiditate? Dignissimos debitis consequuntur pariatur suscipit beatae aliquid labore provident possimus cum.
          <br />
          <button className="button mt-4">Our Stylists</button>
        </div>
      </div>

      <div className="look-container w-full flex justify-center mt-5">
        <img src={Salon_Img} className='h-[500px] w-[900px]'/>
      </div>
    </div>
  )

}

export default AboutSection;