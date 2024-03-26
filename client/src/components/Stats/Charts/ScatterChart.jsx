import { ScatterChart } from '@mui/x-charts/ScatterChart';
import { useQuery, gql } from '@apollo/client';

const GET_SALARY_DATA = gql`
    query GetSalaryData {
        salaryData {
            _id
            salaryRangeLow
            salaryRangeHigh
        }
    }
`;

export const ScatterChartCard = () => {
    const { loading, error, data } = useQuery(GET_SALARY_DATA);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    const salaryChartData = data.salaryData.map(job => ({
        id: job._id,
        x: job.salaryRangeLow,
        y: job.salaryRangeHigh,
        }));


    return (
        <div>
            <ScatterChart
                width={600}
                height={300}
                series={[
                    {
                        label: 'Salary Range',
                        data: salaryChartData,
                    },
                ]}
            />
        </div>
    );
};

export default ScatterChartCard;
