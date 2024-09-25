import {
  Button,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { CiLock } from "react-icons/ci";

export default function Sign({ handleClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (event) => {
    if (email) {
      event.preventDefault();
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
    }
    setEmail('')
    setPassword('')
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper elevation={3} sx={{ padding: "20px" }}>
          <IconButton onClick={handleClose} sx={{ float: "right" }}>
            <MdClose />
          </IconButton>
          <CiLock
            style={{
              fontSize: "30px",
              margin: "auto",
              backgroundColor: "blue",
              borderRadius: "50%",
              width: "1.5em",
              height: "1.5em",
              marginBottom: "8px",
            }}
          />
          <Typography variant="h4" textAlign={"center"} mb={2}>
            Sign In
          </Typography>
          <Typography
            variant="p"
            textAlign={"center"}
            m={"20%"}
            sx={{ marginBottom: "8px" }}
          >
            Welcome user, please sign in to continue
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Email"
                variant="outlined"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                sx={{ float: "right" }}
                color="primary"
                onClick={handleSubmit}
              >
                Sign In
              </Button>
              {/* <Button onClick={handleClose}>Cncele</Button> */}
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}
