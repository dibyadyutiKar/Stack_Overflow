import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api";

import axios from "axios";

export const fetchQuestions = createAsyncThunk("fetchquestions", async () => {
  const response = await axios.get("http://localhost:5000/question/get");
  // const { data } = await api.getAllQuestions();
  return response.data;
});

export const postAnswer = createAsyncThunk(
  "/type/patchtData",
  async (qdata, { dispatch }) => {
    try {
      await axios.patch(`http://localhost:5000/answer/post/${qdata.id}`, qdata);
      // await api.postAnswer(qdata);
      await dispatch(fetchQuestions());
    } catch (error) {
      console.log("error in updating");
    }
  }
);

export const deleteQuestion = createAsyncThunk(
  "type/deleteData",
  async (id, { dispatch }) => {
    try {
      await axios.delete(`http://localhost:5000/question/delete/${id}`);
      // await api.deleteQuestion(id);
      await dispatch(fetchQuestions(id));
      console.log("Routing to home");
    } catch (error) {
      console.error({ message: "error cofe" });
    }
  }
);

export const deleteAns = createAsyncThunk(
  "type/deleteAns",
  async ({ id, answerId, noOfAnswers }, { dispatch }) => {
    // console.log(id, answerId, noOfAnswers);
    try {
      await axios.patch(`http://localhost:5000/answer/delete/${id}`, {
        answerId,
        noOfAnswers,
      });
      // await api.deleteAnswer({ id, answerId, noOfAnswers });
      await dispatch(fetchQuestions(id));
    } catch (error) {
      console.error({ message: "error" });
    }
  }
);

export const voteQuestion = createAsyncThunk(
  "type/voteques",
  async ({ id, value, userId }, { dispatch }) => {
    console.log({ id, value, userId });
    try {
      await axios.patch(`http://localhost:5000/question/vote/${id}`, {
        value,
        userId,
      });
      // await api.voteQuestion(id, value, userId);
      await dispatch(fetchQuestions(id));
    } catch (error) {
      console.error({ message: "error" });
    }
  }
);

export const askQuestion = createAsyncThunk(
  "type/askques",
  async (
    { questionTitle, questionBody, questionTags, userPosted, userId },
    { dispatch }
  ) => {
    try {
      await axios.post("http://localhost:5000/question/Ask", {
        questionTitle,
        questionBody,
        questionTags,
        userPosted,
        userId,
      });
      // await api.postQuestion({
      //   questionTitle,
      //   questionBody,
      //   questionTags,
      //   userPosted,
      //   userId,
      // });
      await dispatch(fetchQuestions());
    } catch (error) {
      console.log("error in aking");
    }
  }
);

const questionSlice = createSlice({
  name: "question",
  initialState: {
    questions: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchQuestions.fulfilled, (state, { payload }) => {
      console.log("question data is fetched");
      state.questions = payload;
    });
  },
});
export default questionSlice.reducer;
