import {useState} from "react"
import {Link} from 'react-router-dom'

export default function Signup() {
const [signupData, setSignupData] = useState({
  name: "",
  email: "",
  password: "",
  // confirmPassword: ""
})
const [response,setResponse] = useState('');
const [signupSuccess, setSignupSuccess] = useState(false)

const handleSignup = async (e) => {
  e.preventDefault();
  console.log("inside handlesignup")
  try{
    const req = await fetch("http://localhost:3000/todoG/signup",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupData)
    });
    const res = await req.json();
    setResponse(res.message)
    if(res.success){
      setSignupSuccess(true)
    }
    else{
      setSignupSuccess(false)
    }
  }
  catch(error) {
    console.log(error)
  }
}

  return(
    <>
    <div>Signup Page</div>
      <form onSubmit={handleSignup}>
        <input type="text"  placeholder="Name" onChange={(e) => setSignupData({...signupData, name: e.target.value})} />
        <input type="email" value={signupData.email} placeholder="Email" onChange={(e) => setSignupData({...signupData, email: e.target.value })} required />
        <input type="password" value={signupData.password} placeholder="Password" onChange={(e) => setSignupData({...signupData, password: e.target.value})} required />
        {/* <input type="password" value={signupData.confirmPassword} placeholder="Confirm Password" onChange={(e) => setSignupData({...signupData, confirmPassword: e.target.value})} required /> */}
        <button type="submit">Sign Up</button>
      </form>
      <div>{response}</div>
      {signupSuccess && ( 
          <Link to={'/login'}>Login Page</Link>
      )}
    </>
  )
}