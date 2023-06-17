const express = require("express");
const mongoose = require("mongoose");
const Question = require("../models/Questions");
require("dotenv").config();

exports.AskQuestion = async (req, res) => {
  try {
    const postQuestionData = req.body;
    const postQuestion = new Question(postQuestionData);
    await postQuestion.save();

    res.status(200).json({
      message: "Posted a question successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(209).json({
      message: "Couldn't post a new question",
    });
  }
};

exports.getAllQuestions = async (req, res) => {
  try {
    const questionData = await Question.find();
    console.log(questionData);
    res.status(200).json(questionData);
  } catch (err) {
    console.log(err);
  }
};

exports.deleteQuestion = async (req, res) => {
  try {
    const _id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).json("question unavailable");
    }

    await Question.findByIdAndRemove(_id);
    return res.status(200).json({ message: "Successfully deleted" });
  } catch (error) {
    console.log(error);
  }
};

exports.voteQuestion = async (req, res) => {
  try {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).json("question unavailable");
    }
    const { value, userId } = req.body;

    const question = await Question.findById(_id);
    const upIndex = question.upVote.findIndex((id) => id === String(userId));
    const downIndex = question.downVote.findIndex(
      (id) => id === String(userId)
    );

    if (value === "upvote") {
      if (downIndex !== -1) {
        question.downVote = question.downVote.filter(
          (id) => id !== String(userId)
        );
      }
      if (upIndex === -1) {
        question.upVote.push(userId);
      } else {
        question.upVote = question.upVote.filter(id !== String(userId));
      }
    } else if (value === "downvote") {
      if (upIndex !== -1) {
        question.upVote = question.upVote.filter((id) => id !== String(userId));
      }
      if (downIndex === -1) {
        question.downVote.push(userId);
      } else {
        question.downVote = question.downVote.filter(id !== String(userId));
      }
    }

    await Question.findByIdAndUpdate(_id, question);
    res.status(200).json({
      message: "Voted successfully",
    });
  } catch (error) {
    console.error(error);
  }
};
