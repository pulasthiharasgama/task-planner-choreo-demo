import "./App.css";
import React, { useState, useEffect } from "react";
import ResponsiveAppBar from "./Components/ResponsiveAppBar";
import Container from "@mui/material/Container";
import Cookies from "js-cookie";
import ReminderCard from "./Components/ReminderCard";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [reminders, setReminders] = useState(null);

  const apiUrl = window?.configs?.apiUrl ? window.configs.apiUrl : "/";

  useEffect(() => {
    if (Cookies.get("userinfo")) {
      let encodedUserInfo = Cookies.get("userinfo");
      sessionStorage.setItem("userinfo", encodedUserInfo);
      Cookies.remove("userinfo");

      let userInfo = JSON.parse(atob(encodedUserInfo));
      setLoggedIn(true);

      fetch("/auth/userinfo")
        .then((response) => response.json())
        .then((json) => {
          setUserInfo(JSON.stringify(json));
          sessionStorage.setItem("user", json);
        })
        .catch((error) => console.error(error));
    }
  });

  const logoutHandler = async () => {
    window.location.href = `/auth/logout?session_hint=${Cookies.get(
      "session_hint"
    )}`;
    sessionStorage.removeItem("userinfo");
    sessionStorage.removeItem("user");
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetch(`${apiUrl}/tasks`)
        .then((response) => response.json())
        .then((json) => {
          setReminders(json["data"]);
        })
        .catch((error) => console.error(error));
    }
  }, [isLoggedIn]);

  return (
    <div>
      <ResponsiveAppBar
        isLoggedIn={isLoggedIn ? true : false}
        logoutHandler={logoutHandler}
      ></ResponsiveAppBar>
      <Container maxWidth="sm" sx={{ paddingTop: "50px" }}>
        {isLoggedIn &&
          reminders &&
          reminders.map((rem) => (
            <ReminderCard
              dueDate={rem.dueDate}
              reminderText={rem.reminderText}
              reminderDescription={rem.reminderDescription}
            ></ReminderCard>
          ))}
      </Container>
    </div>
  );
}
export default App;
