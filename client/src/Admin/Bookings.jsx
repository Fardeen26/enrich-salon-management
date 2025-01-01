import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { format } from 'date-fns';
import apiClient from '../utils/apiClient';

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 180, editable: true },
    { field: 'phone', headerName: 'Phone', width: 150, editable: true },
    { field: 'service', headerName: 'Service', width: 120, editable: false },
    { field: 'date', headerName: 'Date', sortable: true, width: 130 },
    { field: 'time', headerName: 'Time', sortable: true, width: 130 },
    { field: 'email', headerName: 'Email', sortable: false, width: 160 },
    { field: 'payment', headerName: 'Payment', sortable: true, width: 130 },
];

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const axiosClient = apiClient();
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axiosClient.get('/api/admin/all-bookings');
                const formattedBookings = response.data.map((booking) => ({
                    ...booking,
                    id: booking._id,
                    date: format(new Date(booking.date), 'MMMM dd, yyyy')
                }));
                setBookings(formattedBookings);
            } catch (error) {
                console.error('An Error Occurred:', error);
            }
        };

        fetchBookings();
    }, []);

    return (
        <div className="content h-full px-3 font-semibold pt-3">
            <h1 className='mb-3 text-2xl'>All Bookings</h1>
            <Box sx={{ height: 560, width: '100%' }}>
                <DataGrid
                    rows={bookings}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 10,
                            },
                        },
                    }}
                    pageSizeOptions={[5]}
                    checkboxSelection
                    disableRowSelectionOnClick
                />
            </Box>
        </div>
    );
};

export default Bookings;
