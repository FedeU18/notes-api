require("dotenv").config();
require("./mongo");
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

const Note = require("./models/Note");

app.use(cors());
app.use(express.json());

// let notes = [
//   {
//     id: 1,
//     content: "estudiar node js y express",
//     date: "2024-03-14T17:30:31.098Z",
//     important: true,
//   },
//   {
//     id: 3,
//     content: "estudiar nest js y MongoDb",
//     date: "2024-03-14T17:30:31.098Z",
//     important: true,
//   },
//   {
//     id: 2,
//     content: "estudiar websockets",
//     date: "2024-03-14T17:30:31.098Z",
//     important: true,
//   },
// ];

app.get("/", (req, res) => {
  res.send("<h1>Hello World </h1>");
});

app.get("/api/notes", (req, res) => {
  Note.find({}).then((notes) => {
    res.json(notes);
  });
});

app.get("/api/notes/:id", (req, res, next) => {
  const { id } = req.params;

  Note.findById(id)
    .then((note) => {
      if (note) {
        res.json(note);
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => {
      next(err);
    });
});

app.delete("/api/notes/:id", (req, res) => {
  const { id } = req.params;
  notes = notes.filter((note) => note.id !== Number(id));

  res.status(204).end();
});

app.post("/api/notes", (req, res) => {
  const note = req.body;
  if (!note || !note.content) {
    return res.status(400).json({
      error: "note.content is missing",
    });
  }

  const newNote = new Note({
    content: note.content,
    date: new Date(),
    important: note.important || false,
  });

  newNote.save().then((savedNote) => {
    res.json(savedNote);
  });
});

app.use((error, req, res, next) => {
  console.log(error);
  if (error.name === "CastError") {
    res.status(400).send({ error: "id used is malformed" });
  } else {
    res.status(500).end;
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
