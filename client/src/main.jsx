import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import App from "./App.jsx";
import {Colors} from "./assets/theme.js";
import "./index.css";

const theme = extendTheme({Colors});

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
            <ChakraProvider theme={theme}>
                <App />
            </ChakraProvider>
    </React.StrictMode>
);

