// import StateBox from './StateBox'
import StateBox from './StateBox'
import PeopleIcon from '@mui/icons-material/People'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';

// eslint-disable-next-line react/prop-types
const StateBoxContainer = ({ bookingCount, totalIncome, totalServices, totalCustomer }) => {
    return (
        <div className="states flex justify-center max-lg:flex-wrap max-md:flex-wrap">

            <div className='border rounded-2xl w-[18.5vw] h-[170px] max-lg:w-[40vw] max-sm:w-screen min-w-[170px] max-lg:mr-4 max-sm:mr-0 max-2xl:mr-4 mr-4 shadow'>

                <StateBox icon={<PeopleIcon className='text-white' />} iconBGColor="red" title="Total Bookings" value={bookingCount} currency={false} />

            </div>
            <div className='rounded-2xl h-[170px] w-[18.5vw] max-lg:w-[40vw] max-sm:w-screen border min-w-[170px] max-sm:mr-0 max-2xl:mr-4 mr-4 max-sm:mt-8 shadow'>

                <StateBox icon={<CurrencyRupeeIcon className='text-white' />} iconBGColor="blue" title="Income" value={totalIncome} currency={true} />

            </div>
            <div className='border rounded-2xl h-[170px] w-[18.5vw] max-lg:w-[40vw] max-sm:w-screen min-w-[170px] max-lg:mr-4 max-sm:mr-0 max-2xl:mr-4  mr-4 max-lg:mt-8 shadow'>

                <StateBox icon={<ContentCutIcon className='text-white' />} iconBGColor="#4ded53" title="All Services" value={totalServices} currency={false} />

            </div>
            <div className='border rounded-2xl h-[170px] w-[18.5vw] max-lg:w-[40vw] max-sm:w-screen  min-w-[170px] max-sm:mr-0 max-2xl:mr-4 mr-4 max-lg:mt-8 shadow'>
                <StateBox icon={<EmojiEmotionsIcon className='text-white' />} iconBGColor="orange" title="Total Customer" value={totalCustomer} currency={false} />
            </div>
        </div>
    )
}

export default StateBoxContainer