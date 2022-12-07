import React, { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

import { CircularProgress } from "@mui/material";

export const Context = React.createContext();

export const Provider = ({ children }) => {
  console.log("context");

  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("jwt-token"));
    console.log(token);

    if (token) {
      let decoded = jwt_decode(token);

      setPending(false);
      setCurrentUser(decoded);
    } else {
      setPending(false);
      setCurrentUser(null);
    }
  }, []);

  console.log(currentUser);

  if (pending) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress color="inherit"></CircularProgress>
      </div>
    );
  }

  return (
    <Context.Provider
      value={{
        currentUser,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Provider;
