import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import User from "./User";
import usersSlice, { getAllUsers } from "../../redux/Slices/usersSlice";
import "./Users.css";

const UsersList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const users = useSelector((state) => state.users.Users);
  console.log(users);
  return (
    <div className="user-list-container">
      {users.map((user) => (
        <User user={user} key={user?._id} />
      ))}
    </div>
  );
};

export default UsersList;
