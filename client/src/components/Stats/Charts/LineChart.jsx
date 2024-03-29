import { LineChart } from '@mui/x-charts/LineChart';
// import { applicationsOverTimeSeed } from '../../../lib/mock-stats.js';
import moment from 'moment';

import { useQuery, gql } from '@apollo/client';

const GET_APPLICATIONS_OVER_TIME = gql`
    query GetApplicationsOverTime {
        applicationsOverTime {
            date
            count
        }
    }
    `;

export const LineChartCard = () => {
    const { loading, error, data } = useQuery(GET_APPLICATIONS_OVER_TIME);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const transformedData = {
        xAxis: [{
            data: data.applicationsOverTime.map(item => moment(item.date).valueOf()),
            scaleType: 'time',
        }],
        yAxis: [{
            id: 'yAxis1',
            scaleType: 'linear',
            min: 0,
            max: 10,
            tickNumber: 11,
        }],
        series: [{
            data: data.applicationsOverTime.map(item => item.count),
        }],
    };

    return (
        <div>
            <LineChart 
                xAxis={transformedData.xAxis}
                yAxis={transformedData.yAxis}
                series={transformedData.series}
                width={500}
                height={300}
            />
        </div>
    );
};




// Replaced by GraphQL
    // const aggregatedData = aggregateApplicationsByDate(normalizedData);
    // const transformedData = transformDataForChart(aggregatedData);

// const normalizedData = applicationsOverTimeSeed.map(item => {
//     // If 'applications' key exists, increment it by 1. Otherwise, set it to 1.
//     const applications = item.applications ? item.applications + 1 : 1;
//     return { ...item, applications };
//     });

//     normalizedData.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

// const aggregateApplicationsByDate = (data) => {
//     const aggregatedData = data.reduce((acc, item) => {
//     const date = item.createdAt;
//     if (!acc[date]) {
//         acc[date] = {createdAt: date, applications: 0};
//     } 
//     acc[date].applications += 1;
//     return acc;
// }, {});

// return Object.values(aggregatedData);
// };

// const transformDataForChart = (data) => {
//     // Mapping logic
//     const transformedData = data.map(item => ({
//         // Return an object from the map function
//         // date: moment(item.createdAt).valueOf(), // Convert date to timestamp
//         applications: item.applications, // Default to 0 if applications is undefined
//     }))
//     // Sort by the numeric timestamp
//     .sort((a, b) => a.date - b.date);

//     // Prepare data structure for the chart
//     return {
//         xAxis: [{
//             data: transformedData.map(item => item.date),
//             scaleType: 'time',
//         }],
//         yAxis: [{
//             id: 'yAxis1',
//             scaleType: 'linear',
//             min: 0,
//             max: 10,
//             tickNumber: 11,
//         }],
//         series: [{
//             data: transformedData.map(item => item.applications),
//         }],
//     };
// };

export default LineChartCard;
