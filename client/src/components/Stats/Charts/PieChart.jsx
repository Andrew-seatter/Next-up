import { PieChart } from '@mui/x-charts/PieChart';
import { jobStatusSeed } from '../../../lib/mock-stats.js';

import { useQuery, gql } from '@apollo/client';

const GET_JOB_STATUS_COUNTS = gql`
    query GetJobStatusCounts {
        jobStatusCounts {
            status
            count
        }
    }
    `;

export const PieChartCard = () => {
    const { loading, error, data } = useQuery(GET_JOB_STATUS_COUNTS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const transformedData = transformDataForChart(data.jobStatusCounts);

    return (
        <div>
            <PieChart
                series={[
                    { 
                        data: transformedData
                    },
                ]}
                width={400}
                height={200}
            />
        </div>
    )
};


const transformDataForChart = (data) => {
    const transformedData = data.map((item, index) => ({
        id: index,
        label: item.status,
        value: item.count
    }));
    return transformedData;
};

export default PieChartCard;