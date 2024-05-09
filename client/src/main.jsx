import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import {BrowserRouter} from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

const colors = {
    'bg-color': {
        100: '#fef9f8',
        200: '#efd1d8',
        300: '#efcacc'
    },
    'text-color': {
        100: '#cac3e4',
        200: '#d6cae3'
    }
    
}

const theme = extendTheme({colors});

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        {/* <BrowserRouter> */}
            <ChakraProvider theme={theme}>
                <App />
            </ChakraProvider>
        {/* </BrowserRouter> */}
    </React.StrictMode>
);

