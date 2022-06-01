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
      <div className="App">
        <div className="app-container">
          <Navbar />
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
