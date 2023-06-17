const Users = require("../models/user");
const mongoose = require("mongoose");

exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await Users.find();
    const allUserDetails = [];
    allUsers.forEach((user) => {
      allUserDetails.push({
        _id: user._id,
        name: user.name,
        about: user.about,
        tags: user.tags,
        joinedOn: user.joinedOn,
      });
    });
    res.status(200).json(allUserDetails);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const { name, about, tags } = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).send("unavailable");
    }

    const updatedProfile = await Users.findByIdAndUpdate(
      _id,
      { $set: { name: name, about: about, tags: tags } },
      { new: true }
    );
    res.status(200).json(updatedProfile);
  } catch (error) {
    res.status(405).json({
      message: error.message,
    });
  }
};
