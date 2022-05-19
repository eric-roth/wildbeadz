import { Typography } from "@mui/material";
import UserDataService from "../services/user.services";
import { useUserAuth } from "../context/AuthContext";

import React from "react";

function Account() {
  let { user } = useUserAuth();
  return (
    <div>
      <Typography variant='h1'>Account</Typography>
      <Typography>{user && `Hello, ${user.email}`}</Typography>
    </div>
  );
}

export default Account;
