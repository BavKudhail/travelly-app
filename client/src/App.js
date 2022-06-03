import React from "react";
import "./App.css";

// dependencies
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";

// router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// pages
import Home from "./pages/Home";
import { Chat, Login } from "./pages";

// components
import { Navbar } from "./components";

// apollo client
const client = new ApolloClient({
  // @TODO - insert auth here (link: authLink.concat(httpLink),)
  uri: "/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="app">
          {/* <Navbar /> */}
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
