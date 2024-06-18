import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store,  persistor } from './store/store.js';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import './index.css';



ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
        <App />
    </PersistGate>
  </Provider>
);
