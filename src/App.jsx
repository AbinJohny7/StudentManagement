import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Student from './Student'
import { Routes,Route } from 'react-router-dom'


function App() {
 

  return (
    <>
     <Routes>
      <Route path='/' element={<Student/>}
       />
     </Routes>
    </>
  )
}

export default App
