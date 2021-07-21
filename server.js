const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const usersRouter = require("./routes/users");

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

// Routes //
app.use("/api/users", usersRouter);

app.listen(8800, () => {
  console.log("Backend server in running!!");
});
