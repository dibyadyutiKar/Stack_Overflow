import React, { useState } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { fetchQuestions } from "../redux/Slices/questionSlice";
import Avatar from "./Avatar";
import DisplayAnswer from "./DisplayAnswer";
import "./Questions.css";
import upvote from "../assets/sort-up.svg";
import downvote from "../assets/sort-down.svg";
import jwt_decode from "jwt-decode";
import {
  postAnswer,
  deleteQuestion,
  voteQuestion,
} from "../redux/Slices/questionSlice";

const QuestionsDetails = () => {
  const { id } = useParams();
  const questionsList = useSelector((state) => state.question.questions) || [];
  console.log(questionsList);
  const token = localStorage.getItem("Profile") || null;
  if (token) {
    const decodedToken = jwt_decode(token);
  }

  const user = useSelector((state) => state.auth.user.name);
  const userId = useSelector((state) => state.auth.user.id);
  const [answer, setAnswer] = useState("");
  console.log(userId);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteQuestion(id))
      .unwrap()
      .then(() => navigate("/"));
  };

  const handlePostAns = (e, answerLength) => {
    console.log(answerLength);
    e.preventDefault();
    if (user === null) {
      alert("Login to answer a question");
      navigate("/auth");
    } else {
      const data = {
        id,
        noOfAnswers: answerLength + 1,
        answerBody: answer,
        userAnswered: user,
        userId,
      };
      console.log(data);
      dispatch(postAnswer(data));
      setAnswer("");
    }
  };

  const handleDownvote = () => {
    if (user === null) {
      alert("Login or signup to downvote");
      navigate("/auth");
    } else {
      dispatch(voteQuestion({ id, value: "downvote", userId }));
    }
  };

  const handleUpvote = () => {
    if (user === null) {
      alert("Login or Signup to upvote");
      navigate("/auth");
    } else {
      dispatch(voteQuestion({ id, value: "upvote", userId }));
    }
  };

  return (
    <div className="question-details-page">
      {questionsList === null ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {questionsList
            .filter((question) => question._id === id)
            .map((question) => (
              <div key={question._id}>
                <section className="question-details-container">
                  <h1>{question.questionTitle}</h1>
                  <div className="question-details-container-2">
                    <div className="question-votes">
                      <img
                        src={upvote}
                        alt=""
                        width="18"
                        className="votes-icon"
                        onClick={handleUpvote}
                      />
                      <p>{question.upVote.length - question.downVote.length}</p>
                      <img
                        src={downvote}
                        alt=""
                        width="18"
                        className="votes-icon"
                        onClick={handleDownvote}
                      />
                    </div>
                    <div style={{ width: "100%" }}>
                      <p className="question-body">{question.questionBody}</p>
                      <div className="question-details-tags">
                        {question.questionTags.map((tag) => (
                          <p key={tag}>{tag}</p>
                        ))}
                      </div>
                      <div className="question-actions-user">
                        <div>
                          <button type="button">Share</button>
                          {userId === question?.userId && (
                            <button type="button" onClick={handleDelete}>
                              Delete
                            </button>
                          )}
                        </div>
                        <div>
                          <p>asked {moment(question.askedOn).fromNow()}</p>
                          <Link
                            to={`/Users/${question.userId}`}
                            className="user-link"
                            style={{ color: "#0086d8" }}
                          >
                            <Avatar
                              backgroundColor="orange"
                              px="8px"
                              py="5px"
                              borderRadius="4px"
                            >
                              {question.userPosted.charAt(0).toUpperCase()}
                            </Avatar>
                            <div>{question.userPosted}</div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                {question.noOfAnswers !== 0 && (
                  <section>
                    <h3>{question.noOfAnswers} Answers</h3>
                    <DisplayAnswer
                      key={question._id}
                      question={question}
                      userId={userId}
                    />
                  </section>
                )}
                <section className="post-ans-container">
                  <h3>Your Answer</h3>
                  <form
                    onSubmit={(e) => {
                      handlePostAns(e, question.answer.length);
                    }}
                  >
                    <textarea
                      name=""
                      id=""
                      cols="30"
                      rows="10"
                      value={answer}
                      onChange={(e) => {
                        setAnswer(e.target.value);
                      }}
                    ></textarea>
                    <br />
                    <input
                      type="submit"
                      className="post-ans-btn"
                      value="Post Your Answer"
                    />
                  </form>
                  <p>
                    Browse other Question tagged
                    {question.questionTags.map((tag) => (
                      <Link to="/Tags" key={tag} className="ans-tags">
                        {" "}
                        {tag}{" "}
                      </Link>
                    ))}{" "}
                    or
                    <Link
                      to="/AskQuestion"
                      style={{ textDecoration: "none", color: "#009dff" }}
                    >
                      {" "}
                      ask your own question.
                    </Link>
                  </p>
                </section>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default QuestionsDetails;
