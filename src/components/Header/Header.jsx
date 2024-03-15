import React from 'react';

import styles from '../Header/Header.module.css';

export const Header = () => {
    return (
        <div className={styles.Header}>
                <h1 className={styles.title}>
                    NextUp
                </h1>
                <p className={styles.tagline}>
                    Your Personal Job Application Tracker
                    </p>
            </div>

    );
}

export default Header;