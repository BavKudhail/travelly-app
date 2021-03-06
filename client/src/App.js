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
import {
  BrowserRouter as Router,
  Routes,
  Route,
  HashRouter,
} from "react-router-dom";

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
  CompanyDashboard,
  AdminLogin,
  ImageUpload,
  AdminDashboard,
  UserLogin,
} from "./pages";

// components
import { Navbar } from "./components";

import Auth from "./utils/auth";

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
        <HashRouter>
          <Flex
            h={[null, null, "100vh", "100vh", "100vh"]}
            maxW="2000px"
            flexDir={["column", "column", "row"]}
            overflow="hidden"
            backgroundImage={backgroundimg}
            className="app"
          >
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/userprofile/:id"
                element={Auth.loggedIn() ? <UserProfile /> : <UserLogin />}
              />
              <Route
                path="/dashboard"
                element={Auth.loggedIn() ? <Dashboard /> : <UserLogin />}
              />
              <Route
                path="/posts"
                element={Auth.loggedIn() ? <Posts /> : <UserLogin />}
              />
              <Route
                path="/chat"
                element={Auth.loggedIn() ? <Chat /> : <UserLogin />}
              />
              <Route
                path="/image-upload"
                element={Auth.loggedIn() ? <ImageUpload /> : <UserLogin />}
              />
              <Route path="/companyLogin" element={<CompanyLogin />} />
              <Route
                path="/companyDashboard"
                element={
                  Auth.loggedIn() ? <CompanyDashboard /> : <CompanyLogin />
                }
              />
              <Route path="/adminLogin" element={<AdminLogin />} />
              <Route
                path="/adminDashboard"
                element={Auth.loggedIn() ? <AdminDashboard /> : <AdminLogin />}
              />
              <Route path="/userLogin" element={<UserLogin />} />
            </Routes>
          </Flex>
        </HashRouter>
      </ChatProvider>
    </ApolloProvider>
  );
}

export default App;
