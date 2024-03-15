import React from 'react';

import styles from '../JobCard/JobCard.module.css';

export const JobCard = ({ jobName, company, status, notes}) => {
    return (
        <card className={styles.container}>
            <h1 className={styles.title}></h1>

            <div className={styles.jobCard}>
                <h2 className={styles.jobName}>{jobName}</h2>
                <h3 className={styles.company}>{company}</h3>
                <p className={styles.status}>{status}</p>
                <p className={styles.notes}>{notes}</p>
            </div>
        </card>

    );
}

export default JobCard;