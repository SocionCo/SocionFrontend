import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../../services/api.js";
import { getUserType } from "../../../services/influencerServices.js";
import { resetPassword } from "../../../services/userServices.js";


export default function Login() {
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const reason = queryParams.get('reason');
  const campaignId = queryParams.get('redirect');


  console.log("Enetered login userToken", localStorage.getItem('user-token'));

  const navigateRegister = (event) => {
    event.preventDefault();
    setTimeout(() => {
      navigate('/register');
    }, 500)
  }

  const handleLogin = async (event) => {
    try {
      event.preventDefault();
      const data = new FormData(event.currentTarget);

      const userDTO = {
        email: data.get('email'),
        password: data.get('password'),
      };

      console.log(userDTO.email)
      console.log(userDTO.password)
      const response = await api.post('/api/login', userDTO);
      localStorage.clear();
      localStorage.setItem('user-token', response.data);
      const userType = await getUserType();
      localStorage.setItem("user-type", userType);

      setTimeout(() => {
        if (campaignId) {
          navigate(`/campaign/${campaignId}`);

        } else {
          navigate('/home');
        }
      }, 500);
    } catch (error) {
      setError(true)
    }
  }

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          px: 4,
          py: 6,
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          {error && (<Typography component="p" variant="caption2">Incorrect Username or Password</Typography>)}
          {reason == "expired" && (
            <Typography>Session Expired. Please sign in again.</Typography>
          )}
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link sx={{ cursor: 'pointer' }} onClick={() => {
                navigate("/resetPassword")
              }}

                variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid>
              <Link href="#" variant="body2" onClick={(e) => navigateRegister(e)}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}