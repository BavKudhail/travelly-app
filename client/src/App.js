import React from 'react';
import './App.css';

// dependencies
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// provider
import ChatProvider from "./context/ChatProvider";

// pages
import Home from './pages/Home';
import { Chat, Landing, Dashboard, Posts } from './pages';

// components
import { Navbar } from './components';

// http link
const httpLink = createHttpLink({
  uri: '/graphql',
});

// auth link
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      // we are setting the header on every network request that we make to have the auth token that is available
      authorization: token ? `Bearer ${token}` : '',
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
          <div className="">
            {/* <Navbar /> */}
            <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/chat" element={<Chat />} />
            </Routes>
          </div>
        </Router>
      </ChatProvider>
    </ApolloProvider>
  );
}

export default App;
