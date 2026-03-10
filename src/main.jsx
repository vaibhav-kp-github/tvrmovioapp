import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './Routes/index.jsx'
import './index.css'
import App from './App.jsx'
import axios from 'axios'
import { Provider } from 'react-redux'
import { store } from './store/store.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx';

// setup axios

axios.defaults.baseURL = "https://api.themoviedb.org/3/";
axios.defaults.headers.common["Authorization"] = `Bearer ${
  import.meta.env.VITE_TMDB_API_KEY}`;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ErrorBoundary>
  </StrictMode>,
)
