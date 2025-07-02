import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/homePage'
import LoginPage from './pages/loginPage'
import AdminHomePage from './pages/adminHomePage'
import { Toaster } from 'react-hot-toast'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <BrowserRouter>
    <Toaster/>
     <Routes path="/*">
      <Route path='/' element={<HomePage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/admin/*' element={<AdminHomePage/>}/>
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
