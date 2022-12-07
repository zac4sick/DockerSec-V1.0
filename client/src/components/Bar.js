import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink } from "react-router-dom";
import { Context } from "../util/Provider";

export default function Bar(props) {
  const { currentUser } = useContext(Context);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <b>Docker Security Framework v1.0</b>
          </Typography>

          <NavLink
            to="/"
            style={{
              textDecoration: "none",
              color: "white",
              marginRight: "12px",
            }}
          >
            <Button color="inherit">Scans</Button>
          </NavLink>

          {currentUser ? (
            <Button
              onClick={() => {
                localStorage.removeItem("jwt-token");
                window.location.reload();
              }}
              color="inherit"
            >
              Logout
            </Button>
          ) : (
            <NavLink
              to="/login"
              style={{ textDecoration: "none", color: "white" }}
            >
              <Button color="inherit">Login</Button>
            </NavLink>
          )}

          <NavLink
            to="/register"
            style={{
              textDecoration: "none",
              color: "white",
              marginLeft: "12px",
            }}
          >
            <Button color="inherit">Register</Button>
          </NavLink>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
