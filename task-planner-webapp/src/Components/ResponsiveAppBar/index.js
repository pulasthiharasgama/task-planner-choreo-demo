import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import GradingIcon from "@mui/icons-material/Grading";

function ResponsiveAppBar(props) {
  const buttonStyle = {
    backgroundColor: "#a96032",
    "&:hover": {
      backgroundColor: "#bf6f3d",
    },
    "&:active": {
      backgroundColor: "#bf6f3d",
    },
    minWidth: "112px",
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#0e4c49" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <GradingIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Task Planner
          </Typography>

          <GradingIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Task Planner
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>

          <Box sx={{ flexGrow: 0 }}>
            {!props.isLoggedIn && (
              <Button
                variant="contained"
                onClick={() => {
                  window.location.href = "/auth/login";
                }}
                sx={buttonStyle}
              >
                Login
              </Button>
            )}
            {props.isLoggedIn && (
              <Button
                variant="contained"
                onClick={props.logoutHandler}
                sx={buttonStyle}
              >
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
