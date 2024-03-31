const express = require("express");
const cors = require("cors");
const NodeCache = require("node-cache");
const fs = require("fs");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const PORT = process.env.PORT || 5000;

const cache = new NodeCache();

var defaultData = JSON.parse(fs.readFileSync("initialData.json", "utf8"));

defaultData.forEach((obj) => {
  cache.set(obj.id, obj);
});

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
