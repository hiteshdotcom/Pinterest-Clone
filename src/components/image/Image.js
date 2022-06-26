import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import {
  DELETE_SAVED_PIN,
  DELETE_PIN,
  SAVED_PIN,
  READ_PIN,
} from "../query/query";
import "./image.css";

function Image() {
  let { id, type } = useParams();
  const { loading, error, data } = useQuery(READ_PIN, {
    variables: { readPinId: id },
  });
  const [deletePin] = useMutation(DELETE_PIN);
  const [savePin] = useMutation(SAVED_PIN);
  const [deleteSavedPin] = useMutation(DELETE_SAVED_PIN);
  const loginedUser = localStorage.getItem("email");
  const user = localStorage.getItem("email");
  if (loading) {
    return <h1>Data is Loading...</h1>;
  }
  if (error) {
    return <h1>Something thing has exploded</h1>;
  }

  return (
    <div className="pin-detail">
      <div className="pin-detail-wrapper">
        <div className="pin-detail-image">
          <img src={data.readPin.img}  alt="pin-img"/>
        </div>
        <div className="pin-detail-info">
          <div className="pin-detail-save-btn">
            <button
              onClick={() =>
                savePin({
                  variables: {
                    input: {
                      title: data.readPin.title,
                      description: data.readPin.description,
                      img: data.readPin.img,
                      id: data.readPin.id,
                      user: loginedUser,
                    },
                  },
                })
              }
            >
              Save
            </button>
          </div>
          <div className="pin-detail-info-header">
            <h2>{data.readPin.title}</h2>
            <p>{data.readPin.description}</p>
          </div>
          <div className="pin-detail-creator">
            <h3>
              {" "}
              Creator <br /> {data.readPin.user}
            </h3>
          </div>

          {data.readPin.user === loginedUser ? (
            <>
              <button
                className="pin-detail-delete-btn"
                onClick={() =>
                  type === "saved"
                    ? deleteSavedPin({
                        variables: {
                          deleteSavedPinId: id,
                          user: user,
                        },
                      })
                    : deletePin({
                        variables: {
                          deletePinId: id,
                          user: user,
                        },
                      })
                }
              >
                Delete Pin
              </button>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default Image;
