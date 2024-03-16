import styles from './Sidebar.module.css';
import { NavLink } from 'react-router-dom';

export const Sidebar = () => {
    return (
        <div className={styles.container}>
            {/* Pull username from database and insert here */}
            <h1 className={styles.title}> Hello User!</h1>

            {/* Welcome message */}
            <div className={styles.welcome}>
                <p> Welcome to NextUp, where your journey to landing your dream job begins!</p>
            </div>

            <div className={styles.sidebar}>
                <ul className={styles.list}>
                    {/* Navigation link to stats page */}
                    <li>
                        <NavLink to="/stats" className={styles.link}>View my stats</NavLink> 
                    </li>
                    <li>
                        <NavLink to="/resources" className={styles.link}>View Resources</NavLink>
                    </li>

                </ul>
            </div>
        </div>
    );
}

export default Sidebar;