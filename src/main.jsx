import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react';

const PUBLISHABLE_KEY = "pk_test_YmFsYW5jZWQtb3J5eC0xMC5jbGVyay5hY2NvdW50cy5kZXYk"

if (!PUBLISHABLE_KEY) {
  console.error("Missing Clerk publishable key in environment variables");
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </ClerkProvider>
  </React.StrictMode>
)
