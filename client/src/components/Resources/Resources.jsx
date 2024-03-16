import styles from './Resources.module.css';

export const Resources = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Resources</h1>
            <div className={styles.resources}>
                <ul>
                    <li>Resource 1</li>
                    <li>Resource 2</li>
                    <li>Resource 3</li>
                    <li>Resource 4</li>
                </ul>
            </div>
        </div>
    );
}

export default Resources;