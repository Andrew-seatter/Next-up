import { PieChart } from '@mui/x-charts/PieChart';
import { jobStatusSeed } from '../../../lib/mock-stats.js';

export const PieChartCard = () => {
    const transformedData = transformDataForChart(jobStatusSeed);
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

const transformDataForChart = (seedData) => {
    const transformedData = seedData.map((item, index) => ({
        id: index,
        label: item.status,
        value: item.count
    }));
    return transformedData;
};

export default PieChartCard;