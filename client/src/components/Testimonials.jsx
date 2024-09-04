import Slider from "react-slick";
import Heading from './Heading';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Avatar from '@mui/material/Avatar';
import avatar1 from '../assets/avatar-1.avif'
import avatar2 from '../assets/avatar-2.avif'
import avatar3 from '../assets/avatar-3.avif'
import avatar4 from '../assets/avatar-4.avif'
import avatar5 from '../assets/avatar-5.avif'
import avatar6 from '../assets/avatar-6.avif'
import avatar7 from '../assets/avatar-7.avif'

function SampleNextArrow(props) {
    // eslint-disable-next-line react/prop-types
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "black", color: 'black', borderRadius: '10px', width: '20px', height: '3px', padding: '1px 0px 19px 0px' }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    // eslint-disable-next-line react/prop-types
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "black", borderRadius: '10px', width: '20px', height: '3px', padding: '1px 0px 19px 0px' }}
            onClick={onClick}
        />
    );
}

function Testimonials() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };

    return (
        <>
            <Heading title={"WHAT OUR CLIENTS SAYS"} />
            <div className="px-12 max-sm:px-0 max-sm:overflow-hidden mb-8" id='Testimonials'>
                <Slider {...settings}>
                    {
                        Data.map((item, idx) => (
                            <section className="relative isolate overflow-hidden bg-white px-6 max-sm:px-4 py-24 max-sm:py-0 lg:px-8" key={idx}>
                                <div className="mx-auto max-w-2xl lg:max-w-4xl" key={idx}>
                                    <figure className="mt-10">
                                        <blockquote className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
                                            <p key={idx + 1}>
                                                “{item.review}”
                                            </p>
                                        </blockquote>
                                        <figcaption className="mt-10">
                                            <Avatar alt="Remy Sharp" src={item.avatar} className='mx-auto h-10 w-10 rounded-full' key={idx + 2} />

                                            <div className="mt-4 flex items-center justify-center space-x-3 text-base" key={idx + 3}>
                                                <div className="font-semibold text-gray-900" key={idx + 4}>{item.name}</div>
                                                <svg viewBox="0 0 2 2" width={3} height={3} aria-hidden="true" className="fill-gray-900">
                                                    <circle cx={1} cy={1} r={1} />
                                                </svg>
                                                <div className="text-gray-600" key={idx + 5}>{item.service}</div>
                                            </div>
                                        </figcaption>
                                    </figure>
                                </div>
                            </section>

                        ))}
                </Slider>
            </div>

        </>


    )
}

export default Testimonials;

const Data = [
    {
        name: "Alice Johnson",
        service: "Haircut",
        review: "I had a fantastic experience at the salon! My stylist was friendly and gave me the perfect haircut. I will definitely be coming back.",
        avatar: avatar1
    },
    {
        name: "Michael Smith",
        service: "Massage",
        review: "The massage was so relaxing and rejuvenating. The ambiance was calming, and the masseuse was highly skilled. Highly recommend!",
        avatar: avatar2
    },
    {
        name: "James Brown",
        service: "Facial",
        review: "The facial was amazing! My skin feels so smooth and refreshed. The staff was very knowledgeable and made me feel comfortable throughout the session.",
        avatar: avatar3
    },
    {
        name: "Emily Davis",
        service: "Hair Coloring",
        review: "I wanted a new hair color, and the stylist did a wonderful job! The color looks vibrant and exactly how I wanted it. Great experience!",
        avatar: avatar4
    },
    {
        name: "Olivia Wilson",
        service: "Hair Styling",
        review: "The hair styling service was excellent! My stylist created a beautiful look for my event. I received so many compliments. Thank you!",
        avatar: avatar5
    },
    {
        name: "Daniel Moore",
        service: "Shaving",
        review: "I had a great shave at the salon. The barber was skilled and provided a very clean and precise shave. Very satisfied with the service.",
        avatar: avatar6
    },
    {
        name: "Benjamin Jackson",
        service: "Beard Trim",
        review: "The beard trim was great. The barber was very skilled and gave my beard a clean and stylish look. I will definitely return for regular trims.",
        avatar: avatar7
    }
];    
