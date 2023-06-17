const express = require("express");
const { auth } = require("../middlewares/auth");

const router = express.Router();
const {
  AskQuestion,
  getAllQuestions,
  deleteQuestion,
  voteQuestion,
} = require("../controllers/AskQuestion.js");

router.post("/Ask", auth, AskQuestion);
router.get("/get", getAllQuestions);
router.delete("/delete/:id", auth, deleteQuestion);
router.patch("/vote/:id", auth, voteQuestion);

module.exports = router;
