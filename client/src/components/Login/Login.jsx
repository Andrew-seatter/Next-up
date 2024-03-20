import styles from "../Login/Login.module.css";

import auth from "../../../utils/auth.js";
import { LOGIN } from "../../../utils/mutations.js";

import { useMutation } from "@apollo/client";

export const Login = () => {
  const [login, { data, error, loading }] = useMutation(LOGIN);

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    login({
      variables: {
        email: form.email.value,
        password: form.password.value,
      },
    });
  };

  if (!error && data?.login?.token) {
    auth.login(data.login.token);
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login</h1>
      <form onSubmit={handleLogin}>
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
};

export default Login;
