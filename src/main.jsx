import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { APIProvider } from '@vis.gl/react-google-maps';

import { UserProvider } from './contexts/UserContext.jsx';

import App from './App.jsx';

import './index.css';

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <APIProvider apiKey={apiKey} >
          <App />
        </APIProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>,
);
