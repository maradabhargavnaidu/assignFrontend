import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const Update = () => {
  const _id = useParams();
  const Navigate = useNavigate();
  const [users, setUsers] = useState({});
  useEffect(() => {
    async function fetchUsers() {
      try {
        console.log(_id.id);
        const response = await axios.get(
          `https://backend-dwjf.onrender.com/selectedone/` + _id.id
        );
        setUsers(response.data);
        // console.log(response);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }

    fetchUsers();
  }, []);
  const updateSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios
        .post(`https://backend-dwjf.onrender.com/updateusers/`, {
          _id,
          name: users.name,
          email: users.email,
          profileImage: users.profileImage,
        })
        .then(Navigate("/"));
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="bg-container">
      <h1>Update User</h1>
      <form onSubmit={updateSubmit}>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setUsers({ ...users, name: e.target.value })}
          value={users.name}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="inp"
          onChange={(e) => setUsers({ ...users, email: e.target.value })}
          value={users.email}
          required
        />
        <input
          type="file"
          className="inp"
          onChange={(e) =>
            setUsers({ ...users, profileImage: e.target.files[0] })
          }
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Update;
