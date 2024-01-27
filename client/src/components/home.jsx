import {Link} from "react-router-dom"

export default function Home() {
  return(
    <>
      <div>Welcome to this Todo WebApp</div>
      <Link to={'./Signup'}>SignUp</Link>
      <br></br>
      <Link to={'./Login'}>LogIn</Link>

    </>
  )
}