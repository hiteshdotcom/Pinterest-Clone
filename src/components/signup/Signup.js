import React, { useState } from "react";
import axios from "axios";
import { notification } from "antd";

const url = "http://localhost:3002/api/register";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const openNotificationWithIcon = (type, message, title) => {
    notification[type]({
      message: title,
      description: message,
    });
  };
  const createUser = async (type) => {
    const result = await axios
      .post(url, {
        name,
        email,
        password,
      })
      .then((res) => {
        if (res.data.status === 200) {
          openNotificationWithIcon(
            "success",
            "you have succesfully created user",
            "Success"
          );
        } else {
          openNotificationWithIcon("error", `${res.data.error}`, "Error");
        }
      })
      .catch((err) => {
        openNotificationWithIcon(
          "error",
          "Something unusaul is happening call the developer",
          "Error"
        );
      });
  };

  return (
    <div className="sign-container">
      <div className="sign-wrapper">
        <h1>Sign Up</h1>
        <div className="name-container">
          <label>Name </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="email-container">
          <label>Email </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="password-container">
          <label>Password </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="sign-btn-container">
          <button className="sign-btn" onClick={createUser}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
