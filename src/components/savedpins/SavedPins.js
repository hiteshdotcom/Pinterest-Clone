import React from "react";
import {  useQuery } from "@apollo/client";
import "./savedpins.css";
import { styles } from "../styles/styles";
import Pin from "../pin/Pin";
import { QUERY_USER_SAVED_PIN } from "../query/query";

function SavedPins() {
  const user = localStorage.getItem("email");
  const size = ["small", "medium", "large"];
  const type = "saved";
  const { data, loading, error, refetch } = useQuery(QUERY_USER_SAVED_PIN, {
    variables: {
      user,
    },
  });
  if (loading) {
    return <h1>Data is Loading...</h1>;
  }
  if (error) {
    return <h1>Something went off</h1>;
  }

  return (
    <div className="saved-container">
      <h1 className="saved-pin-title">Saved Pins</h1>
      <div style={styles.pinterestLayout}>
        {data.userPins.savedPins.map((pin) => {
          const randomNumber = Math.floor(Math.random() * size.length);

          return (
            <>
              <Pin size={size[randomNumber]} pin={pin} type={type} refetch = {refetch} />
            </>
          );
        })}
      </div>
    </div>
  );
}

export default SavedPins;
