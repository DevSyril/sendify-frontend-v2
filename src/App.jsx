import React from 'react'
import './App.css'
import ActionBar from './Components/ActionBar/ActionBar'
import GroupDescription from './Components/GroupDescription/GroupDescription'
import GroupDiscussions from './Components/GroupDiscussions/GroupDiscussions'
import Sidebar from './Components/Sidebar/Sidebar'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <div className='page-content'>
    <ToastContainer />
      <ActionBar />
      <Sidebar />
      <GroupDiscussions />
      <GroupDescription />
    </div>
  )
}
