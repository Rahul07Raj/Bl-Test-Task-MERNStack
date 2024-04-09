import './index.css'
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react'
import UserProvider from './context/user';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChakraProvider>
      <React.StrictMode>
          <UserProvider>
            <App />
          </UserProvider>
      </React.StrictMode>
    </ChakraProvider>
);
