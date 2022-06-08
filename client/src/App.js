import React from "react";
import "./App.css";
// dependencies
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
// router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// provider
import ChatProvider from "./context/ChatProvider";
// chakra/ui / styling
import { Flex } from "@chakra-ui/react";
import backgroundimg from "./assets/background.png";
// pages
import { Chat, Landing, Dashboard, Posts, Home } from "./pages";
// components
import { NavBar } from "./components";

// http link
const httpLink = createHttpLink({
  uri: "/graphql",
});

// auth link
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      // we are setting the header on every network request that we make to have the auth token that is available
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// new apollo client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <ChatProvider>
        <Router>
          <Flex
            h="100vh"
            maxW="2000px"
            flexDir="row"
            overflow="hidden"
            backgroundImage={backgroundimg}
            className="app"
          >
            <NavBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/landing" element={<Landing />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/posts" element={<Posts />} />
              <Route path="/chat" element={<Chat />} />
            </Routes>
          </Flex>
        </Router>
      </ChatProvider>
    </ApolloProvider>
  );
}

export default App;
