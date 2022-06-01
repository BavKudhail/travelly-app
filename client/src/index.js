import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import `ChakraProvider` component
import { ChakraProvider } from "@chakra-ui/react";

// @NOTE -  Pass the `theme` prop to the `ChakraProvider` for custom themes

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* // Wrap ChakraProvider at the root of your app */}
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
