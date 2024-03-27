import { BarChart } from '@mui/x-charts/BarChart';
import { interviewSuccessRateSeed } from '../../../lib/mock-stats.js';
import { useQuery, gql } from '@apollo/client';

const GET_INTERVIEWS_VS_APPLICATIONS = gql`
    query GetInterviewsVsApplications {
        interviewsVsApplications {
            applications
            interviews
        }
    }
        `;

export const BarChartCard = () => {
    const { loading, error, data } = useQuery(GET_INTERVIEWS_VS_APPLICATIONS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    const { applications, interviews } = data.interviewsVsApplications[0];

    return (
        <div>
            <BarChart
                xAxis={[{ scaleType: 'band', data: ["Total number of job applications and interviews"] }]}
                series={[
                    { label: 'Applications', data: [applications] },
                    { label: 'Interviews', data: [interviews]}
                ]}
                
                width={500}
                height={300}
            />
        </div>

    )
}; 

export default BarChartCard;