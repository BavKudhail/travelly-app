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

import {
  Chat,
  Landing,
  Dashboard,
  Posts,
  Home,
  UserProfile,
  CompanyLogin,
  AdminLogin,
  ImageUpload,
} from "./pages";

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
            h={[null, null, "100vh", "100vh", "100vh"]}
            maxW="2000px"
            flexDir={["column", "column", "row"]}
            overflow="hidden"
            backgroundImage={backgroundimg}
            className="app"
          >
            <NavBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/userprofile" element={<UserProfile />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/posts" element={<Posts />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/image-upload" element={<ImageUpload />} />
              <Route path="/companyLogin" element={<CompanyLogin />} />
              <Route path="/adminLogin" element={<AdminLogin />} />
            </Routes>
          </Flex>
        </Router>
      </ChatProvider>
    </ApolloProvider>
  );
}

export default App;
