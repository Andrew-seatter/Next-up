import { BarChart } from '@mui/x-charts/BarChart';
import { interviewSuccessRateSeed } from '../../../lib/mock-stats.js';

export const BarChartCard = () => {
    const months = interviewSuccessRateSeed.map(item => item.month);
    const successData = interviewSuccessRateSeed.map(item => item.success);
    const totalData = interviewSuccessRateSeed.map(item => item.total);



    return (
        <div>
            <BarChart
                xAxis={[{ scaleType: 'band', data: months }]}
                series={[
                    { name: 'Success', data: successData }, 
                    { name: 'Total Applications', data: totalData }
                ]}
                width={500}
                height={300}
            />

        </div>

    )
}; 

export default BarChartCard;