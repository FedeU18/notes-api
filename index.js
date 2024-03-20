require("dotenv").config();
require("./mongo");
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

const Note = require("./models/Note");
const notFound = require("./middleware/notFound");
const handleErrors = require("./middleware/handleErrors");

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

app.delete("/api/notes/:id", (req, res, next) => {
  const { id } = req.params;

  Note.findByIdAndDelete(id)
    .then((result) => res.status(204).end())
    .catch((error) => next(error));
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

app.put("/api/notes/:id", (req, res, next) => {
  const { id } = req.params;
  const newInfo = req.body;

  const NoteUpdated = {
    content: newInfo.content,
    important: newInfo.important,
  };
  Note.findByIdAndUpdate(id, NoteUpdated, { new: true }).then((result) => {
    res.json(result).status(200);
  });
});

app.use(notFound);

app.use(handleErrors);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
