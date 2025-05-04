// React
import React from 'react';
import App from './app';
import ReactDOM from 'react-dom/client';

// i18next
import './Components/i18n'

// Redux
import { Provider } from "react-redux"
import { restaurant } from './Components/ReduxFiles/restaurant'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={restaurant}>
      <App />
    </Provider>
  </React.StrictMode>
);