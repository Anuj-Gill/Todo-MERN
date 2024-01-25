import { useState } from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Signup from './components/signup'
import Login from './components/login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />}/>
            
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
