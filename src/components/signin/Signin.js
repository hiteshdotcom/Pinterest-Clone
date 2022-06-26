import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
const url = "http://localhost:3002/api/login";

function Signin({ setAuthorised }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: JSON.stringify({ email, password }),
    url,
  };
  const loginUser = async () => {
    const { data } = await axios(options);
    if (data.status === 200) {
      openNotificationWithIcon(
        "success",
        "You have succesfully loged in",
        "Successfully"
      );
      setAuthorised(true);
      localStorage.setItem("token", data.data);
      localStorage.setItem("email", email);

      navigate("/");
    } else {
      openNotificationWithIcon("error", `${data.error}`, "Error");
    }
  };
  const openNotificationWithIcon = (type, message, title) => {
    notification[type]({
      message: title,
      description: message,
    });
  };

  return (
    <div className="sign-container">
      <div className="sign-wrapper">
        <h1>Sign In</h1>
        <div className="email-container">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="password-container">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="sign-btn-container">
          <button className="sign-btn" onClick={loginUser}>
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signin;
