import { useEffect, useState } from 'react'
import './Admin.css'
import PeopleIcon from '@mui/icons-material/People'
import StateBox from './utils-components/StateBox'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import axios from 'axios'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { format } from 'date-fns';

import PieChart from './utils-components/PieChart'
import { LineChart } from '@mui/x-charts/LineChart';

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 150, editable: true },
    { field: 'service', headerName: 'Service', width: 120, editable: false },
    { field: 'date', headerName: 'Date', sortable: true, width: 120 },
    { field: 'time', headerName: 'Time', sortable: true, width: 100 },
];

const Home = () => {
    const [bookingCount, setBookingCount] = useState(0);
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalServices, setTotalServices] = useState(0);
    const [totalCustomer, setTotalCustomer] = useState(0);
    const [recentBookings, setRecentBookings] = useState([]);
    const [lineChartWidh, setLineChartWidth] = useState(1200);
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{
            label: 'Service Bookings',
            data: [],
            backgroundColor: [],
            hoverOffset: 4
        }]
    });
    const [lineChartMargins, setLineChartMargins] = useState({
        left: 40,
        right: 20,
        top: 50,
        bottom: 50
    })
    const [lineXAxisData, setLineXAxisData] = useState([]);
    const [lineSeriesData, setLineSeriesData] = useState([]);

    const options = {
        responsive: true,
        plugins: {
            Legend: {
                position: 'top'
            }
        }
    }

    useEffect(() => { // import.meta.env.DATA_BACKEND_URL + 
        const bookingCountData = async () => {
            try {
                const responce = await axios.get('/api/admin/booking-count');
                if (responce.data)
                    setBookingCount(responce.data)
            } catch (error) {
                console.error("An Error Occured", error);
            }
        };

        const totalIncome = async () => {
            try {
                const responce = await axios.get('/api/admin/total-revenue');
                if (responce.data)
                    setTotalIncome(responce.data)
            } catch (error) {
                console.error("An Error Occured", error);
            }
        }

        const totalServices = async () => {
            try {
                const responce = await axios.get('/api/admin/total-services');
                if (responce.data)
                    setTotalServices(responce.data);
            } catch (error) {
                console.error("An Error Occured", error);
            }
        }

        const totalCustomer = async () => {
            try {
                const responce = await axios.get('/api/admin/total-customers');
                if (responce.data)
                    setTotalCustomer(responce.data);
            } catch (error) {
                console.error("An Error Occured", error);
            }
        }

        const recentBookings = async () => {
            try {
                const responce = await axios.get('/api/admin/recent-bookings');
                if (responce.data) {
                    const formattedBookings = responce.data.map((recentBookings) => ({
                        ...recentBookings,
                        id: recentBookings._id,
                        date: format(new Date(recentBookings.date), 'MMMM dd, yyyy')
                    }))
                    setRecentBookings(formattedBookings);
                }
            } catch (error) {
                console.error("An Error Occured", error);
            }
        }

        const servicesCount = async () => {
            try {
                const responce = await axios.get('/api/admin/services-count')
                if (responce.data) {
                    const data = responce.data;

                    const labels = data.map(item => item.service);
                    const values = data.map(item => item.count);
                    const backgroundColors = [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 205, 86)',
                        '#4ded53',
                        'rgb(153, 102, 255)',
                        'rgb(255, 159, 64)'
                    ];

                    setChartData({
                        labels: labels,
                        datasets: [{
                            label: 'Service Bookings',
                            data: values,
                            backgroundColor: backgroundColors,
                            hoverOffset: 4
                        }]
                    });
                }
            } catch (error) {
                console.error("An Error Occured", error);
            }
        }

        const getMonthlyBookings = async () => {
            try {
                const responce = await axios.get('/api/admin/monthly-bookings');
                if (responce.data) {
                    let tempArray = [];
                    let tempArray2 = [];
                    responce.data.map((item) => {
                        tempArray.push(item.month);
                        tempArray2.push(item.totalBookings)
                    })
                    setLineXAxisData(tempArray)
                    setLineSeriesData(tempArray2)
                }
            } catch (error) {
                console.error("An Error Occured", error);
            }
        }

        const handleResize = () => {
            if (window.innerWidth >= 1000)
                setLineChartWidth(window.innerWidth - 350);
            else
                setLineChartWidth(window.innerWidth - 40);

            if (window.innerWidth < 500) {
                setLineChartMargins({ left: 30, right: 30, top: 50, bottom: 100 })
            }
        }

        bookingCountData();
        totalIncome();
        totalServices();
        totalCustomer();
        recentBookings();
        servicesCount();
        getMonthlyBookings();
        handleResize();
    }, []);

    return (
        <div className="content h-full max-ms:p-4 max-sm:p-2 mt-5">

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

            <div className="graphs mt-4 flex flex-wrap overflow-hidden max-sm:p-0 max-xl:p-4 max-2xl:p-4 max-lg:p-4 p-4"> {/* p-4 just for my laptop*/}
                <div className="max-sm:w-screen max-xl:border border max-xl:rounded-2xl rounded-2xl max-xl:p-3 py-3 max-xl:w-[45vw] w-[45vw] overflow-x-auto shadow">
                    <h2 className='text-xl p-3 font-semibold'>Recent Bookings</h2>

                    <div className="data-list mt-3">
                        <Box sx={{ height: 490, width: '100%' }}>
                            <DataGrid
                                rows={recentBookings}
                                columns={columns}
                                initialState={{
                                    pagination: {
                                        paginationModel: {
                                            pageSize: 5,
                                        },
                                    },
                                }}
                                pageSizeOptions={[5]}
                                checkboxSelection
                                disableRowSelectionOnClick
                            />
                        </Box>
                    </div>


                </div>

                <div className="max-sm:w-screen border rounded-2xl p-3 ml-3 max-sm:ml-0 flex-1 max-sm:mt-3 shadow">
                    <h2 className='text-xl font-semibold'>Most Booked Services</h2>
                    <div className="pie-chart mt-5 flex justify-center" key="pie-chart">
                        <PieChart options={options} data={chartData} />
                    </div>
                </div>

                <div className="w-[79vw] max-sm:w-[96vw] max-lg:w-[96vw] border rounded-2xl p-3 mt-5 max-sm:mt-3 shadow">
                    <h2 className='text-xl font-semibold'>Each Month Bookings</h2>
                    <div className="mt-2">
                        <LineChart
                            xAxis={[{ data: lineXAxisData }]}
                            series={[
                                {
                                    data: lineSeriesData,
                                },
                            ]}
                            margin={lineChartMargins}
                            width={lineChartWidh}
                            height={500}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;