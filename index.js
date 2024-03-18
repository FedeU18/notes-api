const express = require("express");
const app = express();

app.use(express.json());

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

app.get("/api/notes/:id", (req, res) => {
  const { id } = req.params;
  const note = notes.find((note) => note.id === Number(id));
  if (note) {
    res.json(note);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/notes/:id", (req, res) => {
  const { id } = req.params;
  notes = notes.filter((note) => note.id !== Number(id));

  res.status(204).end();
});

app.post("/api/notes", (req, res) => {
  const note = req.body;
  const ids = notes.map((note) => note.id);
  const maxId = Math.max(...ids);
  const newNote = {
    id: maxId + 1,
    content: note.content,
    important: typeof note.important !== "undefined" ? note.important : false,
    date: new Date().toISOString(),
  };
  notes = [...notes, newNote];
  res.json(newNote);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
