import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import { Avatar, Box, Slide } from "@mui/material";
import React, { forwardRef, useState } from "react";
import { useContext } from "react";
import { ColorModeContext } from "./Theme";
import { useTheme } from "@mui/material";
import { MdOutlineLightMode, MdNightlight } from "react-icons/md";

import Sign from "./Sign";
import { deepPurple } from "@mui/material/colors";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function Header() {
  const colorMode = useContext(ColorModeContext);
  const theme = useTheme();

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
const userEmail=localStorage.getItem('email');

  const handleClickOpen = () => {
    if(!userEmail){
      setOpen(true);
    }
  };

  return (
    <div>
      <AppBar position="fixed" sx={{ top: "0" }} color="primary">
        <Toolbar>
          <Link to="Weather" style={{ fontSize: "23px", marginRight: "16px" }}>
            WeatherApp
          </Link>
          <p style={{ width: "65%" }}></p>
          <Link to="/" style={{ fontSize: "23px", marginRight: "16px" }}>
            To-Do-List
          </Link>

          {theme.palette.mode === "light" ? (
            <IconButton
              onClick={() => {
                localStorage.setItem(
                  "mode",
                  theme.palette.mode === "dark" ? "light" : "dark"
                );
                colorMode.toggleColorMode();
              }}
              color="inherit"
            >
              <MdOutlineLightMode />
            </IconButton>
          ) : (
            <IconButton
              onClick={() => {
                localStorage.setItem(
                  "mode",
                  theme.palette.mode === "dark" ? "light" : "dark"
                );
                colorMode.toggleColorMode();
              }}
              color="inherit"
            >
              <MdNightlight />
            </IconButton>
          )}
          <IconButton onClick={handleClickOpen}>
            {userEmail?<Avatar sx={{ bgcolor: deepPurple[500] }}>{userEmail.slice(0,2)}</Avatar>:<Avatar alt="Cindy Baker" src="" />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <React.Fragment>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogActions>
            <Box>
              <Sign handleClose={handleClose}/>
            </Box>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </div>
  );
}
