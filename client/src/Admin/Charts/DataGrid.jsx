import { DataGrid as MuiDataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 150, editable: true },
    { field: 'service', headerName: 'Service', width: 120, editable: false },
    { field: 'date', headerName: 'Date', sortable: true, width: 120 },
    { field: 'time', headerName: 'Time', sortable: true, width: 100 },
];

// eslint-disable-next-line react/prop-types
const DataGrid = ({ recentBookings }) => {
    return (
        <MuiDataGrid
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
    )
}

export default DataGrid