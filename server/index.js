const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors());

mongoose
  .connect("mongodb://localhost:27017/travelJournal", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

const users = require("./routes/users");
const entries = require("./routes/entries");

app.use("/api/users", users);
app.use("/api/entries", entries);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server Running on port ${port}`);
});
