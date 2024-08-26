import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

// eslint-disable-next-line react/prop-types
const PieChart = ({ data }) => {
    const options = {
        responsive: true,
        plugins: {
            Legend: {
                position: 'top'
            }
        }
    }

    return (
        <Pie options={options} data={data} />
    )
};

export default PieChart;