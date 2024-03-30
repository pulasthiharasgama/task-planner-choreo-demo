import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import ResponsiveAppBar from "./Components/ResponsiveAppBar";

const temp = [];
function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/todo/temp")
      .then((response) => response.json())
      .then((json) => {
        setData(json["items"]);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <ResponsiveAppBar menuItems={data ? data : temp}></ResponsiveAppBar>
    </div>
  );
}
export default App;
