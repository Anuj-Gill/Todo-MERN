import { useState } from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Signup from './components/signup'
import Login from './components/login'
import Home from './components/Home'
import Todos from './components/Todos'


function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/todos" element={<Todos />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
