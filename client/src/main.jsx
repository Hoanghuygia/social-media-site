import React from "react";
import ReactDOM from "react-dom/client";
import theme from './assets/theme.js'
import { ChakraProvider} from "@chakra-ui/react";
import App from "./App.jsx";
import './index.css'

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
            <ChakraProvider theme={theme}>
                <App />
            </ChakraProvider>
    </React.StrictMode>
);

