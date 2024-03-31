import "./App.css";
import React, { useState, useEffect } from "react";
import ResponsiveAppBar from "./Components/ResponsiveAppBar";
import Container from "@mui/material/Container";
import Cookies from "js-cookie";
import ReminderCard from "./Components/ReminderCard";

const temp = [];
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

  // const reminders = [
  //   {
  //     id: 1,
  //     dueDate: "2024-04-05",
  //     reminderText: "Meeting with clients",
  //     reminderDescription: "Discuss project updates and timelines",
  //   },
  //   {
  //     id: 2,
  //     dueDate: "2024-04-10",
  //     reminderText: "Pay rent",
  //     reminderDescription: "Rent payment for apartment",
  //   },
  //   {
  //     id: 3,
  //     dueDate: "2024-04-15",
  //     reminderText: "Submit report",
  //     reminderDescription: "Quarterly sales report",
  //   },
  //   {
  //     id: 4,
  //     dueDate: "2024-04-20",
  //     reminderText: "Buy groceries",
  //     reminderDescription: "Weekly grocery shopping",
  //   },
  //   {
  //     id: 5,
  //     dueDate: "2024-04-25",
  //     reminderText: "Doctor's appointment",
  //     reminderDescription: "Checkup with Dr. Smith",
  //   },
  //   {
  //     id: 6,
  //     dueDate: "2024-04-30",
  //     reminderText: "Submit tax returns",
  //     reminderDescription: "Annual tax filing",
  //   },
  // ];

  useEffect(() => {
    if (isLoggedIn) {
      fetch(`${apiUrl}/tasks`)
        .then((response) => response.json())
        .then((json) => {
          setReminders(json["data"]);
          console.log("here");
          console.log(json);
        })
        .catch((error) => console.error(error));
    }
  }, []);

  return (
    <div>
      <ResponsiveAppBar
        isLoggedIn={isLoggedIn ? true : false}
        logoutHandler={logoutHandler}
      ></ResponsiveAppBar>
      <Container maxWidth="sm" sx={{ paddingTop: "50px" }}>
        {isLoggedIn &&
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
