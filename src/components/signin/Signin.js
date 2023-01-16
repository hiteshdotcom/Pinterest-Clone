import React, { useState } from 'react';

import { notification } from 'antd';
import { useNavigate } from 'react-router-dom';

import { useMutation } from '@apollo/client';

import { SIGN_IN } from '../query/query';

function Signin({ setAuthorised }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInUser, {loading, error}] = useMutation(SIGN_IN, {
    update(proxy,result){
      console.log({result})
    },
    variables: {
      email,
      password
    }
  })
  const loginUser = async () => {
    const {data} = await signInUser()
    if(!error){
      openNotificationWithIcon(
        "success",
        "You have succesfully loged in",
        "Successfully"
      );
      setAuthorised(true);
      localStorage.setItem("token",data.token);
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

  if(loading){
    return <h1>Loading...</h1>
  }

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
