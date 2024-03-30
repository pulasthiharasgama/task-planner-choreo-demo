import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import ResponsiveAppBar from "./Components/ResponsiveAppBar";
import Button from "@mui/material/Button";
import Cookies from "js-cookie";

const temp = [];
function App() {
  const [data, setData] = useState(null);
  const [isLoggedIn, setLoggedIn] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (Cookies.get("userinfo")) {
      let encodedUserInfo = Cookies.get("userinfo");
      sessionStorage.setItem("userinfo", encodedUserInfo);
      Cookies.remove("userinfo");

      let userInfo = JSON.parse(atob(encodedUserInfo));
      setLoggedIn(true);

      console.log(encodedUserInfo);
      console.log(userInfo);

      fetch("/auth/userinfo")
        .then((response) => response.json())
        .then((json) => {
          setUserInfo(json);
          console.log(json)
        })
        .catch((error) => console.error(error));
    }
  });

  useEffect(() => {
    fetch("http://localhost:5000/todo/temp")
      .then((response) => response.json())
      .then((json) => {
        setData(json["items"]);
        console.log("here")
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <ResponsiveAppBar menuItems={data ? data : temp}></ResponsiveAppBar>
      <Button
        variant="contained"
        onClick={() => {
          window.location.href = "/auth/login";
        }}
      >
        Login
      </Button>
    </div>
  );
}
export default App;
