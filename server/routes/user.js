const express = require("express");

const router = express.Router();
const User = require("../models/user");

const { login, signUp } = require("../controllers/auth");
const { getAllUsers, updateProfile } = require("../controllers/users");

router.post("/login", login);
router.post("/signup", signUp);

router.get("/getAllUsers", getAllUsers);

router.patch("/update/:id", updateProfile);

module.exports = router;
