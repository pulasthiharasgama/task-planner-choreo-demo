const express = require("express");
const cors = require("cors");
const NodeCache = require("node-cache");
const fs = require("fs");
const mysql = require("mysql2");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const PORT = process.env.PORT || 5000;

const cache = new NodeCache();
let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_SCHEMA,
});

connection.connect(function (err) {
  if (err) {
    getInitialDataFromFile();
    console.log("Database not available");
  } else {
    console.log("Successfully Connected to DB");
    connection.query(
      "SELECT * FROM defaultdb.tasks;",
      function (err, result, fields) {
        if (err) {
          getInitialDataFromFile();
          console.log("Database not available");
        }
        result.forEach((obj) => renameColumns(obj));
        saveDataInCache(result);
      }
    );
  }
});

const renameColumns = (obj) => {
  obj["id"] = obj["ID"];
  obj["dueDate"] = obj["DueDate"].toISOString().split("T")[0];
  obj["reminderText"] = obj["ReminderText"];
  obj["reminderDescription"] = obj["ReminderDescription"];
  delete obj["ID"];
  delete obj["DueDate"];
  delete obj["ReminderText"];
  delete obj["ReminderDescription"];
};

const getInitialDataFromFile = () => {
  var defaultData = JSON.parse(fs.readFileSync("initialData.json", "utf8"));
  saveDataInCache(defaultData);
};

const saveDataInCache = (data) => {
  data.forEach((obj) => {
    cache.set(obj.id, obj);
  });
};

app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});

app.get("/task-planner/tasks", (request, response) => {
  allTasks = [];
  cache.keys().forEach((key) => {
    allTasks.push(cache.get(key));
  });
  response.send({ status: "success", data: allTasks });
});

app.post("/task-planner/tasks", (request, response) => {
  cache.set(request.body.id, request.body);
  response.send({ status: "success" });
});

app.delete("/task-planner/tasks/:id", (request, response) => {
  let id = request.params.id;
  if (!cache.has(id)) {
    return response
      .status(401)
      .json({ status: "failed", error: "ID not found" });
  } else {
    cache.del(id);
    response.send({ status: "success" });
  }
});
