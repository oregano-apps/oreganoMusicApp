const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors")

const usersRouter = require("./routes/users");
const songsRouter = require('./routes/songs')

const app = express();

dotenv.config();

mongoose.connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  () => console.log("connecting to mongo")
);

// Middlewares //
app.use(express.json());
app.use(cors())

// Routes //
app.use("/api/users", usersRouter);
app.use("/api/songs", songsRouter);

app.listen(8800, () => {
  console.log("Backend server in running!!");
});
