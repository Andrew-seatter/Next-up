import React from 'react';

import styles from '../Register/Register.module.css';

export const Register = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}></h1>

            <div className={styles.register}>
                <form>
                    <input type="text" placeholder="First Name" />
                    <input type="text" placeholder="Last Name" />
                    <input type="text" placeholder="Email" />
                    <input type="text" placeholder="Password" />
                    <input type="text" placeholder="Confirm Password" />
                    <button>Register</button>
                </form>
            </div>
        </div>

    );
}

export default Register;