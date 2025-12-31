import React from 'react'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Todo from './pages/Todo'
import { Routes ,   Route } from 'react-router-dom'

const App = () => {
  return (
    <div className='h-screen w-screen'>
      <Routes>
       <Route path='/login' element={<Login/>}/>
       <Route path='/signup' element={<Signup/>} />
       <Route path='/' element={<Todo/>} />
      </Routes>
    </div>
  )
}

export default App
