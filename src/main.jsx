import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import GroupContextProvider from './Components/Context/GroupContext.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GroupContextProvider>
      <RouterProvider router={router} />
    </GroupContextProvider>
  </StrictMode>,
)
