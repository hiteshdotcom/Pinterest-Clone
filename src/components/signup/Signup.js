import React, { useState } from 'react';

import { notification } from 'antd';
import { useNavigate } from 'react-router-dom';

import { useMutation } from '@apollo/client';

import { SIGN_UP } from '../query/query';

const url = "http://localhost:3002/api/register";

function Signup({setAuthorised}) {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [addUser, {loading, error}] = useMutation(SIGN_UP, {
    update(proxy,result){
      console.log({result})
    },
    variables: {
      email,
      password,
      name
    }
  })
  const openNotificationWithIcon = (type, message, title) => {
    notification[type]({
      message: title,
      description: message,
    });
  };
  const createUser = async (type) => {
    const {data} = await addUser()
    if(!error){
      openNotificationWithIcon(
                "success",
                "you have succesfully created user",
                "Success"
      );
      setAuthorised(true);
      console.log({data});
      localStorage.setItem("token",data.signUp.token);
      navigate("/");
    }else{
        openNotificationWithIcon(
          error.message,
          "Something unusaul is happening call the developer",
          "Error"
        );
    }
  };

  if(loading){
    return <h1>Loading...</h1>
  }


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
