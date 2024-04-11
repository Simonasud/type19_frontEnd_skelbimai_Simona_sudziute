// import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import './sass/index.scss';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './store/AuthProvieder.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
  // </React.StrictMode>,
);
