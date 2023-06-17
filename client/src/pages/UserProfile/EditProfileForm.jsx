import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../redux/Slices/usersSlice";
import "./UserProfile.css";

const EditProfileForm = ({ currentUser, setSwitchOption }) => {
  const [name, setName] = useState(currentUser?.name);
  const [about, setAbout] = useState(currentUser?.about);
  const [tags, setTags] = useState([]);
  const id = currentUser?.id;

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tags[0] === "" || tags.length === 0) {
      alert("Update tags field");
    } else {
      dispatch(updateProfile({ id, name, about, tags }));
    }
    setSwitchOption(false);
  };
  return (
    <div>
      <h1 className="edit-profile-title">Edit Your Profile</h1>
      <h2 className="edit-profile-title-2">Public Information</h2>

      <form className="edit-profile-form" onSubmit={handleSubmit}>
        <label htmlFor="name">
          <h3>Display name</h3>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label htmlFor="about">
          <h3>About me</h3>
          <textarea
            id="about"
            cols="30"
            rows="10"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          ></textarea>
        </label>
        <label htmlFor="tags">
          <h3>Watched tags</h3>
          <p>Add tags separated by 1 space</p>
          <input
            type="text"
            id="tags"
            onChange={(e) => setTags(e.target.value.split(" "))}
          />
        </label>
        <br />
        <input
          type="submit"
          value="Save Profile"
          className="user-submit-button"
        />
        <button
          type="button"
          className="user-cancel-btn"
          onClick={() => setSwitchOption(false)}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditProfileForm;
