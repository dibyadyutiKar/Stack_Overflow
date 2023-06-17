const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");

const { postAns, deleteAns } = require("../controllers/answer");

router.patch("/post/:id", auth, postAns);
router.patch("/delete/:id", auth, deleteAns);
module.exports = router;
