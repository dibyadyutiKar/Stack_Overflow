import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

API.interceptors.request.use((req) => {
  const tokens = localStorage.getItem("token");
  if (tokens) {
    req.headers.authorization = `Bearer ${JSON.parse(tokens.token)}`;
  }
  return req;
});

export const logIn = (authData) => API.post("/user/login", authData);
export const signUp = (authData) => API.post("/user/signup", authData);

export const postQuestion = (questionData) =>
  API.post("/question/Ask", questionData);
export const getAllQuestions = () => API.get("/question/get");
export const deleteQuestion = (id) => API.delete(`/question/delete/${id}`);
export const voteQuestion = (id, value, userId) =>
  API.patch(`/question/vote/${id}`, { value, userId });

export const postAnswer = ({
  id,
  noOfAnswers,
  answerBody,
  userAnswered,
  userId,
}) =>
  API.patch(`/answer/post/${id}`, {
    id,
    noOfAnswers,
    answerBody,
    userAnswered,
    userId,
  });
export const deleteAnswer = ({ id, answerId, noOfAnswers }) =>
  API.patch(`/answer/delete/${id}`, { answerId, noOfAnswers });

export const getAllUsers = () => API.get("/user/getAllUsers");

export const updateProfile = (id, name, about, tags) =>
  API.patch(`/user/update/${id}`, { name, about, tags });
