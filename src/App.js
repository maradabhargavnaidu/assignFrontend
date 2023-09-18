import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { useNavigate } from "react-router-dom";
function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [users, setUsers] = useState([]);
  const Navigate = useNavigate();
  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get(
          "https://backend-dwjf.onrender.com/users"
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }

    fetchUsers();
  }, []);
  const Delete = async (_id) => {
    try {
      console.log(_id);
      const res = await axios.post(
        `https://backend-dwjf.onrender.com/deleteuser`,
        {
          _id,
        }
      );
      console.log(res.data);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://backend-dwjf.onrender.com/users",
        {
          name,
          email,
          profileImage,
        }
      );

      console.log("User created:", response.data);
      setUsers([...users, response.data]); // Update the user list
      setName("");
      setEmail("");
      setProfileImage("");
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };
  const Update = (_id) => {
    Navigate(`/update/${_id}`);
  };
  return (
    <div className="bg-container">
      <h1>Add User</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="inp"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="file"
          className="inp"
          onChange={(e) => setProfileImage(e.target.files[0])}
        />
        <button type="submit">Submit</button>
      </form>

      <h1>User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.name} - {user.email}
            <img src={user.profileImage} alt="profile" />
            <button onClick={() => Delete(user._id)}>Delete</button>
            <button onClick={() => Update(user._id)}>Update</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
