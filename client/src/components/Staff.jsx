import Heading from './Utils-Component/Heading';
import styler_1 from '../assets/Styler-01.jpg'
import styler_2 from '../assets/Styler-02.jpg'
import styler_3 from '../assets/Styler-03.jpg'
import './Staff.css';


function Staff() {
    return (
        <div>
            <Heading title={"OUR STYLERS"} />
            <div className="staff-container flex justify-center py-8 px-44 flex-wrap max-sm:px-4 mb-20 Staff" id='Staff'>
                {
                    itemData.map((item, idx) => (
                        <div className="service-image p-2" key={idx}>
                            <img src={item.img} alt="" className='' key={idx + 1} />
                            <div className="staff-detail bg-black text-white text-center py-2" key={idx + 2}>
                                <h2 className='staff-name text-lg' key={idx + 3}>{item.name}</h2>
                                <p className='text-xs opacity-70' key={idx + 4}>{item.role}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Staff;

const itemData = [
    {
        img: styler_1,
        name: 'SHADAB HUSSAIN',
        role: "- COLORIST"
    },
    {
        img: styler_2,
        name: 'JAVED ALI MANSURI',
        role: "- STYLER"
    },
    {
        img: styler_3,
        name: 'JUNED MANSURI',
        role: "- BEAUTICIAN"
    },
];
