import { useEffect, useState } from 'react';
import { LineChart as MuiLineChart } from '@mui/x-charts/LineChart';
import axios from 'axios';

const LineChart = () => {
  const [lineChartWidh, setLineChartWidth] = useState(1200);
  const [lineChartMargins, setLineChartMargins] = useState({
    left: 40,
    right: 20,
    top: 50,
    bottom: 50
  })
  const [lineXAxisData, setLineXAxisData] = useState([]);
  const [lineSeriesData, setLineSeriesData] = useState([]);

  useEffect(() => {
    const getMonthlyBookings = async () => {
      try {
        const responce = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/monthly-bookings`);
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

    getMonthlyBookings();
    handleResize();
  }, [])

  return (
    <MuiLineChart
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
  )
}

export default LineChart