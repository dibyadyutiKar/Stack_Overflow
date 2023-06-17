import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import AskQuestion from "./pages/AskQuestion";
import DisplayQuestion from "./pages/DisplayQuestion";
import Tags from "./pages/Tags/Tags";
import Users from "./pages/Users/Users";
import UserProfile from "./pages/UserProfile/UserProfile";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/AskQuestion" element={<AskQuestion />} />
      <Route path="/Questions/:id" element={<DisplayQuestion />} />
      <Route path="/Tags" element={<Tags />} />
      <Route path="/Users" element={<Users />} />
      <Route path="/Users/:id" element={<UserProfile />} />
    </Routes>
  );
};

export default AllRoutes;
