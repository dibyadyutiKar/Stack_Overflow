import React from "react";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";
import QuestionsDetails from "../components/QuestionDetails";
import "../components/Questions.css";

const DisplayQuestion = () => {
  return (
    <div className="home-container-1">
      <LeftSidebar />
      <div className="home-container-2">
        <QuestionsDetails />
        <RightSidebar />
      </div>
    </div>
  );
};

export default DisplayQuestion;
