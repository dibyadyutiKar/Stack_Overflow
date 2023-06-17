import React from "react";
import LeftSidebar from "../../components/LeftSidebar";
import TagsList from "./TagsList";
import "./Tags.css";
import { tagList } from "./tagList";

const Tags = () => {
  return (
    <div className="home-container-1">
      <LeftSidebar />
      <div className="home-container-2">
        <h1>Tags</h1>
        <p>
          A tag is a keyword or label that categorizes your question with other
          similar questions.
        </p>
        <p>
          Using the right tags make it easier for others to find and answer your
          question.
        </p>
        <div className="tags-list-container">
          {tagList.map((tag, index) => (
            <TagsList tag={tag} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tags;
