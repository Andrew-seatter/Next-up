import React from 'react';

import styles from '../Stats/Stats.module.css';

export const Stats = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}></h1>
            <section className={styles.charts}>
                <div className={styles.chart}>
                {/* Example Chart Titles */}
                    <h2>Applications</h2>
                </div>
                <div className={styles.chart}>
                    <h2>Interviews</h2>
                </div>
                <div className={styles.chart}>
                    <h2>Offers</h2>
                </div>

            </section>
        </div>

    );
}

export default Stats;