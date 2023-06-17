const express = require("express");
const mongoose = require("mongoose");
const Question = require("../models/Questions");

exports.postAns = async (req, res) => {
  const { id: _id } = req.params;
  const { noOfAnswers, answerBody, userAnswered, userId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Question unavailable");
  }
  updateNoOfQuestions(_id, noOfAnswers);
  try {
    const updatedQuestion = await Question.findByIdAndUpdate(_id, {
      $addToSet: { answer: [{ answerBody, userAnswered, userId }] },
    });

    res.status(200).json(updatedQuestion);
  } catch (err) {
    res.status(404).json("Error while updating");
  }
};

const updateNoOfQuestions = async (_id, noOfAnswers) => {
  try {
    await Question.findByIdAndUpdate(_id, {
      $set: { noOfAnswers: noOfAnswers },
    });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteAns = async (req, res) => {
  const { id: _id } = req.params;
  const { answerId, noOfAnswers } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).json({
      message: "Question Unavailable",
    });
  }
  if (!mongoose.Types.ObjectId.isValid(answerId)) {
    return res.status(404).json({
      message: "Answer unavailable",
    });
  }

  updateNoOfQuestions(_id, noOfAnswers);
  try {
    await Question.updateOne({ _id }, { $pull: { answer: { _id: answerId } } });
    res.status(200).json({
      message: "Successfuly deleted ans",
    });
  } catch (error) {
    res.status(405).json(error);
  }
};
