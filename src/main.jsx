import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import GroupContextProvider from './Components/Context/GroupContext.jsx'
import Registration from './Pages/Registration/Registration.jsx'
import OtpCodeVerification from './Pages/OtpVerification/OtpCodeVerification.jsx'
import Login from './Pages/Login/Login.jsx'
import EmailVerification from './Pages/EmailVerification/EmailVerification.jsx'


const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/',
    element: <App />
  },
  {
    path: '/registration',
    element: <Registration />
  },
  {
    path: '/otp-check',
    element: <OtpCodeVerification />
  },
  {
    path: '/email-verification',
    element: <EmailVerification />
  },
  
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GroupContextProvider>
      <RouterProvider router={router} />
    </GroupContextProvider>
  </StrictMode>,
)
