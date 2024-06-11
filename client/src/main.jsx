import React from "react";
import ReactDOM from "react-dom/client";
import theme from './assets/theme.js'
import { ChakraProvider} from "@chakra-ui/react";
import { Provider } from 'react-redux';
// import store from "./assets/store.js";
import store from "./stores/index.js";
import App from "./App.jsx";
import './index.css'

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <React.StrictMode>
                <ChakraProvider theme={theme}>
                    <App />
                </ChakraProvider>
        </React.StrictMode>
    </Provider>
);

