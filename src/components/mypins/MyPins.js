import React from "react";
import { useQuery } from "@apollo/client";
import Pin from "../pin/Pin";
import { styles } from "../styles/styles";
import "./mypins.css";
import { QUERY_MY_PINS } from "../query/query";

function MyPins() {
  const user = localStorage.getItem("email");
  const size = ["small", "medium", "large"];
  const type = "my";
  const { data, loading, error } = useQuery(QUERY_MY_PINS, {
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
    <div>
      <h1 className="my-pins-title">My Pins</h1>
      <div style={styles.pinterestLayout}>
        {data.userPins.myPins.map((pin) => {
          const randomNumber = Math.floor(Math.random() * size.length);

          return (
            <>
              <Pin size={size[randomNumber]} pin={pin} type={type} />
            </>
          );
        })}
      </div>
    </div>
  );
}

export default MyPins;
