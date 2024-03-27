import styles from "../Login/Login.module.css";
import auth from "../../../utils/auth.js";
import { ADD_USER, LOGIN } from "../../../utils/mutations.js";
import { useMutation } from "@apollo/client";
import React, { useState, useRef } from "react";
import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";
import GlobalStyles from "@mui/joy/GlobalStyles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import { useTheme } from "@mui/material/styles";
// import Checkbox from "@mui/joy/Checkbox";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import IconButton from "@mui/joy/IconButton";
import Link from "@mui/joy/Link";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";

/*
  useRef creates an object that looks like this
  {
    current: yourReference    <- if you are storing an element, it goes here
  }
*/

export const Login = () => {
  // error handling
  const errorDiv = useRef(null)
  function setError(msg = ""){
    errorDiv.current.innerText = msg
  }
  // const setError = (msg = "") => errorDiv.current.innerText = msg
  //

  const [login, { data, error, loading }] = useMutation(LOGIN);
  const [
    signUp,
    { data: signUpData, error: signUpError, loading: signUpLoading },
  ] = useMutation(ADD_USER);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const theme = useTheme();
  const [isDark, setIsDark] = useState(
    localStorage.getItem("joy-mode") === "dark"
  );
  const mainColor = isDark ? "#A1E000" : "#5500E0";

  const handleLogin = (e) => {
    e.preventDefault();
    setError()
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
    setError()
    const form = e.target;
    signUp({
      variables: {
        username: form.username.value,
        email: form.email.value,
        password: form.password.value,
      },
    });
  };

  if (data?.login?.token) {
    auth.login(data.login.token);
    window.location.href = "/dashboard";
  }

  // If something went wrong logging in
  if (error) {
    // alert(error.message)
    setError(error.message)
  }

  if (signUpError) {
    // alert(signUpError.message)
    setError(signUpError.message)
  }

  if (signUpData?.addUser) {
    auth.login(signUpData.addUser.token);
    window.location.href = "/dashboard";
  }

  return JoySignInSideTemplate();

  function ColorSchemeToggle(props) {
    const { onClick, ...other } = props;
    const { mode, setMode } = useColorScheme();
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => setMounted(true), []);

    return (
      <IconButton
        aria-label="toggle light/dark mode"
        size="sm"
        variant="outlined"
        disabled={!mounted}
        onClick={(event) => {
          setIsDark(mode === "light");
          setMode(mode === "light" ? "dark" : "light");
          onClick?.(event);
        }}
        {...other}
      >
        {mode === "light" ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
      </IconButton>
    );
  }

  function JoySignInSideTemplate() {
    return (
      <CssVarsProvider defaultMode="dark" disableTransitionOnChange>
        <CssBaseline />
        <GlobalStyles
          styles={{
            ":root": {
              "--Form-maxWidth": "800px",
              "--Transition-duration": "0.4s", // set to `none` to disable transition
            },
          }}
        />
        <Box
          sx={(theme) => ({
            width: { xs: "100%", md: "25vw" },
            transition: "width var(--Transition-duration)",
            transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
            position: "relative",
            zIndex: 1,
            display: "flex",
            justifyContent: "flex-end",
            backdropFilter: "blur(12px)",
            backgroundColor: "rgba(255 255 255 / 0.2)",
            [theme.getColorSchemeSelector("dark")]: {
              backgroundColor: "rgba(19 19 24 / 0.4)",
            },
          })}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100dvh",
              width: "100%",
              px: 2,
            }}
          >
            <Box
              component="header"
              sx={{
                py: 3,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ gap: 2, display: "flex", alignItems: "center" }}>
                {/* <IconButton variant="soft" color="primary" size="sm">
                  <img src={logo} alt="" style={{ position: "absolute", top: 0, left: 0 }}  />
                </IconButton> */}
              </Box>
              <ColorSchemeToggle />
            </Box>
            <Box
              component="main"
              sx={{
                my: "auto",
                py: 2,
                pb: 5,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                width: 400,
                maxWidth: "100%",
                mx: "auto",
                borderRadius: "sm",
                "& form": {
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                },
                [`& .MuiFormLabel-asterisk`]: {
                  visibility: "hidden",
                },
              }}
            >
              <Stack gap={4} sx={{ mb: 2 }}>
                <Stack gap={1}>
                  <Typography component="h1" level="h3">
                    {isSigningUp ? "Sign up" : "Sign in"}
                    <br />
                  </Typography>
                  <Typography level="body-sm">
                    {isSigningUp
                      ? "Already have an account?"
                      : "New to NextUp?"}
                    &nbsp;&nbsp;
                    <Button
                      onClick={() => setIsSigningUp(!isSigningUp)}
                      size="medium"
                      style={{ backgroundColor: mainColor }}
                    >
                      {isSigningUp ? "Sign in!" : "Sign up!"}
                    </Button>
                  </Typography>
                </Stack>
              </Stack>
              <Stack gap={4} sx={{ mt: 2 }}>
                {isSigningUp ? (
                  <form onSubmit={handleSignUp}>
                    <FormControl required>
                      <FormLabel>Username</FormLabel>
                      <Input type="username" name="username" />
                    </FormControl>
                    <FormControl required>
                      <FormLabel>Email</FormLabel>
                      <Input type="email" name="email" />
                    </FormControl>
                    <FormControl required>
                      <FormLabel>Password</FormLabel>
                      <Input type="password" name="password" />
                    </FormControl>
                    <Button
                      type="submit"
                      style={{ backgroundColor: mainColor }}
                    >
                      Sign Up
                    </Button>
                    {/* {theme.palette.mode === "dark" && (
                      <Button
                        style={{ backgroundColor: "green", color: "white" }}
                      >
                        Click me
                      </Button>
                    )} */}
                  </form>
                ) : (
                  <form onSubmit={handleLogin}>
                    <FormControl required>
                      <FormLabel>Email</FormLabel>
                      <Input type="email" name="email" />
                    </FormControl>
                    <FormControl required>
                      <FormLabel>Password</FormLabel>
                      <Input type="password" name="password" />
                    </FormControl>
                    <Stack gap={4} sx={{ mt: 2 }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        {/* <Checkbox
                        size="sm"
                        label="Remember me"
                        name="persistent"
                      /> */}
                        {/* <Link level="title-sm" href="#replace-with-a-link">
                        Forgot your password?
                      </Link> */}
                      </Box>
                      <Button
                        type="submit"
                        fullWidth
                        style={{
                          backgroundColor: mainColor,
                        }}
                      >
                        Sign in
                      </Button>
                    </Stack>
                  </form>
                )}
              </Stack>
            </Box>
            <Box component="footer" sx={{ py: 3 }}>
              <div style={{color: 'maroon'}} ref={errorDiv}></div>
              <Typography level="body-xs" textAlign="center">
                © nextUp {new Date().getFullYear()}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={(theme) => ({
            height: "100%",
            position: "fixed",
            right: 0,
            top: 0,
            bottom: 0,
            left: { xs: 0, md: "25vw" },
            transition:
              "background-image var(--Transition-duration), left var(--Transition-duration) !important",
            transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
            backgroundColor: "background.level1",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundImage: "url(/background.jpeg)",
            [theme.getColorSchemeSelector("dark")]: {
              backgroundImage: "url(/blackBackground.jpeg)",
            },
          })}
        >
          <img
            src={isDark ? "/greenLogo.png" : "/purpleLogo.png"}
            alt="Description"
            style={{
              position: "absolute",
              top: "45%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "800px",
              height: "400px",
            }}
          />
          <p
            style={{
              position: "absolute",
              top: "41%",
              left: "43%",
              transform: "translate(-50%, -50%)",
              width: "600px",
              height: "300px",
              fontSize: "22px",
            }}
          >
            Your Job Search, Mapped and Managed.
          </p>
        </Box>
      </CssVarsProvider>
    );
  }
};

export default Login;
