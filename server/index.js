const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
require("./config/database.js").connect();

const userRoutes = require("./routes/user");

app.use("/user", userRoutes);

const Question = require("./routes/question.js");
app.use("/question", Question);

const answerRoutes = require("./routes/answer.js");
app.use("/answer", answerRoutes);

// const deleteRoutes = require("./routes/question.js");
// app.use("/question", deleteRoutes);

app.listen(PORT, () => {
  console.log(`App is listening on Port ${PORT}`);
});
