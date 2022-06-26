import React from "react";
import { useMutation } from "@apollo/client";
import { pinstyles } from "../styles/styles";
import { DELETE_SAVED_PIN, DELETE_PIN } from "../query/query";
import { notification } from "antd";


function Pin({ pin, type, savePin, mainUser, size, refetch }) {
  const [deleteSavedPin] = useMutation(DELETE_SAVED_PIN);
  const [deletePin] = useMutation(DELETE_PIN);
  const openNotificationWithIcon = (type, message, title) => {
    notification[type]({
      message: title,
      description: message,
    });
  };
  return (
    <div
      style={{
        ...pinstyles.pin,
        ...pinstyles[size],
      }}
      className="pin-wrapper"
    >
      <a
        className="pin-image-link"
        width="100%"
        key={pin?.id}
        href={`/pin/${type}/${pin?.id}`}
      >
        <img width="100%" src={pin?.img} className="pin-img" alt="pin-img" />
      </a>
      {(pin && type === "my") || type === "saved" ? (
        <>
          <button
            onClick={() => {
              type === "saved"
                ? deleteSavedPin({
                    variables: {
                      deleteSavedPinId: pin.id,
                      user: pin.user,
                    },
                  })
                : deletePin({
                    variables: {
                      deletePinId: pin.id,
                      user: pin.user,
                    },
                  });
              refetch(); 
              openNotificationWithIcon("success", "You have succedfully deleted pin", "Success")    
            }}
            className="pin-save-btn"
          >
            Delete
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => {
              savePin({
                variables: {
                  input: {
                    title: pin.title,
                    description: pin.description,
                    img: pin.img,
                    id: pin.id,
                    user: mainUser,
                  },
                },
              });
              openNotificationWithIcon("success", "Pin is saved succesfully", "Success")
            }}
            className="pin-save-btn"
          >
            Save
          </button>
        </>
      )}
    </div>
  );
}

export default Pin;
