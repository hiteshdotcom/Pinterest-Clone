import React from "react";
import "./home.css";
import { useMutation, useQuery } from "@apollo/client";
import { styles } from "../styles/styles";
import Pin from "../pin/Pin";

import { SAVED_PIN, QUERY_ALL_PINS } from "../query/query";

function PinterestLayout() {
  const { data, loading } = useQuery(QUERY_ALL_PINS);
  const [savePin] = useMutation(SAVED_PIN);
  const mainUser = localStorage.getItem("email");

  if (loading) {
    return <h1>Data is Loading!!!</h1>;
  }
  const size = ["small", "medium", "large"];
  const type = "pins";
  return (
    <div style={styles.pinterestLayout}>
      {data.pins.map((pin) => {
        const randomNumber = Math.floor(Math.random() * size.length);
        return (
          <Pin
            key={pin.id}
            size={size[randomNumber]}
            pin={pin}
            type={type}
            savePin={savePin}
            mainUser={mainUser}
          />
        );
      })}

      <div></div>
    </div>
  );
}

export default PinterestLayout;
