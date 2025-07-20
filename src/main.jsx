import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ContextProvider from './context/context.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <App />
   </React.StrictMode>
  //We trapped the app comp using context provider;SO WE HAVE SUPPORT OF CONTEXT API IN OUR 
)
