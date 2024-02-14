import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col items-center mt">
        <div>Welcome to this Todo WebApp</div>
      <div className="flex">
        <Link to={"./Signup"}>SignUp</Link>
        <br></br>
        <Link to={"./Login"}>LogIn</Link>
      </div>
    </div>
  );
}
