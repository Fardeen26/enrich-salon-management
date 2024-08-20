import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

// eslint-disable-next-line react/prop-types
const PieChart = ({ options, data }) => {
    return (
        <Pie options={options} data={data} />
    )
};

export default PieChart;