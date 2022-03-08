import React, { useState } from "react";
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
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Alert } from "@mui/material";

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

const theme = createTheme();

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState();
  const { signUp } = useUserAuth();
  const navigate = useNavigate();
  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    switch (true) {
      case password === confirmPassword && password.length > 7:
        try {
          await signUp(email, password);
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

  //   if (password === confirmPassword && password.length() > 8) {
  //     try {
  //       await signUp(email, password);
  //       navigate("/");
  //     } catch (err) {
  //       setError(err.code.slice(5).replace(/-/g, " "));
  //       console.log(error);
  //     }
  //     else if(password === confirmPassword )
  //   } else {
  //     setError("Passwords do not match");
  //   }
  // };

  return (
    <ThemeProvider theme={theme}>
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
          <Typography variant='h4'>Sign up</Typography>
          {error && <Alert severity='error'>{error}</Alert>}
          <Box component='form' sx={{ mt: 3 }} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={firstName}
                  name='firstName'
                  id='firstName'
                  label='First Name'
                  onChange={e => setFirstName(e.target.value)}
                  required
                  fullWidth
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={lastName}
                  name='lastName'
                  id='lastName'
                  label='Last Name'
                  onChange={e => setLastName(e.target.value)}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={email}
                  name='email'
                  id='email'
                  label='Email Address'
                  type='email'
                  onChange={e => setEmail(e.target.value)}
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
            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
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
    </ThemeProvider>
  );
}
