import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import axios from "axios";
import "./create.css";
import { notification } from "antd";
import { CREATE_PIN } from "../query/query";

function Create() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState({});
  const [createPin] = useMutation(CREATE_PIN);
  const cloudinaryUrl =
    "https://api.cloudinary.com/v1_1/dsfb4u7kc/image/upload";

  const handleUploadImage = async () => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "uphnzoy4");
    const { data } = await axios
      .post(cloudinaryUrl, formData)
      .then((response) => {
        return response;
      });
    return data.url;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const user = localStorage.getItem("email");
    const imageUrl = await handleUploadImage();
    try {
      createPin({
        variables: {
          input: {
            title,
            description,
            img: imageUrl,
            user,
          },
        },
      });
      openNotificationWithIcon(
        "success",
        "You successfully created your pin",
        "Success"
      );
    } catch (error) {
      openNotificationWithIcon("error", `${error.message}`, "Error");
    }

    setTitle("");
    setDescription("");
    setImage("");
  };
  const openNotificationWithIcon = (type, message, title) => {
    notification[type]({
      message: title,
      description: message,
    });
  };
  return (
    <div className="create-container">
      <form onSubmit={(e) => onSubmit(e)} className="create-wrapper">
        <div className="create-header">
          <h1>Create your Pins</h1>
        </div>
        <div className="create-title">
          <label>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Enter your title"
            required
          />
        </div>
        <div className="create-description">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            placeholder="Describe your pin"
            rows="4"
            cols="12"
            required
          />
        </div>
        <div className="create-upload-image">
          <input
            onChange={(e) => setImage(...e.target.files)}
            type="file"
            id="upload_image"
            required
          />
          <label htmlFor="upload_image" className="create-upload-btn">
            Upload Image
          </label>
        </div>
        <button className="create-pin-submit" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Create;
