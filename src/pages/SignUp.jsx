import React, { useState } from "react";
import UserDataService from "../services/user.services";
import { useUserAuth } from "../context/AuthContext";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ThemeProvider, makeStyles } from "@mui/styles";
import { Alert } from "@mui/material";

const useStyles = makeStyles({
  zipInput: {
    "& input[type=number]": {
      "-moz-appearance": "textfield"
    },
    "& input[type=number]::-webkit-outer-spin-button": {
      "-webkit-appearance": "none",
      "margin": 0
    },
    "& input[type=number]::-webkit-inner-spin-button": {
      "-webkit-appearance": "none",
      "margin": 0
    }
  }
});

function Copyright(props) {
  return (
    <Typography variant='body2' color='text.secondary' align='center' {...props}>
      {"Copyright © "}
      <Link component={RouterLink} to='/' color='inherit'>
        Wildbeadz
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignUp() {
  const classes = useStyles();
  const [userInfo, setUserInfo] = useState({
    StreetAddress: "",
    StreetAddressSecond: "",
    City: "",
    State: "",
    Zip: "",
    Email: "",
    FirstName: "",
    LastName: ""
  });
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState();
  const [message, setMessage] = useState({ error: "false", msg: "" });
  const { signUp } = useUserAuth();
  const navigate = useNavigate();

  const shippingInformation = async e => {
    setError("");
    console.log(userInfo);
    try {
      await UserDataService.addUser(userInfo);
    } catch (err) {
      setError(err.code.slice(5).replace(/-/g, " "));
      console.log(err.code);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    console.log(userInfo);
    switch (true) {
      case password === confirmPassword && password.length > 7:
        try {
          await signUp(userInfo.Email, password);
          shippingInformation();
          setMessage({ error: "false", msg: "User Account Created" });
          navigate("/");
        } catch (err) {
          setError(err.code.slice(5).replace(/-/g, " "));
          console.log(err.code);
        }
        break;
      case password !== confirmPassword:
        setError("Passwords do not match");
        break;
      case password.length <= 7:
        setError("Weak password. Must be at least 8 characters");
        break;
      default:
        setError("Unknown Error");
    }
  };

  return (
    // <ThemeProvider theme={theme}>
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}>
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant='h4'>Create Account</Typography>
        {error && <Alert severity='error'>{error}</Alert>}
        <Box component='form' sx={{ mt: 3 }} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                value={userInfo.FirstName}
                name='firstName'
                id='firstName'
                label='First Name'
                onChange={e => setUserInfo({ ...userInfo, FirstName: e.target.value })}
                required
                fullWidth
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                value={userInfo.LastName}
                name='lastName'
                id='lastName'
                label='Last Name'
                onChange={e => setUserInfo({ ...userInfo, LastName: e.target.value })}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={userInfo.Email}
                name='email'
                id='email'
                label='Email Address'
                type='email'
                onChange={e => setUserInfo({ ...userInfo, Email: e.target.value })}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={password}
                name='password'
                id='password'
                label='Password'
                type='password'
                onChange={e => setPassword(e.target.value)}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={confirmPassword}
                name='passwordConfirmation'
                id='passwordConfirmation'
                label='Confirm Password'
                type='password'
                onChange={e => setConfirmPassword(e.target.value)}
                required
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value='allowExtraEmails' color='primary' />}
                label='I want to receive promotions and updates via email.'
              />
            </Grid>
          </Grid>
          <Button type='submit' fullWidth size='large' variant='contained' sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Link component={RouterLink} to='/login' variant='body2'>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
    // </ThemeProvider>
  );
}
