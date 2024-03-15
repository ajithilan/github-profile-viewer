import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
//@ts-ignore
import Userslice from './ReduxStore/Userslice'

const reduxstore = configureStore({
  reducer:{
    user : Userslice,
  }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={reduxstore}>
      <App />
    </Provider>
  </React.StrictMode>,
)
