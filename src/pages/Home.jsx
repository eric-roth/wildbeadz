import { Typography, Button } from "@mui/material";
import React from "react";
import { useUserAuth } from "../context/AuthContext";

function Home() {
  let { user, logOut } = useUserAuth();
  const handleLogout = async () => {
    try {
      await logOut();
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div>
      <Typography variant='h1'>Home</Typography>
      <Typography>{user && `Hello, ${user.email}`}</Typography>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
}

export default Home;
