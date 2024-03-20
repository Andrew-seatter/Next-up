import styles from "../Login/Login.module.css";
import auth from "../../../utils/auth.js";
import { ADD_USER, LOGIN } from "../../../utils/mutations.js";
import { useMutation } from "@apollo/client";

export const Login = () => {
  const [login, { data, error, loading }] = useMutation(LOGIN);
  const [
    signUp,
    { data: signUpData, error: signUpError, loading: signUpLoading },
  ] = useMutation(ADD_USER);

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

  const handleSignUp = (e) => {
    e.preventDefault();
    const form = e.target;
    signUp({
      variables: {
        username: form.username.value,
        email: form.email.value,
        password: form.password.value,
      },
    });
  };

  if (!error && data?.login?.token) {
    auth.login(data.login.token);
  }

  if (!signUpError && signUpData?.signUp?.token) {
    auth.login(signUpData.signUp.token);
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
      <form onSubmit={handleSignUp}>
        <h1 className={styles.title}>Signup</h1>
        <label>
          Username:
          <input type="text" name="username" />
        </label>
        <label>
          Email:
          <input type="text" name="email" />
        </label>
        <label>
          Password:
          <input type="text" name="password" />
        </label>
        <button type="submit">Submit</button>
        {signUpError && <p>Error: {signUpError.message}</p>}
      </form>
    </div>
  );
};

export default Login;
