import React, { useState, useEffect } from "react";
import {
  Signin,
  Signup,
  Create,
  Image,
  SavedPins,
  MyPins,
  Menu,
  PinterestLayout,
} from "./components/index";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import "./App.css";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "http://localhost:4000/graphql",
});
function App() {
  const [authorised, setAuthorised] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setAuthorised(true);
    }
  }, [authorised]);

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Menu authorised={authorised} setAuthorised={setAuthorised} />
        <BrowserRouter>
          {authorised ? (
            <>
              <Routes>
                <Route exact path="/" element={<PinterestLayout />} />
                <Route exact path="/create" element={<Create />} />
                <Route exact path="/pin/:type/:id" element={<Image />} />
                <Route exact path="/saved-pins" element={<SavedPins />} />
                <Route exact path="/my-pins" element={<MyPins />} />
              </Routes>
            </>
          ) : (
            <>
              <Routes>
                <Route exact path="/" element={<Signup />} />
                <Route
                  exact
                  path="/signin"
                  element={<Signin setAuthorised={setAuthorised} />}
                />
              </Routes>
            </>
          )}
        </BrowserRouter>
      </div>
    </ApolloProvider>
  );
}

export default App;
