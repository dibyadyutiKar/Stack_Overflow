const jwt = require("jsonwebtoken");
require("dotenv");

exports.auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log("token accessed");
    console.log(token);

    let decodeData = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decodeData?.id;

    next();
  } catch (error) {
    console.log(error);
  }
};
