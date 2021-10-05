import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import App from "./app/App";
import {Provider} from "react-redux";
import {store} from './app/store';
import {createTheme, ThemeProvider} from "@material-ui/core";

const theme = createTheme();

ReactDOM.render(<Provider store={store}>
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>
</Provider>, document.getElementById('root'));

serviceWorker.unregister();
