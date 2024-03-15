const express = require("express");
const app = express();

let notes = [
  {
    id: 1,
    content: "estudiar node js y express",
    date: "2024-03-14T17:30:31.098Z",
    important: true,
  },
  {
    id: 3,
    content: "estudiar nest js y MongoDb",
    date: "2024-03-14T17:30:31.098Z",
    important: true,
  },
  {
    id: 2,
    content: "estudiar websockets",
    date: "2024-03-14T17:30:31.098Z",
    important: true,
  },
];

app.get("/", (req, res) => {
  res.send("<h1>Hello World </h1>");
});

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
