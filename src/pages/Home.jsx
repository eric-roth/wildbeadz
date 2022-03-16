import { Typography, Button } from "@mui/material";
import UserDataService from "../services/user.services";
import React from "react";
import { useUserAuth } from "../context/AuthContext";

function Home() {
  let { user } = useUserAuth();

  return (
    <div>
      <Typography variant='h1'>Home</Typography>
      <Typography>{user && `Hello, ${user.email}`}</Typography>
    </div>
  );
}

export default Home;
