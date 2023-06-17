import "./App.css";
import Navbar from "./components/Navbar";
import AllRoutes from "./AllRoutes";
import { useEffect } from "react";
import axios from "axios";
import { fetchQuestions } from "./redux/Slices/questionSlice";
import { useDispatch } from "react-redux";
import { getAllUsers } from "./redux/Slices/usersSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Refreshing");
    dispatch(fetchQuestions());
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <AllRoutes />
    </div>
  );
}

export default App;
