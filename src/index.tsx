import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import AppWithUseReducer from "./AppWithUseReducer";

ReactDOM.render(<AppWithUseReducer />,  document.getElementById('root'));

serviceWorker.unregister();
