import styles from './Sidebar.module.css';
import { NavLink } from 'react-router-dom';
import { Stack, } from "@mui/material";
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import PieChartOutlineIcon from '@mui/icons-material/PieChartOutline';
import LaptopChromebookIcon from '@mui/icons-material/LaptopChromebook';
import Button from '@mui/material/Button';

export const Sidebar = () => {
    return (
        <div className={styles.container}>
            {/* Pull username from database and insert here */}
            <h1 className={styles.title}> nextUp logo</h1>

            {/* Welcome message */}
            <div className={styles.welcome}>
                {/* <p> Welcome to NextUp, where your journey to landing your dream job begins!</p> */}
            </div>

            <div className={styles.sidebar}>
                <ul className={styles.list}>
                    {/* Navigation link to stats page */}
                    <li>
                    <Stack direction='row' alignItems='center' gap={3}>
                        <WorkOutlineIcon className='alljobs-icon'></WorkOutlineIcon>
                        <NavLink to="/allJobs" className={styles.link}>All Jobs</NavLink>
                    </Stack> 
                    </li>
                    <li>
                    <Stack direction='row' alignItems='center' gap={3}>
                        <PieChartOutlineIcon></PieChartOutlineIcon>
                        <NavLink to="/stats" className={styles.link}>My Stats</NavLink> 
                    </Stack> 
                    </li>
                    <li>
                    <Stack direction='row' alignItems='center' gap={3}>
                        <LaptopChromebookIcon></LaptopChromebookIcon>
                        <NavLink to="/resources" className={styles.link}> Resources</NavLink>
                    </Stack>
                    </li>
                    <li>
                        <Stack direction='row' alignItems='center' gap={3}>
                            <Button variant="outlined">
                               Sign out
                            </Button>
                    </Stack></li>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;