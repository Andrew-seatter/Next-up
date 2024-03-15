import React from 'react';

import JobCard from '../JobCard/JobCard';

import styles from '../Dashboard/Dashboard.module.css';

const Jobs = [
    // fetch data from database
]

export const Dashboard = () => {

    return (
        <div> 
            <main className={styles.container}>
                <h1 className={styles.title}></h1>
                <div className={styles.jobCards}>

                    {/* sample job card */}

                    {Jobs.map((job, index) => (
                        <JobCard
                            key={index}
                            jobName={job.jobName}
                            company={job.company}
                            status={job.status}
                            notes={job.notes}
                        />
                    ))}

                    {/* sample data */}

                    <JobCard
                        jobName="Software Engineer"
                        company="Google"
                        status="Applied"
                        notes="Applied on 03/14/2024"
                    />

                </div>
            </main>

        <aside>
            <div>
                {/* Greeting */}
                {/* Follow Up */}
                {/* Stats */}
            </div>
        </aside>


        </div>
    );
}


export default Dashboard;