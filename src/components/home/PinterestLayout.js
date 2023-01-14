import './home.css';

import React from 'react';

import {
  useMutation,
  useQuery,
} from '@apollo/client';

import Pin from '../pin/Pin';
import {
  QUERY_ALL_PINS,
  SAVED_PIN,
} from '../query/query';
import { styles } from '../styles/styles';

function PinterestLayout() {
  const { data, loading,error } = useQuery(QUERY_ALL_PINS);
  const [savePin] = useMutation(SAVED_PIN);
  const mainUser = localStorage.getItem("email");

  if (loading) {
    return <h1>Data is Loading!!!</h1>;
  }
  if(error){
    return <h1>{error.message}</h1>
  }
  const size = ["small", "medium", "large"];
  const type = "pins";
  return (
    <div style={styles.pinterestLayout}>
      {data?.pins.map((pin) => {
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
