import React from 'react';

import styles from '../Login/Login.module.css';

export const Login = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Login</h1>
            <form>
                <label>
                    Email:
                    <input type="text" name="email" />
                </label>
                <label>
                    Password:
                    <input type="text" name="password" />
                </label>
                <button type="submit">Login</button>
            </form>
        </div>

    );
}

export default Login;