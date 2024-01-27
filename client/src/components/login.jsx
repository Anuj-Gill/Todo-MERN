import { Link } from "react-router-dom"
import {useState} from 'react'
import {useNavigate} from'react-router-dom'

export default function Login() {

  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  })
  const [response, setResponse] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try{
      const req = await fetch("http://localhost:3000/todoG/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept":  "application/json"
        },
        body: JSON.stringify(loginData)
      })
      const res = await req.json();
      console.log(res)
      if(res.status) {
        setResponse(res.message);
        localStorage.setItem("todoUserToken", res.token)
 
        navigate('/todos');
      } else {
        setResponse(res.message)
      }
    }
    catch(error) {
      console.log(error)
    }
  }
  
  // console.log(loginSuccess)
  return(
    <>
      <div>Login Page</div>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" onChange={(e) => setLoginData({...loginData,email: e.target.value})}></input>
        <input type="password" placeholder="Password" onChange={(e) => setLoginData({...loginData,password: e.target.value})}></input>
        <button type="submit">Login</button>
      </form>
      <Link to={'/signup'}>Signup Page</Link>
      {response && (
        <div>{response}</div>
      )}

      
    </>
  )
}