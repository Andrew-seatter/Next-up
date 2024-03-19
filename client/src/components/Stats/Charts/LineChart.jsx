import { LineChart } from '@mui/x-charts/LineChart';
import { normalizedData } from '../../../lib/mock-stats.js';
import moment from 'moment';

export const LineChartCard = () => {
    const transformedData = transformDataForChart(normalizedData);

    return (
        <div>
            <LineChart
                xAxis={transformedData.xAxis}
                series={transformedData.series}
                width={500}
                height={300}
            />
        </div>
    );
};

const transformDataForChart = (data) => {
    // Mapping logic
    const transformedData = data.map(item => ({
        // Return an object from the map function
        date: moment(item.createdAt).valueOf(), // Convert date to timestamp
        applications: item.applications || 0, // Default to 0 if applications is undefined
    }))
    // Sort by the numeric timestamp
    .sort((a, b) => a.date - b.date);

    // Prepare data structure for the chart
    return {
        xAxis: [{
            data: transformedData.map(item => item.date),
        }],
        series: [{
            data: transformedData.map(item => item.applications),
        }],
    };
};

export default LineChartCard;
