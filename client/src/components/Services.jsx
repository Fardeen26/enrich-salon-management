import Heading from './Heading';
import ServiceImg1 from "../assets/service-1.jpeg";
import ServiceImg2 from "../assets/service-2.webp";
import ServiceImg3 from "../assets/service-3.avif";
import ServiceImg4 from "../assets/service-4.jpeg";
import './Services.css';

function Services() {
  return (
    <>
      <Heading title={"OUR SERVICES"} />
      <div className="service-image-container flex flex-wrap py-8 mb-4 justify-center max-sm:py-4 max-md:py-8 max-lg:py-8 max-sm:px-4 Services cursor-pointer" id='Services'>
        {
          itemData.map((item, idx) => (
            <div className="service-image relative max-sm:mt-2" key={idx}>
              <img src={item.img} alt="" className='src-img brightness-75' key={idx + 1} />
              <div className="service-img-text flex justify-center" key={idx + 2}>
                <h1 className='service-heading text-white text-4xl font-semibold tracking-wide leading-tight mb-2'> {item.title} <br /> SERVICES</h1>
              </div>
            </div>
          ))
        }

      </div>
    </>
  )
}

export default Services



const itemData = [
  {
    img: ServiceImg1,
    title: 'BEARD GROOM',
  },
  {
    img: ServiceImg2,
    title: 'HAIR STYLE',
  },
  {
    img: ServiceImg3,
    title: 'KERATIN',
  },
  {
    img: ServiceImg4,
    title: 'HEAD MESSAGE',
  },
];